package com.app.zingbiteutils;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Tracks failed login attempts per IP address to prevent brute-force attacks.
 * After MAX_ATTEMPTS failures, the IP is blocked for the lockout duration.
 */
public class LoginAttemptManager {

    private static final Map<String, AttemptEntry> attempts = new ConcurrentHashMap<>();
    private static final int MAX_ATTEMPTS = 5;
    private static final long LOCKOUT_DURATION_MS = 15 * 60 * 1000L; // 15 minutes
    private static final long ATTEMPT_WINDOW_MS = 30 * 60 * 1000L;  // 30 minutes

    private LoginAttemptManager() {}

    public static boolean isBlocked(String ip) {
        if (ip == null) return false;
        AttemptEntry entry = attempts.get(ip);
        if (entry == null) return false;
        if (entry.attemptCount >= MAX_ATTEMPTS) {
            if (System.currentTimeMillis() - entry.firstAttemptTime < LOCKOUT_DURATION_MS) {
                return true;
            }
            attempts.remove(ip);
            return false;
        }
        return false;
    }

    public static void recordFailedAttempt(String ip) {
        if (ip == null) return;
        attempts.compute(ip, (key, existing) -> {
            long now = System.currentTimeMillis();
            if (existing == null || now - existing.firstAttemptTime > ATTEMPT_WINDOW_MS) {
                return new AttemptEntry(now, 1);
            }
            existing.attemptCount++;
            return existing;
        });
    }

    public static void recordSuccessfulAttempt(String ip) {
        attempts.remove(ip);
    }

    public static int getRemainingAttempts(String ip) {
        AttemptEntry entry = attempts.get(ip);
        if (entry == null) return MAX_ATTEMPTS;
        return Math.max(0, MAX_ATTEMPTS - entry.attemptCount);
    }

    private static class AttemptEntry {
        final long firstAttemptTime;
        int attemptCount;

        AttemptEntry(long firstAttemptTime, int attemptCount) {
            this.firstAttemptTime = firstAttemptTime;
            this.attemptCount = attemptCount;
        }
    }
}
