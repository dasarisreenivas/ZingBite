package com.app.zingbiteutils;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class CsrfUtils {

    private static final int TOKEN_LENGTH = 32;
    private static final long TOKEN_EXPIRY_MS = 86_400_000L; // 24 hours
    private static final SecureRandom RANDOM = new SecureRandom();
    private static String getUserIdFromSession(HttpSession session) {
        if (session == null) return "";
        Object loggedInUser = session.getAttribute("loggedInUser");
        if (loggedInUser instanceof com.app.zingbitemodels.User) {
            return String.valueOf(((com.app.zingbitemodels.User) loggedInUser).getUserID());
        }
        return "";
    }

    public static String generateToken(HttpSession session) {
        if (session == null) return null;
        String userId = getUserIdFromSession(session);
        byte[] bytes = new byte[TOKEN_LENGTH];
        RANDOM.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);

        session.setAttribute("csrfToken", token);
        session.setAttribute("csrfTokenUserId", userId);
        session.setAttribute("csrfTokenExpiry", Instant.now().toEpochMilli() + TOKEN_EXPIRY_MS);
        return token;
    }

    public static boolean validateToken(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return false;

        String expected = (String) session.getAttribute("csrfToken");
        if (expected == null) return false;

        Long expiry = (Long) session.getAttribute("csrfTokenExpiry");
        if (expiry == null || Instant.now().toEpochMilli() > expiry) {
            clearToken(session);
            return false;
        }

        String actual = req.getHeader("X-CSRF-Token");
        if (actual == null) {
            actual = req.getParameter("_csrf");
        }
        if (actual == null || !expected.equals(actual)) {
            return false;
        }

        String sessionUserId = getUserIdFromSession(session);
        String storedUserId = (String) session.getAttribute("csrfTokenUserId");
        if (storedUserId == null || !storedUserId.equals(sessionUserId)) {
            clearToken(session);
            return false;
        }

        // Extend token expiry on each successful validation (sliding window)
        session.setAttribute("csrfTokenExpiry", Instant.now().toEpochMilli() + TOKEN_EXPIRY_MS);

        return true;
    }

    public static void clearToken(HttpSession session) {
        if (session != null) {
            session.removeAttribute("csrfToken");
            session.removeAttribute("csrfTokenUserId");
            session.removeAttribute("csrfTokenExpiry");
        }
    }

    public static void cleanupExpiredTokens() {
        // No-op: distributed sessions are handled by the servlet container / Redis session expiration.
    }
}
