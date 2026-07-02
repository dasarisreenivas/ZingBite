package com.app.zingbiteutils;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class VRPRouteOptimizer {
    private static final String DEFAULT_ML_SERVICE_URL = "http://localhost:5010";
    private static final Duration ML_ROUTE_CONNECT_TIMEOUT = Duration.ofSeconds(2);
    private static final Duration ML_ROUTE_REQUEST_TIMEOUT = Duration.ofSeconds(4);
    private static final long ML_ROUTE_CACHE_TTL_MS = 60_000;
    private static final HttpClient ROUTE_HTTP_CLIENT = HttpClient.newBuilder()
            .connectTimeout(ML_ROUTE_CONNECT_TIMEOUT)
            .build();
    private static final Map<String, CachedRoutePaths> mlRouteCache = new ConcurrentHashMap<>();

    private static class CachedRoutePaths {
        final Map<String, List<Node>> paths;
        final long timestamp;

        CachedRoutePaths(Map<String, List<Node>> paths) {
            this.paths = copyRoutePaths(paths);
            this.timestamp = System.currentTimeMillis();
        }

        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > ML_ROUTE_CACHE_TTL_MS;
        }
    }

    public static class Node {
        public int id;
        public String label;
        public double latitude;
        public double longitude;
        public double earliestTime = 0.0; // in minutes
        public double latestTime = Double.MAX_VALUE; // in minutes

        public Node(int id, String label, double latitude, double longitude) {
            this.id = id;
            this.label = label;
            this.latitude = latitude;
            this.longitude = longitude;
        }

        public Node(int id, String label, double latitude, double longitude, double earliestTime, double latestTime) {
            this.id = id;
            this.label = label;
            this.latitude = latitude;
            this.longitude = longitude;
            this.earliestTime = earliestTime;
            this.latestTime = latestTime;
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
    public static volatile String weather = "Sunny"; // Sunny, Rainy, Stormy
    public static volatile boolean perishableLifo = false; // Toggle for LIFO delivery sequence
    public static volatile boolean useAStar = true; // Toggle for using A* vs Dijkstra
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
        // Node 2: Customer A Dropoff (Time window [0, 30] minutes)
        nodes.add(new Node(2, "Customer A Delivery Point", custALat, custALon));
        nodes.get(2).earliestTime = 0.0;
        nodes.get(2).latestTime = 30.0;
        // Node 3: Customer B Dropoff (Time window [10, 45] minutes)
        nodes.add(new Node(3, "Customer B Delivery Point", custBLat, custBLon));
        nodes.get(3).earliestTime = 10.0;
        nodes.get(3).latestTime = 45.0;

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
    /**
     * Multi-Order Batching Logic
     * Dynamically clusters adjacent orders and sequences them to minimize total path delay.
     * Enforces LIFO constraints for hot, perishable dishes (delivering the last-picked item first).
     * Incorporates 3-opt heuristic optimization with time windows and travel cost.
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

        // Default: 3-opt local search heuristic sequence optimization
        List<Integer> currentSequence = nearestNeighbor(dropNodeIds);
        List<Integer> optimized = threeOpt(currentSequence);
        return optimized;
    }

    private List<Integer> nearestNeighbor(List<Integer> dropNodeIds) {
        List<Integer> optimized = new ArrayList<>();
        List<Integer> unvisited = new ArrayList<>(dropNodeIds);
        int currentId = 1; // Start from ZingBite Kitchen (Node 1)

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

    private List<Integer> threeOpt(List<Integer> sequence) {
        List<Integer> route = new ArrayList<>();
        route.add(1); // Kitchen
        route.addAll(sequence);

        int size = route.size();
        if (size < 4) {
            // Evaluates all permutations directly for small sequence size to guarantee global optimum
            return permuteOptimize(sequence);
        }

        boolean improved = true;
        double bestCost = evaluateRouteCost(route);

        while (improved) {
            improved = false;
            for (int i = 1; i < size - 2; i++) {
                for (int j = i + 1; j < size - 1; j++) {
                    for (int k = j + 1; k < size; k++) {
                        List<List<Integer>> candidates = generate3OptCandidates(route, i, j, k);
                        for (List<Integer> candidate : candidates) {
                            double cost = evaluateRouteCost(candidate);
                            if (cost < bestCost - 1e-4) {
                                bestCost = cost;
                                route = candidate;
                                improved = true;
                                break;
                            }
                        }
                        if (improved) break;
                    }
                    if (improved) break;
                }
                if (improved) break;
            }
        }

        List<Integer> result = new ArrayList<>(route);
        result.remove(0); // Remove start Kitchen node
        return result;
    }

    private List<List<Integer>> generate3OptCandidates(List<Integer> route, int i, int j, int k) {
        List<List<Integer>> candidates = new ArrayList<>();
        List<Integer> A = route.subList(0, i);
        List<Integer> B = route.subList(i, j);
        List<Integer> C = route.subList(j, k);
        List<Integer> D = route.subList(k, route.size());

        List<Integer> B_rev = reverseList(B);
        List<Integer> C_rev = reverseList(C);

        candidates.add(combineSegments(A, B, C_rev, D));
        candidates.add(combineSegments(A, B_rev, C, D));
        candidates.add(combineSegments(A, B_rev, C_rev, D));
        candidates.add(combineSegments(A, C, B, D));
        candidates.add(combineSegments(A, C, B_rev, D));
        candidates.add(combineSegments(A, C_rev, B, D));
        candidates.add(combineSegments(A, C_rev, B_rev, D));

        return candidates;
    }

    private List<Integer> reverseList(List<Integer> list) {
        List<Integer> rev = new ArrayList<>(list);
        Collections.reverse(rev);
        return rev;
    }

    private List<Integer> combineSegments(List<Integer> s1, List<Integer> s2, List<Integer> s3, List<Integer> s4) {
        List<Integer> result = new ArrayList<>();
        result.addAll(s1);
        result.addAll(s2);
        result.addAll(s3);
        result.addAll(s4);
        return result;
    }

    private List<Integer> permuteOptimize(List<Integer> sequence) {
        List<List<Integer>> permutations = new ArrayList<>();
        permute(sequence, 0, permutations);

        List<Integer> bestSeq = sequence;
        double bestCost = Double.MAX_VALUE;

        for (List<Integer> perm : permutations) {
            List<Integer> route = new ArrayList<>();
            route.add(1); // Kitchen
            route.addAll(perm);
            double cost = evaluateRouteCost(route);
            if (cost < bestCost) {
                bestCost = cost;
                bestSeq = perm;
            }
        }
        return bestSeq;
    }

    private void permute(List<Integer> arr, int k, List<List<Integer>> out) {
        for(int i = k; i < arr.size(); i++){
            Collections.swap(arr, i, k);
            permute(arr, k+1, out);
            Collections.swap(arr, k, i);
        }
        if (k == arr.size() - 1){
            out.add(new ArrayList<>(arr));
        }
    }

    public double evaluateRouteCost(List<Integer> route) {
        if (route == null || route.size() < 2) return 0.0;
        
        double travelCost = 0.0;
        double timeWindowPenalty = 0.0;
        double currentTime = 0.0; // Starts at 0.0 minutes at Kitchen
        double speedKmh = 25.0; // Base speed

        for (int idx = 0; idx < route.size() - 1; idx++) {
            int from = route.get(idx);
            int to = route.get(idx + 1);

            List<Node> subRoute = findRoute(from, to, useAStar);
            double legCost = getRouteCost(subRoute);
            travelCost += legCost;

            double travelTimeMins = (legCost / speedKmh) * 60.0;
            currentTime += travelTimeMins;

            Node destNode = nodes.get(to);
            if (currentTime < destNode.earliestTime) {
                currentTime = destNode.earliestTime;
            } else if (currentTime > destNode.latestTime) {
                timeWindowPenalty += (currentTime - destNode.latestTime) * 50.0;
            }
        }
        return travelCost + timeWindowPenalty;
    }

    public double getRouteCost(List<Node> route) {
        if (route == null || route.size() < 2) return 0.0;
        double cost = 0.0;
        for (int i = 0; i < route.size() - 1; i++) {
            Node n1 = route.get(i);
            Node n2 = route.get(i + 1);
            Edge match = null;
            for (Edge edge : edges) {
                if (edge.fromNodeId == n1.id && edge.toNodeId == n2.id) {
                    match = edge;
                    break;
                }
            }
            if (match != null) {
                cost += match.getCost();
            } else {
                cost += GeoUtils.haversine(n1.latitude, n1.longitude, n2.latitude, n2.longitude);
            }
        }
        return cost;
    }

    public double[][] computeCostMatrix(List<Integer> nodeIds) {
        double[][] matrix = new double[nodeIds.size()][nodeIds.size()];
        for (int i = 0; i < nodeIds.size(); i++) {
            for (int j = 0; j < nodeIds.size(); j++) {
                if (i == j) {
                    matrix[i][j] = 0.0;
                } else {
                    List<Node> route = findRoute(nodeIds.get(i), nodeIds.get(j), useAStar);
                    matrix[i][j] = getRouteCost(route);
                }
            }
        }
        return matrix;
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

    private static Map<String, List<Node>> fetchMlRoutePaths(double riderLat, double riderLon,
                                                             double restLat, double restLon,
                                                             double custLat, double custLon) {
        if (!isValidRouteCoordinate(riderLat, riderLon)
                || !isValidRouteCoordinate(restLat, restLon)
                || !isValidRouteCoordinate(custLat, custLon)) {
            return new HashMap<>();
        }

        String cacheKey = buildRouteCacheKey(riderLat, riderLon, restLat, restLon, custLat, custLon);
        CachedRoutePaths cached = mlRouteCache.get(cacheKey);
        if (cached != null && !cached.isExpired()) {
            return copyRoutePaths(cached.paths);
        }

        JsonObject payload = new JsonObject();
        payload.addProperty("riderLat", riderLat);
        payload.addProperty("riderLon", riderLon);
        payload.addProperty("restLat", restLat);
        payload.addProperty("restLon", restLon);
        payload.addProperty("custLat", custLat);
        payload.addProperty("custLon", custLon);
        payload.addProperty("custALat", custLat);
        payload.addProperty("custALon", custLon);
        payload.addProperty("custBLat", custLat);
        payload.addProperty("custBLon", custLon);
        payload.addProperty("weather", weather);
        payload.addProperty("perishableLifo", perishableLifo);
        payload.addProperty("useAStar", useAStar);

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(getMlRouteUri())
                    .timeout(ML_ROUTE_REQUEST_TIMEOUT)
                    .header("Accept", "application/json")
                    .header("Content-Type", "application/json")
                    .header("User-Agent", "ZingBite/1.0")
                    .POST(HttpRequest.BodyPublishers.ofString(payload.toString()))
                    .build();

            HttpResponse<String> response = ROUTE_HTTP_CLIENT.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                return new HashMap<>();
            }

            Map<String, List<Node>> paths = parseMlRouteResponse(response.body());
            if (hasUsableRoute(paths.get("pathFM")) || hasUsableRoute(paths.get("pathLM1"))) {
                mlRouteCache.put(cacheKey, new CachedRoutePaths(paths));
            }
            return paths;
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            return new HashMap<>();
        } catch (Exception ex) {
            return new HashMap<>();
        }
    }

    static Map<String, List<Node>> parseMlRouteResponse(String responseBody) {
        Map<String, List<Node>> paths = new HashMap<>();
        try {
            JsonElement parsed = JsonParser.parseString(responseBody);
            if (!parsed.isJsonObject()) {
                return paths;
            }

            JsonObject root = parsed.getAsJsonObject();
            if (root.has("pathFM") && root.get("pathFM").isJsonArray()) {
                paths.put("pathFM", parseRouteNodeArray(root.getAsJsonArray("pathFM"), 0, "First Mile"));
            }
            if (root.has("pathLM1") && root.get("pathLM1").isJsonArray()) {
                paths.put("pathLM1", parseRouteNodeArray(root.getAsJsonArray("pathLM1"), 100, "Last Mile"));
            }
        } catch (Exception ex) {
            return new HashMap<>();
        }
        return paths;
    }

    private static List<Node> parseRouteNodeArray(JsonArray coordinates, int startNodeId, String labelPrefix) {
        List<Node> routeNodes = new ArrayList<>();
        String safeLabelPrefix = (labelPrefix == null || labelPrefix.isBlank()) ? "Road Route" : labelPrefix;
        for (JsonElement element : coordinates) {
            double lat;
            double lon;
            int id = startNodeId + routeNodes.size();
            String label = safeLabelPrefix + " Point " + (routeNodes.size() + 1);

            if (element.isJsonArray()) {
                JsonArray coordinate = element.getAsJsonArray();
                if (coordinate.size() < 2) continue;
                lat = coordinate.get(0).getAsDouble();
                lon = coordinate.get(1).getAsDouble();
            } else if (element.isJsonObject()) {
                JsonObject node = element.getAsJsonObject();
                Double parsedLat = getFirstJsonNumber(node, "latitude", "lat");
                Double parsedLon = getFirstJsonNumber(node, "longitude", "lon", "lng");
                if (parsedLat == null || parsedLon == null) continue;
                lat = parsedLat;
                lon = parsedLon;
                if (node.has("id") && node.get("id").isJsonPrimitive()) {
                    id = node.get("id").getAsInt();
                }
                if (node.has("label") && node.get("label").isJsonPrimitive()) {
                    label = node.get("label").getAsString();
                }
            } else {
                continue;
            }

            if (!isValidRouteCoordinate(lat, lon)) continue;
            routeNodes.add(new Node(
                    id,
                    label,
                    lat,
                    lon
            ));
        }
        return routeNodes;
    }

    private static Double getFirstJsonNumber(JsonObject object, String... keys) {
        for (String key : keys) {
            if (!object.has(key) || object.get(key).isJsonNull()) continue;
            try {
                double value = object.get(key).getAsDouble();
                if (Double.isFinite(value)) return value;
            } catch (Exception ignored) {
            }
        }
        return null;
    }

    private static boolean isValidRouteCoordinate(double latitude, double longitude) {
        return Double.isFinite(latitude) && latitude >= -90.0 && latitude <= 90.0
                && Double.isFinite(longitude) && longitude >= -180.0 && longitude <= 180.0;
    }

    private static String buildRouteCacheKey(double riderLat, double riderLon, double restLat, double restLon, double custLat, double custLon) {
        return String.format(
                Locale.US,
                "%s|%.4f,%.4f|%.4f,%.4f|%.4f,%.4f",
                getMlRouteUrl(),
                riderLat,
                riderLon,
                restLat,
                restLon,
                custLat,
                custLon
        );
    }

    private static URI getMlRouteUri() {
        return URI.create(getMlRouteUrl());
    }

    private static String getMlRouteUrl() {
        String explicitRouteUrl = System.getProperty("zingbite.ml.routeUrl");
        if (explicitRouteUrl == null || explicitRouteUrl.isBlank()) {
            explicitRouteUrl = System.getenv("ZINGBITE_ML_ROUTE_URL");
        }
        if (explicitRouteUrl != null && !explicitRouteUrl.isBlank()) {
            return explicitRouteUrl.trim();
        }

        String baseUrl = System.getProperty("zingbite.ml.serviceUrl");
        if (baseUrl == null || baseUrl.isBlank()) {
            baseUrl = System.getenv("ZINGBITE_ML_SERVICE_URL");
        }
        if (baseUrl == null || baseUrl.isBlank()) {
            baseUrl = DEFAULT_ML_SERVICE_URL;
        }
        return baseUrl.replaceAll("/+$", "") + "/predict/route";
    }

    private static boolean hasUsableRoute(List<Node> route) {
        return route != null && route.size() > 1;
    }

    private static Map<String, List<Node>> copyRoutePaths(Map<String, List<Node>> paths) {
        Map<String, List<Node>> copy = new HashMap<>();
        if (paths == null) return copy;
        for (Map.Entry<String, List<Node>> entry : paths.entrySet()) {
            copy.put(entry.getKey(), copyRoute(entry.getValue()));
        }
        return copy;
    }

    private static List<Node> copyRoute(List<Node> route) {
        List<Node> copy = new ArrayList<>();
        if (route == null) return copy;
        for (Node node : route) {
            if (node != null) {
                copy.add(new Node(node.id, node.label, node.latitude, node.longitude, node.earliestTime, node.latestTime));
            }
        }
        return copy;
    }

    /**
     * Dynamically calculates first-mile and last-mile routing path coordinate nodes.
     * It asks the ML routing service first and falls back to the built-in VRP graph
     * only for route legs that the ML service cannot provide.
     */
    public static Map<String, List<Node>> getVRPPathsForOrder(double riderLat, double riderLon, 
                                                              double restLat, double restLon, 
                                                              double custLat, double custLon) {
        Map<String, List<Node>> mlPaths = fetchMlRoutePaths(
            riderLat, riderLon,
            restLat, restLon,
            custLat, custLon
        );
        List<Node> pathFM = copyRoute(mlPaths.get("pathFM"));
        List<Node> pathLM = copyRoute(mlPaths.get("pathLM1"));

        if (!hasUsableRoute(pathFM) || !hasUsableRoute(pathLM)) {
            VRPRouteOptimizer optimizer = new VRPRouteOptimizer(
                riderLat, riderLon,
                restLat, restLon,
                custLat, custLon,
                custLat, custLon // Single customer order tracking
            );
            if (!hasUsableRoute(pathFM)) {
                pathFM = optimizer.findRoute(0, 1, useAStar); // Rider -> Restaurant
            }
            if (!hasUsableRoute(pathLM)) {
                pathLM = optimizer.findRoute(1, 2, useAStar); // Restaurant -> Customer
            }
        }

        Map<String, List<Node>> pathMap = new HashMap<>();
        pathMap.put("pathFM", pathFM);
        pathMap.put("pathLM1", pathLM);
        return pathMap;
    }
}
