package com.app.zingbiteServlets;

import java.io.IOException;

import org.json.JSONObject;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/CreateOrderServlet")
public class CreateOrderServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            String razorpayKey = System.getenv().getOrDefault("RAZORPAY_KEY_ID", "rzp_test_RU5HIdwTwlQNOw");
            String razorpaySecret = System.getenv().getOrDefault("RAZORPAY_KEY_SECRET", "zD11WBQEbgpiX10AfUaHunTJ");
            RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

            int amount = Integer.parseInt(request.getParameter("amount")) * 100;

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "receipt#1");
            orderRequest.put("payment_capture", true);

            Order order = client.orders.create(orderRequest);

            request.setAttribute("orderId", order.get("id"));
            request.setAttribute("amount", amount);
            RequestDispatcher rd = request.getRequestDispatcher("checkout.jsp");
            rd.forward(request, response);

        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().write("Error creating Razorpay order: " + e.getMessage());
        }
    }
}
