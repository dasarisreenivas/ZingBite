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
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitemodels.Cart;
import com.app.zingbitemodels.CartItem;
import com.app.zingbitemodels.Menu;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        Cart cart = (Cart) session.getAttribute("cart");

        if (cart == null) {
            cart = new Cart();
            session.setAttribute("cart", cart);
        }

        String action = req.getParameter("action");

        try {
            switch (action) {
                case "add":
                    addItemToCart(req, cart);
                    break;

                case "update":
                    updateCartItem(req, cart);
                    break;

                case "increase":
                    adjustQuantity(req, cart, 1);
                    break;

                case "decrease":
                    adjustQuantity(req, cart, -1);
                    break;

                case "remove":
                    removeItemFromCart(req, cart);
                    break;

                case "clear":
                    cart.clear();
                    break;
            }

            session.setAttribute("cart", cart);

            // If AJAX request, send OK status without redirect
            String xhrHeader = req.getHeader("X-Requested-With");
            if ("XMLHttpRequest".equals(xhrHeader)) {
                resp.setStatus(HttpServletResponse.SC_OK);
            } else {
                resp.sendRedirect("cart.jsp");
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Cart operation failed");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("cart.jsp").forward(req, resp);
    }

    private void addItemToCart(HttpServletRequest req, Cart cart) {
        int itemID = Integer.parseInt(req.getParameter("itemId"));
        int quantity = Integer.parseInt(req.getParameter("quantity"));

        MenuDAO menuDAO = new MenuDAOImplementation();
        Menu menuItem = menuDAO.getMenuById(itemID);
        HttpSession session = req.getSession();
        int restaurantId = menuItem.getRestaurantId();
        session.setAttribute("restaurantId", restaurantId);
        session.setAttribute("restaurantName",new RestaurantDAOImplementation().getRestaurantById(restaurantId).getRestaurantName());
        
        
        if (menuItem != null) {
            CartItem item = new CartItem(
                    menuItem.getMenuId(),
                    menuItem.getMenuName(),
                    menuItem.getPrice(),
                    quantity,
                    0.0f
            );
            cart.addItemToCart(item);
        }
    }

    private void removeItemFromCart(HttpServletRequest req, Cart cart) {
        int itemID = Integer.parseInt(req.getParameter("itemId"));
        cart.removeItemFromCart(itemID);
    }

    private void updateCartItem(HttpServletRequest req, Cart cart) {
        int itemID = Integer.parseInt(req.getParameter("itemId"));
        int quantity = Integer.parseInt(req.getParameter("quantity"));
        cart.updateCartItem(itemID, quantity);
    }

    private void adjustQuantity(HttpServletRequest req, Cart cart, int delta) {
        int itemID = Integer.parseInt(req.getParameter("itemId"));
        CartItem item = cart.getItems().get(itemID);
        if (item != null) {
            int newQty = item.getQuantity() + delta;
            if (newQty <= 0) {
                cart.removeItemFromCart(itemID);
            } else {
                cart.updateCartItem(itemID, newQty);
            }
        }
    }
}
