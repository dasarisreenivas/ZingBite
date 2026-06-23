package com.app.zingbiteServlets;

import jakarta.servlet.AsyncContext;
import jakarta.servlet.AsyncEvent;
import jakarta.servlet.AsyncListener;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import com.app.zingbiteutils.OrderEventBroker;
import com.app.zingbiteutils.GeoUtils;
import com.app.zingbiteutils.VRPRouteOptimizer;
import com.app.zingbiteutils.AuthorizationUtils;
import com.app.zingbitedao.OrdersDAo;
import com.app.zingbitedaoimpl.OrdersDAOImplementation;
import com.app.zingbitemodels.Orders;
import com.google.gson.JsonObject;
import com.google.gson.Gson;
import java.util.List;

@WebServlet(urlPatterns = "/api/order/stream", asyncSupported = true)
public class OrderTrackingSSEServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String orderIdParam = request.getParameter("orderId");
        if (orderIdParam == null || orderIdParam.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing orderId");
            return;
        }

        final int orderId;
        try {
            orderId = Integer.parseInt(orderIdParam.replace("ZB-", "").trim());
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid orderId");
            return;
        }

        com.app.zingbitemodels.User loggedInUser = AuthorizationUtils.requireAuthenticated(request);
        if (loggedInUser == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: Active session required");
            return;
        }

        final Orders order;
        try {
            OrdersDAo ordersDAO = new OrdersDAOImplementation();
            order = ordersDAO.getOrdersById(orderId);
        } catch (Exception ex) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Database error");
            return;
        }

        if (order == null) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Order not found");
            return;
        }

        boolean isCustomer = loggedInUser.getUserID() == order.getUserId();
        boolean isSuperAdmin = "super_admin".equalsIgnoreCase(loggedInUser.getRole());
        boolean isRestaurantAdmin = "restaurant_admin".equalsIgnoreCase(loggedInUser.getRole())
                && order.getRestaurantId() != null
                && order.getRestaurantId().getAdminId() != null
                && order.getRestaurantId().getAdminId() == loggedInUser.getUserID();
        boolean isAssignedRider = "delivery_partner".equalsIgnoreCase(loggedInUser.getRole())
                && order.getRiderId() != null
                && order.getRiderId() == loggedInUser.getUserID();
        boolean authorized = isCustomer || isSuperAdmin || isRestaurantAdmin || isAssignedRider;

        if (!authorized) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden: You are not authorized to track this order");
            return;
        }

        // Do not commit event-stream headers until authorization succeeds.
        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");

        final AsyncContext asyncContext = request.startAsync();
        asyncContext.setTimeout(0); // Infinite timeout for long-lived SSE connections

        final PrintWriter writer = response.getWriter();

        // Send initial connection establishment packet
        writer.write("event: connected\ndata: {}\n\n");
        writer.flush();

        final OrderEventBroker.SSEListener listener = new OrderEventBroker.SSEListener() {
            @Override
            public void onUpdate(String data) {
                synchronized (writer) {
                    writer.write("data: " + data + "\n\n");
                    writer.flush();
                }
            }
        };

        // Add listener to the event broker
        OrderEventBroker.getInstance().addListener(orderId, listener);

        // Fetch order details and push current status & paths immediately to the connected client
        try {
            if (order != null) {
                JsonObject initPayload = new JsonObject();
                initPayload.addProperty("orderId", orderId);
                initPayload.addProperty("status", order.getOrderStatus() != null ? order.getOrderStatus().name() : "PLACED");
                
                double progress = order.getGpsProgress() != null ? order.getGpsProgress() : 0.0;
                initPayload.addProperty("gpsProgress", progress);
                
                if (order.getGpsCoordinates() != null) {
                    initPayload.addProperty("gpsCoordinates", order.getGpsCoordinates());
                }
                
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

                // Include raw coordinates for map marker placement
                initPayload.addProperty("restaurantLat", restLat);
                initPayload.addProperty("restaurantLon", restLon);
                initPayload.addProperty("customerLat", custLat);
                initPayload.addProperty("customerLon", custLon);
                initPayload.addProperty("riderLat", rLat);
                initPayload.addProperty("riderLon", rLon);

                java.util.Map<String, List<VRPRouteOptimizer.Node>> vrpPaths = 
                    VRPRouteOptimizer.getVRPPathsForOrder(
                        rLat, rLon,
                        restLat, restLon,
                        custLat, custLon
                    );

                Gson sseGson = new Gson();
                initPayload.add("pathFM", sseGson.toJsonTree(vrpPaths.get("pathFM")));
                initPayload.add("pathLM1", sseGson.toJsonTree(vrpPaths.get("pathLM1")));
                
                listener.onUpdate(initPayload.toString());
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        // Remove listener when connection ends
        asyncContext.addListener(new AsyncListener() {
            @Override
            public void onComplete(AsyncEvent event) throws IOException {
                OrderEventBroker.getInstance().removeListener(orderId, listener);
            }

            @Override
            public void onTimeout(AsyncEvent event) throws IOException {
                OrderEventBroker.getInstance().removeListener(orderId, listener);
                asyncContext.complete();
            }

            @Override
            public void onError(AsyncEvent event) throws IOException {
                OrderEventBroker.getInstance().removeListener(orderId, listener);
                asyncContext.complete();
            }

            @Override
            public void onStartAsync(AsyncEvent event) throws IOException {
            }
        });
    }
}
