package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitedaoimpl.MenuDAOImplementation;
import com.app.zingbitemodels.Menu;

@WebServlet("/menu")
public class MenuServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        String restaurantIdParam = request.getParameter("restaurantId");
        String restaurantName = request.getParameter("restaurantName");
        if (restaurantIdParam != null) {
            try {
                int restaurantId = Integer.parseInt(restaurantIdParam);

                MenuDAO menuDAO = new MenuDAOImplementation();
                List<Menu> menuList = menuDAO.getMenuRestaurantById(restaurantId);
                
                request.setAttribute("restaurantName", restaurantName);
                request.setAttribute("menuList", menuList);
            } catch (NumberFormatException e) {
                request.setAttribute("menuList", null);
            }
        }

        request.getRequestDispatcher("viewmenu.jsp").forward(request, response);
    }
}
