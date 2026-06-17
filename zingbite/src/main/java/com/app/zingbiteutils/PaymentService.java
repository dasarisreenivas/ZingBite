package com.app.zingbiteutils;

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

public class PaymentService {

    private static PaymentService instance;
    private ScheduledExecutorService scheduler;

    private PaymentService() {}

    public static synchronized PaymentService getInstance() {
        if (instance == null) {
            instance = new PaymentService();
        }
        return instance;
    }

    /**
     * Verifies payment via Razorpay API using the transaction ID (razorpay_payment_id).
     * Falls back to mock verification for non-Razorpay payments or test mode.
     */
    public String verifyPaymentOnGateway(String transactionId, int orderId) throws Exception {
        if (transactionId == null || transactionId.trim().isEmpty() || transactionId.toLowerCase().contains("abandon")) {
            return "FAILED";
        }
        // Check if this order has a Razorpay order reference
        try (Session session = DBUtils.openSession()) {
            String hql = "from Payment where orderId = :orderId";
            Payment payment = session.createQuery(hql, Payment.class)
                .setParameter("orderId", orderId).uniqueResult();
            if (payment != null && payment.getRazorpayOrderId() != null && !payment.getRazorpayOrderId().isEmpty()) {
                try {
                    com.razorpay.Payment rpPayment = RazorpayUtils.fetchPayment(transactionId);
                    String rpStatus = rpPayment.get("status");
                    System.out.println("[PaymentService] Razorpay actual status for " + transactionId + ": " + rpStatus);
                    if ("captured".equals(rpStatus) || "authorized".equals(rpStatus)) {
                        try {
                            RazorpayUtils.capturePayment(transactionId, (int) Math.round(payment.getAmount() * 100));
                        } catch (Exception capEx) {
                            System.out.println("[PaymentService] Capture note: " + capEx.getMessage());
                        }
                        return "COMPLETED";
                    } else if ("failed".equals(rpStatus)) {
                        return "FAILED";
                    }
                } catch (Exception rpEx) {
                    System.err.println("[PaymentService] Razorpay API check failed for " + transactionId + ": " + rpEx.getMessage());
                }
            }
        } catch (Exception dbEx) {
            System.err.println("[PaymentService] DB query for Razorpay order failed: " + dbEx.getMessage());
        }
        // Fallback mock: transactionId heuristic
        if (transactionId.toLowerCase().contains("timeout")) {
            throw new java.net.SocketTimeoutException("Simulated payment gateway timeout occurred. Please retry.");
        }
        if (transactionId.toLowerCase().contains("fail")) {
            return "FAILED";
        }
        return "COMPLETED";
    }

    /**
     * Verifies Razorpay payment signature and returns the payment status from Razorpay API.
     */
    public String verifyRazorpaySignatureAndFetchStatus(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature, int orderId) {
        if (!RazorpayUtils.verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
            System.err.println("[PaymentService] Razorpay signature MISMATCH for order ZB-" + orderId);
            return "FAILED";
        }
        System.out.println("[PaymentService] Razorpay signature VALID for order ZB-" + orderId);
        try {
            com.razorpay.Payment rpPayment = RazorpayUtils.fetchPayment(razorpayPaymentId);
            String rpStatus = rpPayment.get("status");
            if ("captured".equals(rpStatus) || "authorized".equals(rpStatus)) {
                try {
                    RazorpayUtils.capturePayment(razorpayPaymentId, (int) Math.round(rpPayment.get("amount")));
                } catch (Exception capEx) {
                    System.out.println("[PaymentService] Capture note: " + capEx.getMessage());
                }
                return "COMPLETED";
            } else if ("failed".equals(rpStatus)) {
                return "FAILED";
            }
        } catch (Exception e) {
            System.err.println("[PaymentService] Razorpay fetch failed for " + razorpayPaymentId + ": " + e.getMessage());
        }
        return "COMPLETED";
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
            order = session.get(Orders.class, orderId);
            if (order == null) {
                System.out.println("[PaymentService] Order ZB-" + orderId + " not found.");
                return false;
            }

            // Idempotency: If already paid and active, return success instantly
            if (order.getOrderStatus() != OrderStatus.PENDING_PAYMENT) {
                System.out.println("[PaymentService] Order ZB-" + orderId + " is already in state: " + order.getOrderStatus());
                return order.getOrderStatus() == OrderStatus.PLACED || order.getOrderStatus() == OrderStatus.ACCEPTED;
            }

            // 2. Fetch or Create Payment Record
            String hql = "from Payment where orderId = :orderId";
            Query<Payment> query = session.createQuery(hql, Payment.class);
            query.setParameter("orderId", orderId);
            Payment payment = query.uniqueResult();

            if (payment == null) {
                payment = new Payment(orderId, order.getTotalAmount(), paymentMethod);
            }
            payment.setTransactionId(transactionId);
            payment.setStatus("COMPLETED");
            payment.setUpdatedAt(new Date());
            session.merge(payment);

            // 3. Update Order Status
            order.setOrderStatus(OrderStatus.PLACED);
            order.setPaymentMethod(paymentMethod);
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
            System.out.println("[PaymentService] Successfully captured order ZB-" + orderId + " with txn: " + transactionId);

        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            System.err.println("[PaymentService] Failed to capture order ZB-" + orderId + ":");
            e.printStackTrace();
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
                System.err.println("[PaymentService] Async Email dispatch failed: " + ex.getMessage());
            }

            // Trigger Real-Time SSE Broadcaster
            try {
                JsonObject sseMsg = new JsonObject();
                sseMsg.addProperty("event", "new_order");
                sseMsg.addProperty("orderId", fOrderId);
                if (fRestId > 0) {
                    sseMsg.addProperty("restaurantId", fRestId);
                }
                OrderEventBroker.getInstance().broadcastTopicUpdate("topic:new_orders", sseMsg.toString());
                if (fRestId > 0) {
                    OrderEventBroker.getInstance().broadcastTopicUpdate("topic:restaurant_orders:" + fRestId, sseMsg.toString());
                }
                OrderEventBroker.getInstance().broadcastTopicUpdate("topic:rider_orders", sseMsg.toString());
                
                // Tickle user orders topic to reload tracking screen instantly
                OrderEventBroker.getInstance().broadcastTopicUpdate("topic:user_orders:" + fUser.getUserID(), sseMsg.toString());

                // Direct notification for the specific order tracking stream
                JsonObject ordPayload = new JsonObject();
                ordPayload.addProperty("orderId", fOrderId);
                ordPayload.addProperty("status", "PLACED");
                OrderEventBroker.getInstance().broadcastUpdate(fOrderId, ordPayload.toString());
            } catch (Exception ex) {
                System.err.println("[PaymentService] Real-time SSE dispatch failed: " + ex.getMessage());
            }
        }

        return true;
    }

    /**
     * Transactionally cancels an order when a payment fails or is abandoned.
     */
    public boolean processOrderCancellation(int orderId, String reason) {
        Transaction tx = null;
        try (Session session = DBUtils.openSession()) {
            tx = session.beginTransaction();

            Orders order = session.get(Orders.class, orderId);
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
            System.out.println("[PaymentService] Successfully cancelled order ZB-" + orderId + " due to: " + reason);

                // Tickle customer UI to update status
                try {
                    JsonObject sseMsg = new JsonObject();
                    sseMsg.addProperty("event", "status_update");
                    sseMsg.addProperty("orderId", orderId);
                    sseMsg.addProperty("status", "Cancelled");
                    OrderEventBroker.getInstance().broadcastTopicUpdate("topic:user_orders:" + order.getUserId(), sseMsg.toString());

                    // Direct notification for the specific order tracking stream
                    JsonObject ordPayload = new JsonObject();
                    ordPayload.addProperty("orderId", orderId);
                    ordPayload.addProperty("status", "CANCELLED");
                    OrderEventBroker.getInstance().broadcastUpdate(orderId, ordPayload.toString());
                } catch (Exception ex) {}

            return true;

        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            e.printStackTrace();
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
                System.err.println("[PaymentReconciler] Scheduler loop encountered an error:");
                e.printStackTrace();
            }
        }, 15, 45, TimeUnit.SECONDS); // Runs every 45 seconds after initial 15-second delay

        System.out.println("[PaymentService] Background Payment Reconciliation Scheduler activated successfully!");
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
            System.out.println("[PaymentService] Background Payment Reconciliation Scheduler stopped cleanly.");
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
            System.err.println("[PaymentReconciler] Failed to query stale orders: " + e.getMessage());
            return;
        }

        if (staleOrders == null || staleOrders.isEmpty()) {
            return;
        }

        System.out.println("[PaymentReconciler] Found " + staleOrders.size() + " stale pending orders. Starting auto-resolution...");

        for (Orders order : staleOrders) {
            int orderId = order.getOrderId();
            System.out.println("[PaymentReconciler] Reconciling ZB-" + orderId + " created at " + order.getStatusUpdatedAt());

            // Check if there is an associated transaction ID in Payment
            String transactionId = null;
            String status = null;

            try (Session session = DBUtils.openSession()) {
                String hql = "from Payment where orderId = :orderId";
                Query<Payment> query = session.createQuery(hql, Payment.class);
                query.setParameter("orderId", orderId);
                Payment payment = query.uniqueResult();
                if (payment != null) {
                    transactionId = payment.getTransactionId();
                    status = payment.getStatus();
                }
            } catch (Exception ex) {}

            // Query gateway using the transaction token (now with real Razorpay API)
            if (transactionId != null && !transactionId.trim().isEmpty()) {
                try {
                    String gatewayStatus = verifyPaymentOnGateway(transactionId, orderId);
                    if ("COMPLETED".equals(gatewayStatus)) {
                        System.out.println("[PaymentReconciler] ZB-" + orderId + " was PAID on gateway. Completing...");
                        processOrderCapture(orderId, transactionId, order.getPaymentMethod());
                    } else {
                        System.out.println("[PaymentReconciler] ZB-" + orderId + " failed on gateway. Cancelling...");
                        processOrderCancellation(orderId, "Gateway returned failure status");
                    }
                } catch (Exception e) {
                    // Gateway error / timeout -> leave for next retry
                    System.err.println("[PaymentReconciler] Gateway check failed for ZB-" + orderId + ": " + e.getMessage());
                }
            } else {
                // No transaction token provided, user abandoned the payment gateway checkout
                System.out.println("[PaymentReconciler] ZB-" + orderId + " has no transaction ID. Auto-cancelling abandoned order...");
                processOrderCancellation(orderId, "Checkout session abandoned by client");
            }
        }
    }
}
