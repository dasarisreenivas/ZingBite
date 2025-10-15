<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List, com.app.zingbitemodels.Menu, com.app.zingbitemodels.User" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ZingBite - Restaurant Menu</title>
    <link rel="stylesheet" href="css/viewmenu.css?v=1.1">
</head>
<body>

<!-- Header -->
<%@ include file="includes/header.jsp" %>
<!-- Menu Container -->
<div class="menu-container">
    <%
        List<Menu> menuList = (List<Menu>) request.getAttribute("menuList");
        if (menuList != null && !menuList.isEmpty()) {
            for (Menu item : menuList) {
    %>
        <div class="menu-item">
            <img src="https://th.bing.com/th/id/OIP.jUfCu2A6ilKJAdybISEMgwHaHa?w=175&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                 alt="<%= item.getMenuName() %>" class="item-img">

            <div class="availability-badge <%= item.isAvailable() ? "available" : "unavailable" %>">
                <%= item.isAvailable() ? "Available" : "Not Available" %>
            </div>

            <div class="menu-details">
                <h2 class="item-name"><%= item.getMenuName() %></h2>
                <p class="price">₹ <%= item.getPrice() %></p>
                <p class="description"><%= item.getDescription() %></p>

                <% if (user != null) { %>
                    <div class="quantity">
                        <button type="button" class="decrease-btn">-</button>
                        <input type="number" class="qty-input" value="1" min="1">
                        <button type="button" class="increase-btn">+</button>
                    </div>

                    <button type="button" class="add-to-cart-btn"
                            data-item-id="<%= item.getMenuId() %>"
                            <%= item.isAvailable() ? "" : "disabled" %>>
                        Add to Cart
                    </button>
                <% } %>
            </div>
        </div>
    <%
            }
        } else {
    %>
        <p class="no-data">No menu items available for this restaurant.</p>
    <%
        }
    %>
</div>

<!-- Global Cart Popup -->

<div id="cartPopup" class="cart-popup popup-hidden">
    <span id="popupItemName"></span>
</div>

<script src="script/menu.js?v=1.1"></script>
</body>
</html>
