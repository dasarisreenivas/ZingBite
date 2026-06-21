package com.app.zingbiteutils;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Function;

public class LRUCache<K, V> {

    private final int capacity;
    private final long maxAgeMillis;
    private final long staleAgeMillis;
    private final Map<K, CacheEntry<V>> cacheMap;
    private final ExecutorService revalidationExecutor;

    private static class CacheEntry<V> {
        final V value;
        final long createdAt;

        CacheEntry(V value) {
            this.value = value;
            this.createdAt = System.currentTimeMillis();
        }

        boolean isExpired(long maxAge) {
            return System.currentTimeMillis() > this.createdAt + maxAge;
        }

        boolean isStale(long maxAge, long staleAge) {
            long now = System.currentTimeMillis();
            return now > this.createdAt + maxAge && now <= this.createdAt + maxAge + staleAge;
        }
    }

    public LRUCache(int capacity, long maxAgeMillis, long staleAgeMillis) {
        this.capacity = capacity;
        this.maxAgeMillis = maxAgeMillis;
        this.staleAgeMillis = staleAgeMillis;
        this.cacheMap = new LinkedHashMap<K, CacheEntry<V>>(capacity, 0.75f, true) {
            private static final long serialVersionUID = 1L;

            @Override
            protected boolean removeEldestEntry(Map.Entry<K, CacheEntry<V>> eldest) {
                return size() > LRUCache.this.capacity;
            }
        };
        this.revalidationExecutor = Executors.newFixedThreadPool(4, runnable -> {
            Thread t = new Thread(runnable, "CacheRevalidationThread");
            t.setDaemon(true);
            return t;
        });
    }

    /**
     * Backward-compatible constructor: creates cache with no expiration.
     */
    public LRUCache(int capacity) {
        this(capacity, Long.MAX_VALUE / 2, 0); // No expiration by default
    }

    /**
     * Gets value by key and updates access order (without checking expiration).
     */
    public synchronized V get(K key) {
        CacheEntry<V> entry = cacheMap.get(key);
        return entry != null ? entry.value : null;
    }

    /**
     * Gets value by key using Stale-While-Revalidate strategy.
     * If cache hit but stale, returns stale value instantly and revalidates in background.
     * If cache miss, loads value synchronously.
     */
    public V get(K key, Function<K, V> loader) {
        CacheEntry<V> entry;
        synchronized (this) {
            entry = cacheMap.get(key);
        }

        if (entry == null) {
            System.out.println("[Cache] Miss for key: " + key + ". Loading synchronously...");
            V value = loader.apply(key);
            if (value != null) {
                put(key, value);
            }
            return value;
        }

        if (entry.isExpired(maxAgeMillis)) {
            if (entry.isStale(maxAgeMillis, staleAgeMillis)) {
                System.out.println("[Cache] Stale hit for key: " + key + ". Returning stale value and triggering revalidation...");
                triggerRevalidation(key, loader);
                return entry.value;
            } else {
                System.out.println("[Cache] Expired hit for key: " + key + ". Loading synchronously...");
                V value = loader.apply(key);
                if (value != null) {
                    put(key, value);
                }
                return value;
            }
        }

        return entry.value;
    }

    private void triggerRevalidation(K key, Function<K, V> loader) {
        revalidationExecutor.submit(() -> {
            try {
                V freshValue = loader.apply(key);
                if (freshValue != null) {
                    put(key, freshValue);
                    System.out.println("[Cache] Successfully revalidated key in background: " + key);
                }
            } catch (Exception e) {
                System.err.println("[Cache] Background revalidation failed for key: " + key);
                e.printStackTrace();
            }
        });
    }

    /**
     * Puts key-value pair and evicts eldest entry if capacity is exceeded.
     */
    public synchronized void put(K key, V value) {
        cacheMap.put(key, new CacheEntry<>(value));
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

    /**
     * Shuts down background executor pool cleanly.
     */
    public void shutdown() {
        revalidationExecutor.shutdown();
    }
}
