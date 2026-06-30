package com.app.zingbiteutils;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class GetHttpSessionConfiguratorTest {
    @Test
    void rejectsMissingAndUntrustedOrigins() {
        GetHttpSessionConfigurator configurator = new GetHttpSessionConfigurator();

        assertFalse(configurator.checkOrigin(null));
        assertFalse(configurator.checkOrigin(""));
        assertFalse(configurator.checkOrigin("https://evil.example"));
    }

    @Test
    void allowsDevelopmentAndCloudflareTunnelOrigins() {
        GetHttpSessionConfigurator configurator = new GetHttpSessionConfigurator();

        assertTrue(configurator.checkOrigin("http://localhost:5173"));
        assertTrue(configurator.checkOrigin("http://127.0.0.1:8090"));
        assertTrue(configurator.checkOrigin("https://abc.trycloudflare.com"));
        assertFalse(configurator.checkOrigin("http://abc.trycloudflare.com"));
    }
}
