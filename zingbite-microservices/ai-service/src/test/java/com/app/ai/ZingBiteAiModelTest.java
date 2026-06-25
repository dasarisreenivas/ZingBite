package com.app.ai;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.app.ai.ZingBiteAiModel.ReviewInsights;
import com.app.ai.ZingBiteAiModel.VoiceIntent;
import com.app.zingbitemodels.Review;

class ZingBiteAiModelTest {
    private final ZingBiteAiModel model = new ZingBiteAiModel();

    @Test
    void classifiesAddToCartIntentWithQuantity() {
        VoiceIntent intent = model.classifyVoiceCommand("Add two biryani extra spicy");

        assertEquals("success", intent.status);
        assertEquals("ADD_TO_CART", intent.action);
        assertEquals(2, intent.quantity);
        assertTrue(intent.payload.contains("biryani"));
    }

    @Test
    void summarizesNegativeReviewSignals() {
        Review review = new Review(10, 4, 2, "Food was cold and delivery was late");

        ReviewInsights insights = model.summarizeReviews(List.of(review));

        assertTrue(insights.overallSentimentScore < 60);
        assertTrue(insights.negativeTags.contains("Delivery Delay"));
    }

    @Test
    void draftsIssueAwareSupportReply() {
        String reply = model.generateSupportReply("My order arrived cold and I want a refund", "order");

        assertTrue(reply.toLowerCase().contains("refund"));
    }
}
