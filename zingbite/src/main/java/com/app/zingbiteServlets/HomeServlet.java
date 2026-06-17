package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import com.app.zingbitedao.RestaurantDAO;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.Menu;
import com.app.zingbiteutils.SearchEngine;
import com.app.zingbiteutils.SearchEngine.SearchResult;
import com.app.zingbiteutils.RestaurantRanker;
import com.app.zingbiteutils.LRUCache;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.Map;
import java.util.HashMap;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/home")
public class HomeServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    // Global caches: 30 seconds fresh (TTL), 60 seconds stale (SWR)
    public static final LRUCache<String, List<Restaurant>> restaurantCache = new LRUCache<>(1, 30 * 1000, 60 * 1000);
    public static final LRUCache<String, List<Menu>> menuSearchCache = new LRUCache<>(1, 30 * 1000, 60 * 1000);
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        RestaurantDAO restaurantDAO = new RestaurantDAOImplementation();
        List<Restaurant> restaurantList = restaurantCache.get("all", key -> {
            System.out.println("[HomeServlet] Cache miss/revalidate: Loading restaurants from DB");
            return restaurantDAO.getAllRestaurants();
        });

        String q = req.getParameter("q");
        
        List<Restaurant> finalRestaurants = new ArrayList<>();
        String suggestion = null;
        boolean isSearch = q != null && !q.trim().isEmpty();
        Map<Integer, Double> searchScores = null;

        if (isSearch) {
            List<Menu> allMenuItems = menuSearchCache.get("all", key -> {
                System.out.println("[HomeServlet] Cache miss/revalidate: Loading all menu items from DB");
                MenuDAO menuDAO = new MenuDAOImplementation();
                return menuDAO.getAllMenu();
            });
            
            List<SearchResult> searchResults = SearchEngine.search(q, restaurantList, allMenuItems);
            searchScores = new HashMap<>();
            for (SearchResult res : searchResults) {
                finalRestaurants.add(res.getRestaurant());
                searchScores.put(res.getRestaurant().getRestaurantId(), res.getScore());
                if (res.getSuggestion() != null) {
                    suggestion = res.getSuggestion();
                }
            }
        } else {
            finalRestaurants.addAll(restaurantList);
        }

        // Extract client lat/lng
        Double lat = null;
        Double lng = null;
        try {
            String latStr = req.getParameter("lat");
            String lngStr = req.getParameter("lng");
            if (latStr != null && !latStr.isEmpty()) {
                lat = Double.parseDouble(latStr);
            }
            if (lngStr != null && !lngStr.isEmpty()) {
                lng = Double.parseDouble(lngStr);
            }
        } catch (NumberFormatException e) {
            // Ignore format exceptions
        }

        // Fallback to user session coordinates
        if (lat == null || lng == null) {
            jakarta.servlet.http.HttpSession session = req.getSession(false);
            if (session != null) {
                com.app.zingbitemodels.User user = (com.app.zingbitemodels.User) session.getAttribute("loggedInUser");
                if (user != null && user.getLatitude() != null && user.getLongitude() != null) {
                    lat = user.getLatitude();
                    lng = user.getLongitude();
                }
            }
        }

        // Default to Bangalore center
        if (lat == null || lng == null) {
            lat = 12.9716;
            lng = 77.5946;
        }

        // Rank restaurants using the ranking utility
        finalRestaurants = RestaurantRanker.rank(finalRestaurants, lat, lng, searchScores);

        // Increment impressions for the returned restaurants
        for (Restaurant r : finalRestaurants) {
            try {
                r.setTotalImpressions(r.getTotalImpressions() + 1);
                restaurantDAO.updateRestaurant(r);
            } catch (Exception e) {
                System.err.println("Failed to update impressions for restaurant: " + r.getRestaurantId() + " - " + e.getMessage());
            }
        }

        JsonObject responseObj = new JsonObject();
        Gson gson = new Gson();
        
        responseObj.add("restaurants", gson.toJsonTree(finalRestaurants));
        responseObj.addProperty("suggestion", suggestion);
        responseObj.addProperty("resultCount", finalRestaurants.size());
        responseObj.addProperty("isSearch", isSearch);

        resp.getWriter().write(responseObj.toString());
    }
}
