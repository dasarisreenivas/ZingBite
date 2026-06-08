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
import com.app.zingbiteutils.DBUtils;
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
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");
        if (!"restaurant_admin".equals(user.getRole()) && !"customer".equals(user.getRole())) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only restaurant admins or onboarding customers can access this resource.\"}");
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
            String oHql = "from Orders order by orderId desc";
            Query<Orders> oQuery = hibernateSession.createQuery(oHql, Orders.class);
            List<Orders> allOrders = oQuery.list();
            
            JsonArray matchingOrders = new JsonArray();
            int targetRestaurantId = restaurant.getRestaurantId();

            for (Orders o : allOrders) {
                if (o.getRestaurantId() != null && o.getRestaurantId().getRestaurantId() == targetRestaurantId) {
                    JsonObject oJson = new JsonObject();
                    oJson.addProperty("orderId", o.getOrderId());
                    oJson.addProperty("formattedId", "ZB-" + o.getOrderId());
                    oJson.addProperty("status", o.getOrderStatus() != null ? o.getOrderStatus() : "Preparing");
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

            JsonObject responseJson = new JsonObject();
            responseJson.add("restaurant", gson.toJsonTree(restaurant));
            responseJson.add("menu", gson.toJsonTree(menuList));
            responseJson.add("orders", matchingOrders);

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
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : "";

            // If action is NOT submitRestaurantRequest, restrict to restaurant_admin role
            if (!"submitRestaurantRequest".equals(action)) {
                if (!"restaurant_admin".equals(user.getRole())) {
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().write("{\"error\":\"Forbidden: Only restaurant admins can access this resource.\"}");
                    return;
                }
            }

            Transaction tx = null;

            if ("submitRestaurantRequest".equals(action)) {
                String name = requestBody.get("name").getAsString();
                String cuisine = requestBody.get("cuisine").getAsString();
                String address = requestBody.get("address").getAsString();
                String deliveryTime = requestBody.has("deliveryTime") ? requestBody.get("deliveryTime").getAsString() : "30 mins";
                String imagePath = requestBody.has("imagePath") ? requestBody.get("imagePath").getAsString() : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop";
                String licenseNo = requestBody.get("licenseNo").getAsString();
                String aadhaarNo = requestBody.get("aadhaarNo").getAsString();
                String gstNo = requestBody.get("gstNo").getAsString();

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
                String name = requestBody.get("name").getAsString();
                double price = requestBody.get("price").getAsDouble();
                String description = requestBody.get("description").getAsString();
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

                        resp.getWriter().write("{\"success\":true}");
                    } catch (Exception e) {
                        if (tx != null) tx.rollback();
                        throw e;
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

                    order.setOrderStatus(status);
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

                    // Broadcast SSE Update
                    JsonObject ssePayload = new JsonObject();
                    ssePayload.addProperty("orderId", orderId);
                    ssePayload.addProperty("status", status);
                    com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastUpdate(orderId, ssePayload.toString());
                    // Broadcast Topic SSE Update
                    try {
                        JsonObject msg = new JsonObject();
                        msg.addProperty("event", "status_update");
                        msg.addProperty("orderId", orderId);
                        msg.addProperty("status", status);
                        com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:user_orders:" + order.getUserId(), msg.toString());
                        if (order.getRestaurantId() != null) {
                            com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:restaurant_orders:" + order.getRestaurantId().getRestaurantId(), msg.toString());
                        }
                        if (order.getRiderId() != null) {
                            com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:rider_orders:" + order.getRiderId(), msg.toString());
                        }
                        com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate("topic:rider_orders", msg.toString());
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }

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
            resp.getWriter().write("{\"error\":\"Operation failed\"}");
        }
    }
}
