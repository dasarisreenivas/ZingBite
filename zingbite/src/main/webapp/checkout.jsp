<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*, com.app.zingbitemodels.User, com.app.zingbitemodels.Cart, com.app.zingbitemodels.CartItem" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout | ZingBite</title>
    <link rel="stylesheet" href="css/checkout.css">
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
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
                String queryString = request.getQueryString();
                String servletUrl = "menu";
                if (queryString != null) {
                    servletUrl += "?" + queryString;
                }
                session.setAttribute("redirectAfterLogin", servletUrl);
        %>
            <a href="login.jsp">Login</a>
            <a href="register.jsp">Register</a>
        <%
            }
        %>
    </nav>
</header>

<%
    // Cart and totals
    Cart cart = (Cart) session.getAttribute("cart");
    Map<Integer, CartItem> items = (cart != null) ? cart.getItems() : new HashMap<>();

    double shipping = 50.0;
    double tax = 50.0;
    double subtotal = 0;
    for (CartItem ci : items.values()) {
        subtotal += ci.getPrice() * ci.getQuantity();
    }
    double total = (subtotal >= 1000) ? subtotal + tax : subtotal + shipping + tax;

    // Amount in paise for Razorpay
    int totalPaise = (int) (total * 100);
%>

<main class="checkout-container">

    <!-- LEFT: Payment Mode -->
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

            <!-- Razorpay Pay Button -->
            <button type="button" id="proceed-pay" class="checkout-btn">
                Pay Now (<span id="total-amount-text">₹<%= String.format("%.2f", total) %></span>)
            </button>
        </form>
    </section>

    <!-- RIGHT: Delivery Address -->
    <aside class="address-box">
        <h2>Delivery Address</h2>
        <div class="address-options">
            <label><input type="radio" name="addressChoice" value="profile" checked> Use this address (from profile)</label>
            <label><input type="radio" name="addressChoice" value="manual"> Enter address manually</label>
            <label><input type="radio" name="addressChoice" value="current"> Use current location</label>
        </div>

        <input type="text" id="delivery-address" placeholder="Start typing address or pick on map"
               value="<%= (user != null && user.getAddress() != null) ? user.getAddress() : "" %>" />

        <input type="hidden" id="address-lat" name="lat" />
        <input type="hidden" id="address-lng" name="lng" />
        <input type="hidden" id="address-text" name="address" />

        <div id="checkout-map"></div>
        <p class="map-hint">Click on map to place marker or choose "Use current location"</p>
    </aside>

</main>

<!-- Leaflet JS -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Razorpay Payment Script -->
<script>
document.getElementById('proceed-pay').onclick = function(e) {
    var options = {
        "key": "rzp_test_RU5HIdwTwlQNOw", //Razorpay Test Key
        "amount": "<%= totalPaise %>", // amount in paise
        "currency": "INR",
        "name": "ZingBite",
        "description": "Order Payment",
        "handler": function (response){
            // On successful payment, redirect to servlet to save info
            window.location.href = "paymentSuccess?paymentId=" + response.razorpay_payment_id;
        },
        "method": {
            "upi": true
        },
        "theme": {
            "color": "#F7374F"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
};
</script>

<!-- Checkout JS -->
<script src="script/checkout.js"></script>

</body>
</html>
