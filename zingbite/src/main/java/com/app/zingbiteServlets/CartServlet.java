package com.app.zingbiteServlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitemodels.Cart;
import com.app.zingbitemodels.CartItem;
import com.app.zingbitemodels.Menu;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

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
                    addItemToCart(req, cart, resp, session);
                    return; // handled inside addItemToCart for JSON response
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
                    session.removeAttribute("restaurantId");
                    session.removeAttribute("restaurantName");
                    break;
                case "clearAndAdd":
                    cart.clear();
                    session.removeAttribute("restaurantId");
                    session.removeAttribute("restaurantName");
                    addItemToCart(req, cart, resp, session);
                    return; // handled inside addItemToCart
                default:
                    System.out.println("⚠️ Unknown cart action: " + action);
            }

            session.setAttribute("cart", cart);

            if ("XMLHttpRequest".equals(req.getHeader("X-Requested-With"))) {
                sendCartTotals(resp, cart);
            } else {
                resp.sendRedirect("cart.jsp");
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Cart operation failed");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        req.getRequestDispatcher("cart.jsp").forward(req, resp);
    }

    // ---------------------- Helper Methods ----------------------

    private void addItemToCart(HttpServletRequest req, Cart cart, HttpServletResponse resp, HttpSession session) throws IOException {
        int itemId = Integer.parseInt(req.getParameter("itemId"));
        int quantity = Integer.parseInt(req.getParameter("quantity"));

        MenuDAO menuDAO = new MenuDAOImplementation();
        Menu menuItem = menuDAO.getMenuById(itemId);

        if (menuItem != null) {
            int newRestaurantId = menuItem.getRestaurantId();
            Integer currentRestaurantId = (Integer) session.getAttribute("restaurantId");

            if (currentRestaurantId != null && currentRestaurantId != newRestaurantId) {
                // Conflict: notify the client
                String json = String.format(
                        "{\"restaurantConflict\":true,\"newItemId\":%d,\"newQuantity\":%d}",
                        itemId, quantity
                );
                resp.setContentType("application/json");
                resp.getWriter().write(json);
                return; // Stop adding
            }

            // No conflict, add item normally
            proceedAddItem(cart, session, menuItem, quantity);

            // Return updated totals
            sendCartTotals(resp, cart);
        }
    }

    private void proceedAddItem(Cart cart, HttpSession session, Menu menuItem, int quantity) {
        int restaurantId = menuItem.getRestaurantId();

        session.setAttribute("restaurantId", restaurantId);
        session.setAttribute("restaurantName",
                new RestaurantDAOImplementation().getRestaurantById(restaurantId).getRestaurantName());

        CartItem item = new CartItem(
                menuItem.getMenuId(),
                menuItem.getRestaurantId(),
                menuItem.getMenuName(),
                menuItem.getPrice(),
                quantity,
                0.0f
        );

        cart.addItemToCart(item);
    }

    private void removeItemFromCart(HttpServletRequest req, Cart cart) {
        int itemId = Integer.parseInt(req.getParameter("itemId"));
        cart.removeItemFromCart(itemId);
    }

    private void updateCartItem(HttpServletRequest req, Cart cart) {
        int itemId = Integer.parseInt(req.getParameter("itemId"));
        int quantity = Integer.parseInt(req.getParameter("quantity"));
        cart.updateCartItem(itemId, quantity);
    }

    private void adjustQuantity(HttpServletRequest req, Cart cart, int delta) {
        int itemId = Integer.parseInt(req.getParameter("itemId"));
        CartItem item = cart.getItems().get(itemId);

        if (item != null) {
            int newQty = item.getQuantity() + delta;
            if (newQty <= 0) {
                cart.removeItemFromCart(itemId);
            } else {
                cart.updateCartItem(itemId, newQty);
            }
        }
    }

    // ---------------------- Send JSON Totals ----------------------
    private void sendCartTotals(HttpServletResponse resp, Cart cart) throws IOException {
        double subtotal = 0;
        double shipping = 50.0;
        double tax = 50.0;

        for (CartItem ci : cart.getItems().values()) {
            subtotal += ci.getPrice() * ci.getQuantity();
        }

        double total = (subtotal >= 1000) ? subtotal + tax : subtotal + shipping + tax;

        String json = String.format(
                "{\"itemCount\":%d,\"subtotal\":%.2f,\"shipping\":%.2f,\"total\":%.2f}",
                cart.getItems().size(),
                subtotal,
                (subtotal >= 1000 ? 0 : shipping),
                total
        );

        resp.setContentType("application/json");
        resp.getWriter().write(json);
    }
}
