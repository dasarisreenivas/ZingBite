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
        JsonArray availableRuns = new JsonArray();
        JsonArray activeDeliveries = new JsonArray();
        JsonArray completedDeliveries = new JsonArray();
        int totalEarnings = 0;

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

                if (o.getRiderId() == null) {
                    String status = o.getOrderStatus();
                    if ("Placed".equalsIgnoreCase(status) || 
                        "Preparing".equalsIgnoreCase(status) || 
                        "Waiting to Dispatch".equalsIgnoreCase(status) ||
                        "Out for Delivery".equalsIgnoreCase(status)) {
                        availableRuns.add(oJson);
                    }
                } else if (o.getRiderId() == user.getUserID()) {
                    if ("Delivered".equalsIgnoreCase(o.getOrderStatus())) {
                        completedDeliveries.add(oJson);
                        totalEarnings += 45; // 45 INR per trip
                    } else {
                        activeDeliveries.add(oJson);
                    }
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

            if ("acceptOrder".equals(action)) {
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
                // Default update status
                String status = requestBody.get("status").getAsString();
                order.setOrderStatus(status);
                ordersDAO.updateOrders(order);

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
