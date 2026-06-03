package com.app.zingbiteutils;

import java.util.List;

public class RouteOptimizer {

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
}
