package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.hibernate.Session;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Orders;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.GeoUtils;
import com.app.zingbiteutils.RouteOptimizer;
import com.app.zingbiteutils.AuthorizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/delivery/route")
public class RouteServlet extends HttpServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(RouteServlet.class);

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (AuthorizationUtils.requireRole(req, "super_admin") == null) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Super admin access required\"}");
            return;
        }

        String orderIdStr = req.getParameter("orderId");
        if (orderIdStr == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing orderId parameter\"}");
            return;
        }

        try (Session dbSession = DBUtils.openSession()) {
            int orderId = Integer.parseInt(orderIdStr.replace("ZB-", "").trim());
            Orders order = dbSession.get(Orders.class, orderId);
            if (order == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Order not found\"}");
                return;
            }

            // Calculate optimized delivery route
            String startNode = "Kitchen";
            String endNode = "Customer";
            List<String> optimizedRoute = RouteOptimizer.findShortestPath(startNode, endNode);

            JsonObject jsonResponse = new JsonObject();
            JsonArray routeArray = new JsonArray();
            for (String node : optimizedRoute) {
                routeArray.add(node);
            }
            jsonResponse.add("route", routeArray);
            jsonResponse.addProperty("orderId", orderId);
            resp.getWriter().write(jsonResponse.toString());

        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to retrieve routing details\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (AuthorizationUtils.requireRole(req, "super_admin") == null) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Super admin access required\"}");
            return;
        }

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
            String action = requestBody.has("action") ? requestBody.get("action").getAsString() : "";

            if ("updateRoad".equalsIgnoreCase(action)) {
                String roadName = requestBody.get("roadName").getAsString();
                
                if (requestBody.has("trafficLevel")) {
                    String trafficLevel = requestBody.get("trafficLevel").getAsString();
                    RouteOptimizer.updateTraffic(roadName, trafficLevel);
                }

                if (requestBody.has("isBlocked")) {
                    boolean isBlocked = requestBody.get("isBlocked").getAsBoolean();
                    RouteOptimizer.updateConstruction(roadName, isBlocked);
                }

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());
                
            } else if ("reset".equalsIgnoreCase(action)) {
                RouteOptimizer.resetGraph();
                
                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Invalid action\"}");
            }

        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to update route simulation details\"}");
        }
    }
}
