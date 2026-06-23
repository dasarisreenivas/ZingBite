package com.app.zingbiteutils;

import org.hibernate.Session;

import com.app.zingbitemodels.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

/** Centralizes fresh database-backed role checks for privileged endpoints. */
public final class AuthorizationUtils {
    private AuthorizationUtils() {}

    public static User requireAuthenticated(HttpServletRequest request) {
        HttpSession httpSession = request.getSession(false);
        if (httpSession == null || !(httpSession.getAttribute("loggedInUser") instanceof User sessionUser)) {
            return null;
        }
        try (Session dbSession = DBUtils.openSession()) {
            User currentUser = dbSession.get(User.class, sessionUser.getUserID());
            if (currentUser == null || Boolean.TRUE.equals(currentUser.getBlocked())) {
                try {
                    httpSession.invalidate();
                } catch (IllegalStateException ignored) {
                    // Session was already invalidated by another concurrent request.
                }
                return null;
            }
            httpSession.setAttribute("loggedInUser", currentUser);
            return currentUser;
        }
    }

    public static User requireRole(HttpServletRequest request, String requiredRole) {
        User currentUser = requireAuthenticated(request);
        return currentUser != null && requiredRole.equals(currentUser.getRole()) ? currentUser : null;
    }
}
