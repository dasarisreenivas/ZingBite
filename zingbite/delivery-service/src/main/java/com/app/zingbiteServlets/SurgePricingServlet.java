package com.app.zingbiteServlets;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import com.google.gson.JsonObject;
import com.app.zingbiteutils.SurgePricingService;

@WebServlet("/api/surge")
public class SurgePricingServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String latParam = req.getParameter("latitude");
        String lngParam = req.getParameter("longitude");
        String mockWeatherParam = req.getParameter("mockWeather");

        double latitude = 0.0;
        double longitude = 0.0;

        if (latParam != null && !latParam.trim().isEmpty()) {
            try {
                latitude = Double.parseDouble(latParam);
            } catch (NumberFormatException e) {
                // Ignore and use default 0.0
            }
        }
        if (lngParam != null && !lngParam.trim().isEmpty()) {
            try {
                longitude = Double.parseDouble(lngParam);
            } catch (NumberFormatException e) {
                // Ignore and use default 0.0
            }
        }

        String isTestingParam = req.getParameter("isTesting");
        boolean isTesting = "true".equalsIgnoreCase(isTestingParam);
        SurgePricingService.SurgeDetails surgeDetails;
        if (isTesting) {
            surgeDetails = SurgePricingService.calculateSurge(latitude, longitude, mockWeatherParam, java.time.LocalTime.of(10, 0));
        } else {
            surgeDetails = SurgePricingService.calculateSurge(latitude, longitude, mockWeatherParam);
        }

        HttpSession session = req.getSession();
        session.setAttribute("surgeMultiplier", (double) surgeDetails.getMultiplier());
        session.setAttribute("surgeReason", surgeDetails.getReason());
        if (mockWeatherParam != null) {
            session.setAttribute("mockWeather", mockWeatherParam);
        }

        JsonObject responseJson = new JsonObject();
        responseJson.addProperty("surgeMultiplier", surgeDetails.getMultiplier());
        responseJson.addProperty("surgeReason", surgeDetails.getReason());
        responseJson.addProperty("multiplier", surgeDetails.getMultiplier());
        responseJson.addProperty("reason", surgeDetails.getReason());
        responseJson.addProperty("success", true);

        resp.getWriter().write(responseJson.toString());
    }
}
