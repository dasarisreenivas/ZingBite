package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.stereotype.Component;
import com.app.chat.ChatAuthorizationService;
import com.app.chat.ChatAuthorizationService.ChatAccess;
import com.app.zingbitemodels.ChatMessage;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@ServerEndpoint(value = "/api/ws/chat/{type}/{targetId}/{userId}", configurator = com.app.zingbiteutils.GetHttpSessionConfigurator.class)
@Component
public class ChatWebSocketEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChatWebSocketEndpoint.class);

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

        LOGGER.info("[WebSocket] Connection attempt: type=" + type + ", targetId=" + targetId + ", userId=" + userId);

        // 1. HTTP Session and Authorization Validation
        String senderName = "User";

        jakarta.servlet.http.HttpSession httpSession = (jakarta.servlet.http.HttpSession) session.getUserProperties().get("httpSession");
        if (httpSession == null) {
            LOGGER.info("[WebSocket] Connection rejected: No active HTTP session for userId=" + userId);
            session.close(new CloseReason(CloseCodes.VIOLATED_POLICY, "Unauthorized: Active HTTP session is required."));
            return;
        }

        User loggedInUser = (User) httpSession.getAttribute("loggedInUser");
        if (loggedInUser == null || loggedInUser.getUserID() != userId) {
            LOGGER.info("[WebSocket] Connection rejected: Session user does not match path userId=" + userId);
            session.close(new CloseReason(CloseCodes.VIOLATED_POLICY, "Unauthorized: Session user mismatch."));
            return;
        }

        try (org.hibernate.Session dbSession = DBUtils.openSession()) {
            ChatAccess access = ChatAuthorizationService.authorize(dbSession, userId, type, targetId);
            if (access == null) {
                session.close(new CloseReason(
                        CloseCodes.VIOLATED_POLICY,
                        "Unauthorized: You do not have permission to access this chat."));
                return;
            }
            senderName = access.user().getUserName();
            try {
                httpSession.setAttribute("loggedInUser", access.user());
            } catch (IllegalStateException ignored) {
                session.close(new CloseReason(CloseCodes.VIOLATED_POLICY, "Session expired."));
                return;
            }
        } catch (Exception e) {
            LOGGER.warn("[WebSocket] Authorization check error: " + e.getMessage());
            LOGGER.error("Unexpected error", e);
            session.close(new CloseReason(CloseCodes.UNEXPECTED_CONDITION, "Authorization check failed."));
            return;
        }

        // 2. Register the session in the room
        String roomKey = type + ":" + targetId;
        roomSessions.computeIfAbsent(roomKey, k -> new CopyOnWriteArraySet<>()).add(session);

        session.getUserProperties().put("userId", userId);
        session.getUserProperties().put("userName", senderName);
        session.getUserProperties().put("type", type);
        session.getUserProperties().put("targetId", targetId);

        LOGGER.info("[WebSocket] User '" + senderName + "' (ID: " + userId + ") joined room: " + roomKey);
    }

    @OnMessage
    public void onMessage(String message, jakarta.websocket.Session session) {
        try {
            int userId = (int) session.getUserProperties().get("userId");
            String type = (String) session.getUserProperties().get("type");
            int targetId = (int) session.getUserProperties().get("targetId");

            // Parse the incoming JSON message
            JsonObject jsonMsg = JsonParser.parseString(message).getAsJsonObject();
            String rawText = jsonMsg.has("messageText") ? jsonMsg.get("messageText").getAsString() : "";
            if (rawText.trim().isEmpty()) {
                session.getAsyncRemote().sendText("{\"error\":\"Message text cannot be empty.\"}");
                return;
            }

            // Sanitize message text to prevent XSS
            String sanitizedText = SanitizationUtils.escapeHtml(rawText);

            // Validate message length
            if (!SanitizationUtils.validateLength(sanitizedText, 1000)) {
                session.getAsyncRemote().sendText("{\"error\":\"Message exceeds maximum length of 1000 characters.\"}");
                return;
            }

            ChatMessage chatMsg;
            Transaction tx = null;
            try (org.hibernate.Session dbSession = DBUtils.openSession()) {
                ChatAccess access = ChatAuthorizationService.authorize(
                        dbSession, userId, type, targetId);
                if (access == null) {
                    session.close(new CloseReason(
                            CloseCodes.VIOLATED_POLICY,
                            "Chat authorization is no longer valid."));
                    return;
                }
                chatMsg = new ChatMessage(
                    "order".equalsIgnoreCase(type) ? targetId : null,
                    "application".equalsIgnoreCase(type) ? targetId : null,
                    userId,
                    access.user().getUserName(),
                    access.receiverId(),
                    sanitizedText,
                    new Date()
                );
                tx = dbSession.beginTransaction();
                dbSession.persist(chatMsg);
                tx.commit();
            } catch (Exception e) {
                if (tx != null && tx.isActive()) tx.rollback();
                LOGGER.warn("[WebSocket] Failed to persist message: " + e.getMessage());
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
            LOGGER.warn("[WebSocket] Error processing message: " + e.getMessage());
            LOGGER.error("Unexpected error", e);
        }
    }

    /**
     * Broadcasts a JSON message to all active WebSocket sessions in a room.
     * Called by ChatServlet when a message is sent via REST fallback so that
     * other connected clients receive the message in real-time.
     */
    public static void broadcastToRoom(String type, int targetId, String jsonMessage) {
        String roomKey = type + ":" + targetId;
        Set<jakarta.websocket.Session> sessions = roomSessions.get(roomKey);
        if (sessions != null) {
            for (jakarta.websocket.Session s : sessions) {
                if (s.isOpen()) {
                    s.getAsyncRemote().sendText(jsonMessage);
                }
            }
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
            LOGGER.info("[WebSocket] User ID " + userId + " left room: " + roomKey + " (" + reason.getReasonPhrase() + ")");
        }
    }

    @OnError
    public void onError(jakarta.websocket.Session session, Throwable throwable) {
        LOGGER.warn("[WebSocket] Error on session: " + throwable.getMessage());
        LOGGER.error("Unexpected error", throwable);
    }
}
