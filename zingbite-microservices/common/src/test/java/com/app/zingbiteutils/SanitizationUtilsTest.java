package com.app.zingbiteutils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class SanitizationUtilsTest {
    @Test
    void acceptsHttpsAndRejectsExecutableSchemes() {
        assertEquals("https://example.com/resume.pdf",
                SanitizationUtils.requireHttpsUrl("https://example.com/resume.pdf"));
        assertThrows(IllegalArgumentException.class,
                () -> SanitizationUtils.requireHttpsUrl("javascript:alert(1)"));
        assertThrows(IllegalArgumentException.class,
                () -> SanitizationUtils.requireHttpsUrl("data:text/html,boom"));
    }
}
