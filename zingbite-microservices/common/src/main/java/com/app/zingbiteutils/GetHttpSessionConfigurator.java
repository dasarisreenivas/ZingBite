package com.app.zingbiteutils;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.HandshakeResponse;
import jakarta.websocket.server.HandshakeRequest;
import jakarta.websocket.server.ServerEndpointConfig;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Set;

public class GetHttpSessionConfigurator extends ServerEndpointConfig.Configurator {
    private static final Set<String> DEFAULT_ALLOWED_ORIGINS = Set.of(
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:8080",
            "http://127.0.0.1:8080",
            "http://localhost:8090",
            "http://127.0.0.1:8090",
            "http://localhost:8086",
            "http://127.0.0.1:8086");

    @Override
    public void modifyHandshake(ServerEndpointConfig config, HandshakeRequest request, HandshakeResponse response) {
        HttpSession httpSession = (HttpSession) request.getHttpSession();
        if (httpSession != null) {
            config.getUserProperties().put("httpSession", httpSession);
        }
    }

    @Override
    public boolean checkOrigin(String originHeaderValue) {
        if (originHeaderValue == null || originHeaderValue.isBlank()) {
            return false;
        }

        String origin = originHeaderValue.trim();
        return DEFAULT_ALLOWED_ORIGINS.contains(origin)
                || matchesConfiguredOrigin(origin)
                || isTryCloudflareOrigin(origin);
    }

    private boolean matchesConfiguredOrigin(String origin) {
        return matchesConfiguredOrigin(origin, System.getenv("ZINGBITE_ALLOWED_ORIGIN"))
                || matchesConfiguredOrigin(origin, System.getenv("ZINGBITE_ALLOWED_ORIGINS"));
    }

    private boolean matchesConfiguredOrigin(String origin, String configuredOrigins) {
        if (configuredOrigins == null || configuredOrigins.isBlank()) {
            return false;
        }

        for (String configuredOrigin : configuredOrigins.split(",")) {
            String allowedOrigin = configuredOrigin.trim();
            if (allowedOrigin.isEmpty() || "https://zingbite.invalid".equals(allowedOrigin)) {
                continue;
            }
            if (origin.equals(allowedOrigin) || matchesWildcardOrigin(origin, allowedOrigin)) {
                return true;
            }
        }
        return false;
    }

    private boolean matchesWildcardOrigin(String origin, String allowedOriginPattern) {
        int wildcardIndex = allowedOriginPattern.indexOf("*.");
        if (wildcardIndex < 0) {
            return false;
        }

        String prefix = allowedOriginPattern.substring(0, wildcardIndex);
        String suffix = allowedOriginPattern.substring(wildcardIndex + 1);
        return origin.startsWith(prefix) && origin.endsWith(suffix);
    }

    private boolean isTryCloudflareOrigin(String origin) {
        try {
            URI uri = new URI(origin);
            String host = uri.getHost();
            return "https".equalsIgnoreCase(uri.getScheme())
                    && host != null
                    && host.endsWith(".trycloudflare.com");
        } catch (URISyntaxException e) {
            return false;
        }
    }
}
