package com.app.zingbiteServlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@WebServlet("/CreateOrderServlet")
public class CreateOrderServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            // ✅ Razorpay Test Keys
            RazorpayClient client = new RazorpayClient("rzp_test_RU5HIdwTwlQNOw", "zD11WBQEbgpiX10AfUaHunTJ");

            // ✅ Amount from form
            int amount = Integer.parseInt(request.getParameter("amount")) * 100;

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "receipt#1");
            orderRequest.put("payment_capture", true);

            // ✅ Create Razorpay order
            Order order = client.orders.create(orderRequest);

            // ✅ Pass order data to JSP
            request.setAttribute("orderId", order.get("id"));
            request.setAttribute("amount", amount);
            RequestDispatcher rd = request.getRequestDispatcher("checkout.jsp");
            rd.forward(request, response);

        } catch (Exception e) {
            e.printStackTrace(); // 🔍 See Tomcat logs for details
            response.getWriter().write("Error creating Razorpay order: " + e.getMessage());
        }
    }
}
