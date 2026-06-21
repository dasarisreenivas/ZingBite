package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.app.zingbiteutils.RecommendationEngine;
import com.app.zingbitemodels.Menu;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/recommendations")
public class RecommendationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String restaurantIdParam = req.getParameter("restaurantId");
        String cartItemsParam = req.getParameter("cartItems");

        if (restaurantIdParam == null || restaurantIdParam.trim().isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing restaurantId\"}");
            return;
        }

        try {
            int restaurantId = Integer.parseInt(restaurantIdParam.trim());
            List<Integer> cartItemIds = new ArrayList<>();
            if (cartItemsParam != null && !cartItemsParam.trim().isEmpty()) {
                String[] tokens = cartItemsParam.split(",");
                for (String t : tokens) {
                    try {
                        cartItemIds.add(Integer.parseInt(t.trim()));
                    } catch (NumberFormatException ignored) {}
                }
            }

            List<Menu> recommendations = RecommendationEngine.getRecommendations(restaurantId, cartItemIds, 4);

            Gson gson = new Gson();
            resp.getWriter().write(gson.toJson(recommendations));
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Invalid restaurantId format\"}");
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to fetch recommendations\"}");
        }
    }
}
