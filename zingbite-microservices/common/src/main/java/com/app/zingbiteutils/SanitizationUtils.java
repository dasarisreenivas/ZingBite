package com.app.zingbiteutils;

import java.net.URI;

public class SanitizationUtils {

    /**
     * Escapes standard HTML special characters to prevent stored/reflected XSS.
     */
    public static String escapeHtml(String input) {
        if (input == null) {
            return null;
        }
        return input.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'", "&#x27;")
                    .replace("/", "&#x2F;");
    }

    /**
     * Checks if a string exceeds a given length limit.
     */
    public static boolean validateLength(String input, int maxLength) {
        if (input == null) {
            return true;
        }
        return input.trim().length() <= maxLength;
    }

    public static String requireHttpsUrl(String input) {
        try {
            URI uri = URI.create(input == null ? "" : input.trim());
            if (!"https".equalsIgnoreCase(uri.getScheme()) || uri.getHost() == null) {
                throw new IllegalArgumentException("URL must use HTTPS");
            }
            return uri.toASCIIString();
        } catch (RuntimeException error) {
            throw new IllegalArgumentException("Invalid HTTPS URL", error);
        }
    }
}
