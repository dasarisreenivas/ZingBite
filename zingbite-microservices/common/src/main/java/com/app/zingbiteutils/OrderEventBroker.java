package com.app.zingbiteutils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.Duration;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import org.hibernate.Session;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.OrderStatusLog;
import com.app.zingbitedaoimpl.OrderStatusLogDAOImplementation;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.pubsub.RedisPubSubAdapter;
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection;

public class OrderEventBroker {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrderEventBroker.class);

    private static final String BRIDGE_CHANNEL = "zingbite:realtime-events";
    private static final OrderEventBroker instance = new OrderEventBroker();

    public static OrderEventBroker getInstance() {
        return instance;
    }

    private final Map<Integer, Set<SSEListener>> listeners = new ConcurrentHashMap<>();
    private final Map<String, Set<SSEListener>> topicListeners = new ConcurrentHashMap<>();
    private final String instanceId = UUID.randomUUID().toString();
    private RedisClient redisClient;
    private StatefulRedisConnection<String, String> publishConnection;
    private StatefulRedisPubSubConnection<String, String> subscribeConnection;

    private OrderEventBroker() {
        initializeRedisBridge();
    }

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
        deliverOrderUpdate(orderId, jsonMessage);
        publishBridgeEvent("order", String.valueOf(orderId), jsonMessage);
    }

    private void deliverOrderUpdate(int orderId, String jsonMessage) {
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
        deliverTopicUpdate(topic, jsonMessage);
        publishBridgeEvent("topic", topic, jsonMessage);
    }

    private void deliverTopicUpdate(String topic, String jsonMessage) {
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

    private void initializeRedisBridge() {
        try {
            String host = getConfig("ZINGBITE_REDIS_HOST", "127.0.0.1");
            int port = Integer.parseInt(getConfig("ZINGBITE_REDIS_PORT", "6379"));
            RedisURI redisUri = RedisURI.Builder.redis(host, port)
                    .withTimeout(Duration.ofSeconds(2))
                    .build();

            redisClient = RedisClient.create(redisUri);
            publishConnection = redisClient.connect();
            subscribeConnection = redisClient.connectPubSub();
            subscribeConnection.addListener(new RedisPubSubAdapter<String, String>() {
                @Override
                public void message(String channel, String message) {
                    if (BRIDGE_CHANNEL.equals(channel)) {
                        receiveBridgeEvent(message);
                    }
                }
            });
            subscribeConnection.sync().subscribe(BRIDGE_CHANNEL);
        } catch (Exception ex) {
            publishConnection = null;
            subscribeConnection = null;
            if (redisClient != null) {
                redisClient.shutdown();
                redisClient = null;
            }
            LOGGER.warn("[OrderEventBroker] Redis bridge unavailable; using local delivery only: "
                    + ex.getMessage());
        }
    }

    private void publishBridgeEvent(String kind, String target, String data) {
        if (publishConnection == null || !publishConnection.isOpen()) {
            return;
        }

        JsonObject envelope = new JsonObject();
        envelope.addProperty("source", instanceId);
        envelope.addProperty("kind", kind);
        envelope.addProperty("target", target);
        envelope.addProperty("data", data);
        publishConnection.async().publish(BRIDGE_CHANNEL, envelope.toString());
    }

    private void receiveBridgeEvent(String message) {
        try {
            JsonObject envelope = JsonParser.parseString(message).getAsJsonObject();
            if (instanceId.equals(envelope.get("source").getAsString())) {
                return;
            }

            String kind = envelope.get("kind").getAsString();
            String target = envelope.get("target").getAsString();
            String data = envelope.get("data").getAsString();
            if ("order".equals(kind)) {
                deliverOrderUpdate(Integer.parseInt(target), data);
            } else if ("topic".equals(kind)) {
                deliverTopicUpdate(target, data);
            }
        } catch (Exception ex) {
            LOGGER.warn("[OrderEventBroker] Ignoring malformed Redis event: " + ex.getMessage());
        }
    }

    private static String getConfig(String key, String fallback) {
        String value = System.getenv(key);
        if (value == null || value.isBlank()) {
            value = System.getProperty(key);
        }
        return value == null || value.isBlank() ? fallback : value;
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

                // Create and persist user Notification
                String restName = order.getRestaurantId() != null ? order.getRestaurantId().getRestaurantName() : "Restaurant";
                String statusLabel = order.getOrderStatus() != null ? order.getOrderStatus().label() : "Placed";
                String nTitle = "Order #" + order.getOrderId();
                String nMessage = "Your order from " + restName + " is now: " + statusLabel + ".";

                com.app.zingbitemodels.Notification notification = new com.app.zingbitemodels.Notification(order.getUserId(), nTitle, nMessage);
                com.app.zingbitedao.NotificationDAO notificationDAO = new com.app.zingbitedaoimpl.NotificationDAOImplementation();
                notificationDAO.addNotification(notification);
            }
        } catch (Exception ex) {
            LOGGER.warn("[OrderEventBroker] Failed to persist OrderStatusLog or Notification: " + ex.getMessage());
            LOGGER.error("Unexpected error", ex);
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
                LOGGER.error("Unexpected error", ex);
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
            LOGGER.warn("[OrderEventBroker] Failed to build or broadcast SSE message: " + ex.getMessage());
            LOGGER.error("Unexpected error", ex);
        }
    }
}
