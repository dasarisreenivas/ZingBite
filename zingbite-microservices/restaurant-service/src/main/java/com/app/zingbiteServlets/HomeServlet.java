package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedao.RestaurantDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.AuthorizationUtils;
import com.app.zingbiteutils.LRUCache;
import com.app.zingbiteutils.RestaurantRanker;
import com.app.zingbiteutils.SearchEngine;
import com.app.zingbiteutils.SearchEngine.SearchResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/home")
public class HomeServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public static final LRUCache<String, List<Restaurant>> restaurantCache =
            new LRUCache<>(1, 30 * 1000, 60 * 1000);
    public static final LRUCache<String, List<Menu>> menuSearchCache =
            new LRUCache<>(1, 30 * 1000, 60 * 1000);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        RestaurantDAO restaurantDAO = new RestaurantDAOImplementation();
        List<Restaurant> restaurants = restaurantCache.get("all", key -> restaurantDAO.getAllRestaurants());

        String query = req.getParameter("q");
        boolean isSearch = query != null && !query.trim().isEmpty();
        List<Restaurant> matchingRestaurants = new ArrayList<>();
        Map<Integer, Double> searchScores = null;
        String suggestion = null;

        if (isSearch) {
            List<Menu> allMenuItems = menuSearchCache.get("all", key -> {
                MenuDAO menuDAO = new MenuDAOImplementation();
                return menuDAO.getAllMenu();
            });
            List<SearchResult> results = SearchEngine.search(query, restaurants, allMenuItems);
            searchScores = new HashMap<>();
            for (SearchResult result : results) {
                Restaurant restaurant = result.getRestaurant();
                matchingRestaurants.add(restaurant);
                searchScores.put(restaurant.getRestaurantId(), result.getScore());
                if (result.getSuggestion() != null) {
                    suggestion = result.getSuggestion();
                }
            }
        } else {
            matchingRestaurants.addAll(restaurants);
        }

        Double latitude = parseCoordinate(req.getParameter("lat"));
        Double longitude = parseCoordinate(req.getParameter("lng"));
        String locationSource = (latitude != null && longitude != null) ? "request" : null;
        if (latitude == null || longitude == null) {
            jakarta.servlet.http.HttpSession session = req.getSession(false);
            if (session != null) {
                com.app.zingbitemodels.User user =
                        (com.app.zingbitemodels.User) session.getAttribute("loggedInUser");
                if (user != null && user.getLatitude() != null && user.getLongitude() != null) {
                    latitude = user.getLatitude();
                    longitude = user.getLongitude();
                    locationSource = "session";
                }
            }
        }
        if (latitude == null || longitude == null) {
            latitude = 12.9716;
            longitude = 77.5946;
            locationSource = "fallback";
        }

        List<Restaurant> rankedRestaurants =
                RestaurantRanker.rank(matchingRestaurants, latitude, longitude, searchScores);
        List<Restaurant> responseRestaurants = new ArrayList<>();
        for (Restaurant restaurant : rankedRestaurants) {
            Restaurant responseRestaurant = new Restaurant(
                    restaurant.getRestaurantId(),
                    restaurant.getRestaurantName(),
                    restaurant.getDeliveryTime(),
                    restaurant.getCusineType(),
                    restaurant.getAddress(),
                    restaurant.getRating(),
                    restaurant.isActive(),
                    restaurant.getAdminId() != null ? restaurant.getAdminId() : 0,
                    restaurant.getImagePath());
            responseRestaurant.setLatitude(restaurant.getLatitude());
            responseRestaurant.setLongitude(restaurant.getLongitude());
            responseRestaurant.setOpen(restaurant.isOpen());
            responseRestaurant.setTotalOrders(restaurant.getTotalOrders());
            responseRestaurant.setTotalImpressions(restaurant.getTotalImpressions());
            responseRestaurants.add(responseRestaurant);
        }

        JsonObject body = new JsonObject();
        body.add("restaurants", new Gson().toJsonTree(responseRestaurants));
        body.addProperty("suggestion", suggestion);
        body.addProperty("resultCount", responseRestaurants.size());
        body.addProperty("isSearch", isSearch);
        if ("request".equals(locationSource) || "session".equals(locationSource)) {
            body.addProperty("locationSource", locationSource);
        }
        resp.getWriter().write(body.toString());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        User user = AuthorizationUtils.requireRole(req, "super_admin");
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden\"}");
            return;
        }

        if (!"true".equals(req.getParameter("clearCache"))) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Invalid action\"}");
            return;
        }

        restaurantCache.clear();
        menuSearchCache.clear();
        MenuServlet.categoryMenuCache.clear();
        resp.getWriter().write("{\"success\":true,\"message\":\"Cache cleared\"}");
    }

    private static Double parseCoordinate(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return Double.parseDouble(value);
        } catch (NumberFormatException ignored) {
            return null;
        }
    }

    @Override
    public void destroy() {
        if (restaurantCache != null) {
            restaurantCache.shutdown();
        }
        if (menuSearchCache != null) {
            menuSearchCache.shutdown();
        }
        super.destroy();
    }
}
