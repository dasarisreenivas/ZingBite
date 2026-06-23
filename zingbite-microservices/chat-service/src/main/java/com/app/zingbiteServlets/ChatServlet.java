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
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import com.app.chat.ChatAuthorizationService;
import com.app.chat.ChatAuthorizationService.ChatAccess;
import com.app.zingbitemodels.ChatMessage;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.AuthorizationUtils;
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

        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to access messages.\"}");
            return;
        }
        String orderIdStr = req.getParameter("orderId");
        String appIdStr = req.getParameter("applicationId");

        // Check if unread count is requested
        boolean unreadCount = "true".equalsIgnoreCase(req.getParameter("unreadCount"));

        // Parse pagination params
        int size = 100;
        try {
            if (req.getParameter("size") != null) {
                size = Math.max(1, Math.min(100, Integer.parseInt(req.getParameter("size"))));
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

            String type;
            int targetId;
            if (orderIdStr != null && appIdStr == null) {
                type = "order";
                targetId = Integer.parseInt(orderIdStr.replace("ZB-", "").trim());
            } else if (appIdStr != null && orderIdStr == null) {
                type = "application";
                targetId = Integer.parseInt(appIdStr);
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Provide exactly one chat target.\"}");
                return;
            }
            if (ChatAuthorizationService.authorize(dbSession, user.getUserID(), type, targetId) == null) {
                resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                resp.getWriter().write("{\"error\":\"You are not authorized to access this chat.\"}");
                return;
            }

            List<ChatMessage> list;
            if ("order".equals(type)) {
                Query<ChatMessage> q = dbSession.createQuery(
                    "from ChatMessage where orderId = :orderId order by timestamp asc", ChatMessage.class
                );
                q.setParameter("orderId", targetId);
                q.setMaxResults(size);
                list = q.list();
            } else {
                Query<ChatMessage> q = dbSession.createQuery(
                    "from ChatMessage where applicationId = :appId order by timestamp asc", ChatMessage.class
                );
                q.setParameter("appId", targetId);
                q.setMaxResults(size);
                list = q.list();
            }

            resp.getWriter().write(gson.toJson(list));

        } catch (IllegalArgumentException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Invalid chat target.\"}");
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

        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to send messages.\"}");
            return;
        }

        try {
            BufferedReader reader = req.getReader();
            JsonObject jsonMsg = JsonParser.parseReader(reader).getAsJsonObject();

            String rawText = jsonMsg.has("messageText") ? jsonMsg.get("messageText").getAsString() : "";
            Integer orderId = jsonMsg.has("orderId") && !jsonMsg.get("orderId").isJsonNull() ? jsonMsg.get("orderId").getAsInt() : null;
            Integer applicationId = jsonMsg.has("applicationId") && !jsonMsg.get("applicationId").isJsonNull() ? jsonMsg.get("applicationId").getAsInt() : null;

            if (rawText.trim().isEmpty() || (orderId == null) == (applicationId == null)) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Message text and exactly one chat target are required.\"}");
                return;
            }

            // Sanitize and validate length
            String sanitizedText = SanitizationUtils.escapeHtml(rawText);
            if (!SanitizationUtils.validateLength(sanitizedText, 1000)) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Message exceeds maximum length of 1000 characters.\"}");
                return;
            }

            Transaction tx = null;
            try (Session dbSession = DBUtils.openSession()) {
                String type = orderId != null ? "order" : "application";
                int targetId = orderId != null ? orderId : applicationId;
                ChatAccess access = ChatAuthorizationService.authorize(
                        dbSession, user.getUserID(), type, targetId);
                if (access == null) {
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().write("{\"error\":\"You are not authorized to access this chat.\"}");
                    return;
                }
                ChatMessage chatMsg = new ChatMessage(
                    orderId,
                    applicationId,
                    user.getUserID(),
                    access.user().getUserName(),
                    access.receiverId(),
                    sanitizedText,
                    new Date()
                );
                tx = dbSession.beginTransaction();
                dbSession.persist(chatMsg);
                tx.commit();
                resp.setStatus(HttpServletResponse.SC_CREATED);
                resp.getWriter().write(gson.toJson(chatMsg));
            } catch (Exception e) {
                if (tx != null && tx.isActive()) tx.rollback();
                throw e;
            }

        } catch (IllegalArgumentException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Invalid chat request.\"}");
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

        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in.\"}");
            return;
        }

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
                if (tx != null && tx.isActive()) tx.rollback();
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
