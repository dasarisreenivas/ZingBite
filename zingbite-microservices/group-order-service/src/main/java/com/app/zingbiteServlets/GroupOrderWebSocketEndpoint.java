package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import jakarta.websocket.*;
import jakarta.websocket.CloseReason.CloseCodes;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.GroupOrderManager;
import com.app.zingbiteutils.GroupOrderManager.GroupRoom;
import com.google.gson.*;

@ServerEndpoint(value = "/api/ws/group-order/{roomId}/{userId}", configurator = com.app.zingbiteutils.GetHttpSessionConfigurator.class)
@Component
public class GroupOrderWebSocketEndpoint {

    private static final Logger LOGGER = LoggerFactory.getLogger(GroupOrderWebSocketEndpoint.class);

    private static final Map<String, Set<jakarta.websocket.Session>> roomSessions = new ConcurrentHashMap<>();
    private static final Gson gson = new Gson();

    @OnOpen
    public void onOpen(
        jakarta.websocket.Session session,
        @PathParam("roomId") int roomId,
        @PathParam("userId") int userId
    ) throws IOException {
        LOGGER.info("[GroupWS] Connection attempt: roomId=" + roomId + ", userId=" + userId);

        HttpSession httpSession = (HttpSession) session.getUserProperties().get("httpSession");
        if (httpSession == null) {
            session.close(new CloseReason(CloseCodes.VIOLATED_POLICY, "Unauthorized: Active HTTP session is required."));
            return;
        }

        User loggedInUser = (User) httpSession.getAttribute("loggedInUser");
        if (loggedInUser == null || loggedInUser.getUserID() != userId) {
            session.close(new CloseReason(CloseCodes.VIOLATED_POLICY, "Unauthorized: Session user mismatch."));
            return;
        }

        GroupRoom room = GroupOrderManager.getRoomById(roomId);
        if (room == null || !room.isActive || !room.participants.contains(userId)) {
            session.close(new CloseReason(CloseCodes.VIOLATED_POLICY, "Unauthorized: Not a participant in this room."));
            return;
        }

        String roomKey = String.valueOf(roomId);
        roomSessions.computeIfAbsent(roomKey, k -> new CopyOnWriteArraySet<>()).add(session);
        LOGGER.info("[GroupWS] Client connected successfully: userId=" + userId + ", room=" + roomId);
    }

    @OnClose
    public void onClose(
        jakarta.websocket.Session session,
        @PathParam("roomId") int roomId,
        @PathParam("userId") int userId
    ) {
        String roomKey = String.valueOf(roomId);
        Set<jakarta.websocket.Session> sessions = roomSessions.get(roomKey);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                roomSessions.remove(roomKey);
            }
        }
        LOGGER.info("[GroupWS] Client disconnected: userId=" + userId + ", room=" + roomId);
    }

    @OnError
    public void onError(Throwable t) {
        LOGGER.warn("[GroupWS] WebSocket error: " + t.getMessage());
        LOGGER.error("Unexpected error", t);
    }

    @OnMessage
    public void onMessage(
        String message,
        jakarta.websocket.Session session,
        @PathParam("roomId") int roomId,
        @PathParam("userId") int userId
    ) throws IOException {
        LOGGER.info("[GroupWS] Message received from userId=" + userId + ": " + message);

        GroupRoom room = GroupOrderManager.getRoomById(roomId);
        if (room == null || !room.isActive) {
            return;
        }

        JsonObject msgJson;
        try {
            msgJson = JsonParser.parseString(message).getAsJsonObject();
        } catch (Exception e) {
            return;
        }

        String action = msgJson.has("action") ? msgJson.get("action").getAsString() : "";
        Map<Integer, Integer> userCart = room.userCarts.computeIfAbsent(userId, k -> new ConcurrentHashMap<>());

        if ("addItem".equals(action)) {
            int menuId = msgJson.get("menuId").getAsInt();
            int quantity = msgJson.get("quantity").getAsInt();
            userCart.put(menuId, userCart.getOrDefault(menuId, 0) + quantity);
        } else if ("updateQuantity".equals(action)) {
            int menuId = msgJson.get("menuId").getAsInt();
            int quantity = msgJson.get("quantity").getAsInt();
            if (quantity <= 0) {
                userCart.remove(menuId);
            } else {
                userCart.put(menuId, quantity);
            }
        } else if ("removeItem".equals(action)) {
            int menuId = msgJson.get("menuId").getAsInt();
            userCart.remove(menuId);
        }

        // Broadcast updated cart to all sessions in the room
        broadcastCartUpdate(roomId);
    }

    private void broadcastCartUpdate(int roomId) {
        GroupRoom room = GroupOrderManager.getRoomById(roomId);
        if (room == null) return;

        JsonArray itemsArray = new JsonArray();
        try (Session dbSession = DBUtils.openSession()) {
            for (Map.Entry<Integer, Map<Integer, Integer>> entry : room.userCarts.entrySet()) {
                int userId = entry.getKey();
                Map<Integer, Integer> cart = entry.getValue();

                User u = dbSession.get(User.class, userId);
                String username = (u != null) ? u.getUserName() : "User";

                for (Map.Entry<Integer, Integer> item : cart.entrySet()) {
                    int menuId = item.getKey();
                    int qty = item.getValue();
                    Menu menu = dbSession.get(Menu.class, menuId);
                    if (menu != null) {
                        JsonObject io = new JsonObject();
                        io.addProperty("menuId", menuId);
                        io.addProperty("itemId", menuId); // cover both menuId and itemId
                        io.addProperty("itemName", menu.getMenuName());
                        io.addProperty("menuName", menu.getMenuName());
                        io.addProperty("price", menu.getPrice());
                        io.addProperty("quantity", qty);
                        io.addProperty("userId", userId);
                        io.addProperty("userName", username);
                        itemsArray.add(io);
                    }
                }
            }
        }

        JsonObject updateJson = new JsonObject();
        updateJson.addProperty("type", "cart_update");
        updateJson.add("items", itemsArray);

        String messageText = updateJson.toString();
        String roomKey = String.valueOf(roomId);
        Set<jakarta.websocket.Session> sessions = roomSessions.get(roomKey);

        if (sessions != null) {
            for (jakarta.websocket.Session s : sessions) {
                if (s.isOpen()) {
                    try {
                        s.getBasicRemote().sendText(messageText);
                    } catch (IOException e) {
                        LOGGER.warn("[GroupWS] Failed to broadcast to session: " + e.getMessage());
                    }
                }
            }
        }
    }
}