package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.persistence.LockModeType;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.OrderStatus;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.AuthorizationUtils;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.GeoUtils;
import com.app.zingbiteutils.OrderEventBroker;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/delivery/location")
public class RiderLocationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        if (!"delivery_partner".equals(user.getRole())) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only delivery partners can update location\"}");
            return;
        }

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

            if (requestBody == null || !requestBody.has("orderId")
                    || !requestBody.has("latitude") || !requestBody.has("longitude")) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"success\":false,\"error\":\"orderId, latitude, and longitude are required\"}");
                return;
            }

            // Parse Order ID (handling ZB- prefix if present)
            String orderIdStr = requestBody.get("orderId").getAsString().replace("ZB-", "").trim();
            int orderId = Integer.parseInt(orderIdStr);

            double latitude = requestBody.get("latitude").getAsDouble();
            double longitude = requestBody.get("longitude").getAsDouble();
            double bearing = requestBody.has("bearing") ? requestBody.get("bearing").getAsDouble() : 0.0;
            double etaMinutes = requestBody.has("etaMinutes") ? requestBody.get("etaMinutes").getAsDouble() : 0.0;
            double gpsProgress = requestBody.has("gpsProgress") ? requestBody.get("gpsProgress").getAsDouble() : 0.0;
            if (!Double.isFinite(latitude) || latitude < -90.0 || latitude > 90.0
                    || !Double.isFinite(longitude) || longitude < -180.0 || longitude > 180.0
                    || !Double.isFinite(bearing)
                    || !Double.isFinite(etaMinutes) || etaMinutes < 0.0 || etaMinutes > 1_440.0
                    || !Double.isFinite(gpsProgress) || gpsProgress < 0.0 || gpsProgress > 100.0) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"success\":false,\"error\":\"Invalid telemetry values\"}");
                return;
            }
            bearing = ((bearing % 360.0) + 360.0) % 360.0;

            // 1. Persist coordinates in the database transactionally
            Transaction tx = null;
            String status;
            try (Session hibernateSession = DBUtils.openSession()) {
                tx = hibernateSession.beginTransaction();
                Orders order = hibernateSession.find(Orders.class, orderId, LockModeType.PESSIMISTIC_WRITE);
                if (order == null) {
                    tx.rollback();
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"success\":false,\"error\":\"Order not found\"}");
                    return;
                }
                if (order.getRiderId() == null || order.getRiderId() != user.getUserID()) {
                    tx.rollback();
                    resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    resp.getWriter().write("{\"success\":false,\"error\":\"Order is not assigned to this rider\"}");
                    return;
                }
                if (order.getOrderStatus() == OrderStatus.CANCELLED
                        || order.getOrderStatus() == OrderStatus.DELIVERED) {
                    tx.rollback();
                    resp.setStatus(HttpServletResponse.SC_CONFLICT);
                    resp.getWriter().write("{\"success\":false,\"error\":\"Telemetry is closed for this order\"}");
                    return;
                }

                order.setGpsCoordinates(latitude + "," + longitude);
                if (requestBody.has("gpsProgress")) {
                    order.setGpsProgress(gpsProgress);
                }
                hibernateSession.merge(order);

                User rider = hibernateSession.get(User.class, user.getUserID());
                rider.setLatitude(latitude);
                rider.setLongitude(longitude);
                hibernateSession.merge(rider);
                status = order.getOrderStatus() != null ? order.getOrderStatus().name() : "PLACED";
                tx.commit();
            } catch (Exception e) {
                if (tx != null && tx.isActive()) tx.rollback();
                throw e;
            }
            GeoUtils.updateCachedCoordinates(user.getUserID(), latitude, longitude);

            // 2. Build the live SSE payload
            JsonObject ssePayload = new JsonObject();
            ssePayload.addProperty("event", "location_update");
            ssePayload.addProperty("orderId", orderId);
            ssePayload.addProperty("riderLat", latitude);
            ssePayload.addProperty("riderLon", longitude);
            ssePayload.addProperty("bearing", bearing);
            ssePayload.addProperty("status", status);
            ssePayload.addProperty("etaMinutes", etaMinutes);
            ssePayload.addProperty("gpsProgress", gpsProgress);

            // 3. Broadcast update to the order-specific SSE channel
            OrderEventBroker.getInstance().broadcastUpdate(orderId, ssePayload.toString());

            resp.getWriter().write("{\"success\":true}");

        } catch (IllegalArgumentException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"success\":false,\"error\":\"Invalid telemetry request\"}");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"success\":false,\"error\":\"Failed to ingest telemetry coordinate\"}");
        }
    }
}
