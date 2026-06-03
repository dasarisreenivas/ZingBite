package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitemodels.Menu;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/menu")
public class MenuServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Gson gson = new Gson();
        JsonObject jsonResponse = new JsonObject();

        String restaurantIdParam = request.getParameter("restaurantId");
        String restaurantName = request.getParameter("restaurantName");
        
        if (restaurantIdParam != null) {
            try {
                int restaurantId = Integer.parseInt(restaurantIdParam);

                MenuDAO menuDAO = new MenuDAOImplementation();
                List<Menu> menuList = menuDAO.getMenuRestaurantById(restaurantId);
                
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
