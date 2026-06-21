package com.app.zingbiteServlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import com.app.zingbitemodels.ChatMessage;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/chat")
public class ChatServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to access messages.\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");
        String orderIdStr = req.getParameter("orderId");
        String appIdStr = req.getParameter("applicationId");

        // Check if unread count is requested
        boolean unreadCount = "true".equalsIgnoreCase(req.getParameter("unreadCount"));

        // Parse pagination params
        int size = 100;
        try {
            if (req.getParameter("size") != null) {
                size = Math.min(100, Integer.parseInt(req.getParameter("size")));
            }
        } catch (NumberFormatException e) {
            // keep default
        }

        try (Session dbSession = DBUtils.openSession()) {
            if (unreadCount) {
                Query<Long> countQ = dbSession.createQuery(
                    "select count(*) from ChatMessage where receiverId = :uid and isRead = false", Long.class
                );
                countQ.setParameter("uid", user.getUserID());
                Long count = countQ.uniqueResult();
                resp.getWriter().write("{\"unreadCount\":" + (count != null ? count : 0) + "}");
                return;
            }

            List<ChatMessage> list;

            if (orderIdStr != null) {
                int orderId = Integer.parseInt(orderIdStr.replace("ZB-", "").trim());
                Query<ChatMessage> q = dbSession.createQuery(
                    "from ChatMessage where orderId = :orderId order by timestamp asc", ChatMessage.class
                );
                q.setParameter("orderId", orderId);
                q.setMaxResults(size);
                list = q.list();
            } else if (appIdStr != null) {
                int appId = Integer.parseInt(appIdStr);
                Query<ChatMessage> q = dbSession.createQuery(
                    "from ChatMessage where applicationId = :appId order by timestamp asc", ChatMessage.class
                );
                q.setParameter("appId", appId);
                q.setMaxResults(size);
                list = q.list();
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Missing orderId or applicationId parameter.\"}");
                return;
            }

            resp.getWriter().write(gson.toJson(list));

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to fetch chat history.\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to send messages.\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");

        try {
            BufferedReader reader = req.getReader();
            JsonObject jsonMsg = JsonParser.parseReader(reader).getAsJsonObject();

            String rawText = jsonMsg.has("messageText") ? jsonMsg.get("messageText").getAsString() : "";
            int receiverId = jsonMsg.has("receiverId") ? jsonMsg.get("receiverId").getAsInt() : 0;
            Integer orderId = jsonMsg.has("orderId") && !jsonMsg.get("orderId").isJsonNull() ? jsonMsg.get("orderId").getAsInt() : null;
            Integer applicationId = jsonMsg.has("applicationId") && !jsonMsg.get("applicationId").isJsonNull() ? jsonMsg.get("applicationId").getAsInt() : null;

            if (rawText.trim().isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Message text cannot be empty.\"}");
                return;
            }

            // Sanitize and validate length
            String sanitizedText = SanitizationUtils.escapeHtml(rawText);
            if (!SanitizationUtils.validateLength(sanitizedText, 1000)) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Message exceeds maximum length of 1000 characters.\"}");
                return;
            }

            ChatMessage chatMsg = new ChatMessage(
                orderId,
                applicationId,
                user.getUserID(),
                user.getUserName(),
                receiverId,
                sanitizedText,
                new Date()
            );

            Transaction tx = null;
            try (Session dbSession = DBUtils.openSession()) {
                tx = dbSession.beginTransaction();
                dbSession.persist(chatMsg);
                tx.commit();
            } catch (Exception e) {
                if (tx != null) tx.rollback();
                throw e;
            }

            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write(gson.toJson(chatMsg));

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to send message.\"}");
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in.\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");

        try {
            BufferedReader reader = req.getReader();
            JsonObject jsonMsg = JsonParser.parseReader(reader).getAsJsonObject();
            int messageId = jsonMsg.get("messageId").getAsInt();

            Transaction tx = null;
            try (Session dbSession = DBUtils.openSession()) {
                tx = dbSession.beginTransaction();
                ChatMessage msg = dbSession.get(ChatMessage.class, messageId);
                if (msg != null && msg.getReceiverId() == user.getUserID()) {
                    msg.setRead(true);
                    msg.setReadAt(new Date());
                    dbSession.merge(msg);
                }
                tx.commit();
            } catch (Exception e) {
                if (tx != null) tx.rollback();
                throw e;
            }

            resp.getWriter().write("{\"success\":true}");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to mark message as read.\"}");
        }
    }
}