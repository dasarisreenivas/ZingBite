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

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        String email = req.getParameter("email");
        String password = req.getParameter("password");

        String restaurantId = req.getParameter("restaurantId");
        String restaurantName = req.getParameter("restaurantName");

        UserDAO userDao = new UserDAOImplementation();
        User user = userDao.getUserById(email);
        
        if (user != null) {
            if (password.equals(user.getPassword())) {
                HttpSession session = req.getSession();
                session.setAttribute("loggedInUser", user);

                String redirectUrl = (String)session.getAttribute("redirectAfterLogin");
                if(redirectUrl!=null) {
                	session.removeAttribute("redirectAfterLogin");
                	resp.sendRedirect(redirectUrl);
                }else {
                	resp.sendRedirect("home");
                }
            } else {
                req.setAttribute("errorMessage", "Invalid email or password");
                req.getRequestDispatcher("login.jsp").forward(req, resp);
            }
        } else {
            req.setAttribute("errorMessage", "Email not registered");
            req.getRequestDispatcher("login.jsp").forward(req, resp);
        }
    }
}
