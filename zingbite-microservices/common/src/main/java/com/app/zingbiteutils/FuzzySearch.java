package com.app.zingbiteutils;

public class FuzzySearch {

    /**
     * Calculates the Levenshtein Distance between two strings.
     */
    public static int levenshteinDistance(String s1, String s2) {
        if (s1 == null || s2 == null) {
            return Integer.MAX_VALUE;
        }
        s1 = s1.toLowerCase().trim();
        s2 = s2.toLowerCase().trim();

        int len1 = s1.length();
        int len2 = s2.length();

        int[][] dp = new int[len1 + 1][len2 + 1];

        for (int i = 0; i <= len1; i++) {
            dp[i][0] = i;
        }
        for (int j = 0; j <= len2; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= len1; i++) {
            for (int j = 1; j <= len2; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j - 1] + 1, // Substitution
                        Math.min(
                            dp[i - 1][j] + 1, // Deletion
                            dp[i][j - 1] + 1  // Insertion
                        )
                    );
                }
            }
        }
        return dp[len1][len2];
    }

    /**
     * Checks if target string contains query string using fuzzy logic (with Levenshtein distance threshold).
     */
    public static boolean containsFuzzy(String target, String query) {
        if (target == null || query == null) {
            return false;
        }
        target = target.toLowerCase().trim();
        query = query.toLowerCase().trim();

        if (query.isEmpty()) {
            return true;
        }
        if (target.contains(query)) {
            return true;
        }

        String[] targetWords = target.split("\\s+");
        String[] queryWords = query.split("\\s+");

        for (String qw : queryWords) {
            if (qw.isEmpty()) continue;
            boolean wordMatched = false;
            for (String tw : targetWords) {
                if (tw.isEmpty()) continue;
                
                // If direct substring, it matches
                if (tw.contains(qw) || qw.contains(tw)) {
                    wordMatched = true;
                    break;
                }

                int dist = levenshteinDistance(tw, qw);
                int threshold = qw.length() <= 3 ? 1 : 2; // Strict threshold for short queries
                
                if (dist <= threshold) {
                    wordMatched = true;
                    break;
                }
            }
            if (wordMatched) {
                return true;
            }
        }
        return false;
    }
}
