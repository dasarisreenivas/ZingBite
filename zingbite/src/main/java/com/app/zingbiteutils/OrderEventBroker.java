package com.app.zingbiteutils;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

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
}
