package com.app.zingbiteutils;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;

import com.app.zingbitemodels.User;

class CsrfUtilsTest {
    @Test
    void validatesTokenUsingOnlySharedSessionState() {
        MockHttpSession session = new MockHttpSession();
        User user = new User();
        user.setUserID(7);
        session.setAttribute("loggedInUser", user);
        String token = CsrfUtils.generateToken(session);

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setSession(session);
        request.addHeader("X-CSRF-Token", token);

        assertTrue(CsrfUtils.validateToken(request));

        session.setAttribute("csrfTokenExpiry", 0L);
        assertFalse(CsrfUtils.validateToken(request));
        assertNull(session.getAttribute("csrfToken"));
    }
}
