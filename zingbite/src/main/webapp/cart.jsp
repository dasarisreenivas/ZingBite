<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map, com.app.zingbitemodels.Cart, com.app.zingbitemodels.CartItem" %>
<%
    Cart cart = (Cart) session.getAttribute("cart");
    Map<Integer, CartItem> items = (cart != null) ? cart.getItems() : null;
    double grandTotal = 0;
%>

<div class="cart-container">
    <div class="cart-items">
        <h2>Your Cart</h2>

        <%
            if (items != null && !items.isEmpty()) {
                for (CartItem item : items.values()) {
                    double subtotal = item.getQuantity() * item.getPrice();
                    grandTotal += subtotal;
        %>
        <div class="cart-item">
            <div class="item-details">
                <h3><%= item.getItemName() %></h3>
                <p>Price: ₹<%= item.getPrice() %></p>
                <p>Quantity: <%= item.getQuantity() %></p>
                <p class="subtotal">Subtotal: ₹<%= subtotal %></p>

                <form action="cart" method="post" class="quantity-form">
                    <input type="hidden" name="itemId" value="<%= item.getItemId() %>">
                    <button type="submit" name="action" value="update" formaction="cart?action=update&quantity=<%= item.getQuantity() + 1 %>">+</button>
                    <button type="submit" name="action" value="update" formaction="cart?action=update&quantity=<%= item.getQuantity() - 1 %>">-</button>
                    <button type="submit" name="action" value="remove">Remove</button>
                </form>
            </div>
        </div>
        <%
                }
            } else {
        %>
        <p>Your cart is empty.</p>
        <% } %>
    </div>

    <div class="cart-summary">
        <h2>Grand Total</h2>
        <p class="total-amount">₹<%= grandTotal %></p>
        <form action="checkout.jsp" method="post">
            <button type="submit" class="checkout-btn">Proceed to Checkout</button>
        </form>
    </div>
</div>
