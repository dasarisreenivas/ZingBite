package com.app.zingbiteutils;

import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache<K, V> {

    private final int capacity;
    private final Map<K, V> cacheMap;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cacheMap = new LinkedHashMap<K, V>(capacity, 0.75f, true) {
            private static final long serialVersionUID = 1L;

            @Override
            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                return size() > LRUCache.this.capacity;
            }
        };
    }

    /**
     * Gets value by key and updates access order.
     */
    public synchronized V get(K key) {
        return cacheMap.get(key);
    }

    /**
     * Puts key-value pair and evicts eldest entry if capacity is exceeded.
     */
    public synchronized void put(K key, V value) {
        cacheMap.put(key, value);
    }

    /**
     * Manually invalidates/removes key.
     */
    public synchronized void remove(K key) {
        cacheMap.remove(key);
    }

    /**
     * Clears all cache items.
     */
    public synchronized void clear() {
        cacheMap.clear();
    }

    /**
     * Gets current size of cache.
     */
    public synchronized int size() {
        return cacheMap.size();
    }
}
