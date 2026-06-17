package com.app.zingbiteServlets;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;

@WebServlet("/paymentSuccess")
public class PaymentSuccessServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String paymentId = request.getParameter("paymentId");
        System.out.println("UPI Payment Successful! Payment ID: " + paymentId);

        // ─── Save delivery coordinates to the user record ───
        String latStr = request.getParameter("lat");
        String lngStr = request.getParameter("lng");
        String address = request.getParameter("address");

        HttpSession httpSession = request.getSession(false);
        if (httpSession != null && httpSession.getAttribute("loggedInUser") != null) {
            User loggedInUser = (User) httpSession.getAttribute("loggedInUser");
            int userId = loggedInUser.getUserID();

            try (Session hibernateSession = DBUtils.openSession()) {
                Transaction tx = hibernateSession.beginTransaction();
                User user = hibernateSession.get(User.class, userId);
                if (user != null) {
                    // Update latitude if provided
                    if (latStr != null && !latStr.isEmpty()) {
                        try {
                            user.setLatitude(Double.parseDouble(latStr));
                        } catch (NumberFormatException e) {
                            System.err.println("[PaymentSuccess] Invalid latitude: " + latStr);
                        }
                    }
                    // Update longitude if provided
                    if (lngStr != null && !lngStr.isEmpty()) {
                        try {
                            user.setLongitude(Double.parseDouble(lngStr));
                        } catch (NumberFormatException e) {
                            System.err.println("[PaymentSuccess] Invalid longitude: " + lngStr);
                        }
                    }
                    // Update address if provided
                    if (address != null && !address.isEmpty()) {
                        user.setAddress(address);
                    }
                    hibernateSession.merge(user);
                    System.out.println("[PaymentSuccess] Updated user " + userId +
                        " coords: lat=" + latStr + ", lng=" + lngStr + ", address=" + address);

                    // Also update the session so subsequent pages see the new data
                    loggedInUser.setLatitude(user.getLatitude());
                    loggedInUser.setLongitude(user.getLongitude());
                    loggedInUser.setAddress(user.getAddress());
                }
                tx.commit();
            } catch (Exception e) {
                System.err.println("[PaymentSuccess] Failed to save delivery coordinates:");
                e.printStackTrace();
            }
        }

        response.sendRedirect("/zingbite/track-order?paymentId=" + paymentId);
    }
}
