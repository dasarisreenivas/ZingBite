package com.app.zingbiteutils;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.hibernate.Session;
import org.hibernate.Transaction;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Restaurant;

public class GeoUtils {

    private static final double EARTH_RADIUS = 6371.0;

    private static final double HUB_LAT = 12.9716;
    private static final double HUB_LON = 77.5946;

    private static final double SERVICE_RADIUS_KM = 50.0;

    private static final long CACHE_TTL_MS = 60_000;

    private static final ConcurrentMap<Integer, CachedCoord> restaurantLatCache = new ConcurrentHashMap<>();
    private static final ConcurrentMap<Integer, CachedCoord> restaurantLonCache = new ConcurrentHashMap<>();
    private static final ConcurrentMap<Integer, CachedCoord> userLatCache = new ConcurrentHashMap<>();
    private static final ConcurrentMap<Integer, CachedCoord> userLonCache = new ConcurrentHashMap<>();
    private static final ConcurrentMap<Integer, CachedCoord> riderLatCache = new ConcurrentHashMap<>();
    private static final ConcurrentMap<Integer, CachedCoord> riderLonCache = new ConcurrentHashMap<>();

    private static class CachedCoord {
        final double value;
        final long timestamp;
        CachedCoord(double value) {
            this.value = value;
            this.timestamp = System.currentTimeMillis();
        }
        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > CACHE_TTL_MS;
        }
    }

    public static void updateCachedCoordinates(int userId, double lat, double lon) {
        userLatCache.put(userId, new CachedCoord(lat));
        userLonCache.put(userId, new CachedCoord(lon));
        riderLatCache.put(userId, new CachedCoord(lat));
        riderLonCache.put(userId, new CachedCoord(lon));
    }

    public static void clearCache() {
        restaurantLatCache.clear();
        restaurantLonCache.clear();
        userLatCache.clear();
        userLonCache.clear();
        riderLatCache.clear();
        riderLonCache.clear();
    }

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

    public static boolean isWithinServiceArea(double lat, double lon) {
        return haversine(lat, lon, HUB_LAT, HUB_LON) <= SERVICE_RADIUS_KM;
    }

    public static double distanceFromHub(double lat, double lon) {
        return haversine(lat, lon, HUB_LAT, HUB_LON);
    }

    public static double getRestaurantLatitude(int restaurantId) {
        CachedCoord cached = restaurantLatCache.get(restaurantId);
        if (cached != null && !cached.isExpired()) {
            return cached.value;
        }
        try (Session session = DBUtils.openSession()) {
            Restaurant r = session.get(Restaurant.class, restaurantId);
            if (r != null) {
                double lat;
                if (r.getLatitude() != null) {
                    lat = r.getLatitude();
                } else {
                    lat = HUB_LAT + ((restaurantId * 17) % 100) * 0.0003;
                    Transaction tx = session.beginTransaction();
                    r.setLatitude(lat);
                    session.merge(r);
                    tx.commit();
                }
                restaurantLatCache.put(restaurantId, new CachedCoord(lat));
                return lat;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        double fallback = HUB_LAT + ((restaurantId * 17) % 100) * 0.0003;
        restaurantLatCache.put(restaurantId, new CachedCoord(fallback));
        return fallback;
    }

    public static double getRestaurantLatitudeCached(int restaurantId) {
        return getRestaurantLatitude(restaurantId);
    }

    public static double getRestaurantLongitude(int restaurantId) {
        CachedCoord cached = restaurantLonCache.get(restaurantId);
        if (cached != null && !cached.isExpired()) {
            return cached.value;
        }
        try (Session session = DBUtils.openSession()) {
            Restaurant r = session.get(Restaurant.class, restaurantId);
            if (r != null) {
                double lon;
                if (r.getLongitude() != null) {
                    lon = r.getLongitude();
                } else {
                    lon = HUB_LON + ((restaurantId * 23) % 100) * 0.0003;
                    Transaction tx = session.beginTransaction();
                    r.setLongitude(lon);
                    session.merge(r);
                    tx.commit();
                }
                restaurantLonCache.put(restaurantId, new CachedCoord(lon));
                return lon;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        double fallback = HUB_LON + ((restaurantId * 23) % 100) * 0.0003;
        restaurantLonCache.put(restaurantId, new CachedCoord(fallback));
        return fallback;
    }

    public static double getRestaurantLongitudeCached(int restaurantId) {
        return getRestaurantLongitude(restaurantId);
    }

    public static double getUserLatitude(int userId) {
        CachedCoord cached = userLatCache.get(userId);
        if (cached != null && !cached.isExpired()) {
            return cached.value;
        }
        try (Session session = DBUtils.openSession()) {
            User u = session.get(User.class, userId);
            if (u != null) {
                double lat;
                if (u.getLatitude() != null) {
                    lat = u.getLatitude();
                } else {
                    lat = HUB_LAT + ((userId * 19) % 100) * 0.0004;
                    Transaction tx = session.beginTransaction();
                    u.setLatitude(lat);
                    session.merge(u);
                    tx.commit();
                }
                userLatCache.put(userId, new CachedCoord(lat));
                return lat;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        double fallback = HUB_LAT + ((userId * 19) % 100) * 0.0004;
        userLatCache.put(userId, new CachedCoord(fallback));
        return fallback;
    }

    public static double getUserLatitudeCached(int userId) {
        return getUserLatitude(userId);
    }

    public static double getUserLongitude(int userId) {
        CachedCoord cached = userLonCache.get(userId);
        if (cached != null && !cached.isExpired()) {
            return cached.value;
        }
        try (Session session = DBUtils.openSession()) {
            User u = session.get(User.class, userId);
            if (u != null) {
                double lon;
                if (u.getLongitude() != null) {
                    lon = u.getLongitude();
                } else {
                    lon = HUB_LON + ((userId * 29) % 100) * 0.0004;
                    Transaction tx = session.beginTransaction();
                    u.setLongitude(lon);
                    session.merge(u);
                    tx.commit();
                }
                userLonCache.put(userId, new CachedCoord(lon));
                return lon;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        double fallback = HUB_LON + ((userId * 29) % 100) * 0.0004;
        userLonCache.put(userId, new CachedCoord(fallback));
        return fallback;
    }

    public static double getUserLongitudeCached(int userId) {
        return getUserLongitude(userId);
    }

    public static double getRiderLatitude(int riderId) {
        CachedCoord cached = riderLatCache.get(riderId);
        if (cached != null && !cached.isExpired()) {
            return cached.value;
        }
        try (Session session = DBUtils.openSession()) {
            User u = session.get(User.class, riderId);
            if (u != null) {
                double lat;
                if (u.getLatitude() != null) {
                    lat = u.getLatitude();
                } else {
                    lat = HUB_LAT + ((riderId * 13) % 100) * 0.0005;
                    Transaction tx = session.beginTransaction();
                    u.setLatitude(lat);
                    session.merge(u);
                    tx.commit();
                }
                riderLatCache.put(riderId, new CachedCoord(lat));
                return lat;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        double fallback = HUB_LAT + ((riderId * 13) % 100) * 0.0005;
        riderLatCache.put(riderId, new CachedCoord(fallback));
        return fallback;
    }

    public static double getRiderLatitudeCached(int riderId) {
        return getRiderLatitude(riderId);
    }

    public static double getRiderLongitude(int riderId) {
        CachedCoord cached = riderLonCache.get(riderId);
        if (cached != null && !cached.isExpired()) {
            return cached.value;
        }
        try (Session session = DBUtils.openSession()) {
            User u = session.get(User.class, riderId);
            if (u != null) {
                double lon;
                if (u.getLongitude() != null) {
                    lon = u.getLongitude();
                } else {
                    lon = HUB_LON + ((riderId * 31) % 100) * 0.0005;
                    Transaction tx = session.beginTransaction();
                    u.setLongitude(lon);
                    session.merge(u);
                    tx.commit();
                }
                riderLonCache.put(riderId, new CachedCoord(lon));
                return lon;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        double fallback = HUB_LON + ((riderId * 31) % 100) * 0.0005;
        riderLonCache.put(riderId, new CachedCoord(fallback));
        return fallback;
    }

    public static double getRiderLongitudeCached(int riderId) {
        return getRiderLongitude(riderId);
    }
}
