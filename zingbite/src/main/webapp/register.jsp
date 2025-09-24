<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ZingBite - Register</title>

  <!-- Font -->
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
        <p class="hero-description">Join ZingBite today and get your favorite meals delivered faster than ever.</p>
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
            <p class="card-description">Sign up and start enjoying delicious food!</p>
          </div>
          <div class="card-content">
            <form action="Register" method="post" class="form">

              <div class="form-group">
                <label for="username" class="form-label"><b>User Name</b></label>
                <input type="text" id="username" name="username" required placeholder="Enter your name" class="form-input">
              </div>

              <div class="form-group">
                <label for="email" class="form-label"><b>Email</b></label>
                <input type="email" id="email" name="email" required placeholder="Enter your email" class="form-input">
              </div>

              <div class="form-group">
                <label for="mobile" class="form-label"><b>Mobile Number</b></label>
                <input type="tel" id="mobile" name="mobile" required pattern="[0-9]{10}" placeholder="10-digit mobile number" class="form-input">
              </div>

              <div class="form-group">
                <label for="password" class="form-label"><b>Password</b></label>
                <input type="password" id="password" name="password" required placeholder="Create a password" class="form-input">
              </div>

              <div class="form-group">
                <label for="confirmPassword" class="form-label"><b>Confirm Password</b></label>
                <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Re-enter password" class="form-input">
              </div>

              <div class="form-group">
                <label for="address" class="form-label"><b>Address</b></label>
                <textarea id="address" name="address" rows="2" required placeholder="Your delivery address" class="form-input"></textarea>
              </div>

              <div class="form-group checkbox-legend-group">
                <label class="checkbox-label">
                  <input type="checkbox" id="terms" name="terms" required />
                  I agree to the <a href="#">Terms and Conditions</a>
                </label>
              </div>

              <button type="submit" class="submit-button">Register</button>

              <div class="signup-link">
                <p>Already have an account? <a href="login.jsp">Login</a></p>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Reuse same slideshow JS as login -->
  <script src="script/register.js" defer></script>
</body>
</html>
