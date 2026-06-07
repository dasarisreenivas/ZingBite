package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import jakarta.websocket.CloseReason;
import jakarta.websocket.CloseReason.CloseCodes;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;

import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.hibernate.Transaction;
import com.app.zingbitemodels.Application;
import com.app.zingbitemodels.ChatMessage;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@ServerEndpoint(value = "/api/ws/chat/{type}/{targetId}/{userId}")
public class ChatWebSocketEndpoint {

    // Keep track of active session sets grouped by room key "type:targetId"
    private static final Map<String, Set<jakarta.websocket.Session>> roomSessions = new ConcurrentHashMap<>();
    private static final Gson gson = new Gson();

    @OnOpen
    public void onOpen(
        jakarta.websocket.Session session,
        @PathParam("type") String type,
        @PathParam("targetId") int targetId,
        @PathParam("userId") int userId
    ) throws IOException {

        System.out.println("[WebSocket] Connection attempt: type=" + type + ", targetId=" + targetId + ", userId=" + userId);

        // 1. Authorization Validation
        boolean authorized = false;
        String senderName = "User";
        int receiverId = 0;

        try (org.hibernate.Session dbSession = DBUtils.openSession()) {
            User userObj = dbSession.get(User.class, userId);
            if (userObj != null) {
                senderName = userObj.getUserName();

                if ("order".equalsIgnoreCase(type)) {
                    Orders order = dbSession.get(Orders.class, targetId);
                    if (order != null) {
                        // Allow customer who placed the order, delivery riders, restaurant admins, and super admins
                        if (userObj.getUserID() == order.getUserId() ||
                            "super_admin".equalsIgnoreCase(userObj.getRole()) ||
                            "restaurant_admin".equalsIgnoreCase(userObj.getRole()) ||
                            "delivery_partner".equalsIgnoreCase(userObj.getRole())) {
                            authorized = true;
                        }
                    }
                } else if ("application".equalsIgnoreCase(type)) {
                    Application app = dbSession.get(Application.class, targetId);
                    if (app != null) {
                        if (app.getUserId() == userId || "super_admin".equalsIgnoreCase(userObj.getRole())) {
                            authorized = true;
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("[WebSocket] Authorization check error: " + e.getMessage());
            e.printStackTrace();
        }

        if (!authorized) {
            System.out.println("[WebSocket] Unauthorized connection rejected for userId=" + userId);
            session.close(new CloseReason(CloseCodes.VIOLATED_POLICY, "Unauthorized: You do not have permission to access this chat."));
            return;
        }

        // 2. Register the session in the room
        String roomKey = type + ":" + targetId;
        roomSessions.computeIfAbsent(roomKey, k -> new CopyOnWriteArraySet<>()).add(session);

        session.getUserProperties().put("userId", userId);
        session.getUserProperties().put("userName", senderName);
        session.getUserProperties().put("type", type);
        session.getUserProperties().put("targetId", targetId);

        System.out.println("[WebSocket] User '" + senderName + "' (ID: " + userId + ") joined room: " + roomKey);
    }

    @OnMessage
    public void onMessage(String message, jakarta.websocket.Session session) {
        try {
            int userId = (int) session.getUserProperties().get("userId");
            String senderName = (String) session.getUserProperties().get("userName");
            String type = (String) session.getUserProperties().get("type");
            int targetId = (int) session.getUserProperties().get("targetId");

            // Parse the incoming JSON message
            JsonObject jsonMsg = JsonParser.parseString(message).getAsJsonObject();
            String rawText = jsonMsg.get("messageText").getAsString();
            int receiverId = jsonMsg.has("receiverId") ? jsonMsg.get("receiverId").getAsInt() : 0;

            // Sanitize message text to prevent XSS
            String sanitizedText = SanitizationUtils.escapeHtml(rawText);

            // Validate message length
            if (!SanitizationUtils.validateLength(sanitizedText, 1000)) {
                session.getAsyncRemote().sendText("{\"error\":\"Message exceeds maximum length of 1000 characters.\"}");
                return;
            }

            // Build and persist the ChatMessage entity
            ChatMessage chatMsg = new ChatMessage(
                "order".equalsIgnoreCase(type) ? targetId : null,
                "application".equalsIgnoreCase(type) ? targetId : null,
                userId,
                senderName,
                receiverId,
                sanitizedText,
                new Date()
            );

            Transaction tx = null;
            try (org.hibernate.Session dbSession = DBUtils.openSession()) {
                tx = dbSession.beginTransaction();
                dbSession.persist(chatMsg);
                tx.commit();
            } catch (Exception e) {
                if (tx != null) tx.rollback();
                System.err.println("[WebSocket] Failed to persist message: " + e.getMessage());
                throw e;
            }

            // Broadcast the message to all sessions in the same room
            String roomKey = type + ":" + targetId;
            Set<jakarta.websocket.Session> activeSessions = roomSessions.get(roomKey);
            if (activeSessions != null) {
                String outboundJson = gson.toJson(chatMsg);
                for (jakarta.websocket.Session s : activeSessions) {
                    if (s.isOpen()) {
                        s.getAsyncRemote().sendText(outboundJson);
                    }
                }
            }

        } catch (Exception e) {
            System.err.println("[WebSocket] Error processing message: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(jakarta.websocket.Session session, CloseReason reason) {
        String type = (String) session.getUserProperties().get("type");
        Integer targetId = (Integer) session.getUserProperties().get("targetId");
        Integer userId = (Integer) session.getUserProperties().get("userId");

        if (type != null && targetId != null) {
            String roomKey = type + ":" + targetId;
            Set<jakarta.websocket.Session> activeSessions = roomSessions.get(roomKey);
            if (activeSessions != null) {
                activeSessions.remove(session);
                if (activeSessions.isEmpty()) {
                    roomSessions.remove(roomKey);
                }
            }
            System.out.println("[WebSocket] User ID " + userId + " left room: " + roomKey + " (" + reason.getReasonPhrase() + ")");
        }
    }

    @OnError
    public void onError(jakarta.websocket.Session session, Throwable throwable) {
        System.err.println("[WebSocket] Error on session: " + throwable.getMessage());
        throwable.printStackTrace();
    }
}