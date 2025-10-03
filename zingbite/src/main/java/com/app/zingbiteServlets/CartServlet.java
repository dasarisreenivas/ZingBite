package com.app.zingbiteServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
		
		String action = req.getParameter("actions");
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
		
	}
	
	

}
