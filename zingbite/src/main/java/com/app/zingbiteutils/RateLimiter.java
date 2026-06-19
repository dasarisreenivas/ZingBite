package com.app.zingbiteutils;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Simple in-memory rate limiter to prevent API abuse.
 * Limits requests per IP within a sliding window.
 */
public class RateLimiter {

    private static final Map<String, RateLimitEntry> requestCounts = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS = 100;
    private static final long WINDOW_MS = 60_000L; // 1 minute

    static {
        ScheduledExecutorService cleaner = Executors.newSingleThreadScheduledExecutor(runnable -> {
            Thread t = new Thread(runnable, "RateLimitCleaner");
            t.setDaemon(true);
            return t;
        });
        cleaner.scheduleAtFixedRate(RateLimiter::cleanup, 1, 1, TimeUnit.MINUTES);
    }

    private RateLimiter() {}

    public static boolean isAllowed(String clientIp) {
        if (clientIp == null) return true;
        long now = System.currentTimeMillis();
        RateLimitEntry entry = requestCounts.compute(clientIp, (key, existing) -> {
            if (existing == null || now - existing.windowStart > WINDOW_MS) {
                return new RateLimitEntry(now, new AtomicInteger(1));
            }
            existing.count.incrementAndGet();
            return existing;
        });
        return entry.count.get() <= MAX_REQUESTS;
    }

    public static int getRemainingRequests(String clientIp) {
        RateLimitEntry entry = requestCounts.get(clientIp);
        if (entry == null) return MAX_REQUESTS;
        return Math.max(0, MAX_REQUESTS - entry.count.get());
    }

    public static long getResetTime(String clientIp) {
        RateLimitEntry entry = requestCounts.get(clientIp);
        long now = System.currentTimeMillis();
        if (entry == null) return (now + WINDOW_MS) / 1000;
        return (entry.windowStart + WINDOW_MS) / 1000;
    }

    public static void reset(String clientIp) {
        requestCounts.remove(clientIp);
    }

    public static void cleanup() {
        long now = System.currentTimeMillis();
        requestCounts.entrySet().removeIf(entry -> now - entry.getValue().windowStart > WINDOW_MS);
    }

    private static class RateLimitEntry {
        final long windowStart;
        final AtomicInteger count;

        RateLimitEntry(long windowStart, AtomicInteger count) {
            this.windowStart = windowStart;
            this.count = count;
        }
    }
}
