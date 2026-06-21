package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.app.zingbitedao.NotificationDAO;
import com.app.zingbitedaoimpl.NotificationDAOImplementation;
import com.app.zingbitemodels.Notification;
import com.app.zingbitemodels.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/notifications")
public class NotificationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to view notifications\"}");
            return;
        }

        User user = null;
        try {
            user = (User) session.getAttribute("loggedInUser");
        } catch (ClassCastException e) {
            try {
                session.invalidate();
            } catch (Exception ignored) {}
        }

        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to view notifications\"}");
            return;
        }

        try {
            NotificationDAO notificationDAO = new NotificationDAOImplementation();
            List<Notification> list = notificationDAO.getNotificationsByUser(user.getUserID());
            int unreadCount = notificationDAO.getUnreadCount(user.getUserID());

            JsonObject result = new JsonObject();
            Gson gson = new Gson();
            result.add("notifications", gson.toJsonTree(list));
            result.addProperty("unreadCount", unreadCount);

            response.getWriter().write(result.toString());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"An error occurred while fetching notifications\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to modify notifications\"}");
            return;
        }

        User user = null;
        try {
            user = (User) session.getAttribute("loggedInUser");
        } catch (ClassCastException e) {
            try {
                session.invalidate();
            } catch (Exception ignored) {}
        }

        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to modify notifications\"}");
            return;
        }

        JsonObject jsonResponse = new JsonObject();
        try {
            BufferedReader reader = request.getReader();
            JsonObject requestBody = null;
            try {
                requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            } catch (Exception ignored) {}

            NotificationDAO notificationDAO = new NotificationDAOImplementation();

            if (requestBody != null && requestBody.has("notificationId")) {
                int notificationId = requestBody.get("notificationId").getAsInt();
                boolean updated = notificationDAO.markAsRead(notificationId);
                if (updated) {
                    jsonResponse.addProperty("success", true);
                    jsonResponse.addProperty("message", "Notification marked as read");
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.addProperty("error", "Failed to update notification status");
                }
            } else {
                // Default: mark all as read
                boolean updated = notificationDAO.markAllAsRead(user.getUserID());
                if (updated) {
                    jsonResponse.addProperty("success", true);
                    jsonResponse.addProperty("message", "All notifications marked as read");
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.addProperty("error", "Failed to update notifications");
                }
            }
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            jsonResponse.addProperty("error", "An error occurred: " + e.getMessage());
            response.getWriter().write(jsonResponse.toString());
        }
    }
}
