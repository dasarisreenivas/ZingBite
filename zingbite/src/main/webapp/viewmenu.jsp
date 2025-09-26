<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.List, com.app.zingbitemodels.Menu" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ZingBite - View Menu</title>
    <link rel="stylesheet" href="css/viewmenu.css">
    <script src="js/viewmenu.js" defer></script>
</head>
<body>
    <header>
        <h1>ZingBite - Taste the Best</h1>
        <nav>
            <a href="home.jsp">Home</a>
            <a href="cart.jsp">Cart</a>
            <a href="logout">Logout</a>
        </nav>
    </header>

    <main class="container">
        <h2>Restaurant Menu</h2>

        <div class="menu-list">
            <%
                List<Menu> menuList = (List<Menu>) request.getAttribute("menuList");
                if (menuList != null && !menuList.isEmpty()) {
                    for (Menu item : menuList) {
            %>
                <div class="menu-card">
                    <img src="https://th.bing.com/th/id/OIP.pelK9k5ccm6GNDcM6fEozQHaE8?w=231&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="<%=item.getMenuName()%>">
                    <h3><%=item.getMenuName()%></h3>
                    <p><%=item.getDescription()%></p>
                    <span class="price">₹<%=item.getPrice()%></span>

                    <div class="qty-controls">
                        <button class="decrease-btn">-</button>
                        <input type="text" class="qty-input" value="1" readonly>
                        <button class="increase-btn">+</button>
                    </div>

                    <form action="CartServlet" method="post">
                        <input type="hidden" name="itemId" value="<%=item.getMenuId()%>">
                        <input type="hidden" name="itemName" value="<%=item.getMenuName()%>">
                        <input type="hidden" name="itemPrice" value="<%=item.getPrice()%>">
                        <input type="hidden" name="quantity" class="hidden-qty" value="1">
                        <button type="submit" class="add-btn">Add to Cart</button>
                    </form>
                </div>
            <%
                    }
                } else {
            %>
                <p>No menu items available for this restaurant.</p>
            <%
                }
            %>
        </div>
    </main>
</body>
</html>
