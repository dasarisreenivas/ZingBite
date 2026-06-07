package com.app.zingbiteutils;

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
}
