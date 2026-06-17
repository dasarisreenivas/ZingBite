package com.app.zingbiteutils;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class CsrfUtils {

    private static final int TOKEN_LENGTH = 32;
    private static final long TOKEN_EXPIRY_MS = 1_800_000L;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final ConcurrentHashMap<String, CsrfToken> tokenStore = new ConcurrentHashMap<>();

    public static String generateToken(HttpSession session) {
        if (session == null) return null;
        String sessionId = session.getId();
        Object userIdAttr = session.getAttribute("userId");
        String userId = userIdAttr != null ? userIdAttr.toString() : "";
        byte[] bytes = new byte[TOKEN_LENGTH];
        RANDOM.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        CsrfToken csrfToken = new CsrfToken(token, userId, Instant.now().toEpochMilli() + TOKEN_EXPIRY_MS);
        tokenStore.put(sessionId, csrfToken);
        session.setAttribute("csrfToken", token);
        return token;
    }

    public static boolean validateToken(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return false;

        String sessionId = session.getId();
        CsrfToken stored = tokenStore.get(sessionId);
        if (stored == null) return false;

        if (Instant.now().toEpochMilli() > stored.expiry) {
            tokenStore.remove(sessionId);
            session.removeAttribute("csrfToken");
            return false;
        }

        String expected = stored.token;
        String actual = req.getHeader("X-CSRF-Token");
        if (actual == null) {
            actual = req.getParameter("_csrf");
        }
        if (actual == null || !expected.equals(actual)) {
            return false;
        }

        Object userIdAttr = session.getAttribute("userId");
        String sessionUserId = userIdAttr != null ? userIdAttr.toString() : "";
        if (!stored.userId.equals(sessionUserId)) {
            tokenStore.remove(sessionId);
            session.removeAttribute("csrfToken");
            return false;
        }

        return true;
    }

    private static void rotateToken(HttpSession session, CsrfToken oldToken) {
        String sessionId = session.getId();
        byte[] bytes = new byte[TOKEN_LENGTH];
        RANDOM.nextBytes(bytes);
        String newToken = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        Object userIdAttr = session.getAttribute("userId");
        String userId = userIdAttr != null ? userIdAttr.toString() : "";
        CsrfToken csrfToken = new CsrfToken(newToken, userId, Instant.now().toEpochMilli() + TOKEN_EXPIRY_MS);
        tokenStore.put(sessionId, csrfToken);
        session.setAttribute("csrfToken", newToken);
    }

    public static void clearToken(HttpSession session) {
        if (session != null) {
            tokenStore.remove(session.getId());
            session.removeAttribute("csrfToken");
        }
    }

    public static void cleanupExpiredTokens() {
        long now = Instant.now().toEpochMilli();
        tokenStore.values().removeIf(t -> now > t.expiry);
    }

    private static class CsrfToken {
        final String token;
        final String userId;
        final long expiry;

        CsrfToken(String token, String userId, long expiry) {
            this.token = token;
            this.userId = userId;
            this.expiry = expiry;
        }
    }
}
