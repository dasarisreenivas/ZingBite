package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import com.app.zingbitedao.WishlistDAO;
import com.app.zingbitedaoimpl.WishlistDAOImplementation;
import com.app.zingbitemodels.WishlistItem;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/wishlist")
public class WishlistServlet extends HttpServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(WishlistServlet.class);

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to view wishlist\"}");
            return;
        }

        User user = null;
        try {
            user = (User) session.getAttribute("loggedInUser");
        } catch (ClassCastException e) {
            try {
                session.invalidate();
            } catch (Exception ignored) {}
        }

        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to view wishlist\"}");
            return;
        }

        try {
            WishlistDAO wishlistDAO = new WishlistDAOImplementation();
            List<Menu> favorites = wishlistDAO.getWishlistMenusByUser(user.getUserID());
            
            Gson gson = new Gson();
            response.getWriter().write(gson.toJson(favorites));
        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"An error occurred while fetching wishlist\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to modify wishlist\"}");
            return;
        }

        User user = null;
        try {
            user = (User) session.getAttribute("loggedInUser");
        } catch (ClassCastException e) {
            try {
                session.invalidate();
            } catch (Exception ignored) {}
        }

        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\":\"Please log in to modify wishlist\"}");
            return;
        }

        JsonObject jsonResponse = new JsonObject();
        try {
            BufferedReader reader = request.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

            int foodItemId = -1;
            if (requestBody.has("foodItemId")) {
                foodItemId = requestBody.get("foodItemId").getAsInt();
            } else if (requestBody.has("menuId")) {
                foodItemId = requestBody.get("menuId").getAsInt();
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Missing foodItemId or menuId parameter\"}");
                return;
            }

            WishlistDAO wishlistDAO = new WishlistDAOImplementation();
            boolean isFav = wishlistDAO.isFavorite(user.getUserID(), foodItemId);

            if (isFav) {
                boolean removed = wishlistDAO.removeFromWishlist(user.getUserID(), foodItemId);
                if (removed) {
                    jsonResponse.addProperty("status", "removed");
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.addProperty("error", "Failed to remove item from wishlist");
                }
            } else {
                WishlistItem item = new WishlistItem(user.getUserID(), foodItemId);
                boolean added = wishlistDAO.addToWishlist(item);
                if (added) {
                    jsonResponse.addProperty("status", "added");
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    jsonResponse.addProperty("error", "Failed to add item to wishlist");
                }
            }
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            jsonResponse.addProperty("error", "An error occurred: " + e.getMessage());
            response.getWriter().write(jsonResponse.toString());
        }
    }
}
