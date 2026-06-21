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

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitedaoimpl.OrdersDAOImplementation;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.RestaurantRequest;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.OrderHistory;
import com.app.zingbitemodels.OrderStatus;
import com.app.zingbitemodels.ComboMapping;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/restaurant-admin")
public class RestaurantAdminServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
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
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        // Refresh user from DB to pick up any role changes after admin approval
        try (Session refreshSession = DBUtils.openSession()) {
            User freshUser = refreshSession.get(User.class, user.getUserID());
            if (freshUser != null) {
                if (!user.getRole().equals(freshUser.getRole())) {
                    session.setAttribute("loggedInUser", freshUser);
                    user = freshUser;
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        if (!"restaurant_admin".equals(user.getRole()) && !"customer".equals(user.getRole()) && !"super_admin".equals(user.getRole())) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only restaurant admins, onboarding customers or super admins can access this resource.\"}");
            return;
        }

        Gson gson = new Gson();

        try (Session hibernateSession = DBUtils.openSession()) {
            // Find restaurant managed by this admin
            String rHql = "from Restaurant where adminId = :adminId";
            Query<Restaurant> rQuery = hibernateSession.createQuery(rHql, Restaurant.class);
            rQuery.setParameter("adminId", user.getUserID());
            Restaurant restaurant = rQuery.uniqueResult();

            if (restaurant == null) {
                // If they managing no active restaurant, check if they have a pending onboarding request
                String reqHql = "from RestaurantRequest where adminId = :adminId order by id desc";
                Query<RestaurantRequest> reqQuery = hibernateSession.createQuery(reqHql, RestaurantRequest.class);
                reqQuery.setParameter("adminId", user.getUserID());
                List<RestaurantRequest> reqList = reqQuery.list();
                
                JsonObject responseJson = new JsonObject();
                if (!reqList.isEmpty()) {
                    responseJson.add("request", gson.toJsonTree(reqList.get(0)));
                } else {
                    responseJson.add("request", null);
                }
                resp.getWriter().write(responseJson.toString());
                return;
            }

            // Fetch menu
            String mHql = "from Menu where restaurant.restaurantId = :restaurantId";
            Query<Menu> mQuery = hibernateSession.createQuery(mHql, Menu.class);
            mQuery.setParameter("restaurantId", restaurant.getRestaurantId());
            List<Menu> menuList = mQuery.list();

            // Fetch orders
            String oHql = "from Orders where orderStatus != :pendingStatus order by orderId desc";
            Query<Orders> oQuery = hibernateSession.createQuery(oHql, Orders.class);
            oQuery.setParameter("pendingStatus", OrderStatus.PENDING_PAYMENT);
            List<Orders> allOrders = oQuery.list();
            
            JsonArray matchingOrders = new JsonArray();
            int targetRestaurantId = restaurant.getRestaurantId();

            for (Orders o : allOrders) {
                if (o.getRestaurantId() != null && o.getRestaurantId().getRestaurantId() == targetRestaurantId) {
                    JsonObject oJson = new JsonObject();
                    oJson.addProperty("orderId", o.getOrderId());
                    oJson.addProperty("formattedId", "ZB-" + o.getOrderId());
                    oJson.addProperty("status", o.getOrderStatus() != null ? o.getOrderStatus().name() : "PREPARING");
                    oJson.addProperty("total", o.getTotalAmount());
                    oJson.addProperty("time", o.getOrderTime() != null ? o.getOrderTime() : "Today");
                    
                    // User check
                    User orderUser = hibernateSession.get(User.class, o.getUserId());
                    oJson.addProperty("userName", orderUser != null ? orderUser.getUserName() : "Customer");
                    oJson.addProperty("userPhone", orderUser != null ? String.valueOf(orderUser.getPhoneNumber()) : "");
                    oJson.addProperty("userAddress", orderUser != null ? orderUser.getAddress() : "");
                    
                    // Rider check
                    if (o.getRiderId() != null) {
                        User rider = hibernateSession.get(User.class, o.getRiderId());
                        oJson.addProperty("riderName", rider != null ? rider.getUserName() : "Rider");
                    } else {
                        oJson.addProperty("riderName", (String) null);
                    }
                    
                    matchingOrders.add(oJson);
                }
            }

            JsonObject analyticsJson = new JsonObject();
            try {
                int restaurantId = restaurant.getRestaurantId();

                // 1. Total Revenue query
                String revHql = "select coalesce(sum(o.totalAmount), 0.0) from Orders o " +
                                 "where o.restaurantId.restaurantId = :restaurantId " +
                                 "  and o.orderStatus = com.app.zingbitemodels.OrderStatus.DELIVERED";
                Double totalRevenueVal = hibernateSession.createQuery(revHql, Double.class)
                    .setParameter("restaurantId", restaurantId)
                    .uniqueResult();
                double totalRevenue = totalRevenueVal != null ? totalRevenueVal : 0.0;

                // 2. Order Volume query
                String volHql = "select count(o.orderId) from Orders o " +
                                 "where o.restaurantId.restaurantId = :restaurantId " +
                                 "  and o.orderStatus != com.app.zingbitemodels.OrderStatus.PENDING_PAYMENT";
                Long orderVolumeVal = hibernateSession.createQuery(volHql, Long.class)
                    .setParameter("restaurantId", restaurantId)
                    .uniqueResult();
                long orderVolume = orderVolumeVal != null ? orderVolumeVal : 0L;

                // 3. Bestselling items query
                String bestHql = "select m.menuName, sum(oi.quantity), sum(oi.subTotal) " +
                                 "from OrderItem oi, Orders o, Menu m " +
                                 "where oi.orderId = o.orderId " +
                                 "  and oi.menuId = m.menuId " +
                                 "  and o.restaurantId.restaurantId = :restaurantId " +
                                 "  and o.orderStatus = com.app.zingbitemodels.OrderStatus.DELIVERED " +
                                 "group by m.menuName " +
                                 "order by sum(oi.quantity) desc";
                List<Object[]> bestsellingList = hibernateSession.createQuery(bestHql, Object[].class)
                    .setParameter("restaurantId", restaurantId)
                    .setMaxResults(5)
                    .list();
                    
                JsonArray bestArray = new JsonArray();
                for (Object[] row : bestsellingList) {
                    JsonObject item = new JsonObject();
                    item.addProperty("name", (String) row[0]);
                    item.addProperty("quantity", ((Number) row[1]).intValue());
                    item.addProperty("revenue", ((Number) row[2]).doubleValue());
                    bestArray.add(item);
                }

                // 4. Daily Sales query
                String dailyHql = "select o.orderTime, sum(o.totalAmount) " +
                                  "from Orders o " +
                                  "where o.restaurantId.restaurantId = :restaurantId " +
                                  "  and o.orderStatus = com.app.zingbitemodels.OrderStatus.DELIVERED " +
                                  "group by o.orderTime " +
                                  "order by min(o.statusUpdatedAt) asc";
                List<Object[]> dailyList = hibernateSession.createQuery(dailyHql, Object[].class)
                    .setParameter("restaurantId", restaurantId)
                    .setMaxResults(7)
                    .list();

                JsonArray dailyArray = new JsonArray();
                for (Object[] row : dailyList) {
                    JsonObject day = new JsonObject();
                    day.addProperty("date", (String) row[0]);
                    day.addProperty("revenue", ((Number) row[1]).doubleValue());
                    dailyArray.add(day);
                }

                analyticsJson.addProperty("totalRevenue", totalRevenue);
                analyticsJson.addProperty("orderVolume", orderVolume);
                analyticsJson.add("bestsellingItems", bestArray);
                analyticsJson.add("dailySales", dailyArray);
            } catch (Exception ex) {
                System.err.println("Failed to fetch restaurant analytics: " + ex.getMessage());
                ex.printStackTrace();
            }

            JsonObject responseJson = new JsonObject();
            responseJson.add("restaurant", gson.toJsonTree(restaurant));
            responseJson.add("menu", gson.toJsonTree(menuList));
            responseJson.add("orders", matchingOrders);
            responseJson.add("analytics", analyticsJson);

            resp.getWriter().write(responseJson.toString());

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to load restaurant data\"}");
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
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
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
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        try {
            // Refresh user from DB to pick up role changes
            try (Session refreshSession = DBUtils.openSession()) {
                User freshUser = refreshSession.get(User.class, user.getUserID());
                if (freshUser != null) {
                    if (!user.getRole().equals(freshUser.getRole())) {
                        session.setAttribute("loggedInUser", freshUser);
                        user = freshUser;
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }

            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : "";

            // If action is NOT submitRestaurantRequest, restrict to restaurant_admin or super_admin role
            if (!"submitRestaurantRequest".equals(action)) {
                if (!"restaurant_admin".equals(user.getRole()) && !"super_admin".equals(user.getRole())) {
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().write("{\"error\":\"Forbidden: Only restaurant admins or super admins can access this resource. Your current role is: " + user.getRole() + "\"}");
                    return;
                }
            }

            Transaction tx = null;

            if ("submitRestaurantRequest".equals(action)) {
                String name = SanitizationUtils.escapeHtml(requestBody.get("name").getAsString());
                String cuisine = SanitizationUtils.escapeHtml(requestBody.get("cuisine").getAsString());
                String address = SanitizationUtils.escapeHtml(requestBody.get("address").getAsString());
                String deliveryTime = requestBody.has("deliveryTime") ? SanitizationUtils.escapeHtml(requestBody.get("deliveryTime").getAsString()) : "30 mins";
                String imagePath = requestBody.has("imagePath") ? requestBody.get("imagePath").getAsString() : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop";
                String licenseNo = SanitizationUtils.escapeHtml(requestBody.get("licenseNo").getAsString());
                String aadhaarNo = SanitizationUtils.escapeHtml(requestBody.get("aadhaarNo").getAsString());
                String gstNo = SanitizationUtils.escapeHtml(requestBody.get("gstNo").getAsString());

                // Rate limit: check for existing PENDING request
                try (Session checkSession = DBUtils.openSession()) {
                    String countHql = "select count(r) from RestaurantRequest r where r.adminId = :adminId and r.status = :status";
                    Query<Long> countQuery = checkSession.createQuery(countHql, Long.class);
                    countQuery.setParameter("adminId", user.getUserID());
                    countQuery.setParameter("status", "Pending");
                    Long pendingCount = countQuery.uniqueResult();
                    if (pendingCount != null && pendingCount > 0) {
                        resp.setStatus(HttpServletResponse.SC_CONFLICT);
                        resp.getWriter().write("{\"error\":\"You already have a pending restaurant request. Please wait for it to be reviewed.\"}");
                        return;
                    }
                } catch (Exception rateEx) {
                    rateEx.printStackTrace();
                }

                RestaurantRequest request = new RestaurantRequest(
                    name, cuisine, address, deliveryTime, imagePath,
                    licenseNo, aadhaarNo, gstNo, user.getUserID(),
                    new SimpleDateFormat("MMMM dd, yyyy").format(new Date())
                );

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    hibernateSession.persist(request);
                    tx.commit();
                    resp.getWriter().write("{\"success\":true}");
                    // Broadcast new onboarding request to admin
                    try {
                        JsonObject sseMsg = new JsonObject();
                        sseMsg.addProperty("event", "new_request");
                        com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:admin_requests", sseMsg.toString());
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }

            } else if ("toggleRestaurantStatus".equals(action)) {
                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    String rHql = "from Restaurant where adminId = :adminId";
                    Query<Restaurant> rQuery = hibernateSession.createQuery(rHql, Restaurant.class);
                    rQuery.setParameter("adminId", user.getUserID());
                    Restaurant restaurant = rQuery.uniqueResult();
                    if (restaurant != null) {
                        boolean currentStatus = restaurant.isOpen();
                        boolean newStatus = !currentStatus;
                        restaurant.setOpen(newStatus);
                        hibernateSession.merge(restaurant);
                        tx.commit();
                        
                        int restaurantId = restaurant.getRestaurantId();
                        MenuServlet.menuCache.remove(restaurantId);
                        HomeServlet.restaurantCache.remove("all");
                        HomeServlet.menuSearchCache.clear();

                        try {
                            JsonObject sseMsg = new JsonObject();
                            sseMsg.addProperty("event", "restaurant_status_update");
                            sseMsg.addProperty("restaurantId", restaurantId);
                            sseMsg.addProperty("isOpen", newStatus);
                            com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:menu:" + restaurantId, sseMsg.toString());
                        } catch (Exception sseEx) {
                            sseEx.printStackTrace();
                        }
                        
                        JsonObject jsonResponse = new JsonObject();
                        jsonResponse.addProperty("success", true);
                        jsonResponse.addProperty("isOpen", newStatus);
                        resp.getWriter().write(jsonResponse.toString());
                        return;
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        resp.getWriter().write("{\"error\":\"Restaurant not found for this admin\"}");
                        return;
                    }
                } catch (Exception ex) {
                    if (tx != null) tx.rollback();
                    ex.printStackTrace();
                    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    resp.getWriter().write("{\"error\":\"Failed to toggle restaurant status\"}");
                    return;
                }

            } else if ("toggleAvailability".equals(action)) {
                int menuId = requestBody.get("menuId").getAsInt();
                boolean isAvailable = requestBody.get("isAvailable").getAsBoolean();

                try (Session hibernateSession = DBUtils.openSession()) {
                    tx = hibernateSession.beginTransaction();
                    Menu menu = hibernateSession.get(Menu.class, menuId);
                    if (menu != null) {
                        // IDOR check: Verify ownership
                        Restaurant restaurant = menu.getRestaurant();
                        if (restaurant == null || restaurant.getAdminId() == null || restaurant.getAdminId() != user.getUserID()) {
                            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            resp.getWriter().write("{\"error\":\"Forbidden: You do not own this restaurant item.\"}");
                            return;
                        }

                        menu.setAvailable(isAvailable);
                        hibernateSession.merge(menu);
                        tx.commit();

                        // Invalidate LRU Cache
                        MenuServlet.menuCache.remove(restaurant.getRestaurantId());
                        HomeServlet.menuSearchCache.clear();

                        resp.getWriter().write("{\"success\":true}");
                        // Broadcast menu update
                        try {
                            JsonObject sseMsg = new JsonObject();
                            sseMsg.addProperty("event", "menu_update");
                            sseMsg.addProperty("menuId", menuId);
                            sseMsg.addProperty("isAvailable", isAvailable);
                            com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:menu:" + restaurant.getRestaurantId(), sseMsg.toString());
                        } catch (Exception ex) {
                            ex.printStackTrace();
                        }
                    } else {
                        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        resp.getWriter().write("{\"error\":\"Menu item not found\"}");
                    }
                } catch (Exception e) {
                    if (tx != null) tx.rollback();
                    throw e;
                }

            } else if ("addMenuItem".equals(action)) {
                String name = SanitizationUtils.escapeHtml(requestBody.get("name").getAsString());
                double price = requestBody.get("price").getAsDouble();
                String description = SanitizationUtils.escapeHtml(requestBody.get("description").getAsString());
                String imagePath = requestBody.has("imagePath") ? requestBody.get("imagePath").getAsString() : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop";
                int restaurantId = requestBody.get("restaurantId").getAsInt();

                Restaurant restaurant = new RestaurantDAOImplementation().getRestaurantById(restaurantId);
                if (restaurant != null) {
                    // IDOR check: Verify ownership
                    if (restaurant.getAdminId() == null || restaurant.getAdminId() != user.getUserID()) {
                        resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        resp.getWriter().write("{\"error\":\"Forbidden: You do not own this restaurant.\"}");
                        return;
                    }

                    Menu menu = new Menu(restaurant, name, price, description, true, imagePath);
                    
                    try (Session hibernateSession = DBUtils.openSession()) {
                        tx = hibernateSession.beginTransaction();
                        hibernateSession.persist(menu);
                        tx.commit();

                        // Invalidate LRU Cache
                        MenuServlet.menuCache.remove(restaurantId);
                        HomeServlet.menuSearchCache.clear();

                        resp.getWriter().write("{\"success\":true}");
                    } catch (Exception e) {
                        if (tx != null) tx.rollback();
                        throw e;
                    }
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"error\":\"Restaurant not found\"}");
                }

            } else if ("createCombo".equals(action)) {
                String name = requestBody.has("name") && !requestBody.get("name").isJsonNull() ? SanitizationUtils.escapeHtml(requestBody.get("name").getAsString()) : "Combo";
                double price = requestBody.has("price") && !requestBody.get("price").isJsonNull() ? requestBody.get("price").getAsDouble() : 0.0;
                String description = requestBody.has("description") && !requestBody.get("description").isJsonNull() ? SanitizationUtils.escapeHtml(requestBody.get("description").getAsString()) : "Special combo pack";
                String imagePath = requestBody.has("imagePath") && !requestBody.get("imagePath").isJsonNull() ? requestBody.get("imagePath").getAsString() : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop";
                int restaurantId = requestBody.has("restaurantId") && !requestBody.get("restaurantId").isJsonNull() ? requestBody.get("restaurantId").getAsInt() : 0;
                
                JsonArray menuIdsArray = null;
                if (requestBody.has("menuIds")) {
                    menuIdsArray = requestBody.getAsJsonArray("menuIds");
                } else if (requestBody.has("constituentItems")) {
                    menuIdsArray = requestBody.getAsJsonArray("constituentItems");
                } else {
                    menuIdsArray = new JsonArray();
                }

                Restaurant restaurant = new RestaurantDAOImplementation().getRestaurantById(restaurantId);
                if (restaurant != null) {
                    if (!"super_admin".equals(user.getRole()) && (restaurant.getAdminId() == null || restaurant.getAdminId() != user.getUserID())) {
                        resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        resp.getWriter().write("{\"error\":\"Forbidden: You do not own this restaurant.\"}");
                        return;
                    }

                    Menu menu = new Menu(restaurant, name, price, description, true, imagePath);
                    menu.setType("COMBO");
                    
                    try (Session hibernateSession = DBUtils.openSession()) {
                        tx = hibernateSession.beginTransaction();
                        hibernateSession.persist(menu);
                        
                        for (int i = 0; i < menuIdsArray.size(); i++) {
                            int mappedMenuId = menuIdsArray.get(i).getAsInt();
                            ComboMapping mapping = new ComboMapping(menu.getMenuId(), mappedMenuId);
                            hibernateSession.persist(mapping);
                        }
                        tx.commit();

                        MenuServlet.menuCache.remove(restaurantId);
                        HomeServlet.menuSearchCache.clear();

                        JsonObject responseJson = new JsonObject();
                        responseJson.addProperty("success", true);
                        responseJson.addProperty("menuId", menu.getMenuId());
                        responseJson.addProperty("comboId", menu.getMenuId());
                        resp.getWriter().write(responseJson.toString());
                    } catch (Exception e) {
                        if (tx != null) tx.rollback();
                        e.printStackTrace();
                        resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                        resp.getWriter().write("{\"error\":\"Exception: " + e.getMessage() + "\"}");
                        return;
                    }
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"error\":\"Restaurant not found\"}");
                }

            } else if ("updateOrderStatus".equals(action)) {
                int orderId = requestBody.get("orderId").getAsInt();
                String status = requestBody.get("status").getAsString();

                OrdersDAOImplementation ordersDAO = new OrdersDAOImplementation();
                Orders order = ordersDAO.getOrdersById(orderId);

                if (order != null) {
                    // IDOR check: Verify restaurant admin ownership
                    Restaurant restaurant = order.getRestaurantId();
                    if (restaurant == null || restaurant.getAdminId() == null || restaurant.getAdminId() != user.getUserID()) {
                        resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        resp.getWriter().write("{\"error\":\"Forbidden: This order does not belong to your restaurant.\"}");
                        return;
                    }

                    OrderStatus targetStatus = OrderStatus.parse(status);
                    OrderStatus currentStatus = order.getOrderStatus() != null ? order.getOrderStatus() : OrderStatus.PLACED;
                    if (!currentStatus.canTransitionTo(targetStatus)) {
                        resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                        resp.getWriter().write("{\"error\":\"Invalid status transition from " + currentStatus + " to " + targetStatus + "\"}");
                        return;
                    }
                    order.setOrderStatus(targetStatus);
                    ordersDAO.updateOrders(order);

                    // Send stage status update email to the customer
                    try (Session hibernateSession = DBUtils.openSession()) {
                        User customer = hibernateSession.get(User.class, order.getUserId());
                        if (customer != null) {
                            com.app.zingbiteutils.EmailService.sendEmailAsync(
                                customer.getUserID(),
                                customer.getEmail(),
                                "Order status update: ZB-" + orderId,
                                com.app.zingbiteutils.EmailTemplates.orderStatusUpdate(customer.getUserName(), orderId, status)
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
                        "restaurant_admin",
                        "Status updated by restaurant admin: " + user.getUserName()
                    );

                    resp.getWriter().write("{\"success\":true}");
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"error\":\"Order not found\"}");
                }
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Invalid action\"}");
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            java.io.StringWriter sw = new java.io.StringWriter();
            java.io.PrintWriter pw = new java.io.PrintWriter(sw);
            e.printStackTrace(pw);
            resp.getWriter().write("{\"error\":\"Operation failed: " + e.getMessage() + "\", \"trace\": \"" + sw.toString().replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r") + "\"}");
        }
    }
}
