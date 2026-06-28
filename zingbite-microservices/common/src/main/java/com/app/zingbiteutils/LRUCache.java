package com.app.zingbiteutils;

import java.util.LinkedHashMap;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LRUCache<K, V> {
    private static final Logger LOGGER = LoggerFactory.getLogger(LRUCache.class);

    private final int capacity;
    private final long maxAgeMillis;
    private final long staleAgeMillis;
    private final Map<K, CacheEntry<V>> cacheMap;
    private final Map<K, CompletableFuture<V>> inFlightLoads;
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
        this.inFlightLoads = new HashMap<>();
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
            LOGGER.debug("Cache miss for key {}. Loading synchronously.", key);
            return loadOnce(key, loader);
        }

        if (entry.isExpired(maxAgeMillis)) {
            if (entry.isStale(maxAgeMillis, staleAgeMillis)) {
                LOGGER.debug("Cache stale hit for key {}. Returning stale value and triggering revalidation.", key);
                triggerRevalidation(key, loader);
                return entry.value;
            } else {
                LOGGER.debug("Cache expired hit for key {}. Loading synchronously.", key);
                return loadOnce(key, loader);
            }
        }

        return entry.value;
    }

    private V loadOnce(K key, Function<K, V> loader) {
        CompletableFuture<V> loadFuture;
        boolean shouldLoad = false;

        synchronized (this) {
            CacheEntry<V> latestEntry = cacheMap.get(key);
            if (latestEntry != null && !latestEntry.isExpired(maxAgeMillis)) {
                return latestEntry.value;
            }

            loadFuture = inFlightLoads.get(key);
            if (loadFuture == null) {
                loadFuture = new CompletableFuture<>();
                inFlightLoads.put(key, loadFuture);
                shouldLoad = true;
            }
        }

        if (shouldLoad) {
            try {
                V value = loader.apply(key);
                if (value != null) {
                    put(key, value);
                }
                loadFuture.complete(value);
                return value;
            } catch (RuntimeException | Error ex) {
                loadFuture.completeExceptionally(ex);
                throw ex;
            } finally {
                synchronized (this) {
                    if (inFlightLoads.get(key) == loadFuture) {
                        inFlightLoads.remove(key);
                    }
                }
            }
        }

        try {
            return loadFuture.get();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Interrupted while waiting for cache load", ex);
        } catch (ExecutionException ex) {
            Throwable cause = ex.getCause();
            if (cause instanceof RuntimeException) {
                throw (RuntimeException) cause;
            }
            if (cause instanceof Error) {
                throw (Error) cause;
            }
            throw new RuntimeException("Cache load failed", cause);
        }
    }

    private void triggerRevalidation(K key, Function<K, V> loader) {
        revalidationExecutor.submit(() -> {
            try {
                V freshValue = loadOnce(key, loader);
                if (freshValue != null) {
                    LOGGER.debug("Successfully revalidated cache key in background: {}", key);
                }
            } catch (Exception e) {
                LOGGER.warn("Background cache revalidation failed for key {}", key, e);
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
        inFlightLoads.clear();
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
