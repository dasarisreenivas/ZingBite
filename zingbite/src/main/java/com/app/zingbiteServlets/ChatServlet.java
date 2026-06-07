"package com.app.zingbiteServlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import com.app.zingbitemodels.Application;
import com.app.zingbitemodels.ChatMessage;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.SanitizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/chat")
public class ChatServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to access messages.\"}");
            return;
        }

        User user = (User) session.getAttribute("loggedInUser");
        String orderIdStr = req.getParameter("orderId");
        String appIdStr = req.getParameter("applicationId");

        // Parse pagination params
        int size = 100;
        try {
            if (req.getParameter("size") != null) {
                size = Math.min(100, Integer.parseInt(req.getParameter("si
<truncated 8490 bytes>