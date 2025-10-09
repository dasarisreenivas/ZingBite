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

        double subtotal = 0;
        for (CartItem ci : items.values()) {
            subtotal += ci.getPrice() * ci.getQuantity();
        }
        double shipping = 50.00;
        double tax = 50.00;
        double total = subtotal + tax;
        
        if(total>=1000 || subtotal>=1000){
        	total = subtotal+tax;
        }else{
        	total = subtotal+shipping+tax;
        }
    %>

    <main class="cart-container">

        <div class="cart-items-section">
            <div class="cart-items-header">
                <h2>YOUR CART <span class="item-count-badge"><%= items.size() %> Items</span></h2>
                 <% if (!items.isEmpty()) { %>
	                <form action="cart" method="post" style="display:inline;">
	                    <input type="hidden" name="action" value="clear">
	                    <button type="submit" class="clear-cart-btn">Clear Cart</button>
	                </form>
                <% } %>
            </div>
            
            <div class="cart-items-list">
                <%
                    if (items.isEmpty()) {
                %>
                    <div class="empty-cart-message">
                        <h3>Your cart is empty.</h3>
                    </div>
                <%
                    } else {
                        for (CartItem cItem : items.values()) {
                %>
                        <div class="cart-item" id="item-<%= cItem.getItemId() %>">
                            <div class="item-details">
                                <p class="restaurant-name"><%= session.getAttribute("restaurantName")%></p>
                                <h3 class="menu-name"><%= cItem.getItemName() %></h3>
                                <p class="description">A short description of the menu item would go here.</p>
                                <p class="subtotal">Subtotal: ₹<%= String.format("%.2f", cItem.getPrice() * cItem.getQuantity()) %></p>
                                
                                <div class="item-controls">
                                    <div class="quantity-adjuster">
                                        <button class="quantity-btn" data-action="decrease" data-item-id="<%= cItem.getItemId() %>" title="Decrease quantity">-</button>
                                        <span class="quantity-display"><%= cItem.getQuantity() %></span>
                                        <button class="quantity-btn" data-action="increase" data-item-id="<%= cItem.getItemId() %>" title="Increase quantity">+</button>
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
                <%
                        }
                    }
                %>
            </div>
        </div>

        <% if (!items.isEmpty()) { %>
        <div class="grand-total-section" id="grand-total-section">
            <h2>Grand Total</h2>
            <p>Order Summary</p>
            <div class="summary-row">
                <span id="summary-item-count">subtotal(<%= items.size() %> items)</span>
                <span id="summary-subtotal">₹<%= String.format("%.2f", subtotal) %></span>
            </div>
            <div class="summary-row">
                <span>shipping</span>
                <%if(total>=1000 || subtotal>=1000){ %>
                <span id="summary-shipping">₹0</span>
                <%}else{ %>
                <span id="summary-shipping">₹<%= String.format("%.2f", shipping) %></span>
                <%} %>
            </div>
            <div class="summary-row">
                <span>tax</span>
                <span id="summary-tax">₹<%= String.format("%.2f", tax) %></span>
            </div>
            <hr>
            <div class="summary-row total-row">
                <span>Total</span>
                <span id="summary-total">₹<%= String.format("%.2f", total) %></span>
            </div>
            <div class="summary-actions">
                <button class="checkout-btn" onclick="window.location.href='checkout.jsp'">Proceed to checkout</button>
                <button class="shopping-btn" onclick="window.location.href='home'">Continue Shopping</button>
            </div>
        </div>
        <% } %>
    </main>
    
    <script src="script/cart.js" defer></script>

</body>
</html>