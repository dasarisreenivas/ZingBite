package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.app.zingbitedao.UserDAO;
import com.app.zingbitedaoimpl.UserDAOImplementation;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.UserResponseUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.app.zingbiteutils.AuthorizationUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/profile")
public class ProfileServlet extends HttpServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProfileServlet.class);
    private static final int ORDERS_SERVICE_CONNECT_TIMEOUT_MS = 2000;
    private static final int ORDERS_SERVICE_READ_TIMEOUT_MS = 5000;

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to view profile details\"}");
            return;
        }

        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to view profile details\"}");
            return;
        }

        String action = req.getParameter("action");
        if ("orders".equals(action)) {
            forwardToOrdersService(req, resp, "GET", null);
            return;
        }

        resp.getWriter().write(UserResponseUtils.toJson(user).toString());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in\"}");
            return;
        }

        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in\"}");
            return;
        }
        JsonObject jsonResponse = new JsonObject();

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : "";

            if ("createOrder".equals(action)) {
                forwardToOrdersService(req, resp, "POST", requestBody.toString());
                return;
            }

            if ("update".equals(action)) {
                String username = requestBody.has("username") ? SanitizationUtils.escapeHtml(requestBody.get("username").getAsString()) : null;
                String mobile = requestBody.has("mobile") ? requestBody.get("mobile").getAsString() : null;
                String address = requestBody.has("address") ? SanitizationUtils.escapeHtml(requestBody.get("address").getAsString()) : null;
                Double latitude = requestBody.has("latitude") && !requestBody.get("latitude").isJsonNull() ? requestBody.get("latitude").getAsDouble() : null;
                Double longitude = requestBody.has("longitude") && !requestBody.get("longitude").isJsonNull() ? requestBody.get("longitude").getAsDouble() : null;
                String city = requestBody.has("city") && !requestBody.get("city").isJsonNull() ? SanitizationUtils.escapeHtml(requestBody.get("city").getAsString()) : null;

                if (username == null || mobile == null || address == null) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"error\":\"All fields are required\"}");
                    return;
                }
                if ((latitude == null) != (longitude == null)
                        || (latitude != null && (!Double.isFinite(latitude)
                                || latitude < -90.0 || latitude > 90.0
                                || !Double.isFinite(longitude)
                                || longitude < -180.0 || longitude > 180.0))) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"error\":\"Invalid profile coordinates\"}");
                    return;
                }

                long mobileNumber = Long.parseLong(mobile.replaceAll("\\D", "")); // strip symbols if any
                user.setUserName(username);
                user.setPhoneNumber(mobileNumber);
                user.setAddress(address);
                if (latitude != null) user.setLatitude(latitude);
                if (longitude != null) user.setLongitude(longitude);
                if (city != null) user.setCity(city);

                UserDAO userDao = new UserDAOImplementation();
                int success = userDao.updateUser(user);

                if (success > 0) {
                    session.setAttribute("loggedInUser", user);
                    jsonResponse.addProperty("success", true);
                    jsonResponse.add("user", UserResponseUtils.toJson(user));
                } else {
                    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.addProperty("error", "Failed to update profile database");
                }
                resp.getWriter().write(jsonResponse.toString());

            } else if ("upgradeRole".equals(action)) {
                String role = requestBody.has("role") ? requestBody.get("role").getAsString() : null;
                if (role == null || (!"delivery_partner".equals(role) && !"restaurant_admin".equals(role))) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"error\":\"Invalid role upgrade request\"}");
                    return;
                }
                // Role upgrades must go through the approval queue; direct upgrade not allowed
                resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                jsonResponse.addProperty("error", "Role upgrades require admin approval via Onboarding Queue. Please use the Partner With Us or Ride With Us forms.");
                resp.getWriter().write(jsonResponse.toString());

            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Invalid action\"}");
            }
        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"An error occurred: " + e.getMessage() + "\"}");
        }
    }

    private void forwardToOrdersService(HttpServletRequest req, HttpServletResponse resp, String method, String body) throws IOException {
        String serviceUrl = System.getenv().getOrDefault("ORDERS_SERVICE_URL", "http://localhost:8082");
        String queryString = req.getQueryString();
        String urlString = serviceUrl + "/api/orders" + (queryString != null ? "?" + queryString : "");

        java.net.HttpURLConnection connection = null;
        try {
            java.net.URL url = new java.net.URL(urlString);
            connection = (java.net.HttpURLConnection) url.openConnection();
            connection.setConnectTimeout(ORDERS_SERVICE_CONNECT_TIMEOUT_MS);
            connection.setReadTimeout(ORDERS_SERVICE_READ_TIMEOUT_MS);
            connection.setRequestMethod(method);

            // Forward headers
            String cookieHeader = req.getHeader("Cookie");
            if (cookieHeader != null) {
                connection.setRequestProperty("Cookie", cookieHeader);
            }
            String csrfHeader = req.getHeader("X-CSRF-Token");
            if (csrfHeader != null) {
                connection.setRequestProperty("X-CSRF-Token", csrfHeader);
            }
            String contentType = req.getHeader("Content-Type");
            if (contentType != null) {
                connection.setRequestProperty("Content-Type", contentType);
            }

            if ("POST".equalsIgnoreCase(method) && body != null) {
                connection.setDoOutput(true);
                try (java.io.OutputStream os = connection.getOutputStream()) {
                    byte[] input = body.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }
            }

            int status = connection.getResponseCode();
            resp.setStatus(status);

            // Forward response headers
            String resContentType = connection.getContentType();
            if (resContentType != null) {
                resp.setContentType(resContentType);
            }

            // Forward response body
            java.io.InputStream is = (status >= 200 && status < 300) ? connection.getInputStream() : connection.getErrorStream();
            if (is != null) {
                try (java.io.BufferedReader r = new java.io.BufferedReader(new java.io.InputStreamReader(is, "utf-8"))) {
                    StringBuilder responseBody = new StringBuilder();
                    String line;
                    while ((line = r.readLine()) != null) {
                        responseBody.append(line);
                    }
                    resp.getWriter().write(responseBody.toString());
                }
            }
        } catch (Exception e) {
            LOGGER.error("Failed to forward to orders-service", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Gateway routing error: " + e.getMessage() + "\"}");
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}
