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
            String razorpayPaymentId = reqJson.has("razorpayPaymentId") ? reqJson.get("razorpayPaymentId").getAsString() : "";
            String razorpayOrderId = reqJson.has("razorpayOrderId") ? reqJson.get("razorpayOrderId").getAsString() : "";
            String razorpaySignature = reqJson.has("razorpaySignature") ? reqJson.get("razorpaySignature").getAsString() : "";

            if ("/api/payment/verify".equals(path)) {
                System.out.println("[PaymentVerification] Verifying payment for ZB-" + orderId + ", txn: " + transactionId);
                
                try {
                    String gatewayStatus;
                    // Use signature-based verification when Razorpay provides all three fields
                    if (!razorpayPaymentId.isEmpty() && !razorpayOrderId.isEmpty() && !razorpaySignature.isEmpty()) {
                        gatewayStatus = PaymentService.getInstance().verifyRazorpaySignatureAndFetchStatus(razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId);
                    } else {
                        gatewayStatus = PaymentService.getInstance().verifyPaymentOnGateway(transactionId, orderId);
                    }
                    
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
                String webhookSecret = System.getenv("RAZORPAY_WEBHOOK_SECRET");
                if (webhookSecret == null || webhookSecret.isEmpty()) {
                    webhookSecret = System.getProperty("RAZORPAY_WEBHOOK_SECRET");
                }
                if (webhookSecret != null && !webhookSecret.isEmpty()) {
                    String receivedSignature = req.getHeader("X-Razorpay-Signature");
                    if (receivedSignature == null || receivedSignature.isEmpty()) {
                        resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        resp.getWriter().write("{\"success\":false,\"error\":\"Missing webhook signature\"}");
                        return;
                    }
                    try {
                        String payload = reqJson.toString();
                        javax.crypto.Mac sha256Hmac = javax.crypto.Mac.getInstance("HmacSHA256");
                        javax.crypto.spec.SecretKeySpec secretKey = new javax.crypto.spec.SecretKeySpec(webhookSecret.getBytes("UTF-8"), "HmacSHA256");
                        sha256Hmac.init(secretKey);
                        byte[] hash = sha256Hmac.doFinal(payload.getBytes("UTF-8"));
                        StringBuilder hexString = new StringBuilder();
                        for (byte b : hash) {
                            String hex = Integer.toHexString(0xff & b);
                            if (hex.length() == 1) hexString.append('0');
                            hexString.append(hex);
                        }
                        if (!hexString.toString().equals(receivedSignature)) {
                            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            resp.getWriter().write("{\"success\":false,\"error\":\"Invalid webhook signature\"}");
                            return;
                        }
                    } catch (Exception sigEx) {
                        System.err.println("[PaymentWebhook] Signature verification failed: " + sigEx.getMessage());
                    }
                }
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
