"package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CopyOnWriteArraySet;
import jakarta.websocket.CloseReason;
import jakarta.websocket.CloseReason.CloseCodes;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
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
    private static final Map<String, Set<Session>> roomSessions = new ConcurrentHashMap<>();
    private static final Gson gson = new Gson();

    @OnOpen
    public void onOpen(
        Session session,
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
     
<truncated 8247 bytes>