package com.app.zingbiteutils;

import jakarta.servlet.http.HttpServletRequest;

/** Resolves the gateway-sanitized client IP without trusting arbitrary headers. */
public final class ClientIpUtils {
    public static final String CLIENT_IP_HEADER = "X-ZingBite-Client-IP";

    private ClientIpUtils() {}

    public static String resolve(HttpServletRequest request) {
        String remoteAddress = request.getRemoteAddr();
        if (isLoopback(remoteAddress)) {
            String gatewayAddress = request.getHeader(CLIENT_IP_HEADER);
            if (gatewayAddress != null && !gatewayAddress.isBlank()) {
                return gatewayAddress.trim();
            }
        }
        return remoteAddress == null || remoteAddress.isBlank() ? "unknown" : remoteAddress;
    }

    private static boolean isLoopback(String address) {
        return "127.0.0.1".equals(address)
                || "0:0:0:0:0:0:0:1".equals(address)
                || "::1".equals(address)
                || "localhost".equalsIgnoreCase(address);
    }
}
