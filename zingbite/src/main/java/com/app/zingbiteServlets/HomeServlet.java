package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;

import com.app.zingbitedao.RestaurantDAO;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitemodels.Restaurant;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;


@WebServlet("/home")
public class HomeServlet extends HttpServlet {
	
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		RestaurantDAO restaurant = new RestaurantDAOImplementation();
		List<Restaurant> restaurantList = restaurant.getAllRestaurants();
		HttpSession session = req.getSession();
		session.setAttribute("restaurantList",restaurantList);
		resp.sendRedirect("index.jsp");
	}
}
