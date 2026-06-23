package com.app.zingbiteutils;

import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

public class RazorpayUtils {

    private static RazorpayClient client;

    private static synchronized RazorpayClient getClient() throws Exception {
        if (client == null) {
            String keyId = System.getProperty("RAZORPAY_KEY_ID");
            String keySecret = System.getProperty("RAZORPAY_KEY_SECRET");
            if (keyId == null || keyId.isEmpty()) {
                keyId = System.getenv("RAZORPAY_KEY_ID");
            }
            if (keySecret == null || keySecret.isEmpty()) {
                keySecret = System.getenv("RAZORPAY_KEY_SECRET");
            }
            if (keyId == null || keyId.isEmpty()) {
                throw new IllegalStateException("RAZORPAY_KEY_ID not configured. Set system property or environment variable.");
            }
            if (keySecret == null || keySecret.isEmpty()) {
                throw new IllegalStateException("RAZORPAY_KEY_SECRET not configured. Set system property or environment variable.");
            }
            client = new RazorpayClient(keyId, keySecret);
        }
        return client;
    }

    public static String createRazorpayOrder(int amountInPaise, String receipt) throws Exception {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", receipt);
        orderRequest.put("payment_capture", true);
        Order order = getClient().orders.create(orderRequest);
        return order.get("id").toString();
    }

    public static boolean verifyPaymentSignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        if (PaymentService.isPaymentTestMode()) {
            return true;
        }
        try {
            String keySecret = System.getProperty("RAZORPAY_KEY_SECRET");
            if (keySecret == null || keySecret.isEmpty()) {
                keySecret = System.getenv("RAZORPAY_KEY_SECRET");
            }
            if (keySecret == null || keySecret.isEmpty()) {
                throw new IllegalStateException("RAZORPAY_KEY_SECRET not configured");
            }
            String payload = razorpayOrderId + "|" + razorpayPaymentId;
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(
                    keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);
            byte[] expected = sha256Hmac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            byte[] actual = hexStringToBytes(razorpaySignature);
            return MessageDigest.isEqual(expected, actual);
        } catch (Exception e) {
            System.err.println("[RazorpayUtils] Signature verification failed: " + e.getMessage());
            return false;
        }
    }

    private static byte[] hexStringToBytes(String hex) {
        if (hex == null || hex.length() % 2 != 0) {
            throw new IllegalArgumentException("Invalid hexadecimal signature");
        }
        int len = hex.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            int high = Character.digit(hex.charAt(i), 16);
            int low = Character.digit(hex.charAt(i + 1), 16);
            if (high < 0 || low < 0) {
                throw new IllegalArgumentException("Invalid hexadecimal signature");
            }
            data[i / 2] = (byte) ((high << 4) + low);
        }
        return data;
    }

    public static com.razorpay.Payment fetchPayment(String razorpayPaymentId) throws Exception {
        return getClient().payments.fetch(razorpayPaymentId);
    }

    public static com.razorpay.Payment capturePayment(String razorpayPaymentId, int amountInPaise) throws Exception {
        JSONObject captureRequest = new JSONObject();
        captureRequest.put("amount", amountInPaise);
        captureRequest.put("currency", "INR");
        return getClient().payments.capture(razorpayPaymentId, captureRequest);
    }
}
