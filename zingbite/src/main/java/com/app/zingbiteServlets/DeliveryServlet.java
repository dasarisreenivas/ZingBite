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

    // Static map storing the current GPS route progress (0.0 to 100.0) for each active order
    public static final java.util.Map<Integer, Double> activeGpsProgress = new java.util.concurrent.ConcurrentHashMap<>();

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
            String hql = "from Orders order by orderId desc";
            Query<Orders> query = hibernateSession.createQuery(hql, Orders.class);
            List<Orders> ordersList = query.list();

            for (Orders o : ordersList) {
                JsonObject oJson = new JsonObject();
                oJson.addProperty("orderId", o.getOrderId());
                oJson.addProperty("formattedId", "ZB-" + o.getOrderId());
                oJson.addProperty("restaurantName", o.getRestaurantId() != null ? o.getRestaurantId().getRestaurantName() : "ZingBite Hotspot");
                oJson.addProperty("total", o.getTotalAmount());
                oJson.addProperty("status", o.getOrderStatus() != null ? o.getOrderStatus() : "Placed");
                oJson.addProperty("payment", o.getPaymentMethod() != null ? o.getPaymentMethod() : "UPI");

                // Get customer address & name
                User customer = hibernateSession.get(User.class, o.getUserId());
                oJson.addProperty("customerName", customer != null ? customer.getUserName() : "Customer");
                oJson.addProperty("customerAddress", customer != null ? customer.getAddress() : "ZingBite Hub");
                oJson.addProperty("customerPhone", customer != null ? String.valueOf(customer.getPhoneNumber()) : "");

                double restLat = GeoUtils.getRestaurantLatitude(o.getRestaurantId() != null ? o.getRestaurantId().getRestaurantId() : 0);
                double restLon = GeoUtils.getRestaurantLongitude(o.getRestaurantId() != null ? o.getRestaurantId().getRestaurantId() : 0);
                double dist = GeoUtils.haversine(riderLat, riderLon, restLat, restLon);
                oJson.addProperty("distance", Math.round(dist * 10.0) / 10.0);

                if (o.getRiderId() == null) {
                    String status = o.getOrderStatus();
                    if ("Placed".equalsIgnoreCase(status) || 
                        "Preparing".equalsIgnoreCase(status) || 
                        "Waiting to Dispatch".equalsIgnoreCase(status) ||
                        "Out for Delivery".equalsIgnoreCase(status)) {
                        availableList.add(oJson);
                    }
                } else if (o.getRiderId() == user.getUserID()) {
                    if ("Delivered".equalsIgnoreCase(o.getOrderStatus())) {
                        completedDeliveries.add(oJson);
                        totalEarnings += 45; // 45 INR per trip
                    } else {
                        double currentGps = activeGpsProgress.containsKey(o.getOrderId()) ? activeGpsProgress.get(o.getOrderId()) : 0.0;
                        oJson.addProperty("gpsProgress", currentGps);
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
                activeGpsProgress.put(orderId, progress);

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());
                return;

            } else if ("acceptOrder".equals(action)) {
                if (order.getRiderId() != null) {
                    resp.setStatus(HttpServletResponse.SC_CONFLICT);
                    resp.getWriter().write("{\"error\":\"Order already claimed by another rider.\"}");
                    return;
                }
                order.setRiderId(user.getUserID());
                String nextStatus = order.getOrderStatus();
                if ("Placed".equalsIgnoreCase(nextStatus)) {
                    nextStatus = "Accepted";
                    order.setOrderStatus(nextStatus);
                }
                ordersDAO.updateOrders(order);

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
                order.setOrderStatus(status);
                ordersDAO.updateOrders(order);

                if ("Delivered".equalsIgnoreCase(status)) {
                    activeGpsProgress.put(orderId, 100.0);
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
                resp.getWriter().write(jsonResponse.toString());
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to update delivery order\"}");
        }
    }
}
