<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*, com.app.zingbitemodels.User, com.app.zingbitemodels.Cart, com.app.zingbitemodels.CartItem" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout | ZingBite</title>

    <!-- Your existing main CSS (keeps site theme) -->
    <link rel="stylesheet" href="css/cart.css">

    <!-- Checkout specific CSS -->
    <link rel="stylesheet" href="css/checkout.css">

    <!-- Leaflet (free maps) -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</head>
<body class="light">
		
		<%@ include file="includes/header.jsp" %>
    <!-- Header: KEEP EXACT STYLE -->
  
<%
    // get cart and totals (preserve your logic)
    Cart cart = (Cart) session.getAttribute("cart");
    Map<Integer, CartItem> items = (cart != null) ? cart.getItems() : new HashMap<>();

    double shipping = 50.0;
    double tax = 50.0;
    double subtotal = 0;
    for (CartItem ci : items.values()) {
        subtotal += ci.getPrice() * ci.getQuantity();
    }
    double total = (subtotal >= 1000) ? subtotal + tax : subtotal + shipping + tax;
%>

<main class="checkout-container">

    <!-- LEFT: Payment Mode box -->
    <section class="payment-box">
        <h2>Payment Mode</h2>

        <form id="payment-form">
            <div class="pay-option">
                <label><input type="radio" name="paymentMode" value="card" checked> Credit / Debit Card</label>
            </div>

            <div class="pay-option">
                <label><input type="radio" name="paymentMode" value="upi"> UPI</label>
            </div>

            <div class="pay-option">
                <label><input type="radio" name="paymentMode" value="netbanking"> Net Banking</label>
            </div>

            <div class="pay-option">
                <label><input type="radio" name="paymentMode" value="cod"> Cash on Delivery</label>
            </div>

            <div class="pay-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>₹<%= String.format("%.2f", subtotal) %></span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>₹<%= (subtotal >= 1000) ? 0 : shipping %></span>
                </div>
                <div class="summary-row">
                    <span>Tax</span>
                    <span>₹<%= String.format("%.2f", tax) %></span>
                </div>
                <hr>
                <div class="summary-row total-row">
                    <strong>Total</strong>
                    <strong id="checkout-amount">₹<%= String.format("%.2f", total) %></strong>
                </div>
            </div>

            <!-- Proceed button (mock or real) -->
            <button type="button" id="proceed-pay" class="checkout-btn">
                Proceed to Pay (<span id="total-amount-text">₹<%= String.format("%.2f", total) %></span>)
            </button>
        </form>
    </section>

    <!-- RIGHT: Delivery Address & Map (below order summary in your layout; here it's side-by-side per wireframe) -->
    <aside class="address-box">
        <h2>Delivery Address</h2>

        <!-- radio: use profile address or use current location -->
        <div class="address-options">
            <label><input type="radio" name="addressChoice" value="profile" checked> Use this address (from profile)</label>
            <label><input type="radio" name="addressChoice" value="manual"> Enter address manually</label>
            <label><input type="radio" name="addressChoice" value="current"> Use current location</label>
        </div>

        <input type="text" id="delivery-address" placeholder="Start typing address or pick on map"
               value="<%= (user != null && user.getAddress() != null) ? user.getAddress() : "" %>" />

        <!-- hidden inputs to submit coords/address -->
        <input type="hidden" id="address-lat" name="lat" />
        <input type="hidden" id="address-lng" name="lng" />
        <input type="hidden" id="address-text" name="address" />

        <!-- Map -->
        <div id="checkout-map"></div>

        <!-- small hint -->
        <p class="map-hint">Click on map to place marker or choose "Use current location"</p>
    </aside>

</main>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Checkout JS (behavior) -->
<script src="script/checkout.js"></script>

</body>
</html>
