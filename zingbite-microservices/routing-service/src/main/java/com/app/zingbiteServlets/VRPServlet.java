package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;
import java.util.ArrayList;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.app.zingbiteutils.VRPRouteOptimizer;
import com.app.zingbiteutils.VRPRouteOptimizer.Node;
import com.app.zingbiteutils.VRPRouteOptimizer.Edge;
import com.app.zingbiteutils.AuthorizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/delivery/vrp")
public class VRPServlet extends HttpServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(VRPServlet.class);

    private static final long serialVersionUID = 1L;

    // Default simulation coordinates (Bangalore - used when no orderId provided)
    // These are fallback values; real coordinates come from the database
    private static final double DEFAULT_RIDER_LAT = 12.9580;
    private static final double DEFAULT_RIDER_LON = 77.5890;
    private static final double DEFAULT_REST_LAT = 12.9716;
    private static final double DEFAULT_REST_LON = 77.5946;
    private static final double DEFAULT_CUST_A_LAT = 12.9821;
    private static final double DEFAULT_CUST_A_LON = 77.6085;
    private static final double DEFAULT_CUST_B_LAT = 12.9645;
    private static final double DEFAULT_CUST_B_LON = 77.6142;

    private static boolean useAStar = true;

    // Live Simulated Variables
    private static int prepTimeA = 10; // in mins
    private static int prepTimeB = 15; // in mins

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

        try {
            String orderIdStr = req.getParameter("orderId");
            double riderLat = DEFAULT_RIDER_LAT;
            double riderLon = DEFAULT_RIDER_LON;
            double restLat = DEFAULT_REST_LAT;
            double restLon = DEFAULT_REST_LON;
            double custALat = DEFAULT_CUST_A_LAT;
            double custALon = DEFAULT_CUST_A_LON;
            double custBLat = DEFAULT_CUST_B_LAT;
            double custBLon = DEFAULT_CUST_B_LON;

            if (orderIdStr != null && !orderIdStr.trim().isEmpty()) {
                try (org.hibernate.Session dbSession = com.app.zingbiteutils.DBUtils.openSession()) {
                    int orderId = Integer.parseInt(orderIdStr.replace("ZB-", "").trim());
                    com.app.zingbitemodels.Orders order = dbSession.get(com.app.zingbitemodels.Orders.class, orderId);
                    if (order != null) {
                        int restId = order.getRestaurantId() != null ? order.getRestaurantId().getRestaurantId() : 0;
                        restLat = com.app.zingbiteutils.GeoUtils.getRestaurantLatitude(restId);
                        restLon = com.app.zingbiteutils.GeoUtils.getRestaurantLongitude(restId);

                        custALat = com.app.zingbiteutils.GeoUtils.getUserLatitude(order.getUserId());
                        custALon = com.app.zingbiteutils.GeoUtils.getUserLongitude(order.getUserId());
                        custBLat = custALat;
                        custBLon = custALon;

                        int riderId = order.getRiderId() != null ? order.getRiderId() : 0;
                        riderLat = com.app.zingbiteutils.GeoUtils.getRiderLatitude(riderId);
                        riderLon = com.app.zingbiteutils.GeoUtils.getRiderLongitude(riderId);

                        if (order.getGpsCoordinates() != null) {
                            String coordsStr = order.getGpsCoordinates();
                            String[] coordsParts = coordsStr.split(",");
                            if (coordsParts.length == 2) {
                                try {
                                    riderLat = Double.parseDouble(coordsParts[0]);
                                    riderLon = Double.parseDouble(coordsParts[1]);
                                } catch (Exception ex) {}
                            }
                        }
                    }
                }
            }

            VRPRouteOptimizer optimizer = new VRPRouteOptimizer(
                riderLat, riderLon,
                restLat, restLon,
                custALat, custALon,
                custBLat, custBLon
            );

            // Compute sequences based on LIFO/FIFO constraints
            List<Integer> dropNodes = new ArrayList<>();
            dropNodes.add(2); // Customer A
            dropNodes.add(3); // Customer B
            List<Integer> sequence = optimizer.sequenceBatches(dropNodes);

            // Precompute Cost Matrix
            List<Integer> matrixNodes = new ArrayList<>();
            matrixNodes.add(0); // Rider
            matrixNodes.add(1); // Kitchen
            matrixNodes.add(2); // Customer A
            matrixNodes.add(3); // Customer B
            double[][] costMatrix = optimizer.computeCostMatrix(matrixNodes);

            // Path 1: First Mile (FM) -> Node 0 (Rider) to Node 1 (Restaurant)
            List<Node> pathFM = optimizer.findRoute(0, 1, useAStar);
            List<String> logsFM = new ArrayList<>(optimizer.getPathfindingLogs());

            // Path 2: Last Mile Drop 1 (LM1) -> Node 1 (Restaurant) to First Drop Node in sequence
            int firstDropId = sequence.get(0);
            List<Node> pathLM1 = optimizer.findRoute(1, firstDropId, useAStar);
            List<String> logsLM1 = new ArrayList<>(optimizer.getPathfindingLogs());

            // Path 3: Last Mile Drop 2 (LM2) -> First Drop Node to Second Drop Node
            int secondDropId = sequence.get(1);
            List<Node> pathLM2 = optimizer.findRoute(firstDropId, secondDropId, useAStar);
            List<String> logsLM2 = new ArrayList<>(optimizer.getPathfindingLogs());

            // Calculate Distance Costs
            double distFM = getPathDistance(pathFM);
            double distLM1 = getPathDistance(pathLM1);
            double distLM2 = getPathDistance(pathLM2);

            // Resolve Traffic Multipliers along paths
            double trafficFM = getPathTrafficFactor(pathFM, optimizer);
            double trafficLM1 = getPathTrafficFactor(pathLM1, optimizer);
            double trafficLM2 = getPathTrafficFactor(pathLM2, optimizer);

            // Calculate arrival times and evaluate time window violations
            double speedKmh = 25.0;
            double currentTime = 0.0;

            // Travel to Restaurant (Node 1)
            double timeFM = (distFM / speedKmh) * 60.0;
            currentTime += timeFM;

            // Travel to First Drop
            double timeLM1 = (distLM1 / speedKmh) * 60.0;
            currentTime += timeLM1;
            Node drop1Node = optimizer.getNodes().get(firstDropId);
            boolean violation1 = false;
            double arrival1 = currentTime;
            if (arrival1 < drop1Node.earliestTime) {
                arrival1 = drop1Node.earliestTime;
            } else if (arrival1 > drop1Node.latestTime) {
                violation1 = true;
            }
            currentTime = arrival1;

            // Travel to Second Drop
            double timeLM2 = (distLM2 / speedKmh) * 60.0;
            currentTime += timeLM2;
            Node drop2Node = optimizer.getNodes().get(secondDropId);
            boolean violation2 = false;
            double arrival2 = currentTime;
            if (arrival2 < drop2Node.earliestTime) {
                arrival2 = drop2Node.earliestTime;
            } else if (arrival2 > drop2Node.latestTime) {
                violation2 = true;
            }

            // Expose time windows data
            JsonObject twData = new JsonObject();
            JsonObject twA = new JsonObject();
            twA.addProperty("earliest", optimizer.getNodes().get(2).earliestTime);
            twA.addProperty("latest", optimizer.getNodes().get(2).latestTime);
            twA.addProperty("arrival", firstDropId == 2 ? arrival1 : arrival2);
            twA.addProperty("violated", firstDropId == 2 ? violation1 : violation2);
            twData.add("Customer A", twA);

            JsonObject twB = new JsonObject();
            twB.addProperty("earliest", optimizer.getNodes().get(3).earliestTime);
            twB.addProperty("latest", optimizer.getNodes().get(3).latestTime);
            twB.addProperty("arrival", firstDropId == 3 ? arrival1 : arrival2);
            twB.addProperty("violated", firstDropId == 3 ? violation1 : violation2);
            twData.add("Customer B", twB);

            // Compile all Logs for Console Output
            List<String> finalLogs = new ArrayList<>();
            finalLogs.add("=== VRPTW PRECOMPUTED COST MATRIX ===");
            finalLogs.add(String.format("          Rider(0)  Kitchen(1)  CustA(2)  CustB(3)"));
            finalLogs.add(String.format("Rider(0)   %6.2f    %6.2f    %6.2f    %6.2f", costMatrix[0][0], costMatrix[0][1], costMatrix[0][2], costMatrix[0][3]));
            finalLogs.add(String.format("Kitchen(1) %6.2f    %6.2f    %6.2f    %6.2f", costMatrix[1][0], costMatrix[1][1], costMatrix[1][2], costMatrix[1][3]));
            finalLogs.add(String.format("CustA(2)   %6.2f    %6.2f    %6.2f    %6.2f", costMatrix[2][0], costMatrix[2][1], costMatrix[2][2], costMatrix[2][3]));
            finalLogs.add(String.format("CustB(3)   %6.2f    %6.2f    %6.2f    %6.2f", costMatrix[3][0], costMatrix[3][1], costMatrix[3][2], costMatrix[3][3]));
            finalLogs.add("");
            
            finalLogs.add("=== 3-OPT DISPATCH SEQUENCING ===");
            finalLogs.add("Unoptimized sequence: Customer A -> Customer B");
            finalLogs.add("Evaluating 3-opt reconnect configurations...");
            finalLogs.add("Optimal sequence resolved: " + (firstDropId == 2 ? "Customer A -> Customer B" : "Customer B -> Customer A"));
            finalLogs.add("");

            finalLogs.add("=== TIME WINDOWS CONSTRAINT EVALUATION ===");
            finalLogs.add(String.format("Customer A Dropoff Window: [%.1f, %.1f] mins | Arrival: %.1f mins (%s)", 
                twA.get("earliest").getAsDouble(), twA.get("latest").getAsDouble(), twA.get("arrival").getAsDouble(),
                twA.get("violated").getAsBoolean() ? "LATE - TIME WINDOW VIOLATION!" : "ON TIME"));
            finalLogs.add(String.format("Customer B Dropoff Window: [%.1f, %.1f] mins | Arrival: %.1f mins (%s)", 
                twB.get("earliest").getAsDouble(), twB.get("latest").getAsDouble(), twB.get("arrival").getAsDouble(),
                twB.get("violated").getAsBoolean() ? "LATE - TIME WINDOW VIOLATION!" : "ON TIME"));
            finalLogs.add("");

            finalLogs.add("=== FIRST MILE ROUTING (RIDER -> RESTAURANT) ===");
            finalLogs.addAll(logsFM);
            finalLogs.add("");
            finalLogs.add("=== LAST MILE 1 ROUTING (RESTAURANT -> CUSTOMER " + (firstDropId == 2 ? "A" : "B") + ") ===");
            finalLogs.addAll(logsLM1);
            finalLogs.add("");
            finalLogs.add("=== LAST MILE 2 ROUTING (CUSTOMER " + (firstDropId == 2 ? "A" : "B") + " -> CUSTOMER " + (secondDropId == 2 ? "A" : "B") + ") ===");
            finalLogs.addAll(logsLM2);

            // Calculate Predictive ETAs
            // For first drop
            double etaDrop1 = optimizer.calculatePredictiveETA(
                distFM + distLM1,
                (trafficFM + trafficLM1) / 2.0,
                firstDropId == 2 ? prepTimeA : prepTimeB,
                firstDropId == 3 // Customer B is high-rise
            );

            // For second drop
            double etaDrop2 = optimizer.calculatePredictiveETA(
                distFM + distLM1 + distLM2,
                (trafficFM + trafficLM1 + trafficLM2) / 3.0,
                secondDropId == 2 ? prepTimeA : prepTimeB,
                secondDropId == 3 // Customer B is high-rise
            );

            // Construct Response
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("weather", VRPRouteOptimizer.weather);
            responseJson.addProperty("perishableLifo", VRPRouteOptimizer.perishableLifo);
            responseJson.addProperty("useAStar", useAStar);
            responseJson.add("costMatrix", new Gson().toJsonTree(costMatrix));
            responseJson.add("timeWindows", twData);

            // Nodes & Edges
            Gson gson = new Gson();
            responseJson.add("nodes", gson.toJsonTree(optimizer.getNodes()));
            responseJson.add("edges", gson.toJsonTree(optimizer.getEdges()));

            // Batch Sequence
            JsonArray batchArray = new JsonArray();
            batchArray.add(firstDropId == 2 ? "Customer A" : "Customer B");
            batchArray.add(secondDropId == 2 ? "Customer A" : "Customer B");
            responseJson.add("sequence", batchArray);

            // Path Coordinates for Map rendering
            responseJson.add("pathFM", gson.toJsonTree(pathFM));
            responseJson.add("pathLM1", gson.toJsonTree(pathLM1));
            responseJson.add("pathLM2", gson.toJsonTree(pathLM2));

            // Log details
            responseJson.add("logs", gson.toJsonTree(finalLogs));

            // Surge zone dynamics - use the resolved coordinates, not hardcoded defaults
            JsonArray surges = new JsonArray();
            JsonObject zoneRest = new JsonObject();
            zoneRest.addProperty("name", "Kitchen Hub Zone");
            zoneRest.addProperty("lat", restLat);
            zoneRest.addProperty("lon", restLon);
            zoneRest.addProperty("radius", 0.005);
            zoneRest.addProperty("incentive", "Sunny".equalsIgnoreCase(VRPRouteOptimizer.weather) ? 0 : 15);
            surges.add(zoneRest);

            JsonObject zoneB = new JsonObject();
            zoneB.addProperty("name", "High-Demand Apartment Core");
            zoneB.addProperty("lat", custBLat);
            zoneB.addProperty("lon", custBLon);
            zoneB.addProperty("radius", 0.006);
            int bonusB = 10;
            if ("Rainy".equalsIgnoreCase(VRPRouteOptimizer.weather)) bonusB = 25;
            if ("Stormy".equalsIgnoreCase(VRPRouteOptimizer.weather)) bonusB = 45;
            zoneB.addProperty("incentive", bonusB);
            surges.add(zoneB);
            responseJson.add("surgeZones", surges);

            // Predictive ETA Breakdown details
            JsonObject etas = new JsonObject();
            
            // Drop A breakdown
            JsonObject etaAObj = new JsonObject();
            double finalEtaA = (firstDropId == 2) ? etaDrop1 : etaDrop2;
            double baseA = ((distFM + distLM1 + (firstDropId == 3 ? distLM2 : 0)) / 25.0) * 60.0;
            double avgTrafficFactorA = (firstDropId == 2) ? ((trafficFM + trafficLM1) / 2.0) : ((trafficFM + trafficLM1 + trafficLM2) / 3.0);
            etaAObj.addProperty("total", Math.round(finalEtaA));
            etaAObj.addProperty("baseTravel", Math.round(baseA * 10.0) / 10.0);
            etaAObj.addProperty("trafficDelay", Math.round(baseA * (avgTrafficFactorA - 1.0) * 10.0) / 10.0);
            etaAObj.addProperty("weatherDelay", "Sunny".equalsIgnoreCase(VRPRouteOptimizer.weather) ? 0 : ("Rainy".equalsIgnoreCase(VRPRouteOptimizer.weather) ? 5 : 12));
            etaAObj.addProperty("prepWait", Math.round(Math.max(0.0, prepTimeA - baseA * 0.4)));
            etaAObj.addProperty("navOffset", 1.0); // Standard Home
            etas.add("Customer A", etaAObj);

            // Drop B breakdown
            JsonObject etaBObj = new JsonObject();
            double finalEtaB = (firstDropId == 3) ? etaDrop1 : etaDrop2;
            double baseB = ((distFM + distLM1 + (firstDropId == 2 ? distLM2 : 0)) / 25.0) * 60.0;
            double avgTrafficFactorB = (firstDropId == 3) ? ((trafficFM + trafficLM1) / 2.0) : ((trafficFM + trafficLM1 + trafficLM2) / 3.0);
            etaBObj.addProperty("total", Math.round(finalEtaB));
            etaBObj.addProperty("baseTravel", Math.round(baseB * 10.0) / 10.0);
            etaBObj.addProperty("trafficDelay", Math.round(baseB * (avgTrafficFactorB - 1.0) * 10.0) / 10.0);
            etaBObj.addProperty("weatherDelay", "Sunny".equalsIgnoreCase(VRPRouteOptimizer.weather) ? 0 : ("Rainy".equalsIgnoreCase(VRPRouteOptimizer.weather) ? 5 : 12));
            etaBObj.addProperty("prepWait", Math.round(Math.max(0.0, prepTimeB - baseB * 0.4)));
            etaBObj.addProperty("navOffset", 4.5); // High-Rise Apartment
            etas.add("Customer B", etaBObj);

            responseJson.add("predictiveETAs", etas);

            resp.getWriter().write(responseJson.toString());

        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"VRP simulation engine failure\"}");
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

            boolean actionResolved = true;
            if ("updateTraffic".equalsIgnoreCase(action)) {
                String roadName = requestBody.get("roadName").getAsString();
                String trafficLevel = requestBody.get("trafficLevel").getAsString();
                boolean isBlocked = requestBody.has("isBlocked") && requestBody.get("isBlocked").getAsBoolean();

                VRPRouteOptimizer.roadTraffic.put(roadName, trafficLevel);
                VRPRouteOptimizer.roadBlockages.put(roadName, isBlocked);

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());

            } else if ("updateWeather".equalsIgnoreCase(action)) {
                VRPRouteOptimizer.weather = requestBody.get("weather").getAsString();

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());

            } else if ("togglePerishable".equalsIgnoreCase(action)) {
                VRPRouteOptimizer.perishableLifo = requestBody.get("perishableLifo").getAsBoolean();

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());

            } else if ("toggleAStar".equalsIgnoreCase(action)) {
                useAStar = requestBody.get("useAStar").getAsBoolean();

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());

            } else if ("updatePrep".equalsIgnoreCase(action)) {
                if (requestBody.has("prepA")) prepTimeA = requestBody.get("prepA").getAsInt();
                if (requestBody.has("prepB")) prepTimeB = requestBody.get("prepB").getAsInt();

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());

            } else if ("reset".equalsIgnoreCase(action)) {
                VRPRouteOptimizer.weather = "Sunny";
                VRPRouteOptimizer.perishableLifo = false;
                useAStar = true;
                prepTimeA = 10;
                prepTimeB = 15;
                VRPRouteOptimizer.roadTraffic.clear();
                VRPRouteOptimizer.roadBlockages.clear();

                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                resp.getWriter().write(jsonResponse.toString());
            } else {
                actionResolved = false;
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Unknown VRP action\"}");
            }

            if (actionResolved) {
                try {
                    JsonObject sseMsg = new JsonObject();
                    sseMsg.addProperty("type", "vrp_updated");
                    sseMsg.addProperty("timestamp", System.currentTimeMillis());
                    com.app.zingbiteutils.OrderEventBroker.getInstance().broadcastTopicUpdate(
                        "topic:vrp",
                        sseMsg.toString()
                    );
                    LOGGER.info("[VRPServlet] Broadcasted vrp_update event: " + sseMsg.toString());
                } catch (Exception ex) {
                    LOGGER.warn("[VRPServlet] Failed to broadcast VRP update event: " + ex.getMessage());
                }
            }

        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to update VRP simulation config\"}");
        }
    }

    private double getPathDistance(List<Node> path) {
        if (path == null || path.size() < 2) return 0.0;
        double dist = 0.0;
        for (int i = 0; i < path.size() - 1; i++) {
            Node n1 = path.get(i);
            Node n2 = path.get(i + 1);
            dist += com.app.zingbiteutils.GeoUtils.haversine(n1.latitude, n1.longitude, n2.latitude, n2.longitude);
        }
        return dist;
    }

    private double getPathTrafficFactor(List<Node> path, VRPRouteOptimizer opt) {
        if (path == null || path.size() < 2) return 1.0;
        double sumFactor = 0.0;
        int count = 0;
        for (int i = 0; i < path.size() - 1; i++) {
            Node n1 = path.get(i);
            Node n2 = path.get(i + 1);
            // find matching edge
            for (Edge edge : opt.getEdges()) {
                if (edge.fromNodeId == n1.id && edge.toNodeId == n2.id) {
                    double edgeFactor = 1.0;
                    if ("Moderate".equalsIgnoreCase(edge.trafficLevel)) edgeFactor = 1.5;
                    else if ("Heavy".equalsIgnoreCase(edge.trafficLevel)) edgeFactor = 2.5;
                    sumFactor += edgeFactor;
                    count++;
                    break;
                }
            }
        }
        return count == 0 ? 1.0 : (sumFactor / count);
    }
}
