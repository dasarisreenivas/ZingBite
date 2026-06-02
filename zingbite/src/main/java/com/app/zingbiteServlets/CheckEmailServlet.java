package com.app.zingbiteServlets;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Servlet implementation class CheckEmailServlet
 */
@WebServlet("/checkData")
public class CheckEmailServlet extends HttpServlet {

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String userName = req.getParameter("username");
		String email = req.getParameter("email");
		String mobileNumber = req.getParameter("mobile");
		String password= req.getParameter("password");
		String confirmPassword = req.getParameter("confirmPassword");
		String address = req.getParameter("address");
		
		if(email.length()>=10) {
			HttpSession session = req.getSession();
			session.setAttribute("username",userName);
			session.setAttribute("email",email);
			session.setAttribute("mobile",mobileNumber);
			session.setAttribute("password",password);
			session.setAttribute("confirmpassword",confirmPassword);
			session.setAttribute("address",address);
			resp.sendRedirect("register");
			
		}else {
			resp.sendRedirect("login.jsp");
		}
	}

}
