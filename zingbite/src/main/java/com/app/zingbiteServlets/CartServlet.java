package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitedaoimpl.RestaurantDAOImplementation;
import com.app.zingbitemodels.Cart;
import com.app.zingbitemodels.CartItem;
import com.app.zingbitemodels.Menu;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/cart")
public class CartServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession();
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null) {
            cart = new Cart();
            session.setAttribute("cart", cart);
        }

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : null;

            if (action == null) {
                sendError(resp, "Action is required");
                return;
            }

            switch (action) {
                case "add":
                    addItemToCart(requestBody, cart, resp, session);
                    return;
                case "updateQuantity":
                    updateQuantity(requestBody, cart);
                    break;
                case "remove":
                    removeItem(requestBody, cart);
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
                    addItemToCart(requestBody, cart, resp, session);
                    return;
            }

            session.setAttribute("cart", cart);
            sendCartTotals(resp, cart);

        } catch (Exception e) {
            e.printStackTrace();
            sendError(resp, "Cart operation failed");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        
        HttpSession session = req.getSession();
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null) {
            cart = new Cart();
            session.setAttribute("cart", cart);
        }
        
        sendCartTotals(resp, cart);
    }

    // ---------------------- Helper Methods ----------------------

    private void addItemToCart(JsonObject requestBody, Cart cart, HttpServletResponse resp, HttpSession session) throws IOException {
        int itemId = requestBody.get("itemId").getAsInt();
        int quantity = requestBody.get("quantity").getAsInt();

        MenuDAO menuDAO = new MenuDAOImplementation();
        Menu menuItem = menuDAO.getMenuById(itemId);

        if (menuItem == null) {
            sendError(resp, "Menu item not found");
            return;
        }

        int newRestaurantId = menuItem.getRestaurant().getRestaurantId();
        Integer currentRestaurantId = (Integer) session.getAttribute("restaurantId");

        if (currentRestaurantId != null && currentRestaurantId.intValue() != newRestaurantId) {
            String json = String.format(
                    "{\"restaurantConflict\":true,\"newItemId\":%d,\"newQuantity\":%d}",
                    itemId, quantity
            );
            resp.getWriter().write(json);
            return;
        }

        CartItem item = new CartItem(
                menuItem.getMenuId(),
                newRestaurantId,
                menuItem.getMenuName(),
                menuItem.getPrice(),
                quantity,
                0f
        );
        cart.addItemToCart(item);

        session.setAttribute("cart", cart);
        session.setAttribute("restaurantId", newRestaurantId);
        session.setAttribute("restaurantName",
                new RestaurantDAOImplementation().getRestaurantById(newRestaurantId).getRestaurantName());

        sendCartTotals(resp, cart);
    }

    private void updateQuantity(JsonObject requestBody, Cart cart) {
        int itemId = requestBody.get("itemId").getAsInt();
        int quantity = requestBody.get("quantity").getAsInt();
        cart.updateCartItem(itemId, quantity);
    }

    private void removeItem(JsonObject requestBody, Cart cart) {
        int itemId = requestBody.get("itemId").getAsInt();
        cart.removeItemFromCart(itemId);
    }
    
    private void sendError(HttpServletResponse resp, String message) throws IOException {
        resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        JsonObject err = new JsonObject();
        err.addProperty("error", message);
        resp.getWriter().write(err.toString());
    }

    // ---------------------- Send JSON Totals ----------------------
    private void sendCartTotals(HttpServletResponse resp, Cart cart) throws IOException {
        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        
        double subtotal = 0;
        double shipping = 50.0;
        double tax = 50.0;
        int totalQuantity = 0;

        for (CartItem ci : cart.getItems().values()) {
            subtotal += ci.getPrice() * ci.getQuantity();
            totalQuantity += ci.getQuantity();
        }

        double total = (subtotal >= 1000 || subtotal == 0) ? subtotal + tax : subtotal + shipping + tax;
        if(subtotal == 0) total = 0;

        responseJson.addProperty("itemCount", totalQuantity);
        responseJson.addProperty("subtotal", subtotal);
        responseJson.addProperty("shipping", (subtotal >= 1000 || subtotal == 0 ? 0 : shipping));
        responseJson.addProperty("tax", tax);
        responseJson.addProperty("total", total);
        responseJson.add("items", gson.toJsonTree(cart.getItems().values()));

        resp.getWriter().write(responseJson.toString());
    }
}
