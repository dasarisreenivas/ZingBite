package com.app.zingbiteServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitemodels.Cart;


@WebServlet("/cart")
public class CartServlet extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		
		Cart cart = (Cart)session.getAttribute("cart");
		
		if(cart==null) {
			 cart = new Cart();
			 session.setAttribute("cart", cart);
		}
		
		String action = req.getParameter("action");
		if("add".equals(action)) {
			addItemToCart(req,cart);
		}
		else if("update".equals(action)) {
			updateCartItem(req,cart);
		}
		else if("remove".equals(action)) {
			removeItemFromCart(req,cart);
		}
		
		session.setAttribute("cart", cart);
		resp.sendRedirect("cart.jsp");
		
	}
	
	private void removeItemFromCart(HttpServletRequest req, Cart cart) {
		int itemID = Integer.parseInt(req.getParameter("itemId"));
		int quantity = Integer.parseInt(req.getParameter("quantity"));
		
		MenuDAO menuDAO = new MenuDAOImplementation();
	}

	private void updateCartItem(HttpServletRequest req, Cart cart) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.getRequestDispatcher("cart.jsp").forward(req, resp);
	}

	private void addItemToCart(HttpServletRequest req, Cart cart) {
		// TODO Auto-generated method stub
		
	}
	
	

}
