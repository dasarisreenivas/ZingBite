package com.app.zingbiteServlets;

import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;
import java.util.ArrayList;

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
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/delivery/route")
public class RouteServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("loggedInUser") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Unauthorized\"}");
       
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
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to update route simulation details\"}");
        }
    }
}
