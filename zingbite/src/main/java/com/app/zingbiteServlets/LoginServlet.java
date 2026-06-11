package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;

import com.app.zingbitedao.UserDAO;
import com.app.zingbitedaoimpl.UserDAOImplementation;
import com.app.zingbiteutils.PasswordUtils;
import com.app.zingbiteutils.CsrfUtils;
import com.app.zingbiteutils.LoginAttemptManager;
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

@WebServlet(urlPatterns = {"/api/login", "/api/logout"}, loadOnStartup = 1)
public class LoginServlet extends HttpServlet {



    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("Pre-initializing Hibernate SessionFactory for ZingBite...");
        try {
            com.app.zingbiteutils.DBUtils.getSessionFactory();
            System.out.println("Hibernate SessionFactory pre-initialized successfully!");
        } catch (Exception e) {
            System.err.println("Failed to pre-initialize SessionFactory: " + e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        
        Gson gson = new Gson();
        JsonObject jsonResponse = new JsonObject();
        
        String uri = req.getRequestURI();
        if (uri.endsWith("/logout")) {
            HttpSession session = req.getSession(false);
            if (session != null) {
                CsrfUtils.clearToken(session);
                session.invalidate();
            }
            jsonResponse.addProperty("success", true);
            resp.getWriter().write(jsonResponse.toString());
            return;
        }
        
        try {
            String clientIp = req.getRemoteAddr();
            if (LoginAttemptManager.isBlocked(clientIp)) {
                jsonResponse.addProperty("error", "Too many login attempts. Please try again after 15 minutes.");
                resp.setStatus(429);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            
            String email = requestBody.has("email") ? requestBody.get("email").getAsString().trim().toLowerCase() : null;
            String password = requestBody.has("password") ? requestBody.get("password").getAsString() : null;

            if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
                jsonResponse.addProperty("error", "Email and password are required");
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            UserDAO userDao = new UserDAOImplementation();
            User user = userDao.getUserById(email);

            if (user != null && PasswordUtils.verifyPassword(password, user.getPassword())) {
                LoginAttemptManager.recordSuccessfulAttempt(clientIp);
                HttpSession session = req.getSession();
                session.setAttribute("loggedInUser", user);

                String csrfToken = CsrfUtils.generateToken(session);
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("csrfToken", csrfToken);
                jsonResponse.add("user", gson.toJsonTree(user));
                
            } else {
                LoginAttemptManager.recordFailedAttempt(clientIp);
                jsonResponse.addProperty("error", "Invalid email or password");
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } catch (Exception e) {
            jsonResponse.addProperty("error", "An error occurred during login");
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        resp.getWriter().write(jsonResponse.toString());
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Endpoint to check if user is logged in
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        
        Gson gson = new Gson();
        JsonObject jsonResponse = new JsonObject();
        
        HttpSession session = req.getSession(false);
        if (session != null && session.getAttribute("loggedInUser") != null) {
            User sessionUser = (User) session.getAttribute("loggedInUser");
            UserDAO userDao = new UserDAOImplementation();
            User freshUser = userDao.getUserById(sessionUser.getEmail());
            if (freshUser != null) {
                session.setAttribute("loggedInUser", freshUser);
                String csrfToken = (String) session.getAttribute("csrfToken");
                if (csrfToken == null) {
                    csrfToken = CsrfUtils.generateToken(session);
                }
                jsonResponse.addProperty("loggedIn", true);
                jsonResponse.addProperty("csrfToken", csrfToken);
                jsonResponse.add("user", gson.toJsonTree(freshUser));
            } else {
                session.invalidate();
                jsonResponse.addProperty("loggedIn", false);
            }
        } else {
            jsonResponse.addProperty("loggedIn", false);
        }
        
        resp.getWriter().write(jsonResponse.toString());
    }
}
