package com.app.zingbiteutils;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.concurrent.ConcurrentHashMap;

public class RouteOptimizer {

    // --- Original Code Compatibility ---
    public static class Location {
        public int id;
        public double latitude;
        public double longitude;
        public String label;
        public Location(int id, double latitude, double longitude, String label) {
            this.id = id;
            this.latitude = latitude;
            this.longitude = longitude;
            this.label = label;
        }
    }

    /**
     * Finds the optimal visiting order of locations starting from startLat, startLon.
     * Returns an array of indices corresponding to the optimized route.
     */
    public static int[] optimizeRoute(double startLat, double startLon, List<Location> locations) {
        if (locations == null || locations.isEmpty()) {
            return new int[0];
        }
        int n = locations.size();
        int[] sequence = new int[n];
        boolean[] visited = new boolean[n];
        double currentLat = startLat;
        double currentLon = startLon;
        for (int i = 0; i < n; i++) {
            int nearestIdx = -1;
            double minDistance = Double.MAX_VALUE;
            for (int j = 0; j < n; j++) {
                if (!visited[j]) {
                    Location loc = locations.get(j);
                    double dist = GeoUtils.haversine(currentLat, currentLon, loc.latitude, loc.longitude);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearestIdx = j;
                    }
                }
            }
            if (nearestIdx != -1) {
                visited[nearestIdx] = true;
                sequence[i] = nearestIdx;
                Location nextLoc = locations.get(nearestIdx);
                currentLat = nextLoc.latitude;
                currentLon = nextLoc.longitude;
            }
        }
        return sequence;
    }

    // --- Graph structures ---
    public static class GraphNode {
        public int id;
        public String name;
        public double latitude;
        public double longitude;
        public GraphNode(int id, String name, double latitude, double longitude) {
            this.id = id;
            this.name = name;
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }

    public static class GraphEdge {
        public int id;
        public String roadName;
        public int nodeAId;
        public int nodeBId;
        public double baseDistance;
        public String trafficLevel = "Light"; // Light, Moderate, Heavy
        public boolean isBlockedByConstruction = false;
        public GraphEdge(int id, String roadName, int nodeAId, int nodeBId, double baseDistance) {
            this.id = id;
            this.roadName = roadName;
            this.nodeAId = nodeAId;
            this.nodeBId = nodeBId;
            this.baseDistance = baseDistance;
        }
        public double getCost() {
            double cost = baseDistance;
            if ("Moderate".equalsIgnoreCase(trafficLevel)) {
                cost *= 1.5;
            } else if ("Heavy".equalsIgnoreCase(trafficLevel)) {
                cost *= 2.0;
            }
            if (isBlockedByConstruction) {
                cost += 1000; // huge penalty when blocked
            }
            return cost;
        }
    }

    // Simple in‑memory graph (could be loaded from DB/file)
    private static final List<GraphNode> NODES = new ArrayList<>();
    private static final Map<Integer, GraphEdge> EDGES = new ConcurrentHashMap<>();

    static {
        // Example static graph initialization (placeholder). Real data should be loaded elsewhere.
        NODES.add(new GraphNode(0, "Kitchen", 12.9784, 77.6385)); // reference node
        // Additional nodes would be added here.
    }

    /**
     * Finds the optimized path between two arbitrary coordinates using Dijkstra's algorithm.
     */
    public static RouteResult findShortestPath(double startLat, double startLon, double endLat, double endLon) {
        double[] offset = getShiftOffset(startLat, startLon);
        double latOffset = offset[0];
        double lonOffset = offset[1];
        List<GraphNode> nodesList = getNodes(latOffset, lonOffset);
        GraphNode startNode = findClosestNode(startLat, startLon, nodesList);
        GraphNode endNode = findClosestNode(endLat, endLon, nodesList);
        return findShortestPath(startNode, endNode, nodesList);
    }

    // Overload used by the servlet (String identifiers).
    public static List<String> findShortestPath(String startNodeName, String endNodeName) {
        // Resolve nodes by name (fallback to first if not found)
        GraphNode start = NODES.stream().filter(n -> n.name.equalsIgnoreCase(startNodeName)).findFirst().orElse(NODES.get(0));
        GraphNode end = NODES.stream().filter(n -> n.name.equalsIgnoreCase(endNodeName)).findFirst().orElse(NODES.get(NODES.size() - 1));
        RouteResult result = findShortestPath(start, end, NODES);
        List<String> names = new ArrayList<>();
        for (int nodeId : result.pathNodeIds) {
            GraphNode node = NODES.get(nodeId);
            names.add(node.name);
        }
        return names;
    }

    private static RouteResult findShortestPath(GraphNode startNode, GraphNode endNode, List<GraphNode> nodesList) {
        Map<Integer, Double> dists = new HashMap<>();
        Map<Integer, GraphEdge> prevEdge = new HashMap<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingDouble(a -> dists.getOrDefault(a[0], Double.MAX_VALUE)));
        for (GraphNode node : nodesList) {
            dists.put(node.id, Double.MAX_VALUE);
        }
        dists.put(startNode.id, 0.0);
        pq.add(new int[]{startNode.id});
        while (!pq.isEmpty()) {
            int currentId = pq.poll()[0];
            GraphNode current = nodesList.get(currentId);
            if (current.id == endNode.id) break;
            for (GraphEdge edge : EDGES.values()) {
                GraphNode neighbor = edge.nodeAId == current.id ? getNodeById(edge.nodeBId, nodesList) : (edge.nodeBId == current.id ? getNodeById(edge.nodeAId, nodesList) : null);
                if (neighbor == null) continue;
                double newDist = dists.get(current.id) + edge.getCost();
                if (newDist < dists.get(neighbor.id)) {
                    dists.put(neighbor.id, newDist);
                    prevEdge.put(neighbor.id, edge);
                    pq.add(new int[]{neighbor.id});
                }
            }
        }
        // Reconstruct path
        List<Integer> pathIds = new ArrayList<>();
        GraphNode cursor = endNode;
        while (cursor != null && cursor.id != startNode.id) {
            pathIds.add(0, cursor.id);
            GraphEdge edge = prevEdge.get(cursor.id);
            if (edge == null) break;
            int prevId = edge.nodeAId == cursor.id ? edge.nodeBId : edge.nodeAId;
            cursor = getNodeById(prevId, nodesList);
        }
        if (cursor != null) pathIds.add(0, startNode.id);
        // Build result object
        RouteResult result = new RouteResult();
        result.pathNodeIds = pathIds;
        // Populate directions and totals
        double totalD = 0.0;
        double totalTime = 0.0;
        result.directions = new ArrayList<>();
        GraphNode prev = startNode;
        for (int nodeId : pathIds) {
            GraphNode node = getNodeById(nodeId, nodesList);
            if (prev != node) {
                // find edge between prev and node
                GraphEdge edge = null;
                for (GraphEdge e : EDGES.values()) {
                    if ((e.nodeAId == prev.id && e.nodeBId == node.id) || (e.nodeBId == prev.id && e.nodeAId == node.id)) {
                        edge = e; break;
                    }
                }
                if (edge != null) {
                    totalD += edge.baseDistance;
                    totalTime += (edge.getCost() / 25.0) * 60.0;
                    String trafficDetail = "";
                    if ("Moderate".equalsIgnoreCase(edge.trafficLevel)) {
                        trafficDetail = " (Moderate Traffic, slow-moving)";
                    } else if ("Heavy".equalsIgnoreCase(edge.trafficLevel)) {
                        trafficDetail = " (Heavy Traffic, high delays)";
                    }
                    result.directions.add("Proceed on " + edge.roadName + " for " + String.format("%.2f", edge.baseDistance) + " km" + trafficDetail);
                }
            }
            prev = node;
        }
        // final leg to destination
        double endLegDist = GeoUtils.haversine(endNode.latitude, endNode.longitude, endNode.latitude, endNode.longitude);
        result.directions.add("Turn off near " + endNode.name + " and arrive at destination (" + String.format("%.2f", endLegDist) + " km)");
        totalD += endLegDist;
        totalTime += (endLegDist / 25.0) * 60.0;
        result.totalDistance = totalD;
        result.totalDuration = totalTime;
        result.fallbackUsed = false;
        return result;
    }

    private static GraphNode getNodeById(int id, List<GraphNode> list) {
        for (GraphNode n : list) {
            if (n.id == id) return n;
        }
        return null;
    }

    public static double[] getShiftOffset(double refLat, double refLon) {
        double baseLat = 12.9784;
        double baseLon = 77.6385;
        double dist = GeoUtils.haversine(baseLat, baseLon, refLat, refLon);
        if (dist > 15.0) {
            return new double[]{refLat - baseLat, refLon - baseLon};
        }
        return new double[]{0.0, 0.0};
    }

    public static List<GraphNode> getNodes() {
        return NODES;
    }

    public static List<GraphNode> getNodes(double latOffset, double lonOffset) {
        if (latOffset == 0.0 && lonOffset == 0.0) return NODES;
        List<GraphNode> shifted = new ArrayList<>();
        for (GraphNode node : NODES) {
            shifted.add(new GraphNode(node.id, node.name, node.latitude + latOffset, node.longitude + lonOffset));
        }
        return shifted;
    }

    public static Collection<GraphEdge> getEdges() {
        return EDGES.values();
    }

    public static void updateTraffic(String roadName, String level) {
        for (GraphEdge edge : EDGES.values()) {
            if (edge.roadName.equalsIgnoreCase(roadName) || edge.roadName.toLowerCase().startsWith(roadName.toLowerCase())) {
                edge.trafficLevel = level;
            }
        }
    }

    public static void updateConstruction(String roadName, boolean blocked) {
        for (GraphEdge edge : EDGES.values()) {
            if (edge.roadName.equalsIgnoreCase(roadName) || edge.roadName.toLowerCase().startsWith(roadName.toLowerCase())) {
                edge.isBlockedByConstruction = blocked;
            }
        }
    }

    public static void resetGraph() {
        for (GraphEdge edge : EDGES.values()) {
            edge.trafficLevel = "Light";
            edge.isBlockedByConstruction = false;
        }
    }

    // Result holder
    public static class RouteResult {
        public List<String> directions;
        public double totalDistance;
        public double totalDuration;
        public boolean fallbackUsed;
        public List<Integer> pathNodeIds;
    }

    private static GraphNode findClosestNode(double lat, double lon, List<GraphNode> nodesList) {
        GraphNode closest = null;
        double minDist = Double.MAX_VALUE;
        for (GraphNode node : nodesList) {
            double d = GeoUtils.haversine(lat, lon, node.latitude, node.longitude);
            if (d < minDist) {
                minDist = d;
                closest = node;
            }
        }
        return closest;
    }

    private static GraphNode findClosestNode(double lat, double lon) {
        return findClosestNode(lat, lon, NODES);
    }
}
