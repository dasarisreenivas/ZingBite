package com.app.zingbiteServlets;

import java.io.IOException;

import org.json.JSONObject;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

@WebServlet("/CreateOrderServlet")
public class CreateOrderServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

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

            JsonObject json = new JsonObject();
            json.addProperty("orderId", order.get("id").toString());
            json.addProperty("amount", amount);
            response.getWriter().write(json.toString());

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Error creating Razorpay order: " + e.getMessage() + "\"}");
        }
    }
}
