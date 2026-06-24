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

    // Cache to hold the full menu JSON string for each restaurant ID (10s TTL, 30s Stale Window)
    public static final LRUCache<Integer, String> menuCache = new LRUCache<>(50, 10 * 1000, 30 * 1000);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();

        String restaurantIdParam = request.getParameter("restaurantId");
        String restaurantName = request.getParameter("restaurantName");
        String searchQuery = request.getParameter("search");
        
        if (restaurantIdParam != null) {
            try {
                int restaurantId = Integer.parseInt(restaurantIdParam);
                List<Menu> menuList;
                String cachedData = menuCache.get(restaurantId, id -> {
                    System.out.println("[MenuServlet] Cache miss/revalidate: Loading menu from DB for restaurant: " + id);
                    MenuDAO menuDAO = new MenuDAOImplementation();
                    List<Menu> dbMenuList = menuDAO.getMenuRestaurantById(id);
                    try (org.hibernate.Session hibernateSession = com.app.zingbiteutils.DBUtils.openSession()) {
                        for (Menu m : dbMenuList) {
                            if ("COMBO".equals(m.getType())) {
                                String hql = "select constituentMenuId from ComboMapping where comboMenuId = :comboId";
                                List<Integer> constituents = hibernateSession.createQuery(hql, Integer.class)
                                    .setParameter("comboId", m.getMenuId())
                                    .list();
                                m.setConstituentItems(constituents != null ? constituents : new ArrayList<Integer>());
                            }
                        }
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                    return gson.toJson(dbMenuList);
                });

                java.lang.reflect.Type listType = new com.google.gson.reflect.TypeToken<List<Menu>>(){
                    private static final long serialVersionUID = 1L;
                }.getType();
                menuList = gson.fromJson(cachedData, listType);

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
                
                if (restaurantName != null) {
                    JsonObject jsonResponse = new JsonObject();
                    jsonResponse.addProperty("restaurantName", restaurantName);
                    jsonResponse.add("menuList", gson.toJsonTree(menuList));
                    response.getWriter().write(jsonResponse.toString());
                } else {
                    response.getWriter().write(gson.toJson(menuList));
                }
                
            } catch (NumberFormatException e) {
                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("error", "Invalid restaurant ID");
                response.getWriter().write(jsonResponse.toString());
            }
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
        super.destroy();
    }
}
