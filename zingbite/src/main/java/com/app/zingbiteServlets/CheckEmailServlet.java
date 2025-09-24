package com.app.zingbiteServlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
