package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.app.zingbiteutils.PaymentService;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet(urlPatterns = { "/api/payment/verify", "/api/payment/webhook" })
public class PaymentVerificationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String path = req.getServletPath();
        
        try {
            BufferedReader reader = req.getReader();
            JsonObject reqJson = JsonParser.parseReader(reader).getAsJsonObject();
            
            if (reqJson == null || !reqJson.has("orderId")) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"success\":false,\"error\":\"Missing orderId\"}");
                return;
            }

            String orderIdStr = reqJson.get("orderId").getAsString().replace("ZB-", "").trim();
            int orderId = Integer.parseInt(orderIdStr);

            String transactionId = reqJson.has("transactionId") ? reqJson.get("transactionId").getAsString() : "";
            String paymentMethod = reqJson.has("paymentMethod") ? reqJson.get("paymentMethod").getAsString() : "Razorpay";

            if ("/api/payment/verify".equals(path)) {
                // Client-initiated verification
                System.out.println("[PaymentVerification] Verifying payment for ZB-" + orderId + ", txn: " + transactionId);
                
                try {
                    String gatewayStatus = PaymentService.getInstance().verifyPaymentOnGateway(transactionId);
                    
                    if ("COMPLETED".equals(gatewayStatus)) {
                        boolean captured = PaymentService.getInstance().processOrderCapture(orderId, transactionId, paymentMethod);
                        if (captured) {
                            resp.getWriter().write("{\"success\":true,\"status\":\"COMPLETED\"}");
                        } else {
                            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                            resp.getWriter().write("{\"success\":false,\"error\":\"Failed to capture order in DB\"}");
                        }
                    } else {
                        PaymentService.getInstance().processOrderCancellation(orderId, "Gateway returned failure status during client verify");
                        resp.getWriter().write("{\"success\":false,\"status\":\"FAILED\",\"error\":\"Payment was declined by card issuer\"}");
                    }
                } catch (Exception timeoutEx) {
                    System.err.println("[PaymentVerification] Gateway connection timeout for ZB-" + orderId + ": " + timeoutEx.getMessage());
                    resp.setStatus(HttpServletResponse.SC_GATEWAY_TIMEOUT);
                    resp.getWriter().write("{\"success\":false,\"error\":\"Gateway connection timeout. Payment will be reconciled shortly in the background.\"}");
                }

            } else if ("/api/payment/webhook".equals(path)) {
                // Server-to-server webhook simulation callback
                String status = reqJson.has("status") ? reqJson.get("status").getAsString() : "COMPLETED";
                System.out.println("[PaymentWebhook] Webhook triggered for ZB-" + orderId + ", status: " + status + ", txn: " + transactionId);
                
                if ("COMPLETED".equalsIgnoreCase(status)) {
                    PaymentService.getInstance().processOrderCapture(orderId, transactionId, paymentMethod);
                } else {
                    PaymentService.getInstance().processOrderCancellation(orderId, "Webhook status returned failure");
                }
                
                resp.getWriter().write("{\"success\":true}");
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"success\":false,\"error\":\"An internal error occurred: " + e.getMessage() + "\"}");
        }
    }
}
