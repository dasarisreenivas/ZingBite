<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*, com.app.zingbitemodels.User, com.app.zingbitemodels.Cart, com.app.zingbitemodels.CartItem" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Cart | ZingBite</title>
    <link rel="stylesheet" href="css/cart.css">
</head>
<body class="light">

    <!-- Header -->
    <header>
        <div class="logo-container">
            <h1 class="logo-text">ZingBite</h1>
            <p class="tagline-text">Taste the Best</p>
        </div>
        <nav>
            <a href="home">Home</a>
            <%
                User user = (User) session.getAttribute("loggedInUser");
                if (user != null) {
            %>
                <span class="welcome">Welcome, <%= user.getUserName() %>!</span>
                <a href="cart">Cart</a>
                <a href="orderhistory">Orders</a>
                <a href="logOut">Logout</a>
            <%
                } else {
            %>
                <a href="login.jsp">Login</a>
                <a href="register.jsp">Register</a>
            <%
                }
            %>
        </nav>
    </header>

<%
    Cart cart = (Cart) session.getAttribute("cart");
    Map<Integer, CartItem> items = (cart != null) ? cart.getItems() : new HashMap<>();

    double shipping = 50.0;
    double tax = 50.0;

    Integer restaurantConflict = (session.getAttribute("restaurantConflict") != null) ? 1 : 0;
    Integer newItemId = (Integer) session.getAttribute("newItemId");
    Integer newQuantity = (Integer) session.getAttribute("newQuantity");
%>

<main class="cart-container">

    <!-- Cart Items Section -->
    <div class="cart-items-section">
        <div class="cart-items-header">
            <h2>YOUR CART <span id="item-count-badge"><%= items.size() %> Items</span></h2>
            <% if (!items.isEmpty()) { %>
                <button id="clear-cart-btn" class="clear-cart-btn">Clear Cart</button>
            <% } %>
        </div>

        <div class="cart-items-list" id="cart-items-list">
            <% if (items.isEmpty()) { %>
                <div id="empty-cart-msg" class="empty-cart-message">
                    <h3>Your cart is empty.</h3>
                </div>
            <% } else {
                for (CartItem cItem : items.values()) { %>
                <div class="cart-item" id="item-<%= cItem.getItemId() %>">
                    <div class="item-details">
                        <p class="restaurant-name"><%= session.getAttribute("restaurantName") %></p>
                        <h3 class="menu-name"><%= cItem.getItemName() %></h3>
                        <p class="description">A short description of the menu item would go here.</p>
                        <p class="subtotal" id="subtotal-<%= cItem.getItemId() %>">
                            Subtotal: ₹<%= String.format("%.2f", cItem.getPrice() * cItem.getQuantity()) %>
                        </p>

                        <div class="item-controls">
                            <div class="quantity-adjuster">
                                <button class="quantity-btn" data-action="decrease" data-item-id="<%= cItem.getItemId() %>">-</button>
                                <span class="quantity-display" id="quantity-<%= cItem.getItemId() %>"><%= cItem.getQuantity() %></span>
                                <button class="quantity-btn" data-action="increase" data-item-id="<%= cItem.getItemId() %>">+</button>
                            </div>
                        </div>
                    </div>

                    <div class="image-and-delete-section">
                        <div class="menu-image">
                            <img src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?cs=srgb&dl=beef-bread-buns-1633578.jpg&fm=jpg" alt="<%= cItem.getItemName() %>">
                        </div>
                        <button class="delete-btn" data-action="remove" data-item-id="<%= cItem.getItemId() %>">Delete</button>
                    </div>
                </div>
            <% } } %>
        </div>
    </div>

    <!-- Grand Total Section -->
    <%
        double subtotal = 0;
        for(CartItem ci : items.values()){
            subtotal += ci.getPrice() * ci.getQuantity();
        }
        double total = (subtotal >= 1000) ? subtotal + tax : subtotal + shipping + tax;
    %>

    <% if (!items.isEmpty()) { %>
    <div class="grand-total-section" id="grand-total-section">
        <h2>Grand Total</h2>
        <p>Order Summary</p>
        <div class="summary-row">
            <span id="summary-item-count">Subtotal (<%= items.size() %> items)</span>
            <span id="summary-subtotal">₹<%= String.format("%.2f", subtotal) %></span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span id="summary-shipping">₹<%= (subtotal >= 1000) ? 0 : shipping %></span>
        </div>
        <div class="summary-row">
            <span>Tax</span>
            <span id="summary-tax">₹<%= tax %></span>
        </div>
        <hr>
        <div class="summary-row total-row">
            <span>Total</span>
            <span id="summary-total">₹<%= total %></span>
        </div>
        <div class="summary-actions">
            <button class="checkout-btn" onclick="window.location.href='checkout.jsp'">Proceed to checkout</button>
            <button class="shopping-btn" onclick="window.location.href='home'">Continue Shopping</button>
        </div>
    </div>
    <% } %>

</main>

<script>
    window.restaurantConflict = <%= (restaurantConflict != null ? restaurantConflict : 0) %>;
    window.newItemId = <%= (newItemId != null ? newItemId : 0) %>;
    window.newQuantity = <%= (newQuantity != null ? newQuantity : 0) %>;
</script>
<script src="script/cart.js" defer></script>


</body>
</html>
