package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitemodels.Menu;
import com.app.zingbiteutils.LRUCache;
import com.app.zingbiteutils.FuzzySearch;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/menu")
public class MenuServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // Cache to hold the full menu JSON string for each restaurant ID
    public static final LRUCache<Integer, String> menuCache = new LRUCache<>(50);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();
        JsonObject jsonResponse = new JsonObject();

        String restaurantIdParam = request.getParameter("restaurantId");
        String restaurantName = request.getParameter("restaurantName");
        String searchQuery = request.getParameter("search");
        
        if (restaurantIdParam != null) {
            try {
                int restaurantId = Integer.parseInt(restaurantIdParam);
                List<Menu> menuList;
                String cachedData = menuCache.get(restaurantId);

                if (cachedData != null) {
                    // Cache hit: deserialize listing
                    java.lang.reflect.Type listType = new com.google.gson.reflect.TypeToken<List<Menu>>(){
                        private static final long serialVersionUID = 1L;
                    }.getType();
                    menuList = gson.fromJson(cachedData, listType);
                } else {
                    // Cache miss: query DB
                    MenuDAO menuDAO = new MenuDAOImplementation();
                    menuList = menuDAO.getMenuRestaurantById(restaurantId);
                    
                    // Put in cache (serialize list to string)
                    menuCache.put(restaurantId, gson.toJson(menuList));
                }

                // If search query is present, apply Levenshtein fuzzy search matching
                if (searchQuery != null && !searchQuery.trim().isEmpty()) {
                    List<Menu> filteredList = new ArrayList<>();
                    for (Menu item : menuList) {
                        if (FuzzySearch.containsFuzzy(item.getMenuName(), searchQuery) || 
                            FuzzySearch.containsFuzzy(item.getDescription(), searchQuery)) {
                            filteredList.add(item);
                        }
                    }
                    menuList = filteredList;
                }
                
                jsonResponse.addProperty("restaurantName", restaurantName != null ? restaurantName : "Restaurant");
                jsonResponse.add("menuList", gson.toJsonTree(menuList));
                
            } catch (NumberFormatException e) {
                jsonResponse.addProperty("error", "Invalid restaurant ID");
            }
        } else {
            jsonResponse.addProperty("error", "Missing restaurant ID");
        }

        response.getWriter().write(jsonResponse.toString());
    }
}
