<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.app.zingbitemodels.User" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
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
                // Get query params like ?restaurantId=5&restaurantName=KFC
                String queryString = request.getQueryString();
                String servletUrl = "menu";
                if (queryString != null) {
                    servletUrl += "?" + queryString;
                }

                // Save redirectAfterLogin to MenuServlet (not JSP)
                session.setAttribute("redirectAfterLogin", servletUrl);
        %>
            <a href="login.jsp">Login</a>
            <a href="register.jsp">Register</a>
        <%
            }
        %>
    </nav>
</header>
	
</body>
</html>