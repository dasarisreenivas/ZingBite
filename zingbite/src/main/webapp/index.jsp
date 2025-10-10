<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.List, com.app.zingbitemodels.User, com.app.zingbitemodels.Restaurant" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ZingBite - Taste the Best</title>
<link rel="stylesheet" href="css/home.css">
</head>
<body>
<div class="container">

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

    <!-- Section Header + Sorting -->
    <div class="section-header glass-card">
        <h2>🍴 Featured Restaurants</h2>
        <form action="home" method="get" class="sort-form">
            <div class="custom-select-wrapper">
                <div class="custom-select">
                    <div class="custom-select-trigger">Sort by: Name</div>
                    <div class="custom-options">
                        <span class="custom-option selected" data-value="name">Name</span>
                        <span class="custom-option" data-value="cuisine">Cuisine</span>
                        <span class="custom-option" data-value="time">Delivery Time</span>
                    </div>
                </div>
                <input type="hidden" name="sort" id="sort" value="name">
            </div>
        </form>
    </div>

    <!-- Restaurant List -->
    <section class="restaurant-list">
        <%
            List<Restaurant> restaurantList = (List<Restaurant>) session.getAttribute("restaurantList");
            if (restaurantList != null && !restaurantList.isEmpty()) {
                for (Restaurant restaurant : restaurantList) {
        %>
            <div class="restaurant-card">
                <!-- Video element -->
                <video class="card-video" muted loop>
                    <source src="videos/foodvide.mp4" type="video/mp4">
                    <!--  Your browser does not support the video tag.-->
                </video>

                <!-- Background image -->
                <div class="card-bg" style="background-image: url('https://th.bing.com/th/id/OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8?w=277&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3');"></div>

                <!-- Rating Badge -->
                <div class="rating-badge">
                    <%
                        int rating = (int)restaurant.getRating(); 
                        for (int i = 1; i <= 5; i++) {
                            if (i <= rating) {
                    %>
                        <span class="star filled">&#9733;</span>
                    <%
                            } else {
                    %>
                        <span class="star">&#9733;</span>
                    <%
                            }
                        }
                    %>
                </div>

                <!-- Overlay content -->
                <div class="restaurant-overlay">
                    <h3><%= restaurant.getRestaurantName() %></h3>
                    <p><%= restaurant.getCusineType() %> • <%= restaurant.getDeliveryTime() %> min</p>
                    <a class="view-menu" href="menu?restaurantId=<%= restaurant.getRestaurantId() %>&restaurantName=<%= restaurant.getRestaurantName() %>">View Menu</a>
                </div>
            </div>
        <%
                }
            } else {
        %>
            <p class="no-data glass-card">No restaurants available at the moment</p>
        <%
            }
        %>
    </section>

</div>

<script src="script/home.js"></script>
</body>
</html>
