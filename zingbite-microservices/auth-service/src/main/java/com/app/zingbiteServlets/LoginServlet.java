package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;

import com.app.zingbitedao.UserDAO;
import com.app.zingbitedaoimpl.UserDAOImplementation;
import com.app.zingbiteutils.PasswordUtils;
import com.app.zingbiteutils.CsrfUtils;
import com.app.zingbiteutils.LoginAttemptManager;
import com.app.zingbiteutils.ClientIpUtils;
import com.app.zingbiteutils.UserResponseUtils;
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



    private static final Logger LOGGER = LoggerFactory.getLogger(LoginServlet.class);

    @Override
    public void init() throws ServletException {
        super.init();
        LOGGER.info("Pre-initializing Hibernate SessionFactory for ZingBite...");
        try {
            com.app.zingbiteutils.DBUtils.getSessionFactory();
            LOGGER.info("Hibernate SessionFactory pre-initialized successfully!");
        } catch (Exception e) {
            LOGGER.warn("Failed to pre-initialize SessionFactory: " + e.getMessage());
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

            String clientIp = ClientIpUtils.resolve(req);
            String attemptKey = clientIp + "|" + email;
            if (LoginAttemptManager.isBlocked(attemptKey)) {
                jsonResponse.addProperty("error", "Too many login attempts. Please try again after 15 minutes.");
                resp.setStatus(429);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            UserDAO userDao = new UserDAOImplementation();
            User user = userDao.getUserById(email);

            if (user != null && PasswordUtils.verifyPassword(password, user.getPassword())) {
                if (user.getBlocked() != null && user.getBlocked()) {
                    jsonResponse.addProperty("error", "Your account has been blocked by an administrator.");
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().write(jsonResponse.toString());
                    return;
                }
                LoginAttemptManager.recordSuccessfulAttempt(attemptKey);
                if (PasswordUtils.needsRehash(user.getPassword())) {
                    user.setPassword(PasswordUtils.hashPassword(password));
                }
                user.setLastLogin(new java.util.Date());
                userDao.updateUser(user);
                HttpSession session = req.getSession();
                session.setAttribute("loggedInUser", user);

                String csrfToken = CsrfUtils.generateToken(session);
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("csrfToken", csrfToken);
                jsonResponse.add("user", UserResponseUtils.toJson(user));
                
            } else {
                LoginAttemptManager.recordFailedAttempt(attemptKey);
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
                if (freshUser.getBlocked() != null && freshUser.getBlocked()) {
                    session.invalidate();
                    jsonResponse.addProperty("loggedIn", false);
                    jsonResponse.addProperty("error", "Your account has been blocked by an administrator.");
                } else {
                    session.setAttribute("loggedInUser", freshUser);
                    String csrfToken = (String) session.getAttribute("csrfToken");
                    if (csrfToken == null) {
                        csrfToken = CsrfUtils.generateToken(session);
                    }
                    jsonResponse.addProperty("loggedIn", true);
                    jsonResponse.addProperty("csrfToken", csrfToken);
                    jsonResponse.add("user", UserResponseUtils.toJson(freshUser));
                }
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
