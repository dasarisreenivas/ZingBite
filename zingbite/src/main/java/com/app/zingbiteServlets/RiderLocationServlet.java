package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.AppConstants;
import com.app.zingbiteutils.DBUtils;
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

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }
        User user = (User) session.getAttribute("loggedInUser");
        if (!AppConstants.Role.DELIVERY_PARTNER.equals(user.getRole())) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only delivery partners can update location.\"}");
            return;
        }

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

            if (requestBody == null || !requestBody.has("orderId")) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"success\":false,\"error\":\"Missing orderId\"}");
                return;
            }

            // Parse Order ID (handling ZB- prefix if present)
            String orderIdStr = requestBody.get("orderId").getAsString().replace("ZB-", "").trim();
            int orderId = Integer.parseInt(orderIdStr);

            double latitude = requestBody.has("latitude") ? requestBody.get("latitude").getAsDouble() : 0.0;
            double longitude = requestBody.has("longitude") ? requestBody.get("longitude").getAsDouble() : 0.0;
            double bearing = requestBody.has("bearing") ? requestBody.get("bearing").getAsDouble() : 0.0;
            String status = requestBody.has("status") ? requestBody.get("status").getAsString() : "OUT_FOR_DELIVERY";
            double etaMinutes = requestBody.has("etaMinutes") ? requestBody.get("etaMinutes").getAsDouble() : 0.0;
            double gpsProgress = requestBody.has("gpsProgress") ? requestBody.get("gpsProgress").getAsDouble() : 0.0;

            // 1. Persist coordinates in the database transactionally
            Transaction tx = null;
            try (Session hibernateSession = DBUtils.openSession()) {
                tx = hibernateSession.beginTransaction();
                Orders order = hibernateSession.get(Orders.class, orderId);
                if (order != null) {
                    order.setGpsCoordinates(latitude + "," + longitude);
                    if (requestBody.has("gpsProgress")) {
                        order.setGpsProgress(gpsProgress);
                    }
                    hibernateSession.merge(order);
                }
                tx.commit();
            } catch (Exception e) {
                if (tx != null) tx.rollback();
                throw e;
            }

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

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"success\":false,\"error\":\"Failed to ingest telemetry coordinate\"}");
        }
    }
}
