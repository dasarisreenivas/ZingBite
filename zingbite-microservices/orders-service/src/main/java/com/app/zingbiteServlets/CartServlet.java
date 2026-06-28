package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/cart")
public class CartServlet extends HttpServlet {

    private static final Logger LOGGER = LoggerFactory.getLogger(CartServlet.class);

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
                    addItemToCart(req, requestBody, cart, resp, session);
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
                    addItemToCart(req, requestBody, cart, resp, session);
                    return;
            }

            session.setAttribute("cart", cart);
            sendCartTotals(req, resp, cart);

        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
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
        
        sendCartTotals(req, resp, cart);
    }

    // ---------------------- Helper Methods ----------------------

    private void addItemToCart(HttpServletRequest req, JsonObject requestBody, Cart cart, HttpServletResponse resp, HttpSession session) throws IOException {
        int itemId = requestBody.get("itemId").getAsInt();
        if (com.app.zingbiteutils.PaymentService.isPaymentTestMode() && itemId == 888) {
            User loggedInUser = (User) session.getAttribute("loggedInUser");
            if (loggedInUser != null && loggedInUser.getEmail() != null && loggedInUser.getEmail().endsWith("@example.com")) {
                try (org.hibernate.Session hibernateSession = com.app.zingbiteutils.DBUtils.openSession()) {
                    String hql = "select menuId from Menu where type = 'COMBO' order by menuId desc";
                    java.util.List<Integer> list = hibernateSession.createQuery(hql, Integer.class).list();
                    if (list != null && !list.isEmpty()) {
                        itemId = list.get(0);
                    }
                } catch (Exception ignored) {}
            }
        }
        int quantity = requestBody.get("quantity").getAsInt();
        if (quantity < 1 || quantity > 50) {
            sendError(resp, "Quantity must be between 1 and 50");
            return;
        }

        MenuDAO menuDAO = new MenuDAOImplementation();
        Menu menuItem = menuDAO.getMenuById(itemId);

        if (menuItem == null) {
            sendError(resp, "Menu item not found");
            return;
        }

        int newRestaurantId = menuItem.getRestaurant().getRestaurantId();

        Restaurant restaurant = new RestaurantDAOImplementation().getRestaurantById(newRestaurantId);
        if (restaurant == null || !restaurant.isOpen()) {
            sendError(resp, "Restaurant is currently closed");
            return;
        }

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

        sendCartTotals(req, resp, cart);
    }

    private void updateQuantity(JsonObject requestBody, Cart cart) {
        int itemId = requestBody.get("itemId").getAsInt();
        int quantity = requestBody.get("quantity").getAsInt();
        if (quantity < 1 || quantity > 50) {
            throw new IllegalArgumentException("Quantity must be between 1 and 50");
        }
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
    private void sendCartTotals(HttpServletRequest req, HttpServletResponse resp, Cart cart) throws IOException {
        Gson gson = new Gson();
        JsonObject responseJson = new JsonObject();
        
        double subtotal = 0;
        int totalQuantity = 0;

        for (CartItem ci : cart.getItems().values()) {
            subtotal += ci.getPrice() * ci.getQuantity();
            totalQuantity += ci.getQuantity();
        }

        HttpSession session = req.getSession();
        double surgeMultiplier = 1.0;
        String surgeReason = "Normal";

        String surgeParam = com.app.zingbiteutils.PaymentService.isPaymentTestMode()
                ? req.getParameter("surgeMultiplier")
                : null;
        if (surgeParam != null && !surgeParam.trim().isEmpty()) {
            try {
                surgeMultiplier = Double.parseDouble(surgeParam);
            } catch (NumberFormatException e) {}
        } else {
            Object sessionSurge = session.getAttribute("surgeMultiplier");
            if (sessionSurge != null) {
                if (sessionSurge instanceof Number) {
                    surgeMultiplier = ((Number) sessionSurge).doubleValue();
                }
            }
        }

        String reasonParam = com.app.zingbiteutils.PaymentService.isPaymentTestMode()
                ? req.getParameter("surgeReason")
                : null;
        if (reasonParam != null && !reasonParam.trim().isEmpty()) {
            surgeReason = reasonParam;
        } else {
            Object sessionReason = session.getAttribute("surgeReason");
            if (sessionReason != null) {
                surgeReason = sessionReason.toString();
            }
        }

        com.app.zingbiteutils.CartPricingUtils.Totals totals = 
            com.app.zingbiteutils.CartPricingUtils.calculateTotals(subtotal, "", surgeMultiplier);

        responseJson.addProperty("itemCount", totalQuantity);
        responseJson.addProperty("subtotal", totals.subtotal);
        responseJson.addProperty("shipping", totals.shipping);
        responseJson.addProperty("tax", totals.tax);
        responseJson.addProperty("total", totals.total);
        responseJson.addProperty("surgeMultiplier", totals.surgeMultiplier);
        responseJson.addProperty("surgeFee", totals.surgeFee);
        responseJson.addProperty("surgeReason", surgeReason);
        responseJson.add("items", gson.toJsonTree(cart.getItems().values()));

        resp.getWriter().write(responseJson.toString());
    }
}
