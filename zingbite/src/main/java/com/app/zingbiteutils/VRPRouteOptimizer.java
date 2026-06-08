package com.app.zingbiteutils;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class VRPRouteOptimizer {

    public static class Node {
        public int id;
        public String label;
        public double latitude;
        public double longitude;

        public Node(int id, String label, double latitude, double longitude) {
            this.id = id;
            this.label = label;
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    public static class Edge {
        public int fromNodeId;
        public int toNodeId;
        public String roadName;
        public double baseDistance; // in km
        public String trafficLevel = "Light"; // Light, Moderate, Heavy
        public boolean isBlocked = false;

        public Edge(int fromNodeId, int toNodeId, String roadName, double baseDistance) {
            this.fromNodeId = fromNodeId;
            this.toNodeId = toNodeId;
            this.roadName = roadName;
            this.baseDistance = baseDistance;
        }

        public double getCost() {
            if (isBlocked) {
                return baseDistance * 1000.0; // Huge cost penalty to route around blocked streets
            }
            double factor = 1.0;
            switch (trafficLevel) {
                case "Moderate": factor = 1.5; break;
                case "Heavy": factor = 2.5; break;
                default: factor = 1.0; break;
            }
            return baseDistance * factor;
        }
    }

    // Interactive VRP Simulation Configuration
    public static String weather = "Sunny"; // Sunny, Rainy, Stormy
    public static boolean perishableLifo = false; // Toggle for LIFO delivery sequence
    public static boolean useAStar = true; // Toggle for using A* vs Dijkstra
    public static final Map<String, String> roadTraffic = new ConcurrentHashMap<>();
    public static final Map<String, Boolean> roadBlockages = new ConcurrentHashMap<>();

    // Dynamic Graph Storage
    private final List<Node> nodes = new ArrayList<>();
    private final List<Edge> edges = new ArrayList<>();
    private final List<String> pathfindingLogs = new ArrayList<>();

    /**
     * Constructs a dynamic 15-node graph around key coordinates (Rider, Restaurant, Customer A, Customer B).
     * Connects nodes with a guaranteed spanning path and auxiliary alternate roads.
     */
    public VRPRouteOptimizer(double riderLat, double riderLon, 
                             double restLat, double restLon, 
                             double custALat, double custALon, 
                             double custBLat, double custBLon) {

        // Node 0: Rider Location
        nodes.add(new Node(0, "Rider Start Position", riderLat, riderLon));
        // Node 1: Restaurant
        nodes.add(new Node(1, "ZingBite Kitchen", restLat, restLon));
        // Node 2: Customer A Dropoff
        nodes.add(new Node(2, "Customer A Delivery Point", custALat, custALon));
        // Node 3: Customer B Dropoff
        nodes.add(new Node(3, "Customer B Delivery Point", custBLat, custBLon));

        // Generate 11 intermediate nodes between these key locations
        Random rand = new Random(42); // Seeded for consistent relative layout
        
        // Let's generate 4 nodes between Rider and Restaurant
        for (int i = 0; i < 4; i++) {
            double fraction = (i + 1) / 5.0;
            double lat = riderLat + (restLat - riderLat) * fraction + (rand.nextDouble() - 0.5) * 0.003;
            double lon = riderLon + (restLon - riderLon) * fraction + (rand.nextDouble() - 0.5) * 0.003;
            nodes.add(new Node(4 + i, "Street Junction " + (4 + i), lat, lon));
        }

        // Let's generate 4 nodes between Restaurant and Customer A
        for (int i = 0; i < 4; i++) {
            double fraction = (i + 1) / 5.0;
            double lat = restLat + (custALat - restLat) * fraction + (rand.nextDouble() - 0.5) * 0.003;
            double lon = restLon + (custALon - restLon) * fraction + (rand.nextDouble() - 0.5) * 0.003;
            nodes.add(new Node(8 + i, "Street Junction " + (8 + i), lat, lon));
        }

        // Let's generate 3 nodes between Customer A and Customer B
        for (int i = 0; i < 3; i++) {
            double fraction = (i + 1) / 4.0;
            double lat = custALat + (custBLat - custALat) * fraction + (rand.nextDouble() - 0.5) * 0.003;
            double lon = custALon + (custBLon - custALon) * fraction + (rand.nextDouble() - 0.5) * 0.003;
            nodes.add(new Node(12 + i, "Street Junction " + (12 + i), lat, lon));
        }

        // Build Spanning Edges to guarantee connectivity
        // Rider (0) -> J4 -> J5 -> J6 -> J7 -> Restaurant (1)
        addEdge(0, 4, "Rider Pathway");
        addEdge(4, 5, "High Street");
        addEdge(5, 6, "Commercial Lane");
        addEdge(6, 7, "Avenue Row");
        addEdge(7, 1, "Kitchen Alley");

        // Restaurant (1) -> J8 -> J9 -> J10 -> J11 -> Customer A (2)
        addEdge(1, 8, "Kitchen Exit Road");
        addEdge(8, 9, "Market Blvd");
        addEdge(9, 10, "Suburban Cross");
        addEdge(10, 11, "Apartment Blvd");
        addEdge(11, 2, "Customer A Lane");

        // Customer A (2) -> J12 -> J13 -> J14 -> Customer B (3)
        addEdge(2, 12, "Customer A Way");
        addEdge(12, 13, "Link Highway");
        addEdge(13, 14, "Residential Crescent");
        addEdge(14, 3, "Customer B Lane");

        // Add alternate roads / shortcuts to allow route variations
        addEdge(0, 8, "Expressway Bypass");
        addEdge(5, 9, "Sector Link");
        addEdge(6, 12, "Transit Flyover");
        addEdge(7, 10, "Metro Avenue");
        addEdge(8, 13, "Crossroad Street");
        addEdge(1, 14, "Direct Delivery Bypass");
    }

    private void addEdge(int from, int to, String roadName) {
        Node n1 = nodes.get(from);
        Node n2 = nodes.get(to);
        double distance = GeoUtils.haversine(n1.latitude, n1.longitude, n2.latitude, n2.longitude);
        Edge edge = new Edge(from, to, roadName, distance);

        // Apply dynamic interactive overrides if set
        if (roadTraffic.containsKey(roadName)) {
            edge.trafficLevel = roadTraffic.get(roadName);
        }
        if (roadBlockages.containsKey(roadName)) {
            edge.isBlocked = roadBlockages.get(roadName);
        }

        edges.add(edge);

        // Add reverse edge for bidirectionality
        Edge revEdge = new Edge(to, from, roadName, distance);
        revEdge.trafficLevel = edge.trafficLevel;
        revEdge.isBlocked = edge.isBlocked;
        edges.add(revEdge);
    }

    public List<Node> getNodes() {
        return nodes;
    }

    public List<Edge> getEdges() {
        return edges;
    }

    public List<String> getPathfindingLogs() {
        return pathfindingLogs;
    }

    /**
     * Solves pathfinding using A* algorithm or Dijkstra's algorithm.
     * Integrates live traffic congestion and dynamically routes around blockages.
     */
    public List<Node> findRoute(int startId, int endId, boolean useAStar) {
        pathfindingLogs.clear();
        String algoName = useAStar ? "A* (Admissible Haversine Heuristic)" : "Dijkstra's (g(n) only)";
        pathfindingLogs.add("Initializing VRP route solver using " + algoName);

        Map<Integer, Double> gScores = new HashMap<>();
        Map<Integer, Integer> cameFrom = new HashMap<>();
        
        // PriorityQueue orders by fScore (gScore + heuristic) for A*, and by gScore for Dijkstra
        PriorityQueue<Integer> openSet = new PriorityQueue<>(new Comparator<Integer>() {
            @Override
            public int compare(Integer n1, Integer n2) {
                double f1 = gScores.getOrDefault(n1, Double.MAX_VALUE);
                double f2 = gScores.getOrDefault(n2, Double.MAX_VALUE);
                if (useAStar) {
                    f1 += getHeuristic(n1, endId);
                    f2 += getHeuristic(n2, endId);
                }
                return Double.compare(f1, f2);
            }
        });

        for (Node node : nodes) {
            gScores.put(node.id, Double.MAX_VALUE);
        }
        gScores.put(startId, 0.0);
        openSet.add(startId);

        int nodesVisited = 0;

        while (!openSet.isEmpty()) {
            int currentId = openSet.poll();
            nodesVisited++;
            Node currentNode = nodes.get(currentId);

            if (currentId == endId) {
                pathfindingLogs.add("Pathfinding complete. Destination reached! Nodes Visited: " + nodesVisited);
                return reconstructPath(cameFrom, endId);
            }

            pathfindingLogs.add("Visiting Node " + currentId + " (" + currentNode.label + "), gScore: " 
                                + String.format("%.2f", gScores.get(currentId)) + " km");

            for (Edge edge : edges) {
                if (edge.fromNodeId == currentId) {
                    int neighborId = edge.toNodeId;
                    if (edge.isBlocked) {
                        pathfindingLogs.add("  - Skip " + edge.roadName + " -> Node " + neighborId + " (Road Blocked by Construction!)");
                        continue;
                    }
                    double tentativeG = gScores.get(currentId) + edge.getCost();

                    if (tentativeG < gScores.getOrDefault(neighborId, Double.MAX_VALUE)) {
                        cameFrom.put(neighborId, currentId);
                        gScores.put(neighborId, tentativeG);
                        
                        if (!openSet.contains(neighborId)) {
                            openSet.add(neighborId);
                        }
                        pathfindingLogs.add("  - Relaxed edge on " + edge.roadName + " to Node " + neighborId 
                                            + ", new gScore: " + String.format("%.2f", tentativeG) + " km"
                                            + (useAStar ? ", h(n): " + String.format("%.2f", getHeuristic(neighborId, endId)) + " km" : ""));
                    }
                }
            }
        }

        pathfindingLogs.add("Pathfinding failed: No path exists between Node " + startId + " and Node " + endId);
        return new ArrayList<>(); // Empty list if blocked or disconnected
    }

    private double getHeuristic(int nodeId, int targetId) {
        Node n = nodes.get(nodeId);
        Node target = nodes.get(targetId);
        return GeoUtils.haversine(n.latitude, n.longitude, target.latitude, target.longitude);
    }

    private List<Node> reconstructPath(Map<Integer, Integer> cameFrom, int currentId) {
        List<Node> path = new ArrayList<>();
        path.add(nodes.get(currentId));
        while (cameFrom.containsKey(currentId)) {
            currentId = cameFrom.get(currentId);
            path.add(0, nodes.get(currentId));
        }
        return path;
    }

    /**
     * Multi-Order Batching Logic
     * Dynamically clusters adjacent orders and sequences them to minimize total path delay.
     * Enforces LIFO constraints for hot, perishable dishes (delivering the last-picked item first).
     */
    public List<Integer> sequenceBatches(List<Integer> dropNodeIds) {
        if (dropNodeIds == null || dropNodeIds.isEmpty()) return new ArrayList<>();
        if (dropNodeIds.size() == 1) return new ArrayList<>(dropNodeIds);

        // Under LIFO constraint, deliver Customer B (last cooked/added) before Customer A
        if (perishableLifo) {
            List<Integer> lifoSequence = new ArrayList<>(dropNodeIds);
            Collections.reverse(lifoSequence);
            return lifoSequence;
        }

        // Default: Distance-based TSP optimization (Nearest Neighbor)
        List<Integer> optimized = new ArrayList<>();
        List<Integer> unvisited = new ArrayList<>(dropNodeIds);
        int currentId = 1; // Start sequencing from ZingBite Kitchen (Node 1)

        while (!unvisited.isEmpty()) {
            int nearestId = -1;
            double minDist = Double.MAX_VALUE;
            for (int id : unvisited) {
                double dist = GeoUtils.haversine(nodes.get(currentId).latitude, nodes.get(currentId).longitude, 
                                                 nodes.get(id).latitude, nodes.get(id).longitude);
                if (dist < minDist) {
                    minDist = dist;
                    nearestId = id;
                }
            }
            if (nearestId != -1) {
                optimized.add(nearestId);
                unvisited.remove((Integer) nearestId);
                currentId = nearestId;
            }
        }
        return optimized;
    }

    /**
     * Predictive ETA Calculator
     * Mimics a Random Forest ML regressor to estimate order delivery times.
     * Factors in:
     * - Physical travel path distance costs
     * - Live traffic road conditions
     * - Weather delay overheads (+5 min rain surge)
     * - Restaurant kitchen historical/live preparation delay
     * - Customer building accessibility (+4 min high-rise elevator time)
     */
    public double calculatePredictiveETA(double routeDistance, double trafficFactor, 
                                         int prepTimeRemaining, boolean isHighRiseApartment) {
        double averageRiderSpeedKmh = 25.0; // Base speed
        
        // ML-style weights & regression trees
        double baseTravelTimeMins = (routeDistance / averageRiderSpeedKmh) * 60.0;
        
        // Traffic Multiplier impact
        double trafficDelayMins = baseTravelTimeMins * (trafficFactor - 1.0);
        
        // Weather conditions impact
        double weatherDelayMins = 0.0;
        if ("Rainy".equalsIgnoreCase(weather)) {
            weatherDelayMins = 5.0; // Rain slows down travel
        } else if ("Stormy".equalsIgnoreCase(weather)) {
            weatherDelayMins = 12.0; // Heavy storm traffic backlog
        }

        // Restaurant kitchen preparation time delay (Rider waiting JIT)
        double firstMileWaitMins = Math.max(0.0, prepTimeRemaining - baseTravelTimeMins * 0.4);

        // Building / Apartment navigation offset (high-rise elevator delay)
        double navigationOffsetMins = isHighRiseApartment ? 4.5 : 1.0;

        // Sum up factors to arrive at the final ETA
        double predictedETA = baseTravelTimeMins + trafficDelayMins + weatherDelayMins + firstMileWaitMins + navigationOffsetMins;
        
        // Guarantee at least 2 minutes minimum buffer
        return Math.max(2.0, predictedETA);
    }

    private static List<Node> fetchOSRMRoute(double startLat, double startLon, double endLat, double endLon, int startNodeId, String labelPrefix) {
        List<Node> route = new ArrayList<>();
        try {
            String urlStr = "http://router.project-osrm.org/route/v1/driving/" 
                            + startLon + "," + startLat + ";" + endLon + "," + endLat 
                            + "?overview=full&geometries=geojson";
            
            java.net.URL url = new java.net.URL(urlStr);
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);
            conn.setRequestProperty("User-Agent", "ZingBite/1.0");

            if (conn.getResponseCode() == 200) {
                java.io.InputStreamReader reader = new java.io.InputStreamReader(conn.getInputStream());
                com.google.gson.JsonObject responseObj = com.google.gson.JsonParser.parseReader(reader).getAsJsonObject();
                if ("Ok".equals(responseObj.get("code").getAsString())) {
                    com.google.gson.JsonArray routes = responseObj.getAsJsonArray("routes");
                    if (routes.size() > 0) {
                        com.google.gson.JsonObject routeObj = routes.get(0).getAsJsonObject();
                        com.google.gson.JsonObject geometry = routeObj.getAsJsonObject("geometry");
                        com.google.gson.JsonArray coords = geometry.getAsJsonArray("coordinates");
                        for (int i = 0; i < coords.size(); i++) {
                            com.google.gson.JsonArray coord = coords.get(i).getAsJsonArray();
                            double lon = coord.get(0).getAsDouble();
                            double lat = coord.get(1).getAsDouble();
                            route.add(new Node(startNodeId + i, labelPrefix + " Road Node " + i, lat, lon));
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("OSRM query failed, falling back to mock graph: " + e.getMessage());
        }
        return route;
    }

    /**
     * Dynamically calculates first-mile and last-mile VRP routing path coordinate nodes
     * based on active coordinates of the rider, restaurant, and customer.
     */
    public static Map<String, List<Node>> getVRPPathsForOrder(double riderLat, double riderLon, 
                                                              double restLat, double restLon, 
                                                              double custLat, double custLon) {
        // Try fetching actual road path from OSRM first
        List<Node> pathFM = fetchOSRMRoute(riderLat, riderLon, restLat, restLon, 0, "First Mile");
        List<Node> pathLM = fetchOSRMRoute(restLat, restLon, custLat, custLon, 100, "Last Mile");

        // Fallback to mock VRP graph if OSRM is offline or fails
        if (pathFM.isEmpty() || pathLM.isEmpty()) {
            VRPRouteOptimizer optimizer = new VRPRouteOptimizer(
                riderLat, riderLon,
                restLat, restLon,
                custLat, custLon,
                custLat, custLon // Single customer order tracking
            );
            if (pathFM.isEmpty()) {
                pathFM = optimizer.findRoute(0, 1, useAStar); // Rider -> Restaurant
            }
            if (pathLM.isEmpty()) {
                pathLM = optimizer.findRoute(1, 2, useAStar); // Restaurant -> Customer
            }
        }

        Map<String, List<Node>> pathMap = new HashMap<>();
        pathMap.put("pathFM", pathFM);
        pathMap.put("pathLM1", pathLM);
        return pathMap;
    }
}
