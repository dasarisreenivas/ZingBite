package com.app.zingbiteutils;

import java.util.regex.Pattern;

public final class InputSanitizer {

    private static final Pattern HTML_TAG_PATTERN = Pattern.compile("<[^>]*>");
    private static final Pattern MULTI_WHITESPACE_PATTERN = Pattern.compile("\\s+");

    private InputSanitizer() {}

    public static String sanitize(String input) {
        if (input == null) return null;
        String cleaned = input.trim();
        cleaned = stripHtml(cleaned);
        cleaned = escapeSql(cleaned);
        return cleaned;
    }

    public static String stripHtml(String input) {
        if (input == null) return null;
        return HTML_TAG_PATTERN.matcher(input).replaceAll("");
    }

    public static String trimWhitespace(String input) {
        if (input == null) return null;
        String trimmed = input.trim();
        return MULTI_WHITESPACE_PATTERN.matcher(trimmed).replaceAll(" ");
    }

    public static String escapeSql(String input) {
        if (input == null) return null;
        return input.replace("'", "''")
                    .replace("\\", "\\\\")
                    .replace("\0", "")
                    .replace("\b", "")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r")
                    .replace("\t", "\\t")
                    .replace("\u001A", "")
                    .replace("%", "\\%")
                    .replace("_", "\\_");
    }
}
