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

    <section class="restaurant-list">
        <%
            List<Restaurant> restaurantList = (List<Restaurant>) session.getAttribute("restaurantList");
            if (restaurantList != null && !restaurantList.isEmpty()) {
                for (Restaurant restaurant : restaurantList) {
        %>
            <div class="restaurant-card"
                 style="background-image: url('https://th.bing.com/th/id/OIP._iymr27O_84b9tR7Lz5E1gHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3');">
                <div class="restaurant-overlay">
                    <h3><%= restaurant.getRestaurantName() %></h3>
                    <p><%= restaurant.getCusineType() %> • <%= restaurant.getDeliveryTime() %> min</p>
                    <a class="view-menu" href="viewMenu?restaurantId=<%= restaurant.getRestaurantId() %>">View Menu</a>
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

<script>
const select = document.querySelector('.custom-select');
const trigger = select.querySelector('.custom-select-trigger');
const options = select.querySelectorAll('.custom-option');
const hiddenInput = document.getElementById('sort');
const form = document.querySelector('.sort-form');

trigger.addEventListener('click', () => {
    select.classList.toggle('open');
});

options.forEach(option => {
    option.addEventListener('click', () => {
        trigger.textContent = "Sort by: " + option.textContent;
        hiddenInput.value = option.dataset.value;
        select.classList.remove('open');
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        form.submit();
    });
});

window.addEventListener('click', e => {
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});
</script>

</body>
</html>