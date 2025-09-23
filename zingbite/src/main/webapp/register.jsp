<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ZingBite Register</title>

  <!-- Font -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">

  <!-- External CSS -->
  <link rel="stylesheet" href="CSS/register.css">
</head>
<body>
  <!-- Blurred Background -->
  <div class="background"></div>

  <div class="container">
    <div class="glass-card">
      <!-- Logo -->
      <div class="logo">
        <img src="https://img.icons8.com/color/96/restaurant.png" alt="ZingBite Logo">
      </div>

      <!-- Heading -->
      <h2>ZingBite</h2>

      <form action="RegisterServlet" method="post">

        <div class="form-group">
          <span class="legend-label">User Name</span>
          <input type="text" id="username" name="username" required placeholder="Enter your name">
        </div>

        <div class="form-group">
          <span class="legend-label">Email</span>
          <input type="email" id="email" name="email" required placeholder="Enter your email">
        </div>

        <div class="form-group">
          <span class="legend-label">Mobile Number</span>
          <input type="tel" id="mobile" name="mobile" required pattern="[0-9]{10}" placeholder="10-digit mobile number">
        </div>

        <div class="form-group">
          <span class="legend-label">Password</span>
          <input type="password" id="password" name="password" required placeholder="Create a password">
        </div>

        <div class="form-group">
          <span class="legend-label">Confirm Password</span>
          <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Re-enter password">
        </div>

        <div class="form-group">
          <span class="legend-label">Address</span>
          <textarea id="address" name="address" rows="2" required placeholder="Your delivery address"></textarea>
        </div>

        <div class="form-group checkbox-legend-group">
          <label class="checkbox-label">
            <input type="checkbox" id="terms" name="terms" required />
            I agree to the <a href="#">Terms and Conditions</a>
          </label>
        </div>

        <button type="submit" class="login-btn">Register</button>

        <div class="footer">
          Already have an account? <a href="login.jsp">Login</a>
        </div>
      </form>
    </div>
  </div>
<script src="script/register.js" defer></script>
</body>

</html>
