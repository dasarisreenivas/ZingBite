package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.LRUCache;
import com.app.zingbiteutils.FuzzySearch;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.hibernate.Session;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/menu")
public class MenuServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Cache to hold the full menu JSON string for each restaurant ID (10s TTL, 30s Stale Window)
    public static final LRUCache<Integer, String> menuCache = new LRUCache<>(50, 10 * 1000, 30 * 1000);
    public static final LRUCache<String, String> categoryMenuCache = new LRUCache<>(100, 10 * 1000, 30 * 1000);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();

        String restaurantIdParam = request.getParameter("restaurantId");
        String restaurantName = request.getParameter("restaurantName");
        String searchQuery = request.getParameter("search");
        String categoryQuery = request.getParameter("category");
        
        if (restaurantIdParam != null) {
            try {
                int restaurantId = Integer.parseInt(restaurantIdParam);
                String cachedData = menuCache.get(restaurantId, id -> loadRestaurantMenuJson(id, gson));
                JsonArray menuList = JsonParser.parseString(cachedData).getAsJsonArray();

                // If search query is present, apply Levenshtein fuzzy search matching
                if (searchQuery != null && !searchQuery.trim().isEmpty()) {
                    JsonArray filteredList = new JsonArray();
                    for (JsonElement element : menuList) {
                        JsonObject item = element.getAsJsonObject();
                        String menuName = getString(item, "menuName");
                        String description = getString(item, "description");
                        if (FuzzySearch.containsFuzzy(menuName, searchQuery) ||
                            FuzzySearch.containsFuzzy(description, searchQuery)) {
                            filteredList.add(item);
                        }
                    }
                    menuList = filteredList;
                }
                
                if (restaurantName != null) {
                    JsonObject jsonResponse = new JsonObject();
                    jsonResponse.addProperty("restaurantName", restaurantName);
                    jsonResponse.add("menuList", menuList);
                    response.getWriter().write(jsonResponse.toString());
                } else {
                    response.getWriter().write(menuList.toString());
                }
                
            } catch (NumberFormatException e) {
                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("error", "Invalid restaurant ID");
                response.getWriter().write(jsonResponse.toString());
            }
        } else if (hasText(categoryQuery) || hasText(searchQuery)) {
            String query = hasText(categoryQuery) ? categoryQuery.trim() : searchQuery.trim();
            String cacheKey = normalizeCategory(query);
            String cachedMenuItems = categoryMenuCache.get(cacheKey, key -> loadCategoryMenuJson(key, gson));
            JsonArray filteredList = JsonParser.parseString(cachedMenuItems).getAsJsonArray();

            JsonObject jsonResponse = new JsonObject();
            jsonResponse.addProperty("category", query);
            jsonResponse.addProperty("resultCount", filteredList.size());
            jsonResponse.add("menuList", filteredList);
            response.getWriter().write(jsonResponse.toString());
        } else {
            JsonObject jsonResponse = new JsonObject();
            jsonResponse.addProperty("error", "Missing restaurant ID");
            response.getWriter().write(jsonResponse.toString());
        }
    }

    @Override
    public void destroy() {
        if (menuCache != null) {
            menuCache.shutdown();
        }
        if (categoryMenuCache != null) {
            categoryMenuCache.shutdown();
        }
        super.destroy();
    }

    private String loadRestaurantMenuJson(int restaurantId, Gson gson) {
        try (Session hibernateSession = DBUtils.openSession()) {
            List<Menu> menuList = hibernateSession.createQuery(
                    "select distinct m from Menu m join fetch m.restaurant where m.restaurant.restaurantId = :restaurantId",
                    Menu.class)
                .setParameter("restaurantId", restaurantId)
                .list();
            hydrateComboConstituents(hibernateSession, menuList);
            return gson.toJson(toMenuJsonArray(menuList));
        }
    }

    private String loadCategoryMenuJson(String normalizedQuery, Gson gson) {
        try (Session hibernateSession = DBUtils.openSession()) {
            List<Menu> allMenuItems = hibernateSession.createQuery(
                    "select distinct m from Menu m join fetch m.restaurant",
                    Menu.class)
                .list();
            hydrateComboConstituents(hibernateSession, allMenuItems);

            JsonArray filteredList = new JsonArray();
            for (Menu item : allMenuItems) {
                if (item != null && item.isAvailable() && matchesCategory(item, normalizedQuery)) {
                    filteredList.add(toMenuJson(item));
                }
            }
            return gson.toJson(filteredList);
        }
    }

    private void hydrateComboConstituents(Session hibernateSession, List<Menu> menuList) {
        for (Menu item : menuList) {
            if (item != null && "COMBO".equals(item.getType())) {
                String hql = "select constituentMenuId from ComboMapping where comboMenuId = :comboId";
                List<Integer> constituents = hibernateSession.createQuery(hql, Integer.class)
                    .setParameter("comboId", item.getMenuId())
                    .list();
                item.setConstituentItems(constituents != null ? constituents : new ArrayList<Integer>());
            }
        }
    }

    private JsonArray toMenuJsonArray(List<Menu> menuList) {
        JsonArray menuArray = new JsonArray();
        for (Menu item : menuList) {
            menuArray.add(toMenuJson(item));
        }
        return menuArray;
    }

    private JsonObject toMenuJson(Menu item) {
        JsonObject json = new JsonObject();
        json.addProperty("menuId", item.getMenuId());
        json.addProperty("menuName", item.getMenuName());
        json.addProperty("price", item.getPrice());
        json.addProperty("description", item.getDescription());
        json.addProperty("isAvailable", item.isAvailable());
        json.addProperty("imagePath", item.getImagePath());
        json.addProperty("type", item.getType());
        json.addProperty("itemType", item.getItemType());
        json.add("constituentItems", new Gson().toJsonTree(item.getConstituentItems()));

        Restaurant restaurant = item.getRestaurant();
        if (restaurant != null) {
            JsonObject restaurantJson = new JsonObject();
            restaurantJson.addProperty("restaurantId", restaurant.getRestaurantId());
            restaurantJson.addProperty("restaurantName", restaurant.getRestaurantName());
            restaurantJson.addProperty("deliveryTime", restaurant.getDeliveryTime());
            restaurantJson.addProperty("cusineType", restaurant.getCusineType());
            restaurantJson.addProperty("address", restaurant.getAddress());
            restaurantJson.addProperty("rating", restaurant.getRating());
            restaurantJson.addProperty("isActive", restaurant.isActive());
            restaurantJson.addProperty("isOpen", restaurant.isOpen());
            restaurantJson.addProperty("imagePath", restaurant.getImagePath());
            json.add("restaurant", restaurantJson);
        }

        return json;
    }

    private String getString(JsonObject json, String memberName) {
        JsonElement element = json.get(memberName);
        return element != null && !element.isJsonNull() ? element.getAsString() : "";
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private boolean matchesCategory(Menu item, String query) {
        if (!hasText(query)) {
            return false;
        }
        String normalizedQuery = normalizeCategory(query);
        String menuName = normalizeCategory(item.getMenuName());
        String description = normalizeCategory(item.getDescription());
        String restaurantCuisine = item.getRestaurant() != null
            ? normalizeCategory(item.getRestaurant().getCusineType())
            : "";

        if (containsCategory(menuName, normalizedQuery)
                || containsCategory(description, normalizedQuery)
                || containsCategory(restaurantCuisine, normalizedQuery)) {
            return true;
        }

        String singularQuery = singularize(normalizedQuery);
        return !singularQuery.equals(normalizedQuery)
            && (containsCategory(menuName, singularQuery)
                || containsCategory(description, singularQuery)
                || containsCategory(restaurantCuisine, singularQuery));
    }

    private boolean containsCategory(String target, String query) {
        return hasText(target) && hasText(query) && (
            target.contains(query) || FuzzySearch.containsFuzzy(target, query)
        );
    }

    private String normalizeCategory(String value) {
        if (value == null) {
            return "";
        }
        return value.toLowerCase()
            .replace('&', ' ')
            .replaceAll("[^\\p{L}\\p{N}\\s]", " ")
            .replaceAll("\\s+", " ")
            .trim();
    }

    private String singularize(String value) {
        if (value == null || value.length() <= 3 || !value.endsWith("s")) {
            return value == null ? "" : value;
        }
        if (value.endsWith("ies") && value.length() > 4) {
            return value.substring(0, value.length() - 3) + "y";
        }
        if ((value.endsWith("ches") || value.endsWith("shes") || value.endsWith("xes") || value.endsWith("zes"))
                && value.length() > 4) {
            return value.substring(0, value.length() - 2);
        }
        if (value.endsWith("ses") && value.length() > 4) {
            return value.substring(0, value.length() - 2);
        }
        if (value.endsWith("ss")) {
            return value;
        }
        return value.substring(0, value.length() - 1);
    }
}
