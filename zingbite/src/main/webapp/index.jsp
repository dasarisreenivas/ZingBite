<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "com.app.zingbitemodels.User" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<% User user = (User)session.getAttribute("loggedInUser"); %>
	<h1>name <%= user.getUserName()%></h1>
	<h1>name <%= user.getEmail()%></h1>
	<h1>name <%= user.getPhoneNumber()%></h1>
	<h1>name <%= user.getAddress()%></h1>
	
</body>
</html>