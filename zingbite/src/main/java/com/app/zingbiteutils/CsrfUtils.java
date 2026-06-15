package com.app.zingbiteutils;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.concurrent.ConcurrentHashMap;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class CsrfUtils {

    private static final int TOKEN_LENGTH = 32;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final ConcurrentHashMap<String, String> tokenStore = new ConcurrentHashMap<>();

    public static String generateToken(HttpSession session) {
        String sessionId = session.getId();
        byte[] bytes = new byte[TOKEN_LENGTH];
        RANDOM.nextBytes(bytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        tokenStore.put(sessionId, token);
        session.setAttribute("csrfToken", token);
        return token;
    }

    public static boolean validateToken(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return false;
        String expected = (String) session.getAttribute("csrfToken");
        if (expected == null) return false;
        String actual = req.getHeader("X-CSRF-Token");
        if (actual == null) {
            actual = req.getParameter("_csrf");
        }
        return expected.equals(actual);
    }

    public static void clearToken(HttpSession session) {
        if (session != null) {
            tokenStore.remove(session.getId());
            session.removeAttribute("csrfToken");
        }
    }
}
