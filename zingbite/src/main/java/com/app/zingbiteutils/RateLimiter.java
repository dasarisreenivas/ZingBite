package com.app.zingbiteutils;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Simple in-memory rate limiter to prevent API abuse.
 * Limits requests per IP within a sliding window.
 */
public class RateLimiter {

    private static final Map<String, RateLimitEntry> requestCounts = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS = 100;
    private static final long WINDOW_MS = 60_000L; // 1 minute

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

    public static void reset(String clientIp) {
        requestCounts.remove(clientIp);
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
