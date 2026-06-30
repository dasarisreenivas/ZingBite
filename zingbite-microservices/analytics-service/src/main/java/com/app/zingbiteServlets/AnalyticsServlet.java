package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.hibernate.Session;

import com.app.zingbitemodels.User;
import com.app.zingbitemodels.AnalyticsEvent;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.AnalyticsQueueManager;
import com.app.zingbiteutils.AuthorizationUtils;
import com.app.zingbiteutils.ClientIpUtils;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/analytics")
public class AnalyticsServlet extends HttpServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(AnalyticsServlet.class);

    private static final long serialVersionUID = 1L;

    private boolean isSuperAdmin(HttpServletRequest req) {
        return AuthorizationUtils.requireRole(req, "super_admin") != null;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (!isSuperAdmin(req)) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Only Super Admins can access this resource.\"}");
            return;
        }

        try (Session hibernateSession = DBUtils.openSession()) {
            // Retrieve counts for each event type using aggregate HQL
            long pageViews = hibernateSession.createQuery("select count(e) from AnalyticsEvent e where e.eventType = 'PAGE_VIEW'", Long.class).uniqueResult();
            long searches = hibernateSession.createQuery("select count(e) from AnalyticsEvent e where e.eventType = 'SEARCH'", Long.class).uniqueResult();
            long cartAdditions = hibernateSession.createQuery("select count(e) from AnalyticsEvent e where e.eventType = 'ADD_TO_CART'", Long.class).uniqueResult();
            long ordersPlaced = hibernateSession.createQuery("select count(e) from AnalyticsEvent e where e.eventType = 'ORDER_PLACED'", Long.class).uniqueResult();

            // Run database-level grouped aggregation to fetch popular search keywords (limited to top 10)
            List<Object[]> searchAgg = hibernateSession.createQuery(
                "select e.searchQuery, count(e) from AnalyticsEvent e " +
                "where e.eventType = 'SEARCH' and e.searchQuery is not null " +
                "group by e.searchQuery " +
                "order by count(e) desc",
                Object[].class
            ).setMaxResults(10).list();

            JsonArray popularSearches = new JsonArray();
            for (Object[] row : searchAgg) {
                String q = (String) row[0];
                long count = (Long) row[1];
                JsonObject item = new JsonObject();
                item.addProperty("query", q);
                item.addProperty("count", count);
                popularSearches.add(item);
            }

            // Calculate conversion percentages
            double pageToCartRate = pageViews > 0 ? ((double) cartAdditions / pageViews) * 100.0 : 0.0;
            double cartToOrderRate = cartAdditions > 0 ? ((double) ordersPlaced / cartAdditions) * 100.0 : 0.0;
            double overallConversionRate = pageViews > 0 ? ((double) ordersPlaced / pageViews) * 100.0 : 0.0;

            JsonObject conversionRates = new JsonObject();
            conversionRates.addProperty("pageToCart", Math.round(pageToCartRate * 10.0) / 10.0);
            conversionRates.addProperty("cartToOrder", Math.round(cartToOrderRate * 10.0) / 10.0);
            conversionRates.addProperty("overall", Math.round(overallConversionRate * 10.0) / 10.0);

            JsonObject stats = new JsonObject();
            stats.addProperty("pageViews", pageViews);
            stats.addProperty("searches", searches);
            stats.addProperty("cartAdditions", cartAdditions);
            stats.addProperty("ordersPlaced", ordersPlaced);
            stats.add("conversionRates", conversionRates);
            stats.add("popularSearches", popularSearches);

            // Fetch live system metrics (HikariCP pool, Hibernate cache, Rate Limiter)
            JsonObject systemMetrics = new JsonObject();
            
            // 1. HikariCP Connection Pool Stats (via reflection)
            JsonObject hikariJson = new JsonObject();
            boolean hikariSuccess = false;
            try {
                org.hibernate.engine.spi.SessionFactoryImplementor sfi = 
                    (org.hibernate.engine.spi.SessionFactoryImplementor) DBUtils.getSessionFactory();
                if (sfi != null) {
                    org.hibernate.engine.jdbc.connections.spi.ConnectionProvider provider = 
                        sfi.getServiceRegistry().getService(org.hibernate.engine.jdbc.connections.spi.ConnectionProvider.class);
                    if (provider != null) {
                        java.lang.reflect.Field hdsField = null;
                        try {
                            hdsField = provider.getClass().getDeclaredField("hikariDataSource");
                        } catch (NoSuchFieldException e) {
                            hdsField = provider.getClass().getDeclaredField("hds");
                        }
                        hdsField.setAccessible(true);
                        com.zaxxer.hikari.HikariDataSource ds = (com.zaxxer.hikari.HikariDataSource) hdsField.get(provider);
                        if (ds != null) {
                            com.zaxxer.hikari.HikariPoolMXBean poolBean = ds.getHikariPoolMXBean();
                            if (poolBean != null) {
                                hikariJson.addProperty("activeConnections", poolBean.getActiveConnections());
                                hikariJson.addProperty("idleConnections", poolBean.getIdleConnections());
                                hikariJson.addProperty("totalConnections", poolBean.getTotalConnections());
                                hikariJson.addProperty("threadsAwaiting", poolBean.getThreadsAwaitingConnection());
                                hikariJson.addProperty("maxConnections", ds.getMaximumPoolSize());
                                hikariSuccess = true;
                            }
                        }
                    }
                }
            } catch (Throwable ex) {
                LOGGER.warn("[AnalyticsServlet] Failed to retrieve HikariCP pool stats: " + ex.getMessage());
            }
            
            if (!hikariSuccess) {
                // Fallback / default values in case reflection fails
                hikariJson.addProperty("activeConnections", 0);
                hikariJson.addProperty("idleConnections", 5);
                hikariJson.addProperty("totalConnections", 5);
                hikariJson.addProperty("threadsAwaiting", 0);
                hikariJson.addProperty("maxConnections", 20);
            }
            systemMetrics.add("hikari", hikariJson);

            // 2. Hibernate Cache & Transaction Stats
            JsonObject hibernateJson = new JsonObject();
            try {
                org.hibernate.stat.Statistics statsInfo = DBUtils.getSessionFactory().getStatistics();
                if (statsInfo != null) {
                    long hits = statsInfo.getSecondLevelCacheHitCount();
                    long misses = statsInfo.getSecondLevelCacheMissCount();
                    double hitRate = (hits + misses) > 0 ? ((double) hits / (hits + misses)) * 100.0 : 0.0;
                    
                    hibernateJson.addProperty("cacheHitCount", hits);
                    hibernateJson.addProperty("cacheMissCount", misses);
                    hibernateJson.addProperty("cacheHitRate", Math.round(hitRate * 10.0) / 10.0);
                    hibernateJson.addProperty("sessionOpenCount", statsInfo.getSessionOpenCount());
                    hibernateJson.addProperty("sessionCloseCount", statsInfo.getSessionCloseCount());
                    hibernateJson.addProperty("txSuccessCount", statsInfo.getSuccessfulTransactionCount());
                }
            } catch (Throwable ex) {
                LOGGER.warn("[AnalyticsServlet] Failed to retrieve Hibernate stats: " + ex.getMessage());
            }
            systemMetrics.add("hibernate", hibernateJson);

            // 3. Rate Limiter Stats
            JsonObject rateLimiterJson = new JsonObject();
            try {
                rateLimiterJson.addProperty("activeIps", com.app.zingbiteutils.RateLimiter.getActiveIpsCount());
                rateLimiterJson.addProperty("totalRequests", com.app.zingbiteutils.RateLimiter.getTotalRequestCount());
            } catch (Throwable ex) {
                LOGGER.warn("[AnalyticsServlet] Failed to retrieve RateLimiter stats: " + ex.getMessage());
            }
            systemMetrics.add("rateLimiter", rateLimiterJson);

            stats.add("systemMetrics", systemMetrics);

            resp.getWriter().write(stats.toString());

        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Failed to compile platform analytics data\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            BufferedReader reader = req.getReader();
            JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

            if (requestBody == null || !requestBody.has("eventType")) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"success\":false,\"error\":\"Missing eventType\"}");
                return;
            }

            String eventType = requestBody.get("eventType").getAsString();
            String eventData = requestBody.has("eventData") ? requestBody.get("eventData").getAsString() : "{}";

            // Extract searchQuery column if this is a SEARCH type event
            String searchQuery = null;
            if ("SEARCH".equalsIgnoreCase(eventType) && eventData != null && !eventData.trim().isEmpty()) {
                try {
                    JsonObject dataObj = JsonParser.parseString(eventData).getAsJsonObject();
                    if (dataObj.has("query")) {
                        searchQuery = dataObj.get("query").getAsString().trim().toLowerCase();
                    }
                } catch (Exception ignored) {}
            }

            // Resolve userId from session if logged in
            Integer userId = null;
            HttpSession session = req.getSession(false);
            if (session != null) {
                User user = (User) session.getAttribute("loggedInUser");
                if (user != null) {
                    userId = user.getUserID();
                }
            }

            String ipAddress = ClientIpUtils.resolve(req);

            // Get User-Agent
            String userAgent = req.getHeader("User-Agent");
            if (userAgent == null) {
                userAgent = "Unknown";
            }

            // Create model and queue for background batch write: non-blocking, returns 200 OK instantly
            AnalyticsEvent event = new AnalyticsEvent(userId, eventType, searchQuery, eventData, ipAddress, userAgent);
            AnalyticsQueueManager.getInstance().queueEvent(event);

            resp.getWriter().write("{\"success\":true}");

        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"success\":false,\"error\":\"Failed to process telemetry event\"}");
        }
    }
}