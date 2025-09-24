<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "java.util.List, com.app.zingbitemodels.User ,com.app.zingbitemodels.Restaurant" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ZingBite - Taste the Best</title>
<link rel="stylesheet" href="css/home.css">
</head>
<body>

    <header>
        <h1>ZingBite <span>- Taste the Best</span></h1>
        <nav>
            <a href="home">Home</a>
            <%
                User user = (User)session.getAttribute("loginObject"); 
                if(user!=null){ %> 
                    <span class="welcome">Welcome, <%= user.getUserName()%>!</span>
                    <a href="cart">View Cart</a>
                    <a href="orderhistory">Order History</a>
                    <a href="logOut">Logout</a>
                <% } else { %>
                    <a href="login.jsp">Login</a>
                    <a href="register.jsp">Register</a>
                <% } %>
        </nav>
    </header>

    <main>
        <!-- Section Header with Sorting -->
        <div class="section-header">
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
                if(restaurantList!=null){
                    for(Restaurant restaurant : restaurantList){ %>
                        <div class="restaurant-card">
                            <img src="images/<%= restaurant.getImagePath() %>" 
                                 alt="<%= restaurant.getRestaurantName() %>">
                            <h3><%= restaurant.getRestaurantName() %></h3>
                            <p><%= restaurant.getCusineType() %> • 
                               <%= restaurant.getDeliveryTime() %> min
                            </p>
                            <a class="view-menu" href="#">View Menu</a>
                        </div>
                    <% }
                } else { %>
                    <p class="no-data">No restaurants available at the moment</p>
                <% } %>
        </section>
    </main>

    <script>
        // Dropdown script
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

                form.submit(); // auto-submit when option selected
            });
        });

        // Close dropdown on outside click
        window.addEventListener('click', e => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
    </script>

</body>
</html>
