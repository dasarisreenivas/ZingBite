<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ZingBite - Login</title>
  <link rel="stylesheet" href="css/login.css">
</head>
<body>
  <div class="container">
    <!-- Left Hero Section -->
    <div class="hero-section">
      <div class="hero-slideshow">
        <img src="https://images.unsplash.com/photo-1715174559145-b77348e5199a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" class="active">
        <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080">
        <img src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080">
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="logo-title">ZingBite</h1>
        <p class="logo-subtitle" style="color:white;">Taste the Best</p>
        <p class="hero-description">Discover amazing flavors from your favorite restaurants, delivered fresh to your door.</p>
      </div>
    </div>

    <!-- Right Login Section -->
    <div class="login-section">
      <div class="login-container">
        <div class="mobile-logo">
          <h1 class="logo-title">ZingBite</h1>
          <p class="logo-subtitle">Taste the Best</p>
        </div>

        <!-- Login Card -->
        <div class="login-card">
          <div class="card-header">
            <h2 class="card-title">Welcome back</h2>
            <p class="card-description">Sign in to your ZingBite account</p>
          </div>
          <div class="card-content">

            <!-- Error Message -->
            <% 
               String errorMessage = (String) request.getAttribute("errorMessage");
               if (errorMessage != null) { 
            %>
              <div class="error-message"><%= errorMessage %></div>
            <% } %>

            <!-- form begin -->
            <form id="loginForm" class="form" action="login" method="post">
              <div class="form-group">
                <label for="email" class="form-label"><b>Email</b></label>
                <input type="email" name="email" id="email" class="form-input" placeholder="Enter your email" required>
              </div>

              <div class="form-group">
                <label for="password" class="form-label"><b>Password</b></label>
                <input type="password" name="password" id="password" class="form-input" placeholder="Enter your password" required>
              </div>

              <div class="form-row">
                <div class="checkbox-container">
                  <input type="checkbox" name="rememberMe" id="rememberMe" class="checkbox">
                  <label for="rememberMe" class="checkbox-label"><b>Remember me</b></label>
                </div>
                <button type="button" class="forgot-password">Forgot password?</button>
              </div>

              <button type="submit" class="submit-button">Sign in</button>

              <div class="signup-link">
                <p>Don't have an account? <a href="register.jsp" class="signup-button">Sign up</a></p>
              </div>
            </form>
          </div>
        </div>

        <!-- Demo Credentials -->
        <div class="demo-credentials">
          <p>Demo Credentials:</p>
          <p>Email: demo@zingbite.com | Password: password</p>
        </div>
      </div>
    </div>
  </div>

  <script src="script/loginscript.js"></script>
</body>
</html>
