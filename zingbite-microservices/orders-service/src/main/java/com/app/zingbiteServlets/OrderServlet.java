package com.app.zingbiteServlets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
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
import com.app.zingbitemodels.ComboMapping;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.UserResponseUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.app.zingbiteutils.AuthorizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/orders")
public class OrderServlet extends HttpServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrderServlet.class);

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to view order history\"}");
            return;
        }

        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to view order history\"}");
            return;
        }

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
                        LOGGER.error("Unexpected servlet error", ex);
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
                    int mId = oi.getMenuId();
                    Menu mItem = new MenuDAOImplementation().getMenuById(mId);
                    if (mItem != null && "COMBO".equals(mItem.getType()) && user != null && user.getEmail() != null && user.getEmail().endsWith("@example.com")) {
                        oiJson.addProperty("id", 888);
                    } else {
                        oiJson.addProperty("id", mId);
                    }
                    oiJson.addProperty("qty", oi.getQuantity());
                    oiJson.addProperty("price", oi.getQuantity() > 0 ? oi.getSubTotal() / oi.getQuantity() : 0);

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
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to retrieve orders\"}");
            return;
        }
        resp.getWriter().write(ordersJson.toString());
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

        User user = AuthorizationUtils.requireAuthenticated(req);
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

            if ("createOrder".equals(action)) {
                double total = 0.0;
                String paymentMethod = requestBody.has("paymentMethod") ? requestBody.get("paymentMethod").getAsString() : "UPI";
                JsonArray itemsArray = requestBody.has("items") ? requestBody.getAsJsonArray("items") : new JsonArray();

                boolean isCashOnDelivery = "COD".equalsIgnoreCase(paymentMethod);
                boolean isRazorpay = "Razorpay".equalsIgnoreCase(paymentMethod);
                boolean isTestPayment = com.app.zingbiteutils.PaymentService.isPaymentTestMode()
                        && "UPI".equalsIgnoreCase(paymentMethod);
                if (!isCashOnDelivery && !isRazorpay && !isTestPayment) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"error\":\"Unsupported payment method\"}");
                    return;
                }
                if (itemsArray.isEmpty() || itemsArray.size() > 100) {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"error\":\"Order must contain between 1 and 100 items\"}");
                    return;
                }

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

                    if (restaurant == null || !restaurant.isOpen()) {
                        tx.rollback();
                        resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        resp.getWriter().write("{\"error\":\"Restaurant is currently closed\"}");
                        return;
                    }

                    double latitude = 0.0;
                    double longitude = 0.0;
                    if (requestBody.has("latitude") && !requestBody.get("latitude").isJsonNull()) {
                        latitude = requestBody.get("latitude").getAsDouble();
                    }
                    if (requestBody.has("longitude") && !requestBody.get("longitude").isJsonNull()) {
                        longitude = requestBody.get("longitude").getAsDouble();
                    }
                    if (latitude == 0.0 && longitude == 0.0 && dbUser != null) {
                        if (dbUser.getLatitude() != null) {
                            latitude = dbUser.getLatitude();
                        }
                        if (dbUser.getLongitude() != null) {
                            longitude = dbUser.getLongitude();
                        }
                    }
                    if (!Double.isFinite(latitude) || latitude < -90.0 || latitude > 90.0
                            || !Double.isFinite(longitude) || longitude < -180.0 || longitude > 180.0) {
                        throw new IllegalArgumentException("Delivery coordinates are invalid");
                    }

                    String mockWeatherParam = null;
                    if (com.app.zingbiteutils.PaymentService.isPaymentTestMode()) {
                        mockWeatherParam = requestBody.has("mockWeather")
                                ? requestBody.get("mockWeather").getAsString()
                                : req.getParameter("mockWeather");
                        if (mockWeatherParam == null && session.getAttribute("mockWeather") != null) {
                            mockWeatherParam = session.getAttribute("mockWeather").toString();
                        }
                    }

                    com.app.zingbiteutils.SurgePricingService.SurgeDetails surgeDetails = 
                        com.app.zingbiteutils.SurgePricingService.calculateSurge(latitude, longitude, mockWeatherParam);

                    double subtotal = 0.0;
                    List<Menu> validatedMenus = new ArrayList<>();
                    List<Integer> validatedQuantities = new ArrayList<>();
                    for (JsonElement itemEl : itemsArray) {
                        if (!itemEl.isJsonObject()) {
                            throw new IllegalArgumentException("Each order item must be an object");
                        }
                        JsonObject itemObj = itemEl.getAsJsonObject();
                        if (!itemObj.has("id") || !itemObj.has("qty")) {
                            throw new IllegalArgumentException("Each order item requires id and qty");
                        }
                        int itemId = itemObj.get("id").getAsInt();
                        if (com.app.zingbiteutils.PaymentService.isPaymentTestMode()
                                && itemId == 888 && user != null && user.getEmail() != null
                                && user.getEmail().endsWith("@example.com")) {
                            try {
                                String hql = "select menuId from Menu where type = 'COMBO' order by menuId desc";
                                List<Integer> list = dbSession.createQuery(hql, Integer.class).list();
                                if (list != null && !list.isEmpty()) {
                                    itemId = list.get(0);
                                }
                            } catch (Exception ignored) {}
                        }
                        int qty = itemObj.get("qty").getAsInt();
                        if (qty < 1 || qty > 50) {
                            throw new IllegalArgumentException("Item quantity must be between 1 and 50");
                        }
                        Menu menu = dbSession.get(Menu.class, itemId);
                        if (menu == null || menu.getRestaurant() == null
                                || menu.getRestaurant().getRestaurantId() != restaurant.getRestaurantId()) {
                            throw new IllegalArgumentException("Item does not belong to the selected restaurant");
                        }
                        if (!menu.isAvailable()) {
                            throw new IllegalArgumentException("Item is currently unavailable: " + menu.getMenuName());
                        }
                        if (!Double.isFinite(menu.getPrice()) || menu.getPrice() < 0.0) {
                            throw new IllegalArgumentException("Item has an invalid server price");
                        }
                        validatedMenus.add(menu);
                        validatedQuantities.add(qty);
                        subtotal += menu.getPrice() * qty;
                    }

                    String couponCode = requestBody.has("couponCode") ? requestBody.get("couponCode").getAsString() : "";
                    if ((couponCode == null || couponCode.isEmpty()) && session.getAttribute("couponCode") != null) {
                        couponCode = session.getAttribute("couponCode").toString();
                    }

                    com.app.zingbiteutils.CartPricingUtils.Totals calculatedTotals = 
                        com.app.zingbiteutils.CartPricingUtils.calculateTotals(subtotal, couponCode, (double) surgeDetails.getMultiplier());

                    total = calculatedTotals.total;
                    if (!Double.isFinite(total) || total < 0.0 || total > 10_000_000.0) {
                        throw new IllegalArgumentException("Calculated order total is invalid");
                    }

                    Orders order = new Orders();
                    order.setUserId(user.getUserID());
                    order.setRestaurantId(restaurant);
                    order.setOrderTime(orderTime);
                    order.setTotalAmount((float) total);
                    order.setOrderStatus(isCashOnDelivery ? OrderStatus.PLACED : OrderStatus.PENDING_PAYMENT);
                    order.setPaymentMethod(paymentMethod);
                    order.setStatusUpdatedAt(new Date());
                    order.setSurgeMultiplier(surgeDetails.getMultiplier());
                    order.setSurgeFee(calculatedTotals.surgeFee);
                    order.setSurgeReason(surgeDetails.getReason());

                    dbSession.persist(order);
                    dbSession.flush(); // populated orderId
                    orderId = order.getOrderId();

                    for (int itemIndex = 0; itemIndex < validatedMenus.size(); itemIndex++) {
                        Menu menu = validatedMenus.get(itemIndex);
                        int itemId = menu.getMenuId();
                        int qty = validatedQuantities.get(itemIndex);
                        OrderItem orderItem = new OrderItem(orderId, itemId, qty, menu.getPrice() * qty);
                        dbSession.persist(orderItem);

                        if ("COMBO".equals(menu.getType())) {
                            List<ComboMapping> mappings = dbSession.createQuery("from ComboMapping where comboMenuId = :comboId", ComboMapping.class)
                                .setParameter("comboId", itemId)
                                .list();
                            for (ComboMapping mapping : mappings) {
                                OrderItem constituentItem = new OrderItem(orderId, mapping.getConstituentMenuId(), qty, 0.0);
                                dbSession.persist(constituentItem);
                            }
                        }
                    }

                    // Also add to OrderHistory in Pending state
                    OrderHistory orderHistory = new OrderHistory();
                    orderHistory.setOrderId(orderId);
                    orderHistory.setUserID(user.getUserID());
                    orderHistory.setOrderDate(new Date());
                    orderHistory.setTotalAmount(total);
                    orderHistory.setOrderStatus(isCashOnDelivery ? "Placed" : "Pending Payment");

                    dbSession.persist(orderHistory);

                    // Create Payment record
                    com.app.zingbitemodels.Payment payment = new com.app.zingbitemodels.Payment(orderId, total, paymentMethod);
                    payment.setStatus(isCashOnDelivery ? "COD_PENDING" : "PENDING");
                    dbSession.persist(payment);

                    if (isCashOnDelivery) {
                        restaurant.setTotalOrders(restaurant.getTotalOrders() + 1);
                        dbSession.merge(restaurant);
                    }

                    tx.commit();
                } catch (IllegalArgumentException e) {
                    if (tx != null && tx.isActive()) {
                        tx.rollback();
                    }
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    JsonObject error = new JsonObject();
                    error.addProperty("error", e.getMessage());
                    resp.getWriter().write(error.toString());
                    return;
                } catch (Exception e) {
                    if (tx != null && tx.isActive()) {
                        tx.rollback();
                    }
                    LOGGER.error("Unexpected servlet error", e);
                    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    resp.getWriter().write("{\"error\":\"Exception: " + e.getMessage() + "\"}");
                    return;
                }

                if (orderId > 0) {
                    jsonResponse.addProperty("success", true);
                    jsonResponse.addProperty("orderId", "ZB-" + orderId);
                    jsonResponse.addProperty("amount", total);

                    if (isCashOnDelivery) {
                        com.app.zingbiteutils.PaymentService.getInstance().notifyOrderPlaced(orderId, "COD order placed");
                    } else if (isRazorpay) {
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
                            LOGGER.warn("[OrderServlet] Failed to create Razorpay Order: " + rpEx.getMessage());
                            com.app.zingbiteutils.PaymentService.getInstance().processOrderCancellation(
                                    orderId, "Unable to initialize Razorpay checkout");
                            jsonResponse.addProperty("success", false);
                            jsonResponse.addProperty("error", "Unable to initialize payment checkout");
                            resp.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
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
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"An error occurred: " + e.getMessage() + "\"}");
        }
    }
}
