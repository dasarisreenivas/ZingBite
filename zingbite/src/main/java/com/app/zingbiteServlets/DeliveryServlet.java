package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;
import java.util.ArrayList;

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



    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");
        if (!"delivery_partner".equals(user.getRole())) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only delivery partners can access this resource.\"}");
            return;
        }

        double riderLat = GeoUtils.getRiderLatitude(user.getUserID());
        double riderLon = GeoUtils.getRiderLongitude(user.getUserID());

        JsonArray availableRuns = new JsonArray();
        JsonArray activeDeliveries = new JsonArray();
        JsonArray completedDeliveries = new JsonArray();
        int totalEarnings = 0;

        List<JsonObject> availableList = new ArrayList<>();
        List<JsonObject> activeList = new ArrayList<>();

        try (Session hibernateSession = DBUtils.openSession()) {
            String hql = "from Orders where orderStatus != :pendingStatus order by orderId desc";
            Query<Orders> query = hibernateSession.createQuery(hql, Orders.class);
            query.setParameter("pendingStatus", OrderStatus.PENDING_PAYMENT);
            List<Orders> ordersList = query.list();

            for (Orders o : ordersList) {
                JsonObject oJson = new JsonObject();
                oJson.addProperty("orderId", o.getOrderId());
                oJson.addProperty("formattedId", "ZB-" + o.getOrderId());
                oJson.addProperty("restaurantName", o.getRestaurantId() != null ? o.getRestaurantId().getRestaurantName() : "ZingBite Hotspot");
                oJson.addProperty("total", o.getTotalAmount());
                oJson.addProperty("status", o.getOrderStatus() != null ? o.getOrderStatus().name() : "PLACED");
                oJson.addProperty("payment", o.getPaymentMethod() != null ? o.getPaymentMethod() : "UPI");

                // Get customer address & name
                User customer = hibernateSession.get(User.class, o.getUserId());
                oJson.addProperty("customerId", o.getUserId());
                oJson.addProperty("customerName", customer != null ? customer.getUserName() : "Customer");
                oJson.addProperty("customerAddress", customer != null ? customer.getAddress() : "ZingBite Hub");
                oJson.addProperty("customerPhone", customer != null ? String.valueOf(customer.getPhoneNumber()) : "");

                int rId = o.getRestaurantId() != null ? o.getRestaurantId().getRestaurantId() : 0;
                double restLat = GeoUtils.getRestaurantLatitude(rId);
                double restLon = GeoUtils.getRestaurantLongitude(rId);
                double custLat = GeoUtils.getUserLatitude(o.getUserId());
                double custLon = GeoUtils.getUserLongitude(o.getUserId());
                double dist = GeoUtils.haversine(riderLat, riderLon, restLat, restLon);
                oJson.addProperty("distance", Math.round(dist * 10.0) / 10.0);

                // Include raw coordinates for map markers
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
                } else if (o.getRiderId() == user.getUserID()) {
                    if (o.getOrderStatus() == OrderStatus.DELIVERED) {
                        completedDeliveries.add(oJson);
                        totalEarnings += 45; // 45 INR per trip
                    } else {
                        double currentGps = o.getGpsProgress() != null ? o.getGpsProgress() : 0.0;
                        oJson.addProperty("gpsProgress", currentGps);
                        if (o.getGpsCoordinates() != null) {
                            oJson.addProperty("gpsCoordinates", o.getGpsCoordinates());
                        }
                        try {
                            int riderId = o.getRiderId() != null ? o.getRiderId() : 0;
                            double rLat = GeoUtils.getRiderLatitude(riderId);
                            double rLon = GeoUtils.getRiderLongitude(riderId);

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

                            java.util.Map<String, List<com.app.zingbiteutils.VRPRouteOptimizer.Node>> vrpPaths = 
                                com.app.zingbiteutils.VRPRouteOptimizer.getVRPPathsForOrder(
                                    rLat, rLon,
                                    restLat, restLon,
                                    custLat, custLon
                                );

                            Gson sseGson = new Gson();
                            oJson.add("pathFM", sseGson.toJsonTree(vrpPaths.get("pathFM")));
                            oJson.add("pathLM1", sseGson.toJsonTree(vrpPaths.get("pathLM1")));
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }
                        activeList.add(oJson);
                    }
                }
            }

            // Sort available runs by distance (Haversine)
            availableList.sort((a, b) -> Double.compare(a.get("distance").getAsDouble(), b.get("distance").getAsDouble()));
            for (JsonObject run : availableList) {
                availableRuns.add(run);
            }

            // Route Optimization (TSP Nearest Neighbor) for Active runs
            if (activeList.size() > 1) {
                List<RouteOptimizer.Location> locations = new ArrayList<>();
                for (int i = 0; i < activeList.size(); i++) {
                    JsonObject act = activeList.get(i);
                    int oId = act.get("orderId").getAsInt();
                    Orders matchedOrder = null;
                    for (Orders ord : ordersList) {
                        if (ord.getOrderId() == oId) {
                            matchedOrder = ord;
                            break;
                        }
                    }
                    int cId = matchedOrder != null ? matchedOrder.getUserId() : 0;
                    double cLat = GeoUtils.getUserLatitude(cId);
                    double cLon = GeoUtils.getUserLongitude(cId);
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

            JsonObject responseJson = new JsonObject();
            responseJson.add("available", availableRuns);
            responseJson.add("active", activeDeliveries);
            responseJson.add("completed", completedDeliveries);
            responseJson.addProperty("totalEarnings", totalEarnings);
            responseJson.addProperty("completedCount", completedDeliveries.size());
            // Include rider's current coordinates so the frontend knows the rider position
            responseJson.addProperty("riderLat", riderLat);
            responseJson.addProperty("riderLon", riderLon);

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

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");
        if (!"delivery_partner".equals(user.getRole())) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only delivery partners can perform this action.\"}");
            return;
        }

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : "";

            // ─── Handle updateLocation first (no orderId needed) ───
            if ("updateLocation".equals(action)) {
                // Rider location update from browser geolocation on portal load
                // This updates the rider's stored position even when they have no active delivery
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

                // Update session object so subsequent requests in this session use the new coords
                user.setLatitude(lat);
                user.setLongitude(lng);

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("latitude", lat);
                jsonResponse.addProperty("longitude", lng);
                resp.getWriter().write(jsonResponse.toString());
                return;
            }

            // ─── All other actions require an orderId ───
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
                // Verify ownership (IDOR check)
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
                }
                ordersDAO.updateOrders(order);

                // Broadcast SSE Update
                JsonObject ssePayload = new JsonObject();
                ssePayload.addProperty("orderId", orderId);
                ssePayload.addProperty("status", order.getOrderStatus() != null ? order.getOrderStatus().name() : "PLACED");
                ssePayload.addProperty("gpsProgress", progress);
                if (coords != null) {
                    ssePayload.addProperty("gpsCoordinates", coords);
                }
                populateVRPPaths(ssePayload, order);
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastUpdate(orderId, ssePayload.toString());
                broadcastTopicUpdates(order, "updateGPS");

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

                // Send rider assigned email to the customer
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

                // Update OrderHistory
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

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("status", nextStatus);

                // Broadcast SSE Update
                JsonObject ssePayload = new JsonObject();
                ssePayload.addProperty("orderId", orderId);
                ssePayload.addProperty("status", nextStatus);
                populateVRPPaths(ssePayload, order);
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastUpdate(orderId, ssePayload.toString());
                broadcastTopicUpdates(order, "acceptOrder");

                resp.getWriter().write(jsonResponse.toString());

            } else {
                // Verify ownership (IDOR check)
                if (order.getRiderId() == null || order.getRiderId() != user.getUserID()) {
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().write("{\"error\":\"Forbidden: You cannot modify another rider's delivery task.\"}");
                    return;
                }

                // Default update status
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

                    // Send delivery confirmation email
                    try (Session hibernateSession = DBUtils.openSession()) {
                        User customer = hibernateSession.get(User.class, order.getUserId());
                        if (customer != null) {
                            com.app.zingbiteutils.EmailService.sendEmailAsync(
                                customer.getUserID(),
                                customer.getEmail(),
                                "Order ZB-" + orderId + " Delivered!",
                                com.app.zingbiteutils.EmailTemplates.delivered(customer.getUserName(), orderId)
                            );
                        }
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                }

                // Update OrderHistory
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

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("status", status);

                // Broadcast SSE Update
                JsonObject ssePayload = new JsonObject();
                ssePayload.addProperty("orderId", orderId);
                ssePayload.addProperty("status", status);
                ssePayload.addProperty("gpsProgress", order.getGpsProgress() != null ? order.getGpsProgress() : 0.0);
                if (order.getGpsCoordinates() != null) {
                    ssePayload.addProperty("gpsCoordinates", order.getGpsCoordinates());
                }
                populateVRPPaths(ssePayload, order);
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastUpdate(orderId, ssePayload.toString());
                broadcastTopicUpdates(order, "status_update");

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
            double restLat = GeoUtils.getRestaurantLatitude(restId);
            double restLon = GeoUtils.getRestaurantLongitude(restId);
            double custLat = GeoUtils.getUserLatitude(order.getUserId());
            double custLon = GeoUtils.getUserLongitude(order.getUserId());

            int riderId = order.getRiderId() != null ? order.getRiderId() : 0;
            double rLat = GeoUtils.getRiderLatitude(riderId);
            double rLon = GeoUtils.getRiderLongitude(riderId);

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

            // Include raw coordinates so the frontend can place/update map markers
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

            // Broadcast to the customer
            com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:user_orders:" + order.getUserId(), msg.toString());

            // Broadcast to the restaurant
            if (order.getRestaurantId() != null) {
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:restaurant_orders:" + order.getRestaurantId().getRestaurantId(), msg.toString());
            }

            // Broadcast to the rider specifically
            if (order.getRiderId() != null) {
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:rider_orders:" + order.getRiderId(), msg.toString());
            }

            // Broadcast globally to all riders (for available runs list updates)
            if ("acceptOrder".equals(eventType) || "status_update".equals(eventType)) {
                com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:rider_orders", msg.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
