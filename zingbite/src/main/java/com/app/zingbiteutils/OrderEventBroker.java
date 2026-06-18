package com.app.zingbiteutils;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import org.hibernate.Session;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.OrderStatusLog;
import com.app.zingbitedaoimpl.OrderStatusLogDAOImplementation;
import com.google.gson.JsonObject;

public class OrderEventBroker {
    private static final OrderEventBroker instance = new OrderEventBroker();

    public static OrderEventBroker getInstance() {
        return instance;
    }

    private final Map<Integer, Set<SSEListener>> listeners = new ConcurrentHashMap<>();
    private final Map<String, Set<SSEListener>> topicListeners = new ConcurrentHashMap<>();

    public interface SSEListener {
        void onUpdate(String data);
    }

    public void addListener(int orderId, SSEListener listener) {
        listeners.computeIfAbsent(orderId, k -> new CopyOnWriteArraySet<>()).add(listener);
    }

    public void removeListener(int orderId, SSEListener listener) {
        Set<SSEListener> set = listeners.get(orderId);
        if (set != null) {
            set.remove(listener);
            if (set.isEmpty()) {
                listeners.remove(orderId);
            }
        }
    }

    public void broadcastUpdate(int orderId, String jsonMessage) {
        Set<SSEListener> set = listeners.get(orderId);
        if (set != null) {
            for (SSEListener listener : set) {
                try {
                    listener.onUpdate(jsonMessage);
                } catch (Exception e) {
                    set.remove(listener);
                }
            }
        }
    }

    public void addTopicListener(String topic, SSEListener listener) {
        topicListeners.computeIfAbsent(topic, k -> new CopyOnWriteArraySet<>()).add(listener);
    }

    public void removeTopicListener(String topic, SSEListener listener) {
        Set<SSEListener> set = topicListeners.get(topic);
        if (set != null) {
            set.remove(listener);
            if (set.isEmpty()) {
                topicListeners.remove(topic);
            }
        }
    }

    public void broadcastTopicUpdate(String topic, String jsonMessage) {
        Set<SSEListener> set = topicListeners.get(topic);
        if (set != null) {
            for (SSEListener listener : set) {
                try {
                    listener.onUpdate(jsonMessage);
                } catch (Exception e) {
                    set.remove(listener);
                }
            }
        }
    }

    public void broadcastOrderUpdate(Orders order, String eventType, String previousStatus, int changedByUserId, String changedByRole, String notes) {
        // 1. Create and persist OrderStatusLog
        try {
            if (!"gps_update".equals(eventType)) {
                OrderStatusLog log = new OrderStatusLog(
                    order.getOrderId(),
                    previousStatus,
                    order.getOrderStatus() != null ? order.getOrderStatus().name() : "PLACED",
                    changedByUserId,
                    changedByRole,
                    notes
                );
                OrderStatusLogDAOImplementation logDAO = new OrderStatusLogDAOImplementation();
                logDAO.addLog(log);
            }
        } catch (Exception ex) {
            System.err.println("[OrderEventBroker] Failed to persist OrderStatusLog: " + ex.getMessage());
            ex.printStackTrace();
        }

        // 2. Fetch rider name if assigned
        String riderName = null;
        if (order.getRiderId() != null) {
            try (Session hibernateSession = DBUtils.openSession()) {
                User rider = hibernateSession.get(User.class, order.getRiderId());
                if (rider != null) {
                    riderName = rider.getUserName();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        // 3. Build enriched JSON payload
        try {
            JsonObject msg = new JsonObject();
            msg.addProperty("event", eventType);
            msg.addProperty("orderId", order.getOrderId());
            msg.addProperty("status", order.getOrderStatus() != null ? order.getOrderStatus().name() : "PLACED");
            msg.addProperty("userId", order.getUserId());
            
            if (order.getRestaurantId() != null) {
                msg.addProperty("restaurantId", order.getRestaurantId().getRestaurantId());
                msg.addProperty("restaurantName", order.getRestaurantId().getRestaurantName());
            }
            if (order.getRiderId() != null) {
                msg.addProperty("riderId", order.getRiderId());
                if (riderName != null) {
                    msg.addProperty("riderName", riderName);
                }
            }
            if (order.getGpsProgress() != null) {
                msg.addProperty("gpsProgress", order.getGpsProgress());
            }
            if (order.getGpsCoordinates() != null) {
                msg.addProperty("gpsCoordinates", order.getGpsCoordinates());
            }
            msg.addProperty("timestamp", System.currentTimeMillis());

            String jsonMessage = msg.toString();

            // 4. Broadcast to per-order listeners (OrderTracking per-order fallback)
            broadcastUpdate(order.getOrderId(), jsonMessage);

            // 5. Broadcast to topic listeners
            broadcastTopicUpdate("topic:user_orders:" + order.getUserId(), jsonMessage);
            if (order.getRestaurantId() != null) {
                broadcastTopicUpdate("topic:restaurant_orders:" + order.getRestaurantId().getRestaurantId(), jsonMessage);
            }
            if (order.getRiderId() != null) {
                broadcastTopicUpdate("topic:rider_orders:" + order.getRiderId(), jsonMessage);
            }
            broadcastTopicUpdate("topic:rider_orders", jsonMessage);
            broadcastTopicUpdate("topic:all_orders", jsonMessage);

        } catch (Exception ex) {
            System.err.println("[OrderEventBroker] Failed to build or broadcast SSE message: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}
