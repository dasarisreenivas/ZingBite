package com.app.zingbiteutils;

import org.hibernate.Session;
import org.hibernate.Transaction;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Restaurant;

public class GeoUtils {

    // Earth radius in kilometers
    private static final double EARTH_RADIUS = 6371.0;

    // Hub center coordinates (Bangalore)
    private static final double HUB_LAT = 12.9716;
    private static final double HUB_LON = 77.5946;

    // Service area radius in kilometers
    private static final double SERVICE_RADIUS_KM = 50.0;

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
     * Checks whether given coordinates are within the service area.
     * Can be used by other components to show warnings to the user
     * instead of silently corrupting their data.
     */
    public static boolean isWithinServiceArea(double lat, double lon) {
        return haversine(lat, lon, HUB_LAT, HUB_LON) <= SERVICE_RADIUS_KM;
    }

    /**
     * Returns the distance from hub center in km.
     */
    public static double distanceFromHub(double lat, double lon) {
        return haversine(lat, lon, HUB_LAT, HUB_LON);
    }

    /**
     * Resolves latitude for a restaurant. Uses real DB value if available,
     * generates a deterministic fallback near the hub if NULL.
     */
    public static double getRestaurantLatitude(int restaurantId) {
        try (Session session = DBUtils.openSession()) {
            Restaurant r = session.get(Restaurant.class, restaurantId);
            if (r != null) {
                if (r.getLatitude() != null) {
                    return r.getLatitude();
                } else {
                    double lat = HUB_LAT + ((restaurantId * 17) % 100) * 0.0003;
                    Transaction tx = session.beginTransaction();
                    r.setLatitude(lat);
                    session.merge(r);
                    tx.commit();
                    System.out.println("[GeoUtils] Restaurant " + restaurantId + " had no latitude — generated fallback: " + lat);
                    return lat;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Fallback
        return HUB_LAT + ((restaurantId * 17) % 100) * 0.0003;
    }

    /**
     * Resolves longitude for a restaurant. Uses real DB value if available,
     * generates a deterministic fallback near the hub if NULL.
     */
    public static double getRestaurantLongitude(int restaurantId) {
        try (Session session = DBUtils.openSession()) {
            Restaurant r = session.get(Restaurant.class, restaurantId);
            if (r != null) {
                if (r.getLongitude() != null) {
                    return r.getLongitude();
                } else {
                    double lon = HUB_LON + ((restaurantId * 23) % 100) * 0.0003;
                    Transaction tx = session.beginTransaction();
                    r.setLongitude(lon);
                    session.merge(r);
                    tx.commit();
                    System.out.println("[GeoUtils] Restaurant " + restaurantId + " had no longitude — generated fallback: " + lon);
                    return lon;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Fallback
        return HUB_LON + ((restaurantId * 23) % 100) * 0.0003;
    }

    /**
     * Resolves latitude for a user (customer delivery location).
     * Uses the REAL stored coordinate regardless of distance from hub.
     * Only generates a fallback when the DB value is NULL.
     */
    public static double getUserLatitude(int userId) {
        try (Session session = DBUtils.openSession()) {
            User u = session.get(User.class, userId);
            if (u != null) {
                if (u.getLatitude() != null) {
                    // Always use the real coordinate — no range restriction
                    return u.getLatitude();
                } else {
                    double lat = HUB_LAT + ((userId * 19) % 100) * 0.0004;
                    Transaction tx = session.beginTransaction();
                    u.setLatitude(lat);
                    session.merge(u);
                    tx.commit();
                    System.out.println("[GeoUtils] User " + userId + " had no latitude — generated fallback: " + lat);
                    return lat;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Fallback
        return HUB_LAT + ((userId * 19) % 100) * 0.0004;
    }

    /**
     * Resolves longitude for a user (customer delivery location).
     * Uses the REAL stored coordinate regardless of distance from hub.
     * Only generates a fallback when the DB value is NULL.
     */
    public static double getUserLongitude(int userId) {
        try (Session session = DBUtils.openSession()) {
            User u = session.get(User.class, userId);
            if (u != null) {
                if (u.getLongitude() != null) {
                    // Always use the real coordinate — no range restriction
                    return u.getLongitude();
                } else {
                    double lon = HUB_LON + ((userId * 29) % 100) * 0.0004;
                    Transaction tx = session.beginTransaction();
                    u.setLongitude(lon);
                    session.merge(u);
                    tx.commit();
                    System.out.println("[GeoUtils] User " + userId + " had no longitude — generated fallback: " + lon);
                    return lon;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Fallback
        return HUB_LON + ((userId * 29) % 100) * 0.0004;
    }

    /**
     * Resolves latitude for a rider (delivery partner).
     * Uses the REAL stored coordinate regardless of distance from hub.
     * Only generates a fallback when the DB value is NULL.
     */
    public static double getRiderLatitude(int riderId) {
        try (Session session = DBUtils.openSession()) {
            User u = session.get(User.class, riderId);
            if (u != null) {
                if (u.getLatitude() != null) {
                    // Always use the real coordinate — no range restriction
                    return u.getLatitude();
                } else {
                    double lat = HUB_LAT + ((riderId * 13) % 100) * 0.0005;
                    Transaction tx = session.beginTransaction();
                    u.setLatitude(lat);
                    session.merge(u);
                    tx.commit();
                    System.out.println("[GeoUtils] Rider " + riderId + " had no latitude — generated fallback: " + lat);
                    return lat;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Fallback
        return HUB_LAT + ((riderId * 13) % 100) * 0.0005;
    }

    /**
     * Resolves longitude for a rider (delivery partner).
     * Uses the REAL stored coordinate regardless of distance from hub.
     * Only generates a fallback when the DB value is NULL.
     */
    public static double getRiderLongitude(int riderId) {
        try (Session session = DBUtils.openSession()) {
            User u = session.get(User.class, riderId);
            if (u != null) {
                if (u.getLongitude() != null) {
                    // Always use the real coordinate — no range restriction
                    return u.getLongitude();
                } else {
                    double lon = HUB_LON + ((riderId * 31) % 100) * 0.0005;
                    Transaction tx = session.beginTransaction();
                    u.setLongitude(lon);
                    session.merge(u);
                    tx.commit();
                    System.out.println("[GeoUtils] Rider " + riderId + " had no longitude — generated fallback: " + lon);
                    return lon;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Fallback
        return HUB_LON + ((riderId * 31) % 100) * 0.0005;
    }
}
