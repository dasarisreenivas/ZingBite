package com.app.zingbiteServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.app.zingbitedao.UserDAO;
import com.app.zingbitedaoimpl.UserDAOImplementation;
import com.app.zingbitemodels.User;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	HttpSession session = req.getSession();
        // Get form parameters directly from request
        String userName = (String) session.getAttribute("username");
        String email = (String)session.getAttribute("email");
        String mobile = (String)session.getAttribute("mobile");
        String password = (String)session.getAttribute("password");
        String confirmPassword= (String)session.getAttribute("confirmpassword");
        String address = (String)session.getAttribute("address");

        long mobileNumber = 0;
        if (mobile != null && !mobile.isEmpty()) {
            try {
                mobileNumber = Long.parseLong(mobile);
            } catch (NumberFormatException e) {
                req.setAttribute("errorMessage", "Invalid mobile number!");
                req.getRequestDispatcher("register.jsp").forward(req, resp);
                return;
            }
        } else {
            req.setAttribute("errorMessage", "Mobile number is required!");
            req.getRequestDispatcher("register.jsp").forward(req, resp);
            return;
        }

        // Check password match
        if (!password.equals(confirmPassword)) {
            req.setAttribute("errorMessage", "Passwords do not match!");
            req.getRequestDispatcher("register.jsp").forward(req, resp);
            return;
        }

        // Add user to database
        User user = new User(userName, email, password, mobileNumber, address);
        UserDAO userDAO = new UserDAOImplementation();
        int added = userDAO.addUser(user); // assuming addUser returns boolean

        if (added==1) {
        	System.out.println(added);
            resp.sendRedirect("login.jsp");
        } else {
            req.setAttribute("errorMessage", "Registration failed! Try again.");
            req.getRequestDispatcher("register.jsp").forward(req, resp);
        }
    }
}
