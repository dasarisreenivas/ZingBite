package com.app.zingbiteServlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import org.hibernate.Session;
import org.hibernate.Transaction;
import com.app.zingbitemodels.*;
import com.app.zingbiteutils.*;
import com.app.zingbiteutils.GroupOrderManager.GroupRoom;
import com.google.gson.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

@WebServlet("/api/group-order/*")
public class GroupOrderServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();
        if ("/details".equals(pathInfo)) {
            getRoomDetails(req, resp);
        } else if ("/bill".equals(pathInfo)) {
            getSplitBill(req, resp);
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Endpoint not found\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();
        if ("/create".equals(pathInfo)) {
            createRoom(req, resp);
        } else if ("/join".equals(pathInfo)) {
            joinRoom(req, resp);
        } else if ("/checkout".equals(pathInfo)) {
            checkoutRoom(req, resp);
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Endpoint not found\"}");
        }
    }

    private void createRoom(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession();
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"User must be logged in to create a room\"}");
            return;
        }

        JsonObject body = parseJsonBody(req);
        if (body == null || !body.has("restaurantId")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing restaurantId\"}");
            return;
        }

        int restaurantId = body.get("restaurantId").getAsInt();
        GroupRoom room = GroupOrderManager.createRoom(restaurantId, user.getUserID());

        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("roomCode", room.roomCode);
        responseJson.addProperty("roomId", room.roomId);
        responseJson.addProperty("success", true);
        resp.getWriter().write(responseJson.toString());
    }

    private void joinRoom(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession();
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        JsonObject body = parseJsonBody(req);
        if (body == null || !body.has("roomCode")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing roomCode\"}");
            return;
        }

        String roomCode = body.get("roomCode").getAsString();
        GroupRoom room = GroupOrderManager.getRoomByCode(roomCode);
        if (room == null || !room.isActive) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Room not found or inactive\"}");
            return;
        }

        room.participants.add(user.getUserID());
        room.userCarts.putIfAbsent(user.getUserID(), new java.util.concurrent.ConcurrentHashMap<>());

        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", true);
        responseJson.addProperty("roomId", room.roomId);
        responseJson.addProperty("restaurantId", room.restaurantId);
        resp.getWriter().write(responseJson.toString());
    }

    private void getRoomDetails(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String roomIdStr = req.getParameter("roomId");
        if (roomIdStr == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing roomId\"}");
            return;
        }

        int roomId = Integer.parseInt(roomIdStr);
        GroupRoom room = GroupOrderManager.getRoomById(roomId);
        if (room == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Room not found\"}");
            return;
        }

        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("roomId", room.roomId);
        responseJson.addProperty("roomCode", room.roomCode);
        responseJson.addProperty("restaurantId", room.restaurantId);
        responseJson.addProperty("hostId", room.hostId);

        JsonArray participantsArray = new JsonArray();
        try (Session dbSession = DBUtils.openSession()) {
            for (int userId : room.participants) {
                User u = dbSession.get(User.class, userId);
                if (u != null) {
                    JsonObject p = new JsonObject();
                    p.addProperty("userId", u.getUserID());
                    p.addProperty("username", u.getUserName());
                    participantsArray.add(p);
                }
            }
        }

        responseJson.add("participants", participantsArray);
        resp.getWriter().write(responseJson.toString());
    }

    private void getSplitBill(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String roomIdStr = req.getParameter("roomId");
        if (roomIdStr == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing roomId\"}");
            return;
        }

        int roomId = Integer.parseInt(roomIdStr);
        GroupRoom room = GroupOrderManager.getRoomById(roomId);
        if (room == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Room not found\"}");
            return;
        }

        double total = 0.0;
        JsonArray splitsArray = new JsonArray();

        try (Session dbSession = DBUtils.openSession()) {
            for (Map.Entry<Integer, Map<Integer, Integer>> entry : room.userCarts.entrySet()) {
                int userId = entry.getKey();
                Map<Integer, Integer> cartItems = entry.getValue();

                double userSubtotal = 0.0;
                JsonArray itemsArray = new JsonArray();
                for (Map.Entry<Integer, Integer> item : cartItems.entrySet()) {
                    int menuId = item.getKey();
                    int qty = item.getValue();
                    Menu menu = dbSession.get(Menu.class, menuId);
                    if (menu != null) {
                        double itemTotal = menu.getPrice() * qty;
                        userSubtotal += itemTotal;

                        JsonObject io = new JsonObject();
                        io.addProperty("menuId", menuId);
                        io.addProperty("menuName", menu.getMenuName());
                        io.addProperty("price", menu.getPrice());
                        io.addProperty("quantity", qty);
                        io.addProperty("total", itemTotal);
                        itemsArray.add(io);
                    }
                }

                User u = dbSession.get(User.class, userId);
                String username = (u != null) ? u.getUserName() : "User";

                JsonObject split = new JsonObject();
                split.addProperty("userId", userId);
                split.addProperty("userName", username);
                split.addProperty("amount", userSubtotal);
                split.add("items", itemsArray);
                splitsArray.add(split);

                total += userSubtotal;
            }
        }

        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("total", total);
        responseJson.add("splits", splitsArray);
        resp.getWriter().write(responseJson.toString());
    }

    private void checkoutRoom(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        HttpSession session = req.getSession();
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        JsonObject body = parseJsonBody(req);
        if (body == null || !body.has("roomId")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing roomId\"}");
            return;
        }

        int roomId = body.get("roomId").getAsInt();
        GroupRoom room = GroupOrderManager.getRoomById(roomId);
        if (room == null || !room.isActive) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Room not found or inactive\"}");
            return;
        }

        if (room.hostId != user.getUserID()) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Only the host can checkout\"}");
            return;
        }

        String paymentMethod = body.has("paymentMethod") ? body.get("paymentMethod").getAsString() : "UPI";

        // Aggregate all items in group cart
        Map<Integer, Integer> combinedCart = new HashMap<>();
        for (Map<Integer, Integer> userCart : room.userCarts.values()) {
            for (Map.Entry<Integer, Integer> item : userCart.entrySet()) {
                combinedCart.put(item.getKey(), combinedCart.getOrDefault(item.getKey(), 0) + item.getValue());
            }
        }



        int orderId = 0;
        try (Session dbSession = DBUtils.openSession()) {
            Transaction tx = dbSession.beginTransaction();

            Restaurant restaurant = dbSession.get(Restaurant.class, room.restaurantId);
            if (restaurant == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Invalid restaurant\"}");
                return;
            }

            double subtotal = 0.0;
            for (Map.Entry<Integer, Integer> item : combinedCart.entrySet()) {
                Menu menu = dbSession.get(Menu.class, item.getKey());
                if (menu != null) {
                    subtotal += menu.getPrice() * item.getValue();
                }
            }

            double surgeMultiplier = 1.0;
            String surgeReason = "Normal";
            Object sessionSurge = session.getAttribute("surgeMultiplier");
            if (sessionSurge != null && sessionSurge instanceof Number) {
                surgeMultiplier = ((Number) sessionSurge).doubleValue();
            }
            Object sessionReason = session.getAttribute("surgeReason");
            if (sessionReason != null) {
                surgeReason = sessionReason.toString();
            }

            CartPricingUtils.Totals calculatedTotals = CartPricingUtils.calculateTotals(subtotal, "", surgeMultiplier);
            double total = calculatedTotals.total;

            Orders order = new Orders();
            order.setUserId(user.getUserID());
            order.setRestaurantId(restaurant);
            order.setOrderTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
            order.setTotalAmount((float) total);
            order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
            order.setPaymentMethod(paymentMethod);
            order.setStatusUpdatedAt(new Date());
            order.setSurgeMultiplier((float) surgeMultiplier);
            order.setSurgeFee(calculatedTotals.surgeFee);
            order.setSurgeReason(surgeReason);

            dbSession.persist(order);
            dbSession.flush();
            orderId = order.getOrderId();

            for (Map.Entry<Integer, Integer> item : combinedCart.entrySet()) {
                Menu menu = dbSession.get(Menu.class, item.getKey());
                if (menu != null) {
                    OrderItem orderItem = new OrderItem(orderId, item.getKey(), item.getValue(), menu.getPrice() * item.getValue());
                    dbSession.persist(orderItem);
                }
            }

            OrderHistory orderHistory = new OrderHistory();
            orderHistory.setOrderId(orderId);
            orderHistory.setUserID(user.getUserID());
            orderHistory.setOrderDate(new Date());
            orderHistory.setTotalAmount(total);
            orderHistory.setOrderStatus("Pending Payment");
            dbSession.persist(orderHistory);

            com.app.zingbitemodels.Payment payment = new com.app.zingbitemodels.Payment(orderId, total, paymentMethod);
            payment.setStatus("PENDING");
            dbSession.persist(payment);

            tx.commit();
        }

        room.isActive = false;
        GroupOrderManager.removeRoom(roomId);

        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("success", true);
        responseJson.addProperty("orderId", "ZB-" + orderId);
        resp.getWriter().write(responseJson.toString());
    }

    private JsonObject parseJsonBody(HttpServletRequest req) {
        try {
            StringBuilder sb = new StringBuilder();
            String line;
            try (BufferedReader reader = req.getReader()) {
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
            }
            return JsonParser.parseString(sb.toString()).getAsJsonObject();
        } catch (Exception e) {
            return null;
        }
    }
}