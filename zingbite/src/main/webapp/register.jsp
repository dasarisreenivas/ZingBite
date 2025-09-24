<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ZingBite Register</title>

  <!-- Google Font -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">

  <!-- External CSS -->
  <link rel="stylesheet" href="css/register.css">
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

    <!-- Right Register Section -->
    <div class="login-section">
      <div class="login-container">
        <div class="mobile-logo">
          <h1 class="logo-title">ZingBite</h1>
          <p class="logo-subtitle">Taste the Best</p>
        </div>

        <!-- Register Card -->
        <div class="login-card">
          <div class="card-header">
            <h2 class="card-title">Create Account</h2>
            <p class="card-description">Sign up to start ordering from ZingBite</p>
          </div>
          <div class="card-content">
          
			<% 
			    String errorMessage = (String) request.getAttribute("errorMessage");
			    if (errorMessage != null) {
			%>
			    <div class="error-box"><%= errorMessage %></div>
			<% } %>
          
          
          <!-- form starts form here -->
            <form action="checkData" method="Get" class="form">
              <div class="form-group">
                <label class="form-label">User Name</label>
                <input type="text" name="username" class="form-input" placeholder="Enter your name" required>
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" name="email" class="form-input" placeholder="Enter your email" required>
              </div>

              <div class="form-group">
                <label class="form-label">Mobile Number</label>
                <input type="tel" name="mobile" class="form-input" placeholder="10-digit mobile number" pattern="[0-9]{10}" required>
              </div>

              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" name="password" class="form-input" placeholder="Create a password" required>
              </div>

              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <input type="password" name="confirmPassword" class="form-input" placeholder="Re-enter password" required>
              </div>

              <div class="form-group">
                <label class="form-label">Address</label>
                <textarea name="address" class="form-input" rows="2" placeholder="Your delivery address" required></textarea>
              </div>

              <div class="form-group checkbox-legend-group">
                <label class="checkbox-label">
                  <input type="checkbox" name="terms" required>
                  I agree to the <a href="#">Terms and Conditions</a>
                </label>
              </div>

              <button type="submit" class="submit-button">Register</button>

              <div class="signup-link">
                Already have an account? <a href="login.jsp">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Slideshow Script -->
	<script src="script/registerscript.js"></script>
</body>
</html>
