package com.app.zingbiteutils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedao.OrderItemDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitedaoimpl.OrderItemDAOImplementation;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.OrderItem;

public class RecommendationEngine {
    private static final Logger LOGGER = LoggerFactory.getLogger(RecommendationEngine.class);

    private static final Map<Integer, Map<Integer, Double>> similarityMatrix = new ConcurrentHashMap<>();
    private static final Map<Integer, Integer> itemPopularity = new ConcurrentHashMap<>();
    private static final Object lock = new Object();
    private static boolean initialized = false;

    public static void initialize() {
        synchronized (lock) {
            similarityMatrix.clear();
            itemPopularity.clear();
            
            try {
                OrderItemDAO orderItemDAO = new OrderItemDAOImplementation();
                List<OrderItem> allItems = orderItemDAO.getAllOrderItem();
                
                if (allItems == null || allItems.isEmpty()) {
                    initialized = true;
                    return;
                }

                Map<Integer, Set<Integer>> orderToItems = new HashMap<>();
                Map<Integer, Set<Integer>> itemToOrders = new HashMap<>();
                
                for (OrderItem item : allItems) {
                    int menuId = item.getMenuId();
                    int orderId = item.getOrderId();
                    int qty = item.getQuantity();
                    
                    itemPopularity.put(menuId, itemPopularity.getOrDefault(menuId, 0) + qty);
                    
                    orderToItems.computeIfAbsent(orderId, k -> new HashSet<>()).add(menuId);
                    itemToOrders.computeIfAbsent(menuId, k -> new HashSet<>()).add(orderId);
                }
                
                List<Integer> menuIds = new ArrayList<>(itemToOrders.keySet());
                for (int i = 0; i < menuIds.size(); i++) {
                    int idA = menuIds.get(i);
                    Set<Integer> ordersA = itemToOrders.get(idA);
                    if (ordersA == null || ordersA.isEmpty()) continue;
                    
                    for (int j = i + 1; j < menuIds.size(); j++) {
                        int idB = menuIds.get(j);
                        Set<Integer> ordersB = itemToOrders.get(idB);
                        if (ordersB == null || ordersB.isEmpty()) continue;
                        
                        int intersection = 0;
                        for (int orderId : ordersA) {
                            if (ordersB.contains(orderId)) {
                                intersection++;
                            }
                        }
                        
                        if (intersection > 0) {
                            int union = ordersA.size() + ordersB.size() - intersection;
                            double similarity = (double) intersection / union;
                            
                            similarityMatrix.computeIfAbsent(idA, k -> new ConcurrentHashMap<>()).put(idB, similarity);
                            similarityMatrix.computeIfAbsent(idB, k -> new ConcurrentHashMap<>()).put(idA, similarity);
                        }
                    }
                }
                initialized = true;
                LOGGER.info("[RecommendationEngine] Initialized similarity matrix for " + menuIds.size() + " unique items.");
            } catch (Exception e) {
                LOGGER.warn("[RecommendationEngine] Error during initialization:");
                LOGGER.error("Unexpected error", e);
            }
        }
    }

    public static List<Menu> getRecommendations(int restaurantId, List<Integer> cartItemIds, int limit) {
        if (!initialized) {
            initialize();
        }

        MenuDAO menuDAO = new MenuDAOImplementation();
        List<Menu> restaurantMenu = menuDAO.getMenuRestaurantById(restaurantId);
        if (restaurantMenu == null || restaurantMenu.isEmpty()) {
            return Collections.emptyList();
        }

        Set<Integer> cartSet = new HashSet<>(cartItemIds != null ? cartItemIds : Collections.emptyList());
        List<Menu> recommendations = new ArrayList<>();
        
        // Map to hold similarity scores for candidate items
        Map<Menu, Double> candidateScores = new HashMap<>();
        
        for (Menu item : restaurantMenu) {
            if (cartSet.contains(item.getMenuId())) continue;
            if (!item.isAvailable()) continue;
            
            double score = 0.0;
            if (!cartSet.isEmpty()) {
                for (int cartId : cartSet) {
                    Map<Integer, Double> sims = similarityMatrix.get(cartId);
                    if (sims != null) {
                        score += sims.getOrDefault(item.getMenuId(), 0.0);
                    }
                }
            }
            
            if (score > 0.0) {
                candidateScores.put(item, score);
            }
        }
        
        // Sort candidate items by Jaccard similarity score descending
        List<Map.Entry<Menu, Double>> sortedCandidates = new ArrayList<>(candidateScores.entrySet());
        sortedCandidates.sort((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()));
        
        for (Map.Entry<Menu, Double> entry : sortedCandidates) {
            if (recommendations.size() >= limit) break;
            recommendations.add(entry.getKey());
        }
        
        // Fallback: fill remaining slots with popular items from the same restaurant
        if (recommendations.size() < limit) {
            Set<Integer> chosenSet = new HashSet<>();
            for (Menu r : recommendations) {
                chosenSet.add(r.getMenuId());
            }
            
            List<Menu> popularCandidates = new ArrayList<>();
            for (Menu item : restaurantMenu) {
                if (cartSet.contains(item.getMenuId())) continue;
                if (chosenSet.contains(item.getMenuId())) continue;
                if (!item.isAvailable()) continue;
                popularCandidates.add(item);
            }
            
            // Sort by order popularity count descending
            popularCandidates.sort((m1, m2) -> {
                int pop1 = itemPopularity.getOrDefault(m1.getMenuId(), 0);
                int pop2 = itemPopularity.getOrDefault(m2.getMenuId(), 0);
                return Integer.compare(pop2, pop1);
            });
            
            for (Menu item : popularCandidates) {
                if (recommendations.size() >= limit) break;
                recommendations.add(item);
            }
        }
        
        return recommendations;
    }
}
