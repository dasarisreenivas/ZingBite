package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.hibernate.Session;

import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.Payment;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;

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

        try {
            StringBuilder bodyBuilder = new StringBuilder();
            try (BufferedReader reader = req.getReader()) {
                String line;
                while ((line = reader.readLine()) != null) {
                    bodyBuilder.append(line);
                }
            }
            String rawBody = bodyBuilder.toString();
            if (rawBody.isBlank()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"success\":false,\"error\":\"Empty request body\"}");
                return;
            }

            if ("/api/payment/webhook".equals(req.getServletPath())) {
                handleWebhook(req, resp, rawBody);
                return;
            }

            JsonObject reqJson = JsonParser.parseString(rawBody).getAsJsonObject();
            if (!reqJson.has("orderId")) {
                sendError(resp, HttpServletResponse.SC_BAD_REQUEST, "Missing orderId");
                return;
            }
            String orderIdStr = reqJson.get("orderId").getAsString().replace("ZB-", "").trim();
            int orderId = Integer.parseInt(orderIdStr);
            String transactionId = reqJson.has("transactionId") ? reqJson.get("transactionId").getAsString() : "";
            String razorpayPaymentId = reqJson.has("razorpayPaymentId") ? reqJson.get("razorpayPaymentId").getAsString() : "";
            String razorpayOrderId = reqJson.has("razorpayOrderId") ? reqJson.get("razorpayOrderId").getAsString() : "";
            String razorpaySignature = reqJson.has("razorpaySignature") ? reqJson.get("razorpaySignature").getAsString() : "";

            VerificationContext context = authorizeOrder(req, orderId);
            if (context == null) {
                sendError(resp, HttpServletResponse.SC_FORBIDDEN, "You are not authorized to verify this order");
                return;
            }

            String gatewayStatus;
            if ("Razorpay".equalsIgnoreCase(context.paymentMethod)) {
                if (PaymentService.isPaymentTestMode()) {
                    if (razorpayPaymentId.isBlank()) razorpayPaymentId = "mock_razorpay_payment_id";
                    if (razorpayOrderId.isBlank()) razorpayOrderId = "mock_razorpay_order_id";
                    if (razorpaySignature.isBlank()) razorpaySignature = "mock_razorpay_signature";
                } else {
                    if (razorpayPaymentId.isBlank() || razorpayOrderId.isBlank() || razorpaySignature.isBlank()) {
                        sendError(resp, HttpServletResponse.SC_BAD_REQUEST, "Complete Razorpay verification data is required");
                        return;
                    }
                }
                transactionId = razorpayPaymentId;
                gatewayStatus = PaymentService.getInstance().verifyRazorpaySignatureAndFetchStatus(
                        razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId);
            } else {
                if (PaymentService.isPaymentTestMode() && (transactionId == null || transactionId.isBlank())) {
                    transactionId = "mock_test_txn_" + orderId;
                }
                gatewayStatus = PaymentService.getInstance().verifyPaymentOnGateway(transactionId, orderId);
            }

            if ("COMPLETED".equals(gatewayStatus)) {
                boolean captured = PaymentService.getInstance().processOrderCapture(
                        orderId, transactionId, context.paymentMethod);
                if (captured) {
                    resp.getWriter().write("{\"success\":true,\"status\":\"COMPLETED\"}");
                } else {
                    sendError(resp, HttpServletResponse.SC_CONFLICT, "Order could not be transitioned to paid");
                }
            } else if ("FAILED".equals(gatewayStatus)) {
                PaymentService.getInstance().processOrderCancellation(
                        orderId, "Payment provider returned a terminal failure");
                sendError(resp, HttpServletResponse.SC_PAYMENT_REQUIRED, "Payment was declined");
            } else {
                resp.setStatus(HttpServletResponse.SC_ACCEPTED);
                resp.getWriter().write("{\"success\":false,\"status\":\"PENDING\"}");
            }
        } catch (SecurityException e) {
            System.err.println("[PaymentVerification] Rejected payment proof: " + e.getMessage());
            sendError(resp, HttpServletResponse.SC_BAD_REQUEST, "Payment proof is invalid");
        } catch (IllegalArgumentException e) {
            sendError(resp, HttpServletResponse.SC_BAD_REQUEST, "Payment verification request is invalid");
        } catch (Exception e) {
            System.err.println("[PaymentVerification] Verification failed: " + e.getMessage());
            sendError(resp, HttpServletResponse.SC_BAD_GATEWAY, "Payment verification could not be completed");
        }
    }

    private VerificationContext authorizeOrder(HttpServletRequest req, int orderId) {
        HttpSession httpSession = req.getSession(false);
        if (httpSession == null || !(httpSession.getAttribute("loggedInUser") instanceof User sessionUser)) {
            return null;
        }
        try (Session dbSession = DBUtils.openSession()) {
            User currentUser = dbSession.get(User.class, sessionUser.getUserID());
            Orders order = dbSession.get(Orders.class, orderId);
            if (currentUser == null || Boolean.TRUE.equals(currentUser.getBlocked()) || order == null) {
                return null;
            }
            boolean ownsOrder = order.getUserId() == currentUser.getUserID();
            boolean isSuperAdmin = "super_admin".equals(currentUser.getRole());
            return ownsOrder || isSuperAdmin
                    ? new VerificationContext(order.getPaymentMethod())
                    : null;
        }
    }

    private void handleWebhook(HttpServletRequest req, HttpServletResponse resp, String rawBody) throws Exception {
        String secret = getConfig("RAZORPAY_WEBHOOK_SECRET");
        if (secret == null || secret.isBlank()) {
            sendError(resp, HttpServletResponse.SC_SERVICE_UNAVAILABLE, "Webhook verification is not configured");
            return;
        }
        String receivedSignature = req.getHeader("X-Razorpay-Signature");
        if (!PaymentService.isPaymentTestMode()) {
            if (receivedSignature == null || !verifyWebhookSignature(rawBody, receivedSignature, secret)) {
                sendError(resp, HttpServletResponse.SC_UNAUTHORIZED, "Invalid webhook signature");
                return;
            }
        }

        JsonObject root = JsonParser.parseString(rawBody).getAsJsonObject();
        String event = root.has("event") ? root.get("event").getAsString() : "";
        JsonObject paymentEntity = root.getAsJsonObject("payload")
                .getAsJsonObject("payment")
                .getAsJsonObject("entity");
        String gatewayOrderId = paymentEntity.get("order_id").getAsString();
        String gatewayPaymentId = paymentEntity.get("id").getAsString();
        long gatewayAmount = paymentEntity.get("amount").getAsLong();

        Payment storedPayment;
        try (Session dbSession = DBUtils.openSession()) {
            storedPayment = dbSession.createQuery(
                    "from Payment where razorpayOrderId = :razorpayOrderId", Payment.class)
                    .setParameter("razorpayOrderId", gatewayOrderId)
                    .uniqueResult();
        }
        if (storedPayment == null || gatewayAmount != Math.round(storedPayment.getAmount() * 100)) {
            sendError(resp, HttpServletResponse.SC_BAD_REQUEST, "Webhook payment does not match an order");
            return;
        }

        if ("payment.captured".equals(event) || "payment.authorized".equals(event)) {
            String status = PaymentService.getInstance().verifyPaymentOnGateway(
                    gatewayPaymentId, storedPayment.getOrderId());
            if (!"COMPLETED".equals(status) || !PaymentService.getInstance().processOrderCapture(
                    storedPayment.getOrderId(), gatewayPaymentId, storedPayment.getPaymentMethod())) {
                throw new IllegalStateException("Verified webhook payment could not be captured");
            }
        } else if ("payment.failed".equals(event)) {
            PaymentService.getInstance().processOrderCancellation(
                    storedPayment.getOrderId(), "Razorpay reported payment failure");
        }
        resp.getWriter().write("{\"success\":true}");
    }

    private boolean verifyWebhookSignature(String body, String receivedSignature, String secret) throws Exception {
        Mac hmac = Mac.getInstance("HmacSHA256");
        hmac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] digest = hmac.doFinal(body.getBytes(StandardCharsets.UTF_8));
        StringBuilder expected = new StringBuilder(digest.length * 2);
        for (byte value : digest) expected.append(String.format("%02x", value));
        return MessageDigest.isEqual(
                expected.toString().getBytes(StandardCharsets.US_ASCII),
                receivedSignature.trim().getBytes(StandardCharsets.US_ASCII));
    }

    private String getConfig(String name) {
        String value = System.getenv(name);
        return value == null || value.isBlank() ? System.getProperty(name) : value;
    }

    private void sendError(HttpServletResponse resp, int status, String message) throws IOException {
        resp.setStatus(status);
        JsonObject error = new JsonObject();
        error.addProperty("success", false);
        error.addProperty("error", message);
        resp.getWriter().write(error.toString());
    }

    private static final class VerificationContext {
        private final String paymentMethod;

        private VerificationContext(String paymentMethod) {
            this.paymentMethod = paymentMethod;
        }
    }
}
