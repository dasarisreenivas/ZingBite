package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;

import com.app.zingbitedao.UserDAO;
import com.app.zingbitedaoimpl.UserDAOImplementation;
import com.app.zingbiteutils.PasswordUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.app.zingbiteutils.CsrfUtils;
import com.app.zingbitemodels.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/api/register")
public class RegisterServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        
        Gson gson = new Gson();
        JsonObject jsonResponse = new JsonObject();
        
        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            
            String userName = requestBody.has("username") ? SanitizationUtils.escapeHtml(requestBody.get("username").getAsString()) : null;
            String email = requestBody.has("email") ? requestBody.get("email").getAsString().trim().toLowerCase() : null;
            String mobile = requestBody.has("mobile") ? requestBody.get("mobile").getAsString().trim() : null;
            String password = requestBody.has("password") ? requestBody.get("password").getAsString() : null;
            String confirmPassword = requestBody.has("confirmPassword") ? requestBody.get("confirmPassword").getAsString() : null;
            String address = requestBody.has("address") ? SanitizationUtils.escapeHtml(requestBody.get("address").getAsString()) : null;
            Double latitude = requestBody.has("latitude") && !requestBody.get("latitude").isJsonNull() ? requestBody.get("latitude").getAsDouble() : null;
            Double longitude = requestBody.has("longitude") && !requestBody.get("longitude").isJsonNull() ? requestBody.get("longitude").getAsDouble() : null;
            String city = requestBody.has("city") && !requestBody.get("city").isJsonNull() ? SanitizationUtils.escapeHtml(requestBody.get("city").getAsString()) : null;

            if (email == null || password == null || userName == null || mobile == null || address == null) {
                jsonResponse.addProperty("error", "All fields are required");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            long mobileNumber = 0;
            try {
                mobileNumber = Long.parseLong(mobile);
            } catch (NumberFormatException e) {
                jsonResponse.addProperty("error", "Invalid mobile number");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            if (!password.equals(confirmPassword)) {
                jsonResponse.addProperty("error", "Passwords do not match");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            if (password.length() < 8) {
                jsonResponse.addProperty("error", "Password must be at least 8 characters long");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            boolean hasUppercase = false;
            boolean hasLowercase = false;
            boolean hasDigit = false;
            boolean hasSpecial = false;
            for (char c : password.toCharArray()) {
                if (Character.isUpperCase(c)) hasUppercase = true;
                else if (Character.isLowerCase(c)) hasLowercase = true;
                else if (Character.isDigit(c)) hasDigit = true;
                else if ("!@#$%^&*()_+-=[]{}|;':\",./<>?".indexOf(c) >= 0) hasSpecial = true;
            }

            if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecial) {
                jsonResponse.addProperty("error", "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }
            
            UserDAO userDAO = new UserDAOImplementation();
            User existingUser = userDAO.getUserById(email);
            if(existingUser != null) {
                jsonResponse.addProperty("error", "Email already registered");
                resp.setStatus(HttpServletResponse.SC_CONFLICT);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            String hashedPassword = PasswordUtils.hashPassword(password);
            User user = new User(userName, email, hashedPassword, mobileNumber, address);
            user.setRole("customer");
            user.setCreatedOn(new java.util.Date());
            if (latitude != null) user.setLatitude(latitude);
            if (longitude != null) user.setLongitude(longitude);
            if (city != null) user.setCity(city);
            int added = userDAO.addUser(user);

            if (added > 0) {
                User registeredUser = userDAO.getUserById(email);
                if (registeredUser != null) {
                    com.app.zingbiteutils.EmailService.sendEmailAsync(
                        registeredUser.getUserID(),
                        registeredUser.getEmail(),
                        "Welcome to ZingBite!",
                        com.app.zingbiteutils.EmailTemplates.welcome(registeredUser.getUserName())
                    );
                    HttpSession session = req.getSession();
                    session.setAttribute("loggedInUser", registeredUser);
                    String csrfToken = CsrfUtils.generateToken(session);
                    jsonResponse.addProperty("csrfToken", csrfToken);
                }
                jsonResponse.addProperty("success", true);
            } else {
                jsonResponse.addProperty("error", "Registration failed");
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            jsonResponse.addProperty("error", "An error occurred during registration");
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        resp.getWriter().write(jsonResponse.toString());
    }
}
