package com.app.zingbiteutils;

public class GeoUtils {

    // Earth radius in kilometers
    private static final double EARTH_RADIUS = 6371.0;

    /**
     * Calculates the distance between two coordinates in kilometers using the Haversine formula.
     */
    public static double haversine(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double rLat1 = Math.toRadians(lat1);
        double rLat2 = Math.toRadians(lat2);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
        
        double c = 2 * Math.asin(Math.sqrt(a));
        return EARTH_RADIUS * c;
    }

    /**
     * Resolves mock latitude for a restaurant.
     */
    public static double getRestaurantLatitude(int restaurantId) {
        // Base coordinate near Indiranagar, Bangalore: 12.9716
        return 12.9716 + ((restaurantId * 17) % 100) * 0.0003;
    }

    /**
     * Resolves mock longitude for a restaurant.
     */
    public static double getRestaurantLongitude(int restaurantId) {
        // Base coordinate near Indiranagar, Bangalore: 77.5946
        return 77.5946 + ((restaurantId * 23) % 100) * 0.0003;
    }

    /**
     * Resolves mock latitude for a user (customer delivery location).
     */
    public static double getUserLatitude(int userId) {
        return 12.9716 + ((userId * 19) % 100) * 0.0004;
    }

    /**
     * Resolves mock longitude for a user (customer delivery location).
     */
    public static double getUserLongitude(int userId) {
        return 77.5946 + ((userId * 29) % 100) * 0.0004;
    }

    /**
     * Resolves mock latitude for a rider.
     */
    public static double getRiderLatitude(int riderId) {
        return 12.9716 + ((riderId * 13) % 100) * 0.0005;
    }

    /**
     * Resolves mock longitude for a rider.
     */
    public static double getRiderLongitude(int riderId) {
        return 77.5946 + ((riderId * 31) % 100) * 0.0005;
    }
}
