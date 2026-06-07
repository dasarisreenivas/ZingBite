package com.app.zingbiteutils;

public class EmailTemplates {

    private static String getBaseTemplate(String title, String bodyContent) {
        return "<!DOCTYPE html>"
             + "<html>"
             + "<head>"
             + "  <meta charset='utf-8'>"
             + "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>"
             + "  <title>" + title + "</title>"
             + "  <style>"
             + "    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f9fa; color: #1a1625; margin: 0; padding: 20px; }"
             + "    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; }"
             + "    .header { background-color: #F7374F; padding: 30px; text-align: center; color: #ffffff; }"
             + "    .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }"
             + "    .content { padding: 35px 25px; line-height: 1.6; font-size: 15px; }"
             + "    .content h2 { color: #F7374F; font-size: 20px; font-weight: 700; margin-top: 0; }"
             + "    .highlight-box { background-color: #fffafb; border: 1px solid rgba(247, 55, 79, 0.15); border-radius: 8px; padding: 16px; margin: 20px 0; }"
             + "    .footer { background-color: #1a1625; color: #a0aec0; text-align: center; padding: 20px; font-size: 12px; }"
             + "    .footer a { color: #F7374F; text-decoration: none; font-weight: 600; }"
             + "    .btn { display: inline-block; padding: 12px 24px; background-color: #F7374F; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 700; margin-top: 15px; }"
             + "  </style>"
             + "</head>"
             + "<body>"
             + "  <div class='container'>"
             + "    <div class='header'>"
             + "      <h1>ZingBite</h1>"
             + "    </div>"
             + "    <div class='content'>"
             +        bodyContent
             + "    </div>"
             + "    <div class='footer'>"
             + "      <p>Need support? Visit our <a href='http://localhost:5173/zingbite/info/help'>Help Center</a> or email <a href='mailto:support@zingbite.com'>support@zingbite.com</a>.</p>"
             + "      <p>&copy; 2026 ZingBite Operations Inc. All rights reserved.</p>"
             + "    </div>"
             + "  </div>"
             + "</body>"
             + "</html>";
    }

    public static String welcome(String userName) {
        String content = "<h2>Welcome to ZingBite, " + SanitizationUtils.escapeHtml(userName) + "! 🍕</h2>"
                       + "<p>We are absolutely thrilled to have you join our community of food lovers. With ZingBite, you can explore the best local restaurants and get your favorite meals delivered straight to your door with blazing-fast routing speeds.</p>"
                       + "<p>Here are a few things you can do right now:</p>"
                       + "<ul>"
                       + "  <li>Complete your profile settings to configure address geocoding.</li>"
                       + "  <li>Explore active menus near your location.</li>"
                       + "  <li>Unlock special welcome coupons (use code <b>WELCOME20</b> at checkout).</li>"
                       + "</ul>"
                       + "<a href='http://localhost:5173/zingbite/menu' class='btn'>Explore Restaurants</a>";
        return getBaseTemplate("Welcome to ZingBite!", content);
    }

    public static String orderPlaced(String userName, int orderId, float amount, String date) {
        String content = "<h2>Order Placed Successfully! 🎉</h2>"
                       + "<p>Dear " + SanitizationUtils.escapeHtml(userName) + ", your transaction has been processed, and your order has been received by the kitchen.</p>"
                       + "<div class='highlight-box'>"
                       + "  <b>Order Details:</b><br/>"
                       + "  • Order ID: <b>ZB-" + orderId + "</b><br/>"
                       + "  • Amount Paid: <b>&#8377;" + String.format("%.2f", amount) + "</b><br/>"
                       + "  • Order Time: <b>" + date + "</b>"
                       + "</div>"
                       + "<p>The restaurant is currently reviewing your order details. We will alert you the moment they accept it and begin preparing the food.</p>"
                       + "<a href='http://localhost:5173/zingbite/track-order?orderId=ZB-" + orderId + "' class='btn'>Track Your Order</a>";
        return getBaseTemplate("ZingBite Order Confirmation - ZB-" + orderId, content);
    }

    public static String orderStatusUpdate(String userName, int orderId, String status) {
        String icon = "Preparing".equalsIgnoreCase(status) ? "🍳" : "🍱";
        String content = "<h2>Order Status Update: " + status + " " + icon + "</h2>"
                       + "<p>Dear " + SanitizationUtils.escapeHtml(userName) + ", the status of your order <b>ZB-" + orderId + "</b> has been updated.</p>"
                       + "<div class='highlight-box' style='text-align: center; padding: 24px;'>"
                       + "  Current Stage:<br/>"
                       + "  <span style='font-size: 24px; font-weight: 800; color: #F7374F;'>" + status.toUpperCase() + "</span>"
                       + "</div>"
                       + "<p>We will continue to notify you of major updates. You can track live telemetry changes and converse with the delivery rider directly from the dashboard.</p>"
                       + "<a href='http://localhost:5173/zingbite/track-order?orderId=ZB-" + orderId + "' class='btn'>Open Live Tracking</a>";
        return getBaseTemplate("Order status update: ZB-" + orderId, content);
    }

    public static String riderAssigned(String userName, int orderId, String riderName) {
        String content = "<h2>Delivery Partner Assigned! 🚴</h2>"
                       + "<p>Dear " + SanitizationUtils.escapeHtml(userName) + ", a delivery rider has accepted your run and is heading to the kitchen to pick up your order.</p>"
                       + "<div class='highlight-box'>"
                       + "  <b>Rider Details:</b><br/>"
                       + "  • Name: <b>" + SanitizationUtils.escapeHtml(riderName) + "</b><br/>"
                       + "  • Status: <b>Heading to Restaurant</b>"
                       + "</div>"
                       + "<p>You can now open a real-time instant chat with the rider directly inside the order tracking portal if you need to provide coordinates or delivery directions.</p>"
                       + "<a href='http://localhost:5173/zingbite/track-order?orderId=ZB-" + orderId + "' class='btn'>Open Chat & Tracking</a>";
        return getBaseTemplate("Delivery Partner Assigned - ZB-" + orderId, content);
    }

    public static String delivered(String userName, int orderId) {
        String content = "<h2>Order Delivered! 🍔😋</h2>"
                       + "<p>Dear " + SanitizationUtils.escapeHtml(userName) + ", your order <b>ZB-" + orderId + "</b> has been successfully delivered to your address.</p>"
                       + "<p>We hope you enjoy your meal! Thank you for ordering from ZingBite.</p>"
                       + "<p>If you had a great experience, please take a moment to rate the restaurant and rider in the app.</p>"
                       + "<a href='http://localhost:5173/zingbite/' class='btn'>Order Again</a>";
        return getBaseTemplate("Order ZB-" + orderId + " Delivered!", content);
    }

    public static String applicationStatusUpdate(String candidateName, String jobTitle, String status) {
        String content = "<h2>Job Application Status Update</h2>"
                       + "<p>Dear " + SanitizationUtils.escapeHtml(candidateName) + ",</p>"
                       + "<p>Thank you for your interest in joining the ZingBite team. We wanted to inform you that we have reviewed and updated your application for the <b>" + SanitizationUtils.escapeHtml(jobTitle) + "</b> position.</p>"
                       + "<div class='highlight-box' style='text-align: center; padding: 20px;'>"
                       + "  Application Status:<br/>"
                       + "  <span style='font-size: 20px; font-weight: 800; color: #F7374F;'>" + status.toUpperCase() + "</span>"
                       + "</div>"
                       + "<p>You can check active messages or chat with our recruitment team directly inside the ZingBite Career Portal.</p>"
                       + "<a href='http://localhost:5173/zingbite/careers' class='btn'>Visit Career Portal</a>";
        return getBaseTemplate("Job Application Update: " + jobTitle, content);
    }
}
