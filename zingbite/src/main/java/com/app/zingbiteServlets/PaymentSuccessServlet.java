package com.app.zingbiteServlets;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/paymentSuccess")
public class PaymentSuccessServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String paymentId = request.getParameter("paymentId");
        System.out.println("UPI Payment Successful! Payment ID: " + paymentId);

        // TODO: Save payment info to DB (userId, orderId, amount, status)
        request.setAttribute("paymentId", paymentId);
        RequestDispatcher rd = request.getRequestDispatcher("success.jsp");
        rd.forward(request, response);
    }
}
