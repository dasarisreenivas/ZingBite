package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import java.text.SimpleDateFormat;
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

import com.app.zingbitedao.UserDAO;
import com.app.zingbitedaoimpl.UserDAOImplementation;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitedaoimpl.OrderItemDAOImplementation;
import com.app.zingbitedaoimpl.OrdersDAOImplementation;
import com.app.zingbitedaoimpl.OrderHistoryDAOImplementation;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.OrderItem;
import com.app.zingbitemodels.OrderHistory;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.OrderStatus;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbiteutils.DBUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/profile")
public class ProfileServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to view profile details\"}");
            return;
        }

        User user = null;
        try {
            user = (User) session.getAttribute("loggedInUser");
        } catch (ClassCastException e) {
            try {
                session.invalidate();
            } catch (Exception ignored) {}
        }

        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to view profile details\"}");
            return;
        }
        String action = req.getParameter("action");

        if ("orders".equals(action)) {
            JsonArray ordersJson = new JsonArray();
            try (Session hibernateSession = DBUtils.openSession()) {
                String hql = "from OrderHistory where userID = :userId order by orderHistoryId desc";
                Query<OrderHistory> query = hibernateSession.createQuery(hql, OrderHistory.class);
                query.setParameter("userId", user.getUserID());
                List<OrderHistory> historyList = query.list();

                for (OrderHistory oh : historyList) {
                    JsonObject oJson = new JsonObject();
                    oJson.addProperty("id", "ZB-" + oh.getOrderId());
                    
                    String rName = "ZingBite Restaurant";
                    Orders associatedOrder = hibernateSession.get(Orders.class, oh.getOrderId());
                    if (associatedOrder != null && associatedOrder.getRestaurantId() != null) {
                        rName = associatedOrder.getRestaurantId().getRestaurantName();
                    } else {
                        Integer rId = (Integer) session.getAttribute("restaurantId");
                        if (rId != null) {
                            Restaurant resObj = new RestaurantDAOImplementation().getRestaurantById(rId);
                            if (resObj != null) rName = resObj.getRestaurantName();
                        }
                    }
                    
                    oJson.addProperty("restaurantName", rName);
                    String dateStr = "June 02, 2026";
                    if (oh.getOrderDate() != null) {
                        dateStr = new SimpleDateFormat("MMMM dd, yyyy").format(oh.getOrderDate());
                    }
                    oJson.addProperty("date", dateStr);
                    oJson.addProperty("total", oh.getTotalAmount());
                    
                    String statusVal = "Delivered";
                    if (associatedOrder != null && associatedOrder.getOrderStatus() != null) {
                        statusVal = associatedOrder.getOrderStatus().label();
                    } else if (oh.getOrderStatus() != null) {
                        statusVal = oh.getOrderStatus();
                    }
                    oJson.addProperty("status", statusVal);
                    double gps = 0.0;
                    if (associatedOrder != null && associatedOrder.getGpsProgress() != null) {
                        gps = associatedOrder.getGpsProgress();
                    } else if ("Delivered".equalsIgnoreCase(statusVal)) {
                        gps = 100.0;
                    }
                    oJson.addProperty("gpsProgress", gps);

                    if (associatedOrder != null && associatedOrder.getGpsCoordinates() != null) {
                        oJson.addProperty("gpsCoordinates", associatedOrder.getGpsCoordinates());
                    }

                    if (associatedOrder != null && !"Delivered".equalsIgnoreCase(statusVal)) {
                        try {
                            int restId = associatedOrder.getRestaurantId() != null ? associatedOrder.getRestaurantId().getRestaurantId() : 0;
                            double restLat = com.app.zingbiteutils.GeoUtils.getRestaurantLatitude(restId);
                            double restLon = com.app.zingbiteutils.GeoUtils.getRestaurantLongitude(restId);
                            double custLat = com.app.zingbiteutils.GeoUtils.getUserLatitude(associatedOrder.getUserId());
                            double custLon = com.app.zingbiteutils.GeoUtils.getUserLongitude(associatedOrder.getUserId());

                            int riderId = associatedOrder.getRiderId() != null ? associatedOrder.getRiderId() : 0;
                            double rLat = com.app.zingbiteutils.GeoUtils.getRiderLatitude(riderId);
                            double rLon = com.app.zingbiteutils.GeoUtils.getRiderLongitude(riderId);

                            if (associatedOrder.getGpsCoordinates() != null) {
                                String coords = associatedOrder.getGpsCoordinates();
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
                    }

                    if (associatedOrder != null && associatedOrder.getRiderId() != null) {
                        oJson.addProperty("riderId", associatedOrder.getRiderId());
                        User rider = hibernateSession.get(User.class, associatedOrder.getRiderId());
                        if (rider != null) {
                            oJson.addProperty("riderName", rider.getUserName());
                            oJson.addProperty("riderPhone", String.valueOf(rider.getPhoneNumber()));
                        }
                    }

                    // Fetch items using orderId
                    JsonArray itemsJson = new JsonArray();
                    String itemHql = "from OrderItem where orderId = :orderId";
                    Query<OrderItem> itemQuery = hibernateSession.createQuery(itemHql, OrderItem.class);
                    itemQuery.setParameter("orderId", oh.getOrderId());
                    List<OrderItem> itemsList = itemQuery.list();

                    for (OrderItem oi : itemsList) {
                        JsonObject oiJson = new JsonObject();
                        oiJson.addProperty("id", oi.getMenuId());
                        oiJson.addProperty("qty", oi.getQuantity());
                        oiJson.addProperty("price", oi.getQuantity() > 0 ? oi.getSubTotal() / oi.getQuantity() : 0);

                        Menu mItem = new MenuDAOImplementation().getMenuById(oi.getMenuId());
                        if (mItem != null) {
                            oiJson.addProperty("name", mItem.getMenuName());
                        } else {
                            oiJson.addProperty("name", "Menu Item");
                        }
                        itemsJson.add(oiJson);
                    }
                    oJson.add("items", itemsJson);
                    ordersJson.add(oJson);
                }
            } catch (Exception e) {
                e.printStackTrace();
                resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                resp.getWriter().write("{\"error\":\"Failed to retrieve orders\"}");
                return;
            }
            resp.getWriter().write(ordersJson.toString());
        } else {
            // Default return user profile data
            Gson gson = new Gson();
            resp.getWriter().write(gson.toJson(user));
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in\"}");
            return;
        }

        User user = null;
        try {
            user = (User) session.getAttribute("loggedInUser");
        } catch (ClassCastException e) {
            try {
                session.invalidate();
            } catch (Exception ignored) {}
        }

        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in\"}");
            return;
        }
        JsonObject jsonResponse = new JsonObject();

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : "";

            if ("update".equals(action)) {
                String username = requestBody.has("username") ? requestBody.get("username").getAsString() : null;
                String mobile = requestBody.has("mobile") ? requestBody.get("mobile").getAsString() : null;
                String address = requestBody.has("address") ? requestBody.get("address").getAsString() : null;
                Double latitude = requestBody.has("latitude") && !requestBody.get("latitude").isJsonNull() ? requestBody.get("latitude").getAsDouble() : null;
                Double longitude = requestBody.has("longitude") && !requestBody.get("longitude").isJsonNull() ? requestBody.get("longitude").getAsDouble() : null;
                String city = requestBody.has("city") && !requestBody.get("city").isJsonNull() ? requestBody.get("city").getAsString() : null;

                if (username == null || mobile == null || address == null) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"error\":\"All fields are required\"}");
                    return;
                }

                long mobileNumber = Long.parseLong(mobile.replaceAll("\\D", "")); // strip symbols if any
                user.setUserName(username);
                user.setPhoneNumber(mobileNumber);
                user.setAddress(address);
                if (latitude != null) user.setLatitude(latitude);
                if (longitude != null) user.setLongitude(longitude);
                if (city != null) user.setCity(city);

                UserDAO userDao = new UserDAOImplementation();
                int success = userDao.updateUser(user);

                if (success > 0) {
                    session.setAttribute("loggedInUser", user);
                    jsonResponse.addProperty("success", true);
                    jsonResponse.add("user", new Gson().toJsonTree(user));
                } else {
                    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.addProperty("error", "Failed to update profile database");
                }
                resp.getWriter().write(jsonResponse.toString());

            } else if ("upgradeRole".equals(action)) {
                String role = requestBody.has("role") ? requestBody.get("role").getAsString() : null;
                if (role == null || (!"delivery_partner".equals(role) && !"restaurant_admin".equals(role))) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"error\":\"Invalid role upgrade request\"}");
                    return;
                }
                // Role upgrades must go through the approval queue; direct upgrade not allowed
                resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                jsonResponse.addProperty("error", "Role upgrades require admin approval via Onboarding Queue. Please use the Partner With Us or Ride With Us forms.");
                resp.getWriter().write(jsonResponse.toString());

            } else if ("createOrder".equals(action)) {
                double total = requestBody.has("total") ? requestBody.get("total").getAsDouble() : 0.0;
                String paymentMethod = requestBody.has("paymentMethod") ? requestBody.get("paymentMethod").getAsString() : "UPI";
                JsonArray itemsArray = requestBody.has("items") ? requestBody.getAsJsonArray("items") : new JsonArray();

                Integer restaurantId = null;
                if (requestBody.has("restaurantId") && !requestBody.get("restaurantId").isJsonNull()) {
                    restaurantId = requestBody.get("restaurantId").getAsInt();
                }
                if (restaurantId == null) {
                    restaurantId = (Integer) session.getAttribute("restaurantId");
                }
                
                int orderId = 0;
                Transaction tx = null;
                String orderTime = new SimpleDateFormat("MMMM dd, yyyy").format(new Date());

                try (Session dbSession = DBUtils.openSession()) {
                    tx = dbSession.beginTransaction();

                    User dbUser = dbSession.get(User.class, user.getUserID());
                    if (dbUser != null && dbUser.getBlocked() != null && dbUser.getBlocked()) {
                        tx.rollback();
                        resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        resp.getWriter().write("{\"error\":\"Your account has been blocked and you cannot place orders.\"}");
                        return;
                    }

                    Restaurant restaurant = null;
                    if (restaurantId != null) {
                        restaurant = dbSession.get(Restaurant.class, restaurantId);
                    }

                    Orders order = new Orders();
                    order.setUserId(user.getUserID());
                    order.setRestaurantId(restaurant);
                    order.setOrderTime(orderTime);
                    order.setTotalAmount((float) total);
                    order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
                    order.setPaymentMethod(paymentMethod);
                    order.setStatusUpdatedAt(new Date());

                    dbSession.persist(order);
                    dbSession.flush(); // populated orderId
                    orderId = order.getOrderId();

                    for (JsonElement itemEl : itemsArray) {
                        JsonObject itemObj = itemEl.getAsJsonObject();
                        int itemId = itemObj.get("id").getAsInt();
                        int qty = itemObj.get("qty").getAsInt();
                        double price = itemObj.get("price").getAsDouble();

                        OrderItem orderItem = new OrderItem(orderId, itemId, qty, price * qty);
                        dbSession.persist(orderItem);
                    }

                    // Also add to OrderHistory in Pending state
                    OrderHistory orderHistory = new OrderHistory();
                    orderHistory.setOrderId(orderId);
                    orderHistory.setUserID(user.getUserID());
                    orderHistory.setOrderDate(new Date());
                    orderHistory.setTotalAmount(total);
                    orderHistory.setOrderStatus("Pending Payment");

                    dbSession.persist(orderHistory);

                    // Create Payment record
                    com.app.zingbitemodels.Payment payment = new com.app.zingbitemodels.Payment(orderId, total, paymentMethod);
                    payment.setStatus("PENDING");
                    dbSession.persist(payment);

                    tx.commit();
                } catch (Exception e) {
                    if (tx != null && tx.isActive()) {
                        tx.rollback();
                    }
                    throw e;
                }

                if (orderId > 0) {
                    jsonResponse.addProperty("success", true);
                    jsonResponse.addProperty("orderId", "ZB-" + orderId);

                    if ("Razorpay".equals(paymentMethod)) {
                        try {
                            int amountInPaise = (int) Math.round(total * 100);
                            String razorpayOrderId = com.app.zingbiteutils.RazorpayUtils.createRazorpayOrder(amountInPaise, "ZB-" + orderId);
                            jsonResponse.addProperty("razorpayOrderId", razorpayOrderId);

                            try (Session dbSession2 = DBUtils.openSession()) {
                                Transaction tx2 = dbSession2.beginTransaction();
                                String payHql = "from Payment where orderId = :oid";
                                com.app.zingbitemodels.Payment payRecord = dbSession2.createQuery(payHql, com.app.zingbitemodels.Payment.class)
                                    .setParameter("oid", orderId).uniqueResult();
                                if (payRecord != null) {
                                    payRecord.setRazorpayOrderId(razorpayOrderId);
                                    dbSession2.merge(payRecord);
                                }
                                tx2.commit();
                            }
                        } catch (Exception rpEx) {
                            System.err.println("[ProfileServlet] Failed to create Razorpay Order: " + rpEx.getMessage());
                            rpEx.printStackTrace();
                            jsonResponse.addProperty("razorpayError", rpEx.getMessage());
                        }
                    }
                } else {
                    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.addProperty("error", "Failed to reserve order");
                }
                resp.getWriter().write(jsonResponse.toString());
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Invalid action\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"An error occurred: " + e.getMessage() + "\"}");
        }
    }
}
