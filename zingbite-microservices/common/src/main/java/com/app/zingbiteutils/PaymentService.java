package com.app.zingbiteutils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.Payment;
import com.app.zingbitemodels.OrderHistory;
import com.app.zingbitemodels.OrderStatus;
import com.app.zingbitemodels.User;
import com.google.gson.JsonObject;
import jakarta.persistence.LockModeType;

public class PaymentService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PaymentService.class);

    private static PaymentService instance;
    private ScheduledExecutorService scheduler;

    private PaymentService() {}

    public static synchronized PaymentService getInstance() {
        if (instance == null) {
            instance = new PaymentService();
        }
        return instance;
    }

    public static boolean isPaymentTestMode() {
        String value = System.getenv("ZINGBITE_PAYMENT_TEST_MODE");
        if (value == null || value.isBlank()) {
            value = System.getProperty("ZINGBITE_PAYMENT_TEST_MODE", "false");
        }
        return Boolean.parseBoolean(value);
    }

    /**
     * Verifies payment via Razorpay API using the transaction ID (razorpay_payment_id).
     * Test transactions are accepted only when explicit test mode is enabled.
     */
    public String verifyPaymentOnGateway(String transactionId, int orderId) throws Exception {
        if (transactionId == null || transactionId.trim().isEmpty() || transactionId.toLowerCase().contains("abandon")) {
            return "FAILED";
        }
        if (isPaymentTestMode()) {
            LOGGER.info("[PaymentService] Test mode enabled, skipping gateway verification for order ZB-" + orderId);
            return transactionId.toLowerCase().contains("fail") ? "FAILED" : "COMPLETED";
        }
        try (Session session = DBUtils.openSession()) {
            String hql = "from Payment where orderId = :orderId";
            Payment payment = session.createQuery(hql, Payment.class)
                .setParameter("orderId", orderId).uniqueResult();
            if (payment == null) {
                throw new IllegalStateException("Payment record not found for order ZB-" + orderId);
            }

            if (!"Razorpay".equalsIgnoreCase(payment.getPaymentMethod())) {
                if (isPaymentTestMode() && transactionId.startsWith("txn_") && transactionId.length() <= 128) {
                    return transactionId.toLowerCase().contains("fail") ? "FAILED" : "COMPLETED";
                }
                throw new IllegalStateException("No verifiable payment provider is configured for " + payment.getPaymentMethod());
            }

            if (payment.getRazorpayOrderId() == null || payment.getRazorpayOrderId().isBlank()) {
                throw new IllegalStateException("Razorpay order reference is missing for ZB-" + orderId);
            }

            com.razorpay.Payment gatewayPayment = RazorpayUtils.fetchPayment(transactionId);
            validateGatewayPayment(payment, gatewayPayment);
            String gatewayStatus = gatewayPayment.get("status");
            LOGGER.info("[PaymentService] Razorpay status for " + transactionId + ": " + gatewayStatus);
            if ("captured".equals(gatewayStatus)) {
                return "COMPLETED";
            }
            if ("authorized".equals(gatewayStatus)) {
                com.razorpay.Payment captured = RazorpayUtils.capturePayment(
                        transactionId, (int) Math.round(payment.getAmount() * 100));
                String capturedStatus = captured.get("status");
                return "captured".equals(capturedStatus) ? "COMPLETED" : "PENDING";
            }
            if ("failed".equals(gatewayStatus)) {
                return "FAILED";
            }
            return "PENDING";
        }
    }

    /**
     * Verifies Razorpay payment signature and returns the payment status from Razorpay API.
     */
    public String verifyRazorpaySignatureAndFetchStatus(String razorpayOrderId, String razorpayPaymentId,
            String razorpaySignature, int orderId) throws Exception {
        if (isPaymentTestMode()) {
            LOGGER.info("[PaymentService] Test mode enabled, skipping Razorpay signature and status verification for ZB-" + orderId);
            return (razorpayPaymentId != null && razorpayPaymentId.toLowerCase().contains("fail")) ? "FAILED" : "COMPLETED";
        }
        Payment storedPayment;
        try (Session session = DBUtils.openSession()) {
            storedPayment = session.createQuery("from Payment where orderId = :orderId", Payment.class)
                    .setParameter("orderId", orderId)
                    .uniqueResult();
        }
        if (storedPayment == null || storedPayment.getRazorpayOrderId() == null
                || !storedPayment.getRazorpayOrderId().equals(razorpayOrderId)) {
            throw new SecurityException("Razorpay order binding mismatch for ZB-" + orderId);
        }
        if (!RazorpayUtils.verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
            throw new SecurityException("Invalid Razorpay signature for ZB-" + orderId);
        }
        LOGGER.info("[PaymentService] Razorpay signature VALID for order ZB-" + orderId);
        com.razorpay.Payment gatewayPayment = RazorpayUtils.fetchPayment(razorpayPaymentId);
        validateGatewayPayment(storedPayment, gatewayPayment);
        String gatewayStatus = gatewayPayment.get("status");
        if ("captured".equals(gatewayStatus)) {
            return "COMPLETED";
        }
        if ("authorized".equals(gatewayStatus)) {
            com.razorpay.Payment captured = RazorpayUtils.capturePayment(
                    razorpayPaymentId, (int) Math.round(storedPayment.getAmount() * 100));
            String capturedStatus = captured.get("status");
            return "captured".equals(capturedStatus) ? "COMPLETED" : "PENDING";
        }
        return "failed".equals(gatewayStatus) ? "FAILED" : "PENDING";
    }

    private void validateGatewayPayment(Payment storedPayment, com.razorpay.Payment gatewayPayment) {
        String gatewayOrderId = String.valueOf(gatewayPayment.get("order_id"));
        if (!storedPayment.getRazorpayOrderId().equals(gatewayOrderId)) {
            throw new SecurityException("Gateway payment belongs to a different Razorpay order");
        }

        Object amountValue = gatewayPayment.get("amount");
        if (!(amountValue instanceof Number amount)
                || amount.longValue() != Math.round(storedPayment.getAmount() * 100)) {
            throw new SecurityException("Gateway payment amount does not match the order total");
        }
        String currency = String.valueOf(gatewayPayment.get("currency"));
        if (!"INR".equalsIgnoreCase(currency)) {
            throw new SecurityException("Gateway payment currency does not match the order");
        }
    }

    /**
     * Transactionally captures the payment and transitions the reserved order to PLACED status.
     * Sends email confirmations and broadcasts real-time SSE updates.
     */
    public boolean processOrderCapture(int orderId, String transactionId, String paymentMethod) {
        Transaction tx = null;
        Orders order = null;
        User user = null;

        try (Session session = DBUtils.openSession()) {
            tx = session.beginTransaction();

            // 1. Fetch Order
            order = session.find(Orders.class, orderId, LockModeType.PESSIMISTIC_WRITE);
            if (order == null) {
                LOGGER.info("[PaymentService] Order ZB-" + orderId + " not found.");
                return false;
            }

            // Idempotency: If already paid and active, return success instantly
            if (order.getOrderStatus() != OrderStatus.PENDING_PAYMENT) {
                LOGGER.info("[PaymentService] Order ZB-" + orderId + " is already in state: " + order.getOrderStatus());
                return order.getOrderStatus() == OrderStatus.PLACED || order.getOrderStatus() == OrderStatus.ACCEPTED;
            }

            // 2. Fetch or Create Payment Record
            String hql = "from Payment where orderId = :orderId";
            Query<Payment> query = session.createQuery(hql, Payment.class);
            query.setParameter("orderId", orderId);
            Payment payment = query.uniqueResult();

            if (payment == null) return false;
            String trustedPaymentMethod = payment.getPaymentMethod();
            payment.setTransactionId(transactionId);
            payment.setStatus("COMPLETED");
            payment.setUpdatedAt(new Date());
            session.merge(payment);

            // 3. Update Order Status
            order.setOrderStatus(OrderStatus.PLACED);
            order.setPaymentMethod(trustedPaymentMethod);
            order.setStatusUpdatedAt(new Date());
            session.merge(order);

            com.app.zingbitemodels.Restaurant restaurant = order.getRestaurantId();
            if (restaurant != null) {
                restaurant.setTotalOrders(restaurant.getTotalOrders() + 1);
                session.merge(restaurant);
            }

            // 4. Update OrderHistory record
            String historyHql = "from OrderHistory where orderId = :orderId";
            Query<OrderHistory> historyQuery = session.createQuery(historyHql, OrderHistory.class);
            historyQuery.setParameter("orderId", orderId);
            OrderHistory oh = historyQuery.uniqueResult();

            if (oh == null) {
                oh = new OrderHistory();
                oh.setOrderId(orderId);
                oh.setUserID(order.getUserId());
                oh.setOrderDate(new Date());
                oh.setTotalAmount(order.getTotalAmount());
            }
            oh.setOrderStatus("Placed");
            session.merge(oh);

            // 5. Fetch User to send confirmation email
            user = session.get(User.class, order.getUserId());

            tx.commit();
            LOGGER.info("[PaymentService] Successfully captured order ZB-" + orderId + " with txn: " + transactionId);

        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            LOGGER.warn("[PaymentService] Failed to capture order ZB-" + orderId + ":");
            LOGGER.error("Unexpected error", e);
            return false;
        }

        // Post-commit async triggers
        if (order != null && user != null) {
            final int fOrderId = orderId;
            final float fTotal = order.getTotalAmount();
            final String fTime = order.getOrderTime();
            final User fUser = user;
            final int fRestId = order.getRestaurantId() != null ? order.getRestaurantId().getRestaurantId() : 0;

            // Trigger Email Async
            try {
                EmailService.sendEmailAsync(
                    fUser.getUserID(),
                    fUser.getEmail(),
                    "ZingBite Order Confirmation - ZB-" + fOrderId,
                    EmailTemplates.orderPlaced(fUser.getUserName(), fOrderId, fTotal, fTime)
                );
            } catch (Exception ex) {
                LOGGER.warn("[PaymentService] Async Email dispatch failed: " + ex.getMessage());
            }

            // Trigger Real-Time SSE Broadcaster & Log Status
            try {
                OrderEventBroker.getInstance().broadcastOrderUpdate(
                    order,
                    "new_order",
                    "PENDING_PAYMENT",
                    fUser.getUserID(),
                    "customer",
                    "Order placed successfully after payment capture"
                );
                // Also broadcast to the general new_orders pool topic (for riders/restaurants)
                JsonObject sseMsg = new JsonObject();
                sseMsg.addProperty("event", "new_order");
                sseMsg.addProperty("orderId", fOrderId);
                if (fRestId > 0) {
                    sseMsg.addProperty("restaurantId", fRestId);
                }
                OrderEventBroker.getInstance().broadcastTopicUpdate("topic:new_orders", sseMsg.toString());
            } catch (Exception ex) {
                LOGGER.warn("[PaymentService] Real-time SSE dispatch failed: " + ex.getMessage());
            }
        }

        return true;
    }

    /** Emits post-commit notifications for orders placed without online capture, such as COD. */
    public void notifyOrderPlaced(int orderId, String message) {
        Orders order;
        User user;
        try (Session session = DBUtils.openSession()) {
            order = session.get(Orders.class, orderId);
            if (order == null || order.getOrderStatus() != OrderStatus.PLACED) return;
            user = session.get(User.class, order.getUserId());
        }
        if (user == null) return;

        try {
            EmailService.sendEmailAsync(
                    user.getUserID(),
                    user.getEmail(),
                    "ZingBite Order Confirmation - ZB-" + orderId,
                    EmailTemplates.orderPlaced(user.getUserName(), orderId, order.getTotalAmount(), order.getOrderTime()));
        } catch (Exception emailError) {
            LOGGER.warn("[PaymentService] COD email dispatch failed: " + emailError.getMessage());
        }

        try {
            OrderEventBroker.getInstance().broadcastOrderUpdate(
                    order, "new_order", "CREATED", user.getUserID(), "customer", message);
            JsonObject event = new JsonObject();
            event.addProperty("event", "new_order");
            event.addProperty("orderId", orderId);
            if (order.getRestaurantId() != null) {
                event.addProperty("restaurantId", order.getRestaurantId().getRestaurantId());
            }
            OrderEventBroker.getInstance().broadcastTopicUpdate("topic:new_orders", event.toString());
        } catch (Exception eventError) {
            LOGGER.warn("[PaymentService] COD event dispatch failed: " + eventError.getMessage());
        }
    }

    /**
     * Transactionally cancels an order when a payment fails or is abandoned.
     */
    public boolean processOrderCancellation(int orderId, String reason) {
        Transaction tx = null;
        try (Session session = DBUtils.openSession()) {
            tx = session.beginTransaction();

            Orders order = session.find(Orders.class, orderId, LockModeType.PESSIMISTIC_WRITE);
            if (order == null) return false;

            if (order.getOrderStatus() != OrderStatus.PENDING_PAYMENT) {
                return false; // Already transitioned out of pending payment
            }

            // Update Order Status to CANCELLED
            order.setOrderStatus(OrderStatus.CANCELLED);
            order.setStatusUpdatedAt(new Date());
            session.merge(order);

            // Update Payment Status to FAILED
            String hql = "from Payment where orderId = :orderId";
            Query<Payment> query = session.createQuery(hql, Payment.class);
            query.setParameter("orderId", orderId);
            Payment payment = query.uniqueResult();

            if (payment == null) {
                payment = new Payment(orderId, order.getTotalAmount(), order.getPaymentMethod());
            }
            payment.setStatus("FAILED");
            payment.setUpdatedAt(new Date());
            session.merge(payment);

            // Update OrderHistory
            String historyHql = "from OrderHistory where orderId = :orderId";
            Query<OrderHistory> historyQuery = session.createQuery(historyHql, OrderHistory.class);
            historyQuery.setParameter("orderId", orderId);
            OrderHistory oh = historyQuery.uniqueResult();

            if (oh == null) {
                oh = new OrderHistory();
                oh.setOrderId(orderId);
                oh.setUserID(order.getUserId());
                oh.setOrderDate(new Date());
                oh.setTotalAmount(order.getTotalAmount());
            }
            oh.setOrderStatus("Cancelled");
            session.merge(oh);

            tx.commit();
            LOGGER.info("[PaymentService] Successfully cancelled order ZB-" + orderId + " due to: " + reason);

                // Tickle customer UI to update status & Log status change
                try {
                    OrderEventBroker.getInstance().broadcastOrderUpdate(
                        order,
                        "status_update",
                        "PENDING_PAYMENT",
                        order.getUserId(),
                        "system",
                        "Order cancelled: " + reason
                    );
                } catch (Exception ex) {}

            return true;

        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            LOGGER.error("Unexpected error", e);
            return false;
        }
    }

    /**
     * Starts a scheduled background thread task that checks for stuck/stale PENDING_PAYMENT orders
     * and automatically reconciles them (either capturing or cancelling depending on status).
     */
    public synchronized void startReconciliationScheduler() {
        if (scheduler != null && !scheduler.isShutdown()) {
            return;
        }
        scheduler = Executors.newSingleThreadScheduledExecutor(runnable -> {
            Thread t = new Thread(runnable, "PaymentReconciliationScheduler");
            t.setDaemon(true);
            return t;
        });

        scheduler.scheduleWithFixedDelay(() -> {
            try {
                reconcileStalePayments();
            } catch (Exception e) {
                LOGGER.warn("[PaymentReconciler] Scheduler loop encountered an error:");
                LOGGER.error("Unexpected error", e);
            }
        }, 15, 45, TimeUnit.SECONDS); // Runs every 45 seconds after initial 15-second delay

        LOGGER.info("[PaymentService] Background Payment Reconciliation Scheduler activated successfully!");
    }

    public synchronized void stopReconciliationScheduler() {
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
            try {
                if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                    scheduler.shutdownNow();
                }
            } catch (InterruptedException e) {
                scheduler.shutdownNow();
            }
            LOGGER.info("[PaymentService] Background Payment Reconciliation Scheduler stopped cleanly.");
        }
    }

    /**
     * Queries for PENDING_PAYMENT orders older than 2 minutes and resolves them.
     */
    private void reconcileStalePayments() {
        Date cutoff = new Date(System.currentTimeMillis() - 2 * 60 * 1000); // 2 minutes ago
        List<Orders> staleOrders;

        try (Session session = DBUtils.openSession()) {
            String hql = "from Orders where orderStatus = :pendingStatus and statusUpdatedAt < :cutoff";
            Query<Orders> query = session.createQuery(hql, Orders.class);
            query.setParameter("pendingStatus", OrderStatus.PENDING_PAYMENT);
            query.setParameter("cutoff", cutoff);
            staleOrders = query.list();
        } catch (Exception e) {
            LOGGER.warn("[PaymentReconciler] Failed to query stale orders: " + e.getMessage());
            return;
        }

        if (staleOrders == null || staleOrders.isEmpty()) {
            return;
        }

        LOGGER.info("[PaymentReconciler] Found " + staleOrders.size() + " stale pending orders. Starting auto-resolution...");

        for (Orders order : staleOrders) {
            int orderId = order.getOrderId();
            LOGGER.info("[PaymentReconciler] Reconciling ZB-" + orderId + " created at " + order.getStatusUpdatedAt());

            // Check if there is an associated transaction ID in Payment
            String transactionId = null;
            try (Session session = DBUtils.openSession()) {
                String hql = "from Payment where orderId = :orderId";
                Query<Payment> query = session.createQuery(hql, Payment.class);
                query.setParameter("orderId", orderId);
                Payment payment = query.uniqueResult();
                if (payment != null) {
                    transactionId = payment.getTransactionId();
                }
            } catch (Exception ex) {}

            // Query gateway using the transaction token (now with real Razorpay API)
            if (transactionId != null && !transactionId.trim().isEmpty()) {
                try {
                    String gatewayStatus = verifyPaymentOnGateway(transactionId, orderId);
                    if ("COMPLETED".equals(gatewayStatus)) {
                        LOGGER.info("[PaymentReconciler] ZB-" + orderId + " was PAID on gateway. Completing...");
                        processOrderCapture(orderId, transactionId, order.getPaymentMethod());
                    } else if ("FAILED".equals(gatewayStatus)) {
                        LOGGER.info("[PaymentReconciler] ZB-" + orderId + " failed on gateway. Cancelling...");
                        processOrderCancellation(orderId, "Gateway returned failure status");
                    } else {
                        LOGGER.info("[PaymentReconciler] ZB-" + orderId
                                + " remains pending on the gateway. It will be retried.");
                    }
                } catch (Exception e) {
                    // Gateway error / timeout -> leave for next retry
                    LOGGER.warn("[PaymentReconciler] Gateway check failed for ZB-" + orderId + ": " + e.getMessage());
                }
            } else {
                // No transaction token provided, user abandoned the payment gateway checkout
                LOGGER.info("[PaymentReconciler] ZB-" + orderId + " has no transaction ID. Auto-cancelling abandoned order...");
                processOrderCancellation(orderId, "Checkout session abandoned by client");
            }
        }
    }
}
