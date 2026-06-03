package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;

import com.app.zingbitedao.RestaurantDAO;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitemodels.Restaurant;
import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/home")
public class HomeServlet extends HttpServlet {
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		RestaurantDAO restaurant = new RestaurantDAOImplementation();
		List<Restaurant> restaurantList = restaurant.getAllRestaurants();
		
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		
		Gson gson = new Gson();
		String json = gson.toJson(restaurantList);
		resp.getWriter().write(json);
	}
}
