package com.app.zingbiteutils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import com.app.zingbitemodels.Restaurant;

public class RestaurantRanker {

    /**
     * Ranks the list of restaurants using a composite scoring algorithm.
     * Score(R) = availabilityScore + textMatchScore + ratingScore + conversionScore - distancePenalty - etaPenalty
     *
     * @param restaurants The list of restaurants to rank.
     * @param customerLat The latitude of the customer (null if not available).
     * @param customerLng The longitude of the customer (null if not available).
     * @param searchScores Map of restaurant IDs to their fuzzy/text search scores (null if search is not active).
     * @return A sorted list of restaurants from highest score to lowest.
     */
    public static List<Restaurant> rank(List<Restaurant> restaurants, Double customerLat, Double customerLng, Map<Integer, Double> searchScores) {
        if (restaurants == null || restaurants.isEmpty()) {
            return new ArrayList<>();
        }

        // Create a copy of the list to preserve session list references
        List<Restaurant> rankedList = new ArrayList<>(restaurants);

        // Sort by composite score descending
        Collections.sort(rankedList, new Comparator<Restaurant>() {
            @Override
            public int compare(Restaurant r1, Restaurant r2) {
                double score1 = calculateScore(r1, customerLat, customerLng, searchScores);
                double score2 = calculateScore(r2, customerLat, customerLng, searchScores);
                return Double.compare(score2, score1);
            }
        });

        return rankedList;
    }

    public static double calculateScore(Restaurant r, Double customerLat, Double customerLng, Map<Integer, Double> searchScores) {
        double score = 0.0;

        // 1. Availability Score (100 pts)
        if (r.isOpen() && r.isActive()) {
            score += 100.0;
        }

        // 2. Text Match Score (Max 100 pts)
        if (searchScores != null && searchScores.containsKey(r.getRestaurantId())) {
            double textMatch = searchScores.get(r.getRestaurantId());
            score += textMatch * 10.0;
        }

        // 3. Rating Score (Max 40 pts)
        score += r.getRating() * 8.0;

        // 4. Conversion Rate Score (Max 25 pts)
        double ctr = 0.0;
        if (r.getTotalImpressions() > 0) {
            ctr = (double) r.getTotalOrders() / r.getTotalImpressions();
        }
        score += Math.min(1.0, ctr) * 25.0;

        // 5. Distance Penalty (Max -50 pts)
        if (customerLat != null && customerLng != null && r.getLatitude() != null && r.getLongitude() != null) {
            double distance = GeoUtils.haversine(customerLat, customerLng, r.getLatitude(), r.getLongitude());
            double distancePenalty = Math.min(50.0, distance * 3.0);
            score -= distancePenalty;
        }

        // 6. ETA Penalty (Max -30 pts)
        int etaMinutes = parseETA(r.getDeliveryTime());
        double etaPenalty = Math.min(30.0, etaMinutes * 0.5);
        score -= etaPenalty;

        return score;
    }

    /**
     * Parses delivery time string (e.g. "30 mins", "45 min", "1 hour", "40") into minutes.
     */
    private static int parseETA(String deliveryTime) {
        if (deliveryTime == null || deliveryTime.trim().isEmpty()) {
            return 30; // Default fallback
        }
        try {
            String clean = deliveryTime.replaceAll("[^0-9]", "");
            if (!clean.isEmpty()) {
                int val = Integer.parseInt(clean);
                if (deliveryTime.toLowerCase().contains("hour") || deliveryTime.toLowerCase().contains("hr")) {
                    return val * 60;
                }
                return val;
            }
        } catch (Exception e) {
            // Ignore parse exception
        }
        return 30; // Default fallback
    }
}
