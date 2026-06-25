package com.app.ai;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.Review;

/**
 * Small local inference engine for ZingBite AI features.
 *
 * This is intentionally deterministic and dependency-free: it scores intents,
 * sentiment, and support categories from live application data instead of
 * returning hard-coded UI demos.
 */
public class ZingBiteAiModel {
    private static final Set<String> POSITIVE_WORDS = Set.of(
        "amazing", "awesome", "best", "clean", "delicious", "excellent", "fast",
        "fresh", "good", "great", "hot", "love", "loved", "perfect", "quick",
        "tasty", "yummy"
    );

    private static final Set<String> NEGATIVE_WORDS = Set.of(
        "bad", "bland", "burnt", "cold", "delay", "delayed", "late", "leak",
        "mess", "missing", "oily", "poor", "salty", "slow", "spill", "stale",
        "terrible", "undercooked", "wrong"
    );

    private static final Set<String> FILLER_WORDS = Set.of(
        "a", "an", "and", "for", "i", "me", "my", "of", "please", "some",
        "the", "to", "want", "would"
    );

    public VoiceIntent classifyVoiceCommand(String rawText) {
        String normalized = normalize(rawText);
        if (normalized.isEmpty()) {
            return VoiceIntent.error("I did not catch that. Try 'search pizza' or 'add biryani'.");
        }

        if (containsAny(normalized, "checkout", "pay", "payment", "place order")) {
            return VoiceIntent.success("NAVIGATE", "/checkout", "Navigating you to checkout...", 0.95);
        }
        if (containsAny(normalized, "cart", "basket", "bag")) {
            return VoiceIntent.success("NAVIGATE", "/cart", "Opening your cart...", 0.92);
        }
        if (containsAny(normalized, "profile", "account")) {
            return VoiceIntent.success("NAVIGATE", "/profile", "Opening your profile settings...", 0.9);
        }

        if (containsAny(normalized, "search", "find", "show me", "look for")) {
            String query = stripCommandWords(normalized, "search", "find", "show me", "look for", "for");
            if (query.isBlank()) {
                return VoiceIntent.error("What should I search for?");
            }
            return VoiceIntent.success("SEARCH", query, "Searching for: " + query, 0.86);
        }

        if (containsAny(normalized, "add", "order", "get", "want")) {
            String itemQuery = stripCommandWords(
                normalized, "add", "order", "get", "want", "to cart", "to my cart", "a plate of"
            );
            itemQuery = removeFillers(itemQuery);
            String customization = extractCustomization(itemQuery);
            if (!customization.isEmpty()) {
                itemQuery = itemQuery.substring(0, itemQuery.indexOf(customization)).trim();
            }
            if (itemQuery.isBlank()) {
                return VoiceIntent.error("Which dish should I add?");
            }
            VoiceIntent intent = VoiceIntent.success("ADD_TO_CART", itemQuery,
                "Looking for " + itemQuery + " on this menu...", 0.82);
            intent.customization = customization;
            intent.quantity = inferQuantity(normalized);
            return intent;
        }

        return VoiceIntent.error("I heard: \"" + rawText + "\". Try 'add biryani', 'search pizza', or 'checkout'.");
    }

    public MenuMatch findBestMenuMatch(List<Menu> menuItems, String itemQuery) {
        String query = normalize(itemQuery);
        if (query.isEmpty()) return null;
        List<String> queryTokens = Arrays.stream(query.split("\\s+"))
            .filter(token -> token.length() > 1 && !FILLER_WORDS.contains(token))
            .toList();

        Menu best = null;
        double bestScore = 0.0;
        for (Menu item : menuItems) {
            String name = normalize(item.getMenuName());
            String description = normalize(item.getDescription());
            double score = 0.0;
            if (name.equals(query)) score += 1.0;
            if (name.contains(query)) score += 0.65;
            for (String token : queryTokens) {
                if (name.contains(token)) score += 0.28;
                if (description.contains(token)) score += 0.1;
            }
            score = Math.min(1.0, score);
            if (score > bestScore) {
                bestScore = score;
                best = item;
            }
        }
        return best == null ? null : new MenuMatch(best, bestScore);
    }

    public ReviewInsights summarizeReviews(List<Review> reviews) {
        if (reviews.isEmpty()) {
            return new ReviewInsights("No reviews available yet to analyze.", 100,
                Set.of(), Set.of());
        }

        int ratingTotal = 0;
        int positiveWords = 0;
        int negativeWords = 0;
        Set<String> positiveTags = new LinkedHashSet<>();
        Set<String> negativeTags = new LinkedHashSet<>();

        for (Review review : reviews) {
            ratingTotal += review.getRating();
            String text = normalize(review.getReviewText());
            for (String token : text.split("\\s+")) {
                if (POSITIVE_WORDS.contains(token)) positiveWords++;
                if (NEGATIVE_WORDS.contains(token)) negativeWords++;
            }
            addTags(review, positiveTags, negativeTags);
        }

        double averageRating = (double) ratingTotal / reviews.size();
        double ratingScore = (averageRating / 5.0) * 100.0;
        double lexiconScore = 50.0;
        int sentimentWords = positiveWords + negativeWords;
        if (sentimentWords > 0) {
            lexiconScore = ((double) positiveWords / sentimentWords) * 100.0;
        }
        int overallScore = (int) Math.round((ratingScore * 0.7) + (lexiconScore * 0.3));

        if (positiveTags.isEmpty()) {
            positiveTags.add(averageRating >= 4.0 ? "Highly Rated" : "Customers Engaged");
        }
        if (negativeTags.isEmpty() && averageRating < 4.0) {
            negativeTags.add("Needs Follow-up");
        }

        String summary = String.format(Locale.US,
            "Based on %d customer reviews, the restaurant averages %.1f/5.0. Positive signals cluster around %s%s",
            reviews.size(),
            averageRating,
            String.join(", ", positiveTags),
            negativeTags.isEmpty() ? "." : ", while improvement opportunities include " + String.join(", ", negativeTags) + "."
        );
        return new ReviewInsights(summary, overallScore, positiveTags, negativeTags);
    }

    public String draftReviewReply(Review review, String reviewerName) {
        String name = reviewerName == null || reviewerName.isBlank() ? "there" : reviewerName.trim();
        String text = normalize(review.getReviewText());
        String issue = detectIssue(text);

        if (review.getRating() >= 4) {
            return String.format(
                "Hi %s, thank you for the lovely review. We are glad the meal hit the mark and we will share your note with the kitchen team. We look forward to serving you again soon!",
                name
            );
        }
        if (review.getRating() == 3) {
            return String.format(
                "Hi %s, thank you for the honest feedback. We appreciate you giving us a chance and will use your comments to tighten up the next order experience.",
                name
            );
        }
        return String.format(
            "Hi %s, we are sorry about the %s. This is not the standard we want for ZingBite orders. We have flagged it with the team and would like to make it right through support@zingbite.com.",
            name,
            issue
        );
    }

    public String generateSupportReply(String rawText, String contextType) {
        String text = normalize(rawText);
        if (containsAny(text, "refund", "bad", "cold", "missing", "wrong", "cancel")) {
            return "I can help with that. Please keep the order ID handy; I have flagged this as a support issue so the team can review refund or replacement options.";
        }
        if (containsAny(text, "late", "delay", "where", "status", "track")) {
            return "I checked the message context and this looks like a delivery-status question. The support team can see the order thread here, and I have marked it as time-sensitive.";
        }
        if ("application".equals(contextType) || containsAny(text, "interview", "application", "resume", "job")) {
            return "Thanks for the update. I have categorized this as an application follow-up so the hiring team can respond with the next step.";
        }
        if (containsAny(text, "help", "support")) {
            return "I can help triage order status, refund issues, delivery delays, or application follow-ups. Tell me what happened and I will route the context.";
        }
        return "I have logged the key details from your message. A support teammate can pick this up with the context already categorized.";
    }

    private void addTags(Review review, Set<String> positiveTags, Set<String> negativeTags) {
        String text = normalize(review.getReviewText());
        if (review.getRating() >= 4) {
            if (containsAny(text, "delicious", "tasty", "yummy", "flavor", "biryani")) positiveTags.add("Flavorful Food");
            if (containsAny(text, "fast", "quick", "hot", "time")) positiveTags.add("Fast Delivery");
            if (containsAny(text, "fresh", "clean", "pack", "hygiene")) positiveTags.add("Fresh Packaging");
        }
        if (review.getRating() <= 2) {
            if (containsAny(text, "cold", "late", "delay", "slow")) negativeTags.add("Delivery Delay");
            if (containsAny(text, "spill", "leak", "mess", "pack")) negativeTags.add("Packaging Issue");
            if (containsAny(text, "salty", "bland", "taste", "bad", "stale")) negativeTags.add("Taste Consistency");
        }
    }

    private String detectIssue(String text) {
        if (containsAny(text, "cold", "ice")) return "food temperature issue";
        if (containsAny(text, "late", "delay", "slow", "hour")) return "delivery delay";
        if (containsAny(text, "spill", "leak", "mess", "pack")) return "packaging issue";
        if (containsAny(text, "salty", "bland", "taste", "bad", "stale")) return "taste inconsistency";
        return "order experience";
    }

    private static boolean containsAny(String text, String... needles) {
        for (String needle : needles) {
            if (text.contains(needle)) return true;
        }
        return false;
    }

    private static String normalize(String text) {
        if (text == null) return "";
        return text.toLowerCase(Locale.ROOT)
            .replaceAll("[^a-z0-9\\s]", " ")
            .replaceAll("\\s+", " ")
            .trim();
    }

    private static String stripCommandWords(String text, String... words) {
        String result = text;
        for (String word : words) {
            result = result.replace(word, " ");
        }
        return result.replaceAll("\\s+", " ").trim();
    }

    private static String removeFillers(String text) {
        return Arrays.stream(text.split("\\s+"))
            .filter(token -> !FILLER_WORDS.contains(token))
            .reduce("", (left, right) -> left.isBlank() ? right : left + " " + right)
            .trim();
    }

    private static String extractCustomization(String itemQuery) {
        for (String marker : List.of("make it", "with", "less", "extra", "without")) {
            int idx = itemQuery.indexOf(marker);
            if (idx >= 0) {
                return itemQuery.substring(idx).trim();
            }
        }
        return "";
    }

    private static int inferQuantity(String text) {
        if (containsAny(text, "two", "2")) return 2;
        if (containsAny(text, "three", "3")) return 3;
        if (containsAny(text, "four", "4")) return 4;
        return 1;
    }

    public static final class VoiceIntent {
        public final String action;
        public final String payload;
        public final String message;
        public final String status;
        public final double confidence;
        public int quantity = 1;
        public String customization = "";

        private VoiceIntent(String status, String action, String payload, String message, double confidence) {
            this.status = status;
            this.action = action;
            this.payload = payload;
            this.message = message;
            this.confidence = confidence;
        }

        static VoiceIntent success(String action, String payload, String message, double confidence) {
            return new VoiceIntent("success", action, payload, message, confidence);
        }

        static VoiceIntent error(String message) {
            return new VoiceIntent("error", "NONE", "", message, 0.0);
        }
    }

    public static final class MenuMatch {
        public final Menu menu;
        public final double confidence;

        MenuMatch(Menu menu, double confidence) {
            this.menu = menu;
            this.confidence = confidence;
        }
    }

    public static final class ReviewInsights {
        public final String summaryText;
        public final int overallSentimentScore;
        public final Set<String> positiveTags;
        public final Set<String> negativeTags;

        ReviewInsights(String summaryText, int overallSentimentScore, Set<String> positiveTags, Set<String> negativeTags) {
            this.summaryText = summaryText;
            this.overallSentimentScore = overallSentimentScore;
            this.positiveTags = positiveTags;
            this.negativeTags = negativeTags;
        }
    }
}
