package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.app.zingbitedao.RestaurantDAO;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitemodels.Restaurant;


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
