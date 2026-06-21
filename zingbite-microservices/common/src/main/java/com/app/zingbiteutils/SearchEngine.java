package com.app.zingbiteutils;

import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.Menu;
import java.util.*;

public class SearchEngine {

    public static class SearchResult implements Comparable<SearchResult> {
        private final Restaurant restaurant;
        private final double score;
        private final boolean fuzzyCorrected;
        private final String suggestion;

        public SearchResult(Restaurant restaurant, double score, boolean fuzzyCorrected, String suggestion) {
            this.restaurant = restaurant;
            this.score = score;
            this.fuzzyCorrected = fuzzyCorrected;
            this.suggestion = suggestion;
        }

        public Restaurant getRestaurant() {
            return restaurant;
        }

        public double getScore() {
            return score;
        }

        public boolean isFuzzyCorrected() {
            return fuzzyCorrected;
        }

        public String getSuggestion() {
            return suggestion;
        }

        @Override
        public int compareTo(SearchResult o) {
            return Double.compare(o.score, this.score); // Descending (highest score first)
        }
    }

    public static List<SearchResult> search(String query, List<Restaurant> restaurants, List<Menu> allMenuItems) {
        if (query == null || query.trim().isEmpty()) {
            List<SearchResult> results = new ArrayList<>();
            for (Restaurant r : restaurants) {
                results.add(new SearchResult(r, 0.0, false, null));
            }
            return results;
        }

        String rawQuery = query.trim().toLowerCase();
        String[] queryTerms = rawQuery.split("\\s+");

        // Map menu items by restaurant id
        Map<Integer, List<Menu>> menuByRestaurant = new HashMap<>();
        for (Menu item : allMenuItems) {
            if (item.getRestaurant() != null) {
                int rId = item.getRestaurant().getRestaurantId();
                menuByRestaurant.computeIfAbsent(rId, k -> new ArrayList<>()).add(item);
            }
        }

        // Generate a global fuzzy spelling suggestion if needed
        String suggestion = null;
        boolean globalFuzzy = false;
        
        // Find best fuzzy alternative for each term from unique words in restaurant names, cuisines, menu items
        Set<String> uniqueWords = new HashSet<>();
        for (Restaurant r : restaurants) {
            if (r.getRestaurantName() != null) {
                uniqueWords.addAll(Arrays.asList(r.getRestaurantName().toLowerCase().split("[^a-zA-Z0-9]+")));
            }
            if (r.getCusineType() != null) {
                uniqueWords.addAll(Arrays.asList(r.getCusineType().toLowerCase().split("[^a-zA-Z0-9]+")));
            }
        }
        for (Menu m : allMenuItems) {
            if (m.getMenuName() != null) {
                uniqueWords.addAll(Arrays.asList(m.getMenuName().toLowerCase().split("[^a-zA-Z0-9]+")));
            }
        }

        // We will build a corrected query string if possible
        StringBuilder correctedQuery = new StringBuilder();
        boolean anyCorrection = false;
        for (String term : queryTerms) {
            if (term.isEmpty()) continue;
            
            // Check if term exists exactly in uniqueWords
            if (uniqueWords.contains(term)) {
                if (correctedQuery.length() > 0) correctedQuery.append(" ");
                correctedQuery.append(term);
                continue;
            }
            
            // Otherwise check closest word fuzzily
            String bestWord = term;
            int bestDist = Integer.MAX_VALUE;
            for (String w : uniqueWords) {
                if (w.length() < 3) continue;
                int dist = FuzzySearch.levenshteinDistance(term, w);
                if (dist < bestDist && dist <= (term.length() <= 3 ? 1 : 2)) {
                    bestDist = dist;
                    bestWord = w;
                }
            }
            if (bestDist < Integer.MAX_VALUE && !bestWord.equals(term)) {
                anyCorrection = true;
                globalFuzzy = true;
                if (correctedQuery.length() > 0) correctedQuery.append(" ");
                correctedQuery.append(bestWord);
            } else {
                if (correctedQuery.length() > 0) correctedQuery.append(" ");
                correctedQuery.append(term);
            }
        }

        if (anyCorrection) {
            suggestion = correctedQuery.toString();
        }

        // Now calculate BM25 / Scored results
        // Doc counts for IDF
        Map<String, Integer> termDocCounts = new HashMap<>();
        for (String term : queryTerms) {
            int count = 0;
            for (Restaurant r : restaurants) {
                if (restaurantContainsTerm(r, menuByRestaurant.get(r.getRestaurantId()), term)) {
                    count++;
                }
            }
            termDocCounts.put(term, count);
        }

        List<SearchResult> results = new ArrayList<>();
        int N = restaurants.size();

        for (Restaurant r : restaurants) {
            double score = 0.0;
            List<Menu> rMenu = menuByRestaurant.getOrDefault(r.getRestaurantId(), Collections.emptyList());

            for (String term : queryTerms) {
                int docFreq = termDocCounts.getOrDefault(term, 0);
                double idf = Math.log(1.0 + (N - docFreq + 0.5) / (docFreq + 0.5));
                if (idf < 0.1) idf = 0.1; // lower bound

                // Calculate TF in restaurant fields
                double tf = 0.0;

                // 1. Restaurant Name matches
                double tfName = countTermOccurrences(r.getRestaurantName(), term);
                tf += tfName * 3.0; // Name weight = 3.0

                // 2. Cuisine Type matches
                double tfCuisine = countTermOccurrences(r.getCusineType(), term);
                tf += tfCuisine * 2.0; // Cuisine weight = 2.0

                // 3. Menu Item matches
                double tfMenu = 0.0;
                for (Menu m : rMenu) {
                    tfMenu += countTermOccurrences(m.getMenuName(), term);
                }
                tf += tfMenu * 1.0; // Menu weight = 1.0

                // If tf is 0, check fuzzy matching
                if (tf == 0.0) {
                    double fuzzyTf = 0.0;
                    // Fuzzy match on Name
                    fuzzyTf += checkFuzzyMatchTf(r.getRestaurantName(), term) * 1.5;
                    // Fuzzy match on Cuisine
                    fuzzyTf += checkFuzzyMatchTf(r.getCusineType(), term) * 1.0;
                    // Fuzzy match on Menu
                    for (Menu m : rMenu) {
                        fuzzyTf += checkFuzzyMatchTf(m.getMenuName(), term) * 0.5;
                    }
                    tf += fuzzyTf;
                }

                // Add bonuses
                double bonus = 1.0;
                if (r.getRestaurantName() != null) {
                    String rNameLower = r.getRestaurantName().toLowerCase();
                    // Prefix bonus
                    if (rNameLower.startsWith(term)) {
                        bonus += 0.5;
                    }
                    // Substring exact match bonus
                    if (rNameLower.contains(term)) {
                        bonus += 0.2;
                    }
                }

                // Simplified BM25 scorer
                double termScore = idf * (tf * 2.2) / (tf + 1.2) * bonus;
                score += termScore;
            }

            if (score > 0.0) {
                results.add(new SearchResult(r, score, globalFuzzy, suggestion));
            }
        }

        // Sort by score descending
        Collections.sort(results);
        return results;
    }

    private static boolean restaurantContainsTerm(Restaurant r, List<Menu> menu, String term) {
        if (r.getRestaurantName() != null && r.getRestaurantName().toLowerCase().contains(term)) return true;
        if (r.getCusineType() != null && r.getCusineType().toLowerCase().contains(term)) return true;
        if (menu != null) {
            for (Menu m : menu) {
                if (m.getMenuName() != null && m.getMenuName().toLowerCase().contains(term)) return true;
            }
        }
        // Fuzzy checks
        if (checkFuzzyMatchTf(r.getRestaurantName(), term) > 0) return true;
        if (checkFuzzyMatchTf(r.getCusineType(), term) > 0) return true;
        if (menu != null) {
            for (Menu m : menu) {
                if (checkFuzzyMatchTf(m.getMenuName(), term) > 0) return true;
            }
        }
        return false;
    }

    private static double countTermOccurrences(String text, String term) {
        if (text == null) return 0.0;
        text = text.toLowerCase();
        int count = 0;
        int idx = 0;
        while ((idx = text.indexOf(term, idx)) != -1) {
            count++;
            idx += term.length();
        }
        return count;
    }

    private static double checkFuzzyMatchTf(String text, String term) {
        if (text == null) return 0.0;
        text = text.toLowerCase();
        String[] words = text.split("[^a-zA-Z0-9]+");
        double maxTf = 0.0;
        for (String word : words) {
            if (word.length() < 3) continue;
            int dist = FuzzySearch.levenshteinDistance(word, term);
            int threshold = term.length() <= 3 ? 1 : 2;
            if (dist <= threshold) {
                double matchFraction = 1.0 - ((double) dist / Math.max(word.length(), term.length()));
                if (matchFraction > maxTf) {
                    maxTf = matchFraction;
                }
            }
        }
        return maxTf;
    }
}
