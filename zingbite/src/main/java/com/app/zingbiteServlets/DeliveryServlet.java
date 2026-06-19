package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitedao.OrdersDAo;
import com.app.zingbitedaoimpl.OrdersDAOImplementation;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.OrderHistory;
import com.app.zingbitemodels.OrderItem;
import com.app.zingbitemodels.OrderStatus;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.GeoUtils;
import com.app.zingbiteutils.RouteOptimizer;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/delivery")
public class DeliveryServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final int DEFAULT_PAGE_SIZE = 50;
    private static final int MAX_PAGE_SIZE = 200;

    private static final Map<String, VrpPathCacheEntry> vrpPathCache = new ConcurrentHashMap<>();
    private static final long VRP_CACHE_TTL_MS = 30_000;

    private static class VrpPathCacheEntry {
        final JsonObject paths;
        final long timestamp;
        VrpPathCacheEntry(JsonObject paths) {
            this.paths = paths;
            this.timestamp = System.currentTimeMillis();
        }
        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > VRP_CACHE_TTL_MS;
        }
    }

    static void clearVrpPathCache() {
        vrpPathCache.clear();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession httpSession = req.getSession(false);
        if (httpSession == null || httpSession.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        User user = (User) httpSession.getAttribute("loggedInUser");
        if (!"delivery_partner".equals(user.getRole())) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only delivery partners can access this resource.\"}");
            return;
        }

        int page = 1;
        int pageSize = DEFAULT_PAGE_SIZE;
        try {
            if (req.getParameter("page") != null) page = Math.max(1, Integer.parseInt(req.getParameter("page")));
            if (req.getParameter("pageSize") != null) pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, Integer.parseInt(req.getParameter("pageSize"))));
        } catch (NumberFormatException ignored) {}

        int offset = (page - 1) * pageSize;

        int riderId = user.getUserID();
        double riderLat = GeoUtils.getRiderLatitude(riderId);
        double riderLon = GeoUtils.getRiderLongitude(riderId);

        JsonArray availableRuns = new JsonArray();
        JsonArray activeDeliveries = new JsonArray();
        JsonArray completedDeliveries = new JsonArray();
        int totalEarnings = 0;
        java.util.Map<String, Double> dailyEarningsMap = new java.util.LinkedHashMap<>();
        java.util.Map<String, Double> weeklyEarningsMap = new java.util.LinkedHashMap<>();
        java.text.SimpleDateFormat dayFormatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
        java.text.SimpleDateFormat weekFormatter = new java.text.SimpleDateFormat("yyyy-'W'ww");

        List<JsonObject> availableList = new ArrayList<>();
        List<JsonObject> activeList = new ArrayList<>();

        try (Session hibernateSession = DBUtils.openSession()) {
            String countHql = "select count(o) from Orders o where o.orderStatus != :pendingStatus";
            Query<Long> countQuery = hibernateSession.createQuery(countHql, Long.class);
            countQuery.setParameter("pendingStatus", OrderStatus.PENDING_PAYMENT);
            long totalOrders = countQuery.uniqueResult();

            String hql = "from Orders o where o.orderStatus != :pendingStatus order by o.orderId desc";
            Query<Orders> query = hibernateSession.createQuery(hql, Orders.class);
            query.setParameter("pendingStatus", OrderStatus.PENDING_PAYMENT);
            query.setFirstResult(offset);
            query.setMaxResults(pageSize);
            List<Orders> ordersList = query.list();

            Map<Integer, User> userCache = new ConcurrentHashMap<>();

            for (Orders o : ordersList) {
                JsonObject oJson = new JsonObject();
                oJson.addProperty("orderId", o.getOrderId());
                oJson.addProperty("formattedId", "ZB-" + o.getOrderId());
                oJson.addProperty("restaurantName", o.getRestaurantId() != null ? o.getRestaurantId().getRestaurantName() : "ZingBite Hotspot");
                oJson.addProperty("total", o.getTotalAmount());
                oJson.addProperty("status", o.getOrderStatus() != null ? o.getOrderStatus().name() : "PLACED");
                oJson.addProperty("payment", o.getPaymentMethod() != null ? o.getPaymentMethod() : "UPI");

                User customer = userCache.computeIfAbsent(o.getUserId(), id -> hibernateSession.get(User.class, id));
                oJson.addProperty("customerId", o.getUserId());
                oJson.addProperty("customerName", customer != null ? customer.getUserName() : "Customer");
                oJson.addProperty("customerAddress", customer != null ? customer.getAddress() : "ZingBite Hub");
                oJson.addProperty("customerPhone", customer != null ? String.valueOf(customer.getPhoneNumber()) : "");

                int rId = o.getRestaurantId() != null ? o.getRestaurantId().getRestaurantId() : 0;
                double restLat = GeoUtils.getRestaurantLatitudeCached(rId);
                double restLon = GeoUtils.getRestaurantLongitudeCached(rId);
                double custLat = GeoUtils.getUserLatitudeCached(o.getUserId());
                double custLon = GeoUtils.getUserLongitudeCached(o.getUserId());
                double dist = GeoUtils.haversine(riderLat, riderLon, restLat, restLon);
                oJson.addProperty("distance", Math.round(dist * 10.0) / 10.0);

                oJson.addProperty("restaurantLat", restLat);
                oJson.addProperty("restaurantLon", restLon);
                oJson.addProperty("customerLat", custLat);
                oJson.addProperty("customerLon", custLon);
                oJson.addProperty("riderLat", riderLat);
                oJson.addProperty("riderLon", riderLon);

                if (o.getRiderId() == null) {
                    OrderStatus status = o.getOrderStatus();
                    if (status == OrderStatus.PLACED ||
                        status == OrderStatus.PREPARING ||
                        status == OrderStatus.READY_FOR_PICKUP ||
                        status == OrderStatus.OUT_FOR_DELIVERY) {
                        availableList.add(oJson);
                    }
                } else if (o.getRiderId() == riderId) {
                    if (o.getOrderStatus() == OrderStatus.DELIVERED) {
                        // Detailed commission breakdown
                        JsonObject breakdown = new JsonObject();
                        breakdown.addProperty("baseFare", 30.0);
                        breakdown.addProperty("distanceIncentive", 10.0);
                        breakdown.addProperty("surgeIncentive", 5.0);
                        breakdown.addProperty("totalCommission", 45.0);
                        oJson.add("payoutBreakdown", breakdown);

                        java.util.Date completedDate = o.getStatusUpdatedAt() != null ? o.getStatusUpdatedAt() : new java.util.Date();
                        String dayStr = dayFormatter.format(completedDate);
                        String weekStr = weekFormatter.format(completedDate);
                        oJson.addProperty("completedAt", dayStr);

                        dailyEarningsMap.put(dayStr, dailyEarningsMap.getOrDefault(dayStr, 0.0) + 45.0);
                        weeklyEarningsMap.put(weekStr, weeklyEarningsMap.getOrDefault(weekStr, 0.0) + 45.0);

                        completedDeliveries.add(oJson);
                        totalEarnings += 45;
                    } else {
                        double currentGps = o.getGpsProgress() != null ? o.getGpsProgress() : 0.0;
                        oJson.addProperty("gpsProgress", currentGps);
                        if (o.getGpsCoordinates() != null) {
                            oJson.addProperty("gpsCoordinates", o.getGpsCoordinates());
                        }
                        try {
                            double rLat = riderLat;
                            double rLon = riderLon;
                            if (o.getGpsCoordinates() != null) {
                                String coords = o.getGpsCoordinates();
                                String[] parts = coords.split(",");
                                if (parts.length == 2) {
                                    try {
                                        rLat = Double.parseDouble(parts[0]);
                                        rLon = Double.parseDouble(parts[1]);
                                    } catch (Exception ex) {}
                                }
                            }

                            String cacheKey = rLat + "," + rLon + "," + restLat + "," + restLon + "," + custLat + "," + custLon;
                            VrpPathCacheEntry cached = vrpPathCache.get(cacheKey);
                            if (cached != null && !cached.isExpired()) {
                                oJson.add("pathFM", cached.paths.get("pathFM"));
                                oJson.add("pathLM1", cached.paths.get("pathLM1"));
                            } else {
                                java.util.Map<String, List<com.app.zingbiteutils.VRPRouteOptimizer.Node>> vrpPaths =
                                    com.app.zingbiteutils.VRPRouteOptimizer.getVRPPathsForOrder(
                                        rLat, rLon,
                                        restLat, restLon,
                                        custLat, custLon
                                    );
                                Gson sseGson = new Gson();
                                JsonObject pathCacheObj = new JsonObject();
                                pathCacheObj.add("pathFM", sseGson.toJsonTree(vrpPaths.get("pathFM")));
                                pathCacheObj.add("pathLM1", sseGson.toJsonTree(vrpPaths.get("pathLM1")));
                                vrpPathCache.put(cacheKey, new VrpPathCacheEntry(pathCacheObj));
                                oJson.add("pathFM", pathCacheObj.get("pathFM"));
                                oJson.add("pathLM1", pathCacheObj.get("pathLM1"));
                            }
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }
                        activeList.add(oJson);
                    }
                }
            }

            availableList.sort((a, b) -> Double.compare(a.get("distance").getAsDouble(), b.get("distance").getAsDouble()));
            for (JsonObject run : availableList) {
                availableRuns.add(run);
            }

            if (activeList.size() > 1) {
                List<RouteOptimizer.Location> locations = new ArrayList<>();
                for (int i = 0; i < activeList.size(); i++) {
                    JsonObject act = activeList.get(i);
                    int oId = act.get("orderId").getAsInt();
                    double cLat = act.get("customerLat").getAsDouble();
                    double cLon = act.get("customerLon").getAsDouble();
                    locations.add(new RouteOptimizer.Location(i, cLat, cLon, act.get("customerName").getAsString()));
                }
                int[] optSequence = RouteOptimizer.optimizeRoute(riderLat, riderLon, locations);
                for (int idx : optSequence) {
                    activeDeliveries.add(activeList.get(idx));
                }
            } else {
                for (JsonObject act : activeList) {
                    activeDeliveries.add(act);
                }
            }

            JsonObject dailyEarningsJson = new JsonObject();
            for (java.util.Map.Entry<String, Double> entry : dailyEarningsMap.entrySet()) {
                dailyEarningsJson.addProperty(entry.getKey(), entry.getValue());
            }

            JsonObject weeklyEarningsJson = new JsonObject();
            for (java.util.Map.Entry<String, Double> entry : weeklyEarningsMap.entrySet()) {
                weeklyEarningsJson.addProperty(entry.getKey(), entry.getValue());
            }

            JsonObject responseJson = new JsonObject();
            responseJson.add("available", availableRuns);
            responseJson.add("active", activeDeliveries);
            responseJson.add("completed", completedDeliveries);
            responseJson.addProperty("totalEarnings", totalEarnings);
            responseJson.addProperty("completedCount", completedDeliveries.size());
            responseJson.add("dailyEarnings", dailyEarningsJson);
            responseJson.add("weeklyEarnings", weeklyEarningsJson);
            responseJson.addProperty("riderLat", riderLat);
            responseJson.addProperty("riderLon", riderLon);
            responseJson.addProperty("totalOrders", totalOrders);
            responseJson.addProperty("page", page);
            responseJson.addProperty("pageSize", pageSize);

            resp.getWriter().write(responseJson.toString());

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to fetch delivery orders\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession httpSession = req.getSession(false);
        if (httpSession == null || httpSession.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        User user = (User) httpSession.getAttribute("loggedInUser");
        if (!"delivery_partner".equals(user.getRole())) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only delivery partners can perform this action.\"}");
            return;
        }

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : "";

            if ("updateLocation".equals(action)) {
                double lat = requestBody.get("latitude").getAsDouble();
                double lng = requestBody.get("longitude").getAsDouble();

                try (Session hibernateSession = DBUtils.openSession()) {
                    Transaction txRider = hibernateSession.beginTransaction();
                    User rider = hibernateSession.get(User.class, user.getUserID());
                    if (rider != null) {
                        rider.setLatitude(lat);
                        rider.setLongitude(lng);
                        hibernateSession.merge(rider);
                    }
                    txRider.commit();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }

                user.setLatitude(lat);
                user.setLongitude(lng);
                GeoUtils.updateCachedCoordinates(user.getUserID(), lat, lng);

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("latitude", lat);
                jsonResponse.addProperty("longitude", lng);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            int orderId = requestBody.get("orderId").getAsInt();

            OrdersDAo ordersDAO = new OrdersDAOImplementation();
            Orders order = ordersDAO.getOrdersById(orderId);

            if (order == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Order not found\"}");
                return;
            }

            Transaction tx = null;

            if ("updateGPS".equals(action)) {
                if (order.getRiderId() == null || order.getRiderId() != user.getUserID()) {
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().write("{\"error\":\"Forbidden: You cannot update GPS for another rider's delivery task.\"}");
                    return;
                }

                double progress = requestBody.get("progress").getAsDouble();
                order.setGpsProgress(progress);

                String coords = null;
                if (requestBody.has("latitude") && requestBody.has("longitude")) {
                    double lat = requestBody.get("latitude").getAsDouble();
                    double lng = requestBody.get("longitude").getAsDouble();
                    coords = lat + "," + lng;
                    order.setGpsCoordinates(coords);

                    try (Session hibernateSession = DBUtils.openSession()) {
                        Transaction txRider = hibernateSession.beginTransaction();
                        User rider = hibernateSession.get(User.class, user.getUserID());
                        if (rider != null) {
                            rider.setLatitude(lat);
                            rider.setLongitude(lng);
                            hibernateSession.merge(rider);
                        }
                        txRider.commit();
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                    GeoUtils.updateCachedCoordinates(user.getUserID(), lat, lng);
                }
                ordersDAO.updateOrders(order);

                JsonObject ssePayload = new JsonObject();
                ssePayload.addProperty("orderId", orderId);
                ssePayload.addProperty("status", order.getOrderStatus() != null ? order.getOrderStatus().name() : "PLACED");
                ssePayload.addProperty("gpsProgress", progress);
                if (coords != null) {
                    ssePayload.addProperty("gpsCoordinates", coords);
                }
                populateVRPPaths(ssePayload, order);
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastUpdate(orderId, ssePayload.toString());
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastOrderUpdate(
                    order,
                    "gps_update",
                    order.getOrderStatus() != null ? order.getOrderStatus().name() : "PLACED",
                    user.getUserID(),
                    "delivery_partner",
                    "GPS coordinates updated"
                );

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                populateVRPPaths(jsonResponse, order);
                resp.getWriter().write(jsonResponse.toString());
                return;

            } else if ("acceptOrder".equals(action)) {
                if (order.getRiderId() != null) {
                    resp.setStatus(HttpServletResponse.SC_CONFLICT);
                    resp.getWriter().write("{\"error\":\"Order already claimed by another rider.\"}");
                    return;
                }
                order.setRiderId(user.getUserID());
                OrderStatus currentStatus = order.getOrderStatus() != null ? order.getOrderStatus() : OrderStatus.PLACED;
                String nextStatus = currentStatus.name();
                if (currentStatus == OrderStatus.PLACED) {
                    OrderStatus targetStatus = OrderStatus.ACCEPTED;
                    if (currentStatus.canTransitionTo(targetStatus)) {
                        order.setOrderStatus(targetStatus);
                        nextStatus = targetStatus.name();
                    } else {
                        resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        resp.getWriter().write("{\"error\":\"Invalid status transition from " + currentStatus + " to " + targetStatus + "\"}");
                        return;
                    }
                }
                ordersDAO.updateOrders(order);

                try (Session hibernateSession = DBUtils.openSession()) {
                    User customer = hibernateSession.get(User.class, order.getUserId());
                    if (customer != null) {
                        com.app.zingbiteutils.EmailService.sendEmailAsync(
                            customer.getUserID(),
                            customer.getEmail(),
                            "Delivery Partner Assigned - ZB-" + orderId,
                            com.app.zingbiteutils.EmailTemplates.riderAssigned(customer.getUserName(), orderId, user.getUserName())
                        );
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    String hql = "from OrderHistory where orderId = :orderId";
                    Query<OrderHistory> query = hibernateSession.createQuery(hql, OrderHistory.class);
                    query.setParameter("orderId", orderId);
                    OrderHistory oh = query.uniqueResult();
                    if (oh != null) {
                        oh.setOrderStatus(nextStatus);
                        hibernateSession.merge(oh);
                    }
                    tx.commit();
                } catch (Exception ex) {
                    if (tx != null) tx.rollback();
                    ex.printStackTrace();
                }

                // Broadcast SSE & Log Status
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastOrderUpdate(
                    order,
                    "rider_accepted",
                    currentStatus.name(),
                    user.getUserID(),
                    "delivery_partner",
                    "Order accepted by rider: " + user.getUserName()
                );

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("status", nextStatus);
                resp.getWriter().write(jsonResponse.toString());

            } else {
                if (order.getRiderId() == null || order.getRiderId() != user.getUserID()) {
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().write("{\"error\":\"Forbidden: You cannot modify another rider's delivery task.\"}");
                    return;
                }

                String status = requestBody.get("status").getAsString();
                OrderStatus targetStatus = OrderStatus.parse(status);
                OrderStatus currentStatus = order.getOrderStatus() != null ? order.getOrderStatus() : OrderStatus.PLACED;
                if (!currentStatus.canTransitionTo(targetStatus)) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"error\":\"Invalid status transition from " + currentStatus + " to " + targetStatus + "\"}");
                    return;
                }
                order.setOrderStatus(targetStatus);
                ordersDAO.updateOrders(order);

                if (targetStatus == OrderStatus.DELIVERED) {
                    order.setGpsProgress(100.0);
                    order.setGpsCoordinates(null);
                    ordersDAO.updateOrders(order);

                    try (Session hibernateSession = DBUtils.openSession()) {
                        User customer = hibernateSession.get(User.class, order.getUserId());
                        if (customer != null) {
                            String itemsSummary = "Order items";
                            try (Session itemSession = DBUtils.openSession()) {
                                String itemHql = "from OrderItem where orderId = :orderId";
                                Query<OrderItem> itemQuery = itemSession.createQuery(itemHql, OrderItem.class);
                                itemQuery.setParameter("orderId", orderId);
                                List<OrderItem> orderItems = itemQuery.list();
                                if (!orderItems.isEmpty()) {
                                    StringBuilder sb = new StringBuilder();
                                    for (int i = 0; i < orderItems.size(); i++) {
                                        OrderItem oi = orderItems.get(i);
                                        if (i > 0) sb.append(", ");
                                        sb.append(oi.getQuantity()).append("x &ndash; &#8377;").append(String.format("%.2f", oi.getSubTotal()));
                                    }
                                    itemsSummary = sb.toString();
                                }
                            } catch (Exception itemEx) {
                                itemEx.printStackTrace();
                            }
                            String restName = order.getRestaurantId() != null ? order.getRestaurantId().getRestaurantName() : "ZingBite";
                            com.app.zingbiteutils.EmailService.sendEmailAsync(
                                customer.getUserID(),
                                customer.getEmail(),
                                "Order ZB-" + orderId + " Delivered!",
                                com.app.zingbiteutils.EmailTemplates.delivered(customer.getUserName(), orderId, restName, order.getTotalAmount(), itemsSummary)
                            );
                        }
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                }

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    String hql = "from OrderHistory where orderId = :orderId";
                    Query<OrderHistory> query = hibernateSession.createQuery(hql, OrderHistory.class);
                    query.setParameter("orderId", orderId);
                    OrderHistory oh = query.uniqueResult();
                    if (oh != null) {
                        oh.setOrderStatus(status);
                        hibernateSession.merge(oh);
                    }
                    tx.commit();
                } catch (Exception ex) {
                    if (tx != null) tx.rollback();
                    ex.printStackTrace();
                }

                // Broadcast SSE & Log Status
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastOrderUpdate(
                    order,
                    "status_update",
                    currentStatus.name(),
                    user.getUserID(),
                    "delivery_partner",
                    "Status updated by rider: " + user.getUserName()
                );

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("status", status);
                resp.getWriter().write(jsonResponse.toString());
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to update delivery order\"}");
        }
    }

    private void populateVRPPaths(JsonObject ssePayload, Orders order) {
        try {
            int orderId = order.getOrderId();
            int restId = order.getRestaurantId() != null ? order.getRestaurantId().getRestaurantId() : 0;
            double restLat = GeoUtils.getRestaurantLatitudeCached(restId);
            double restLon = GeoUtils.getRestaurantLongitudeCached(restId);
            double custLat = GeoUtils.getUserLatitudeCached(order.getUserId());
            double custLon = GeoUtils.getUserLongitudeCached(order.getUserId());

            int riderId = order.getRiderId() != null ? order.getRiderId() : 0;
            double rLat = GeoUtils.getRiderLatitudeCached(riderId);
            double rLon = GeoUtils.getRiderLongitudeCached(riderId);

            if (order.getGpsCoordinates() != null) {
                String coords = order.getGpsCoordinates();
                String[] parts = coords.split(",");
                if (parts.length == 2) {
                    try {
                        rLat = Double.parseDouble(parts[0]);
                        rLon = Double.parseDouble(parts[1]);
                    } catch (Exception ex) {}
                }
            }

            java.util.Map<String, List<com.app.zingbiteutils.VRPRouteOptimizer.Node>> vrpPaths =
                com.app.zingbiteutils.VRPRouteOptimizer.getVRPPathsForOrder(
                    rLat, rLon,
                    restLat, restLon,
                    custLat, custLon
                );

            Gson sseGson = new Gson();
            ssePayload.add("pathFM", sseGson.toJsonTree(vrpPaths.get("pathFM")));
            ssePayload.add("pathLM1", sseGson.toJsonTree(vrpPaths.get("pathLM1")));

            ssePayload.addProperty("restaurantLat", restLat);
            ssePayload.addProperty("restaurantLon", restLon);
            ssePayload.addProperty("customerLat", custLat);
            ssePayload.addProperty("customerLon", custLon);
            ssePayload.addProperty("riderLat", rLat);
            ssePayload.addProperty("riderLon", rLon);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void broadcastTopicUpdates(Orders order, String eventType) {
        try {
            JsonObject msg = new JsonObject();
            msg.addProperty("event", eventType);
            msg.addProperty("orderId", order.getOrderId());
            msg.addProperty("status", order.getOrderStatus() != null ? order.getOrderStatus().name() : "PLACED");
            if (order.getGpsProgress() != null) {
                msg.addProperty("gpsProgress", order.getGpsProgress());
            }

            com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:user_orders:" + order.getUserId(), msg.toString());

            if (order.getRestaurantId() != null) {
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:restaurant_orders:" + order.getRestaurantId().getRestaurantId(), msg.toString());
            }

            if (order.getRiderId() != null) {
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:rider_orders:" + order.getRiderId(), msg.toString());
            }

            if ("acceptOrder".equals(eventType) || "status_update".equals(eventType)) {
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:rider_orders", msg.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
