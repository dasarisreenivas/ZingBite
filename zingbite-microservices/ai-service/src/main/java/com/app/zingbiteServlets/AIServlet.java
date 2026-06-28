package com.app.zingbiteServlets;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.io.BufferedReader;
import java.util.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import com.app.ai.MlPredictionLogger;
import com.app.ai.MlServiceClient;
import com.app.ai.ZingBiteAiModel;
import com.app.ai.ZingBiteAiModel.MenuMatch;
import com.app.ai.ZingBiteAiModel.ReviewInsights;
import com.app.ai.ZingBiteAiModel.VoiceIntent;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.Review;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbiteutils.DBUtils;
import com.app.zingbiteutils.AuthorizationUtils;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/api/ai/*")
public class AIServlet extends HttpServlet {
    private static final Logger LOGGER = LoggerFactory.getLogger(AIServlet.class);

    private static final long serialVersionUID = 1L;
    private final Gson gson = new Gson();
    private final ZingBiteAiModel aiModel = new ZingBiteAiModel();
    private final MlServiceClient mlClient = new MlServiceClient();
    private final MlPredictionLogger predictionLogger = new MlPredictionLogger();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();
        if (pathInfo == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing AI endpoint path\"}");
            return;
        }

        try {
            switch (pathInfo) {
                case "/recommend":
                case "/menu-recommend":
                    handleRecommend(req, resp);
                    break;
                case "/home-rank":
                    handleHomeRank(req, resp);
                    break;
                case "/reviews/summary":
                    handleReviewsSummary(req, resp);
                    break;
                case "/inventory/forecast":
                    handleInventoryForecast(req, resp);
                    break;
                case "/restaurant-ops":
                    handleRestaurantOps(req, resp);
                    break;
                case "/super-admin/anomaly":
                    handleSuperAdminAnomaly(req, resp);
                    break;
                case "/admin-security":
                    handleAdminSecurity(req, resp);
                    break;
                default:
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"error\":\"Endpoint not found\"}");
            }
        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Internal server error: " + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String pathInfo = req.getPathInfo();
        if (pathInfo == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing AI endpoint path\"}");
            return;
        }

        try {
            switch (pathInfo) {
                case "/voice-command":
                    handleVoiceCommand(req, resp);
                    break;
                case "/assistant":
                    handleAssistant(req, resp);
                    break;
                case "/search-rank":
                    handleSearchRank(req, resp);
                    break;
                case "/cart-optimize":
                    handleCartOptimize(req, resp);
                    break;
                case "/eta":
                    handleEta(req, resp);
                    break;
                case "/feedback":
                    handleFeedback(req, resp);
                    break;
                case "/reviews/reply":
                    handleReviewsReply(req, resp);
                    break;
                case "/chat-assist":
                    handleChatAssist(req, resp);
                    break;
                default:
                    resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    resp.getWriter().write("{\"error\":\"Endpoint not found\"}");
            }
        } catch (Exception e) {
            LOGGER.error("Unexpected servlet error", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"Internal server error: " + e.getMessage() + "\"}");
        }
    }

    private void handleRecommend(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String restaurantIdParam = req.getParameter("restaurantId");
        String weather = req.getParameter("weather");
        String timeOfDay = req.getParameter("timeOfDay");

        if (restaurantIdParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing restaurantId\"}");
            return;
        }

        int restaurantId = Integer.parseInt(restaurantIdParam.trim());

        try (Session session = DBUtils.openSession()) {
            String hql = "from Menu where restaurant.restaurantId = :restaurantId and isAvailable = true";
            Query<Menu> query = session.createQuery(hql, Menu.class);
            query.setParameter("restaurantId", restaurantId);
            List<Menu> menuItems = query.list();

            JsonObject mlPayload = new JsonObject();
            mlPayload.addProperty("restaurantId", restaurantId);
            if (weather != null) mlPayload.addProperty("weather", weather);
            if (timeOfDay != null) mlPayload.addProperty("timeOfDay", timeOfDay);
            mlPayload.add("candidateItems", menuItemsToJson(menuItems));
            Optional<JsonObject> mlResponse = mlClient.predict("recommender", mlPayload);
            if (mlResponse.isPresent() && mlResponse.get().has("items") && mlResponse.get().get("items").isJsonArray()) {
                attachPredictionLogId(req, "/menu-recommend", "recommender", mlPayload, mlResponse.get());
                resp.getWriter().write(gson.toJson(mlResponse.get().getAsJsonArray("items")));
                return;
            }

            List<JsonObject> scoredItems = new ArrayList<>();
            for (Menu item : menuItems) {
                double score = 1.0;
                String tag = "Chef Recommended";
                String reason = "Customer favorite at this restaurant";

                // Weather Heuristics
                if (weather != null && weather.equalsIgnoreCase("Rain")) {
                    String nameLower = item.getMenuName().toLowerCase();
                    String descLower = item.getDescription().toLowerCase();
                    if (nameLower.contains("soup") || descLower.contains("soup") ||
                        nameLower.contains("tea") || nameLower.contains("coffee") ||
                        nameLower.contains("pakoda") || nameLower.contains("fritter") ||
                        nameLower.contains("biryani") || nameLower.contains("noodle") ||
                        nameLower.contains("ramen") || nameLower.contains("hot")) {
                        score += 2.0;
                        tag = "AI Monsoon Pick";
                        reason = "Hot and comforting, perfect for rainy weather";
                    }
                }

                // Time of Day Heuristics
                if (timeOfDay != null) {
                    String nameLower = item.getMenuName().toLowerCase();
                    if (timeOfDay.equalsIgnoreCase("Morning")) {
                        if (nameLower.contains("breakfast") || nameLower.contains("idli") ||
                            nameLower.contains("dosa") || nameLower.contains("egg") ||
                            nameLower.contains("toast") || nameLower.contains("coffee") ||
                            nameLower.contains("tea")) {
                            score += 2.5;
                            tag = "AI Morning Special";
                            reason = "Start your day with this light, popular breakfast choice";
                        }
                    } else if (timeOfDay.equalsIgnoreCase("Night")) {
                        if (nameLower.contains("dessert") || nameLower.contains("ice cream") ||
                            nameLower.contains("biryani") || nameLower.contains("shake") ||
                            nameLower.contains("burger") || nameLower.contains("pizza")) {
                            score += 1.8;
                            tag = "AI Late Night Vibe";
                            reason = "Popular choice for late-night cravings";
                        }
                    }
                }

                JsonObject itemObj = new JsonObject();
                itemObj.addProperty("menuId", item.getMenuId());
                itemObj.addProperty("menuName", item.getMenuName());
                itemObj.addProperty("price", item.getPrice());
                itemObj.addProperty("description", item.getDescription());
                itemObj.addProperty("imagePath", item.getImagePath());
                itemObj.addProperty("score", score);
                itemObj.addProperty("tag", tag);
                itemObj.addProperty("reason", reason);
                scoredItems.add(itemObj);
            }

            // Sort by score descending
            scoredItems.sort((a, b) -> Double.compare(b.get("score").getAsDouble(), a.get("score").getAsDouble()));

            JsonArray result = new JsonArray();
            int limit = Math.min(scoredItems.size(), 4);
            for (int i = 0; i < limit; i++) {
                result.add(scoredItems.get(i));
            }

            resp.getWriter().write(gson.toJson(result));
        }
    }

    private void handleHomeRank(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String queryText = Optional.ofNullable(req.getParameter("query")).orElse("");

        try (Session session = DBUtils.openSession()) {
            Query<Restaurant> query = session.createQuery("from Restaurant where isActive = true", Restaurant.class);
            query.setMaxResults(80);
            List<Restaurant> restaurants = query.list();
            restaurants.sort((a, b) -> Double.compare(restaurantFallbackScore(b), restaurantFallbackScore(a)));

            JsonArray fallbackRestaurants = new JsonArray();
            JsonArray mlCandidates = new JsonArray();
            for (Restaurant restaurant : restaurants) {
                fallbackRestaurants.add(restaurantToJson(restaurant, restaurantFallbackScore(restaurant), "ranked by rating, order volume, and current availability"));

                JsonObject candidate = new JsonObject();
                candidate.addProperty("menuId", restaurant.getRestaurantId());
                candidate.addProperty("restaurantId", restaurant.getRestaurantId());
                candidate.addProperty("menuName", restaurant.getRestaurantName());
                candidate.addProperty("description", String.join(" ",
                    nullToEmpty(restaurant.getCusineType()),
                    nullToEmpty(restaurant.getAddress()),
                    nullToEmpty(restaurant.getDeliveryTime())
                ));
                candidate.addProperty("price", 0);
                candidate.addProperty("imagePath", restaurant.getImagePath());
                mlCandidates.add(candidate);
            }

            JsonObject mlPayload = new JsonObject();
            mlPayload.addProperty("query", queryText.isBlank() ? "popular open restaurants" : queryText);
            mlPayload.addProperty("limit", Math.min(20, restaurants.size()));
            mlPayload.add("candidateItems", mlCandidates);

            Optional<JsonObject> mlResponse = mlClient.predict("search_rank", mlPayload);
            JsonObject responseObj = new JsonObject();
            if (mlResponse.isPresent() && mlResponse.get().has("items")) {
                JsonArray ranked = remapRankedRestaurants(mlResponse.get().getAsJsonArray("items"), restaurants);
                responseObj.addProperty("source", "ml");
                responseObj.add("restaurants", ranked);
                attachPredictionLogId(req, "/home-rank", "search_rank", mlPayload, responseObj);
            } else {
                responseObj.addProperty("source", "fallback");
                responseObj.add("restaurants", fallbackRestaurants);
            }
            resp.getWriter().write(gson.toJson(responseObj));
        }
    }

    private void handleSearchRank(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JsonObject requestBody = readJsonBody(req);
        String queryText = requestBody.has("query") ? requestBody.get("query").getAsString() : "";
        Integer restaurantId = requestBody.has("restaurantId") ? parseInteger(requestBody.get("restaurantId").getAsString()) : null;

        JsonObject mlPayload = requestBody.deepCopy();
        if (!mlPayload.has("candidateItems")) {
            try (Session session = DBUtils.openSession()) {
                mlPayload.add("candidateItems", menuItemsToJson(loadMenuItems(session, restaurantId)));
            }
        }
        mlPayload.addProperty("query", queryText);

        Optional<JsonObject> mlResponse = mlClient.predict("search_rank", mlPayload);
        if (mlResponse.isPresent()) {
            JsonObject responseObj = mlResponse.get();
            attachPredictionLogId(req, "/search-rank", "search_rank", mlPayload, responseObj);
            resp.getWriter().write(gson.toJson(responseObj));
            return;
        }

        JsonArray candidates = mlPayload.getAsJsonArray("candidateItems");
        JsonArray fallback = fallbackSearchRank(queryText, candidates);
        JsonObject responseObj = new JsonObject();
        responseObj.addProperty("source", "fallback");
        responseObj.addProperty("query", queryText);
        responseObj.add("items", fallback);
        resp.getWriter().write(gson.toJson(responseObj));
    }

    private void handleAssistant(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JsonObject requestBody = readJsonBody(req);
        String text = jsonString(requestBody, "text", jsonString(requestBody, "messageText", ""));
        String contextType = jsonString(requestBody, "type", jsonString(requestBody, "contextType", "support"));
        if (text.trim().isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing text\"}");
            return;
        }

        JsonObject mlPayload = new JsonObject();
        mlPayload.addProperty("text", text);
        mlPayload.addProperty("contextType", contextType);
        Optional<JsonObject> mlResponse = mlClient.predict("nlp", mlPayload);
        if (mlResponse.isPresent()) {
            JsonObject responseObj = mlResponse.get();
            attachPredictionLogId(req, "/assistant", "nlp", mlPayload, responseObj);
            resp.getWriter().write(gson.toJson(responseObj));
            return;
        }

        VoiceIntent voiceIntent = aiModel.classifyVoiceCommand(text);
        JsonObject responseObj = new JsonObject();
        responseObj.addProperty("source", "fallback");
        responseObj.addProperty("intent", voiceIntent.action);
        responseObj.addProperty("supportCategory", contextType.isBlank() ? "support_general" : contextType);
        responseObj.addProperty("confidence", voiceIntent.confidence);
        responseObj.addProperty("reply", aiModel.generateSupportReply(text, contextType));
        resp.getWriter().write(gson.toJson(responseObj));
    }

    private void handleEta(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JsonObject requestBody = readJsonBody(req);
        Optional<JsonObject> mlResponse = mlClient.predict("eta", requestBody);
        if (mlResponse.isPresent()) {
            JsonObject responseObj = mlResponse.get();
            attachPredictionLogId(req, "/eta", "eta", requestBody, responseObj);
            resp.getWriter().write(gson.toJson(responseObj));
            return;
        }

        double distance = jsonDouble(requestBody, "distance", jsonDouble(requestBody, "distanceKm", 4.0));
        double prepTime = jsonDouble(requestBody, "prepTime", jsonDouble(requestBody, "prep_time", 15.0));
        String traffic = jsonString(requestBody, "trafficLevel", jsonString(requestBody, "traffic_level", "Moderate"));
        String weather = jsonString(requestBody, "weather", "Sunny");
        boolean highRise = jsonBoolean(requestBody, "isHighRise", jsonBoolean(requestBody, "is_high_rise", false));

        int trafficDelay = traffic.equalsIgnoreCase("Heavy") ? 12 : traffic.equalsIgnoreCase("Light") ? 2 : 6;
        int weatherDelay = weather.toLowerCase(Locale.ROOT).contains("rain") ? 8 : 0;
        int highRiseDelay = highRise ? 5 : 0;
        int eta = (int) Math.max(8, Math.round((distance * 3.8) + prepTime + trafficDelay + weatherDelay + highRiseDelay));

        JsonArray factors = new JsonArray();
        if (trafficDelay >= 10) factors.add("heavy traffic");
        if (weatherDelay > 0) factors.add("weather delay");
        if (highRiseDelay > 0) factors.add("high-rise handoff");
        if (factors.isEmpty()) factors.add("normal route conditions");

        JsonObject responseObj = new JsonObject();
        responseObj.addProperty("source", "fallback");
        responseObj.addProperty("etaMinutes", eta);
        responseObj.addProperty("confidence", 0.68);
        responseObj.add("delayFactors", factors);
        resp.getWriter().write(gson.toJson(responseObj));
    }

    private void handleFeedback(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        JsonObject requestBody = readJsonBody(req);
        long predictionId = jsonLong(requestBody, "predictionId", jsonLong(requestBody, "predictionLogId", -1));
        if (predictionId <= 0) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing predictionId\"}");
            return;
        }

        JsonObject outcome = requestBody.has("outcome") && requestBody.get("outcome").isJsonObject()
            ? requestBody.getAsJsonObject("outcome")
            : requestBody;
        boolean updated = predictionLogger.recordOutcome(predictionId, outcome);
        if (!updated) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"error\":\"Prediction log not found\"}");
            return;
        }

        JsonObject responseObj = new JsonObject();
        responseObj.addProperty("status", "ok");
        responseObj.addProperty("predictionId", predictionId);
        resp.getWriter().write(gson.toJson(responseObj));
    }

    private void handleReviewsSummary(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String restaurantIdParam = req.getParameter("restaurantId");
        if (restaurantIdParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing restaurantId\"}");
            return;
        }

        int restaurantId = Integer.parseInt(restaurantIdParam.trim());

        try (Session session = DBUtils.openSession()) {
            String hql = "from Review where restaurantId = :restaurantId";
            Query<Review> query = session.createQuery(hql, Review.class);
            query.setParameter("restaurantId", restaurantId);
            List<Review> reviews = query.list();

            ReviewInsights insights = aiModel.summarizeReviews(reviews);

            JsonObject result = new JsonObject();
            result.addProperty("summaryText", insights.summaryText);

            JsonArray posArr = new JsonArray();
            for (String tag : insights.positiveTags) posArr.add(tag);
            result.add("positiveTags", posArr);

            JsonArray negArr = new JsonArray();
            for (String tag : insights.negativeTags) negArr.add(tag);
            result.add("negativeTags", negArr);

            result.addProperty("overallSentimentScore", insights.overallSentimentScore);

            resp.getWriter().write(gson.toJson(result));
        }
    }

    private void handleInventoryForecast(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String restaurantIdParam = req.getParameter("restaurantId");
        if (restaurantIdParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing restaurantId\"}");
            return;
        }

        int restaurantId = Integer.parseInt(restaurantIdParam.trim());

        try (Session session = DBUtils.openSession()) {
            String hql = "from Menu where restaurant.restaurantId = :restaurantId and isAvailable = true";
            Query<Menu> query = session.createQuery(hql, Menu.class);
            query.setParameter("restaurantId", restaurantId);
            List<Menu> menuItems = query.list();

            JsonArray result = new JsonArray();
            Random rand = new Random(restaurantId + 42); // Seeded for deterministic E2E values

            for (Menu item : menuItems) {
                int baseAvg = 15 + rand.nextInt(35);
                // Forecast factors: simulated rain tomorrow (+40%) + weekend (+25%)
                double multiplier = 1.65;
                int predictedQty = (int) Math.round(baseAvg * multiplier);

                String trend = "NORMAL";
                String reason = "Standard weekday demand projection.";

                if (predictedQty > 50) {
                    trend = "HIGH_DEMAND_WARNING";
                    reason = "Upcoming monsoon weather will likely trigger a 50% surge in order volume for hot/spicy items.";
                } else if (predictedQty < 20) {
                    trend = "LOW_DEMAND";
                    reason = "Off-peak seasonal demand dip.";
                }

                JsonObject itemForecast = new JsonObject();
                itemForecast.addProperty("menuId", item.getMenuId());
                itemForecast.addProperty("itemName", item.getMenuName());
                itemForecast.addProperty("predictedQuantity", predictedQty);
                itemForecast.addProperty("historicalAverage", baseAvg);
                itemForecast.addProperty("trend", trend);
                itemForecast.addProperty("reason", reason);
                itemForecast.addProperty("currentStock", baseAvg + rand.nextInt(20)); // simulated stock
                result.add(itemForecast);
            }

            resp.getWriter().write(gson.toJson(result));
        }
    }

    private void handleRestaurantOps(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null || (!"restaurant_admin".equals(user.getRole()) && !"super_admin".equals(user.getRole()))) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden\"}");
            return;
        }

        Integer restaurantId = parseInteger(req.getParameter("restaurantId"));
        if (restaurantId == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing restaurantId\"}");
            return;
        }

        try (Session session = DBUtils.openSession()) {
            Restaurant restaurant = session.get(Restaurant.class, restaurantId);
            if (restaurant == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Restaurant not found\"}");
                return;
            }
            boolean ownsRestaurant = restaurant.getAdminId() != null && restaurant.getAdminId() == user.getUserID();
            if ("restaurant_admin".equals(user.getRole()) && !ownsRestaurant) {
                resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                resp.getWriter().write("{\"error\":\"Forbidden: Restaurant belongs to another admin\"}");
                return;
            }

            List<Menu> menuItems = loadMenuItems(session, restaurantId);
            JsonObject mlPayload = new JsonObject();
            mlPayload.addProperty("restaurantId", restaurantId);
            mlPayload.add("candidateItems", menuItemsToJson(menuItems));

            JsonObject result = new JsonObject();
            result.addProperty("restaurantId", restaurantId);
            result.add("reviewInsights", buildReviewInsights(session, restaurantId));

            Optional<JsonObject> mlResponse = mlClient.predict("demand_forecast", mlPayload);
            if (mlResponse.isPresent() && mlResponse.get().has("forecasts")) {
                result.addProperty("source", "ml");
                result.add("demandForecast", mlResponse.get().get("forecasts"));
                attachPredictionLogId(req, "/restaurant-ops", "demand_forecast", mlPayload, result);
            } else {
                result.addProperty("source", "fallback");
                result.add("demandForecast", fallbackInventoryForecast(menuItems, restaurantId));
            }

            resp.getWriter().write(gson.toJson(result));
        }
    }

    private void handleAdminSecurity(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        User adminUser = AuthorizationUtils.requireRole(req, "super_admin");
        if (adminUser == null) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Super Admin only\"}");
            return;
        }

        try (Session session = DBUtils.openSession()) {
            Query<User> query = session.createQuery("from User where role = 'customer' order by createdOn desc", User.class);
            query.setMaxResults(150);
            List<User> users = query.list();

            JsonObject mlPayload = new JsonObject();
            mlPayload.addProperty("limit", 40);
            JsonArray userFeatures = new JsonArray();
            Map<String, Integer> addressCounts = new HashMap<>();
            Map<String, Integer> coordinateCounts = new HashMap<>();
            for (User user : users) {
                if (user.getAddress() != null) {
                    addressCounts.merge(user.getAddress().toLowerCase(Locale.ROOT), 1, Integer::sum);
                }
                if (user.getLatitude() != null && user.getLongitude() != null) {
                    coordinateCounts.merge(String.format(Locale.US, "%.3f,%.3f", user.getLatitude(), user.getLongitude()), 1, Integer::sum);
                }
            }
            for (User user : users) {
                JsonObject feature = new JsonObject();
                feature.addProperty("userId", user.getUserID());
                feature.addProperty("accountAgeDays", accountAgeDays(user));
                feature.addProperty("sharedAddressCount", user.getAddress() == null ? 1 : addressCounts.getOrDefault(user.getAddress().toLowerCase(Locale.ROOT), 1));
                String coordinateKey = user.getLatitude() == null || user.getLongitude() == null
                    ? ""
                    : String.format(Locale.US, "%.3f,%.3f", user.getLatitude(), user.getLongitude());
                feature.addProperty("sharedCoordinateCount", coordinateCounts.getOrDefault(coordinateKey, 1));
                feature.addProperty("orderCount", 0);
                feature.addProperty("reviewCount", 0);
                feature.addProperty("refundEvents", 0);
                feature.addProperty("couponEvents", 0);
                userFeatures.add(feature);
            }
            mlPayload.add("users", userFeatures);

            Optional<JsonObject> mlResponse = mlClient.predict("fraud", mlPayload);
            if (mlResponse.isPresent()) {
                JsonObject responseObj = mlResponse.get();
                attachPredictionLogId(req, "/admin-security", "fraud", mlPayload, responseObj);
                resp.getWriter().write(gson.toJson(responseObj));
                return;
            }

            JsonObject responseObj = new JsonObject();
            responseObj.addProperty("source", "fallback");
            responseObj.add("clusters", buildFallbackSecurityClusters(users));
            resp.getWriter().write(gson.toJson(responseObj));
        }
    }

    private void handleSuperAdminAnomaly(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        User adminUser = AuthorizationUtils.requireRole(req, "super_admin");
        if (adminUser == null) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden: Super Admin only\"}");
            return;
        }

        try (Session hibernateSession = DBUtils.openSession()) {
            // Find users created close to each other with same address / coordinates
            String hql = "from User where role = 'customer' order by createdOn desc";
            Query<User> query = hibernateSession.createQuery(hql, User.class);
            query.setMaxResults(100);
            List<User> users = query.list();

            JsonArray anomalies = new JsonArray();

            for (int i = 0; i < users.size(); i++) {
                User u1 = users.get(i);
                if (u1.getLatitude() == null || u1.getLongitude() == null) continue;

                List<Integer> matchedUserIds = new ArrayList<>();
                matchedUserIds.add(u1.getUserID());

                for (int j = i + 1; j < users.size(); j++) {
                    User u2 = users.get(j);
                    if (u2.getLatitude() == null || u2.getLongitude() == null) continue;

                    // Match coordinates to 3 decimals (approx ~100m) or identical address
                    boolean matchesCoords = Math.abs(u1.getLatitude() - u2.getLatitude()) < 0.002 &&
                                            Math.abs(u1.getLongitude() - u2.getLongitude()) < 0.002;
                    boolean matchesAddress = u1.getAddress() != null && u1.getAddress().equalsIgnoreCase(u2.getAddress());

                    if (matchesCoords || matchesAddress) {
                        // Check if registered within 48 hours of each other
                        long diffTime = Math.abs(u1.getCreatedOn().getTime() - u2.getCreatedOn().getTime());
                        if (diffTime < 48 * 60 * 60 * 1000L) {
                            matchedUserIds.add(u2.getUserID());
                        }
                    }
                }

                if (matchedUserIds.size() >= 2) {
                    JsonObject anomaly = new JsonObject();
                    anomaly.addProperty("threatLevel", matchedUserIds.size() >= 4 ? "CRITICAL" : "SUSPICIOUS");
                    anomaly.addProperty("description", String.format(
                        "Multiple accounts (%d) registered from coordinates (%.4f, %.4f) or identical address within 48 hours. Potential registration sybil attack.",
                        matchedUserIds.size(), u1.getLatitude(), u1.getLongitude()
                    ));
                    JsonArray userIdsArr = new JsonArray();
                    for (int id : matchedUserIds) {
                        userIdsArr.add(id);
                    }
                    anomaly.add("affectedUserIds", userIdsArr);
                    anomaly.addProperty("address", u1.getAddress());
                    anomalies.add(anomaly);
                }
            }

            resp.getWriter().write(gson.toJson(anomalies));
        }
    }

    private Integer parseInteger(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException ignored) {
            return null;
        }
    }

    private void handleVoiceCommand(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        BufferedReader reader = req.getReader();
        JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

        if (!requestBody.has("text")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing required field: text\"}");
            return;
        }

        String rawText = requestBody.get("text").getAsString();
        String restaurantIdParam = req.getParameter("restaurantId");

        JsonObject actionResult = new JsonObject();
        VoiceIntent intent = aiModel.classifyVoiceCommand(rawText);
        actionResult.addProperty("action", intent.action);
        actionResult.addProperty("status", intent.status);
        actionResult.addProperty("message", intent.message);
        actionResult.addProperty("confidence", intent.confidence);

        if (!"success".equals(intent.status)) {
            resp.getWriter().write(gson.toJson(actionResult));
            return;
        }

        if ("NAVIGATE".equals(intent.action) || "SEARCH".equals(intent.action)) {
            actionResult.addProperty("payload", intent.payload);
            resp.getWriter().write(gson.toJson(actionResult));
            return;
        }

        if ("ADD_TO_CART".equals(intent.action)) {
            Integer restaurantId = parseInteger(restaurantIdParam);
            if (restaurantId == null) {
                actionResult.addProperty("action", "NONE");
                actionResult.addProperty("status", "error");
                actionResult.addProperty("message", "Open a restaurant menu first so I know where to add from.");
                resp.getWriter().write(gson.toJson(actionResult));
                return;
            }

            try (Session session = DBUtils.openSession()) {
                String hql = "from Menu where restaurant.restaurantId = :restaurantId and isAvailable = true";
                Query<Menu> query = session.createQuery(hql, Menu.class);
                query.setParameter("restaurantId", restaurantId);
                List<Menu> menuItems = query.list();

                MenuMatch match = aiModel.findBestMenuMatch(menuItems, intent.payload);

                if (match != null && match.confidence >= 0.25) {
                    Menu bestMatch = match.menu;
                    actionResult.addProperty("action", "ADD_TO_CART");
                    actionResult.addProperty("status", "success");
                    actionResult.addProperty("message", "Added " + bestMatch.getMenuName() + " to your cart.");
                    actionResult.addProperty("confidence", match.confidence);
                    
                    JsonObject payload = new JsonObject();
                    payload.addProperty("menuId", bestMatch.getMenuId());
                    payload.addProperty("menuName", bestMatch.getMenuName());
                    payload.addProperty("price", bestMatch.getPrice());
                    payload.addProperty("quantity", intent.quantity);
                    payload.addProperty("customization", intent.customization);
                    actionResult.add("payload", payload);
                } else {
                    actionResult.addProperty("action", "NONE");
                    actionResult.addProperty("status", "error");
                    actionResult.addProperty("message", "Sorry, I could not find a matching dish named '" + intent.payload + "' on this menu.");
                }
                resp.getWriter().write(gson.toJson(actionResult));
                return;
            }
        }

        resp.getWriter().write(gson.toJson(actionResult));
    }

    private void handleCartOptimize(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        BufferedReader reader = req.getReader();
        JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

        if (!requestBody.has("cartItems")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing cartItems array\"}");
            return;
        }

        JsonArray cartItems = requestBody.getAsJsonArray("cartItems");
        Optional<JsonObject> mlResponse = mlClient.predict("cart_optimizer", requestBody);
        if (mlResponse.isPresent()) {
            JsonObject responseObj = mlResponse.get();
            attachPredictionLogId(req, "/cart-optimize", "cart_optimizer", requestBody, responseObj);
            resp.getWriter().write(gson.toJson(responseObj));
            return;
        }

        JsonObject result = new JsonObject();
        result.addProperty("optimizationAvailable", false);

        int friesQty = 0;
        int drinkQty = 0;
        double friesPrice = 0;
        double drinkPrice = 0;

        for (JsonElement el : cartItems) {
            JsonObject item = el.getAsJsonObject();
            String name = item.get("name").getAsString().toLowerCase();
            int qty = item.get("quantity").getAsInt();
            double price = item.get("price").getAsDouble();

            if (name.contains("fries") || name.contains("french fries")) {
                friesQty += qty;
                friesPrice = price;
            } else if (name.contains("drink") || name.contains("coke") || name.contains("beverage") || name.contains("soda")) {
                drinkQty += qty;
                drinkPrice = price;
            }
        }

        // Simple optimization rule: If you have Fries and Drink separately, suggest a combo
        if (friesQty >= 1 && drinkQty >= 1) {
            int comboCount = Math.min(friesQty, drinkQty);
            double currentCost = (friesPrice + drinkPrice) * comboCount;
            double comboCost = (friesPrice + drinkPrice) * 0.75 * comboCount; // 25% combo discount
            double savings = currentCost - comboCost;

            if (savings > 5) {
                result.addProperty("optimizationAvailable", true);
                result.addProperty("message", String.format(
                    "Smart Cart Alert: Bundle %d French Fries & %d Soft Drinks into a 'Sides Combo Deal' to save Rs. %.0f!",
                    comboCount, comboCount, savings
                ));
            }
        }

        resp.getWriter().write(gson.toJson(result));
    }

    private void handleReviewsReply(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null || (!"restaurant_admin".equals(user.getRole()) && !"super_admin".equals(user.getRole()))) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write("{\"error\":\"Forbidden\"}");
            return;
        }

        BufferedReader reader = req.getReader();
        JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();

        if (!requestBody.has("reviewId")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing reviewId\"}");
            return;
        }

        int reviewId = requestBody.get("reviewId").getAsInt();
        boolean saveReply = requestBody.has("save") && requestBody.get("save").getAsBoolean();
        String providedReply = requestBody.has("replyText") && !requestBody.get("replyText").isJsonNull()
            ? requestBody.get("replyText").getAsString().trim()
            : "";

        try (Session hibernateSession = DBUtils.openSession()) {
            Review review = hibernateSession.get(Review.class, reviewId);
            if (review == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("{\"error\":\"Review not found\"}");
                return;
            }

            Restaurant restaurant = hibernateSession.get(Restaurant.class, review.getRestaurantId());
            boolean ownsRestaurant = restaurant != null
                && restaurant.getAdminId() != null
                && restaurant.getAdminId() == user.getUserID();
            if ("restaurant_admin".equals(user.getRole()) && !ownsRestaurant) {
                resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                resp.getWriter().write("{\"error\":\"Forbidden: Review belongs to another restaurant\"}");
                return;
            }

            String reviewerName = "Customer";
            User reviewer = hibernateSession.get(User.class, review.getUserId());
            if (reviewer != null) {
                reviewerName = reviewer.getUserName();
            }

            String reply = providedReply.isEmpty() ? aiModel.draftReviewReply(review, reviewerName) : providedReply;
            if (reply.isBlank()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Reply text cannot be empty\"}");
                return;
            }
            if (reply.length() > 1200) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\":\"Reply text exceeds 1200 characters\"}");
                return;
            }

            if (saveReply) {
                Transaction tx = null;
                try {
                    tx = hibernateSession.beginTransaction();
                    review.setRestaurantReply(reply);
                    review.setRestaurantReplyAt(new Date());
                    hibernateSession.merge(review);
                    tx.commit();
                } catch (Exception e) {
                    if (tx != null && tx.isActive()) tx.rollback();
                    throw e;
                }
            }

            JsonObject responseObj = new JsonObject();
            responseObj.addProperty("suggestedReply", reply);
            responseObj.addProperty("saved", saveReply);
            if (review.getRestaurantReplyAt() != null) {
                responseObj.addProperty("restaurantReplyAt", review.getRestaurantReplyAt().toString());
            }
            resp.getWriter().write(gson.toJson(responseObj));
        }
    }

    private void handleChatAssist(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        User user = AuthorizationUtils.requireAuthenticated(req);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"error\":\"Please log in to use chat assistance\"}");
            return;
        }

        BufferedReader reader = req.getReader();
        JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
        String messageText = requestBody.has("messageText") ? requestBody.get("messageText").getAsString() : "";
        String contextType = requestBody.has("type") ? requestBody.get("type").getAsString() : "";
        if (messageText.trim().isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"error\":\"Missing messageText\"}");
            return;
        }

        JsonObject result = new JsonObject();
        JsonObject mlPayload = new JsonObject();
        mlPayload.addProperty("text", messageText);
        mlPayload.addProperty("contextType", contextType);
        Optional<JsonObject> mlResponse = mlClient.predict("nlp", mlPayload);
        if (mlResponse.isPresent() && mlResponse.get().has("reply")) {
            result.addProperty("reply", mlResponse.get().get("reply").getAsString());
            result.addProperty("intent", jsonString(mlResponse.get(), "intent", "support_ticket"));
            result.addProperty("supportCategory", jsonString(mlResponse.get(), "supportCategory", "support_general"));
            result.addProperty("sentiment", jsonString(mlResponse.get(), "sentiment", "neutral"));
            attachPredictionLogId(req, "/chat-assist", "nlp", mlPayload, result);
        } else {
            result.addProperty("reply", aiModel.generateSupportReply(messageText, contextType));
            result.addProperty("source", "fallback");
        }
        result.addProperty("senderName", "ZingBite Support AI");
        result.addProperty("timestamp", new Date().toString());
        resp.getWriter().write(gson.toJson(result));
    }

    private JsonObject readJsonBody(HttpServletRequest req) throws IOException {
        BufferedReader reader = req.getReader();
        JsonElement element = JsonParser.parseReader(reader);
        return element != null && element.isJsonObject() ? element.getAsJsonObject() : new JsonObject();
    }

    private List<Menu> loadMenuItems(Session session, Integer restaurantId) {
        String hql = restaurantId == null
            ? "from Menu where isAvailable = true"
            : "from Menu where restaurant.restaurantId = :restaurantId and isAvailable = true";
        Query<Menu> query = session.createQuery(hql, Menu.class);
        if (restaurantId != null) {
            query.setParameter("restaurantId", restaurantId);
        }
        query.setMaxResults(150);
        return query.list();
    }

    private JsonArray menuItemsToJson(List<Menu> menuItems) {
        JsonArray result = new JsonArray();
        for (Menu item : menuItems) {
            result.add(menuToJson(item));
        }
        return result;
    }

    private JsonObject menuToJson(Menu item) {
        JsonObject itemObj = new JsonObject();
        itemObj.addProperty("menuId", item.getMenuId());
        itemObj.addProperty("restaurantId", item.getRestaurant() == null ? 0 : item.getRestaurant().getRestaurantId());
        itemObj.addProperty("menuName", item.getMenuName());
        itemObj.addProperty("price", item.getPrice());
        itemObj.addProperty("description", item.getDescription());
        itemObj.addProperty("imagePath", item.getImagePath());
        return itemObj;
    }

    private JsonObject restaurantToJson(Restaurant restaurant, double score, String reason) {
        JsonObject item = new JsonObject();
        item.addProperty("restaurantId", restaurant.getRestaurantId());
        item.addProperty("restaurantName", restaurant.getRestaurantName());
        item.addProperty("deliveryTime", restaurant.getDeliveryTime());
        item.addProperty("cusineType", restaurant.getCusineType());
        item.addProperty("cuisineType", restaurant.getCusineType());
        item.addProperty("address", restaurant.getAddress());
        item.addProperty("rating", restaurant.getRating());
        item.addProperty("isOpen", restaurant.isOpen());
        item.addProperty("totalOrders", restaurant.getTotalOrders());
        item.addProperty("totalImpressions", restaurant.getTotalImpressions());
        item.addProperty("imagePath", restaurant.getImagePath());
        item.addProperty("score", Math.round(score * 10000.0) / 10000.0);
        item.addProperty("reason", reason);
        return item;
    }

    private JsonArray remapRankedRestaurants(JsonArray rankedItems, List<Restaurant> restaurants) {
        Map<Integer, Restaurant> byId = new HashMap<>();
        for (Restaurant restaurant : restaurants) {
            byId.put(restaurant.getRestaurantId(), restaurant);
        }

        JsonArray ranked = new JsonArray();
        Set<Integer> seen = new HashSet<>();
        for (JsonElement element : rankedItems) {
            if (!element.isJsonObject()) continue;
            JsonObject item = element.getAsJsonObject();
            int restaurantId = item.has("menuId") ? item.get("menuId").getAsInt() : jsonInt(item, "restaurantId", 0);
            Restaurant restaurant = byId.get(restaurantId);
            if (restaurant == null) continue;
            seen.add(restaurantId);
            double score = item.has("rankScore") ? item.get("rankScore").getAsDouble() : restaurantFallbackScore(restaurant);
            ranked.add(restaurantToJson(restaurant, score, jsonString(item, "reason", "ranked by local ML signals")));
        }

        for (Restaurant restaurant : restaurants) {
            if (!seen.contains(restaurant.getRestaurantId())) {
                ranked.add(restaurantToJson(restaurant, restaurantFallbackScore(restaurant), "ranked by rating, order volume, and current availability"));
            }
        }
        return ranked;
    }

    private JsonArray fallbackSearchRank(String query, JsonArray candidates) {
        List<JsonObject> scored = new ArrayList<>();
        for (JsonElement element : candidates) {
            if (!element.isJsonObject()) continue;
            JsonObject item = element.getAsJsonObject();
            String name = jsonString(item, "menuName", jsonString(item, "name", ""));
            String description = jsonString(item, "description", "");
            double score = lexicalScore(query, name + " " + description);
            JsonObject copy = item.deepCopy();
            copy.addProperty("rankScore", Math.round(score * 10000.0) / 10000.0);
            copy.addProperty("reason", "ranked by deterministic text match fallback");
            scored.add(copy);
        }
        scored.sort((a, b) -> Double.compare(b.get("rankScore").getAsDouble(), a.get("rankScore").getAsDouble()));
        JsonArray result = new JsonArray();
        for (JsonObject item : scored) {
            result.add(item);
        }
        return result;
    }

    private double lexicalScore(String query, String haystack) {
        String normalizedQuery = query == null ? "" : query.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9\\s]", " ").trim();
        String normalizedHaystack = haystack == null ? "" : haystack.toLowerCase(Locale.ROOT);
        if (normalizedQuery.isBlank()) {
            return 0.5;
        }
        String[] tokens = normalizedQuery.split("\\s+");
        int matches = 0;
        for (String token : tokens) {
            if (!token.isBlank() && normalizedHaystack.contains(token)) {
                matches++;
            }
        }
        return (double) matches / Math.max(tokens.length, 1);
    }

    private JsonObject buildReviewInsights(Session session, int restaurantId) {
        Query<Review> query = session.createQuery("from Review where restaurantId = :restaurantId", Review.class);
        query.setParameter("restaurantId", restaurantId);
        List<Review> reviews = query.list();
        ReviewInsights insights = aiModel.summarizeReviews(reviews);

        JsonObject result = new JsonObject();
        result.addProperty("summaryText", insights.summaryText);
        result.addProperty("overallSentimentScore", insights.overallSentimentScore);
        JsonArray positives = new JsonArray();
        for (String tag : insights.positiveTags) positives.add(tag);
        JsonArray negatives = new JsonArray();
        for (String tag : insights.negativeTags) negatives.add(tag);
        result.add("positiveTags", positives);
        result.add("negativeTags", negatives);
        return result;
    }

    private JsonArray fallbackInventoryForecast(List<Menu> menuItems, int restaurantId) {
        JsonArray result = new JsonArray();
        Random rand = new Random(restaurantId + 42);
        for (Menu item : menuItems) {
            int baseAvg = 15 + rand.nextInt(35);
            int predictedQty = (int) Math.round(baseAvg * 1.65);
            JsonObject itemForecast = new JsonObject();
            itemForecast.addProperty("menuId", item.getMenuId());
            itemForecast.addProperty("itemName", item.getMenuName());
            itemForecast.addProperty("menuName", item.getMenuName());
            itemForecast.addProperty("predictedQuantity", predictedQty);
            itemForecast.addProperty("historicalAverage", baseAvg);
            itemForecast.addProperty("trend", predictedQty > 50 ? "HIGH_DEMAND_WARNING" : "NORMAL");
            itemForecast.addProperty("reason", "deterministic fallback using local menu and seasonal demand assumptions");
            itemForecast.addProperty("currentStock", baseAvg + rand.nextInt(20));
            result.add(itemForecast);
        }
        return result;
    }

    private JsonArray buildFallbackSecurityClusters(List<User> users) {
        JsonArray clusters = new JsonArray();
        for (int i = 0; i < users.size(); i++) {
            User first = users.get(i);
            if (first.getLatitude() == null || first.getLongitude() == null) continue;
            JsonArray affected = new JsonArray();
            affected.add(first.getUserID());
            for (int j = i + 1; j < users.size(); j++) {
                User second = users.get(j);
                if (second.getLatitude() == null || second.getLongitude() == null) continue;
                boolean matchesCoords = Math.abs(first.getLatitude() - second.getLatitude()) < 0.002
                    && Math.abs(first.getLongitude() - second.getLongitude()) < 0.002;
                boolean matchesAddress = first.getAddress() != null && first.getAddress().equalsIgnoreCase(second.getAddress());
                if (matchesCoords || matchesAddress) {
                    affected.add(second.getUserID());
                }
            }
            if (affected.size() >= 2) {
                JsonObject cluster = new JsonObject();
                cluster.addProperty("threatLevel", affected.size() >= 4 ? "CRITICAL" : "SUSPICIOUS");
                cluster.addProperty("riskScore", affected.size() >= 4 ? 0.86 : 0.62);
                cluster.add("affectedUserIds", affected);
                JsonArray explanations = new JsonArray();
                explanations.add("shared address or delivery coordinates");
                explanations.add("cluster found by deterministic fallback");
                cluster.add("explanations", explanations);
                clusters.add(cluster);
            }
        }
        return clusters;
    }

    private void attachPredictionLogId(HttpServletRequest req, String endpoint, String modelName, JsonObject requestPayload, JsonObject responseObj) {
        Long predictionLogId = predictionLogger.log(
            endpoint,
            modelName,
            jsonString(responseObj, "modelVersion", null),
            currentUserId(req),
            requestPayload,
            responseObj
        );
        if (predictionLogId != null) {
            responseObj.addProperty("predictionLogId", predictionLogId);
        }
    }

    private Integer currentUserId(HttpServletRequest req) {
        try {
            Object user = req.getSession(false) == null ? null : req.getSession(false).getAttribute("loggedInUser");
            if (user instanceof User currentUser) {
                return currentUser.getUserID();
            }
        } catch (IllegalStateException ignored) {
            return null;
        }
        return null;
    }

    private double restaurantFallbackScore(Restaurant restaurant) {
        double rating = restaurant.getRating();
        double orderSignal = Math.log1p(Math.max(0, restaurant.getTotalOrders())) / 10.0;
        double impressionSignal = Math.log1p(Math.max(0, restaurant.getTotalImpressions())) / 20.0;
        double openBoost = restaurant.isOpen() ? 0.75 : -1.0;
        return rating + orderSignal + impressionSignal + openBoost;
    }

    private int accountAgeDays(User user) {
        if (user.getCreatedOn() == null) {
            return 0;
        }
        long ageMillis = Math.max(0, new Date().getTime() - user.getCreatedOn().getTime());
        return (int) (ageMillis / (24L * 60L * 60L * 1000L));
    }

    private String jsonString(JsonObject object, String key, String fallback) {
        if (object == null || !object.has(key) || object.get(key).isJsonNull()) {
            return fallback;
        }
        try {
            return object.get(key).getAsString();
        } catch (RuntimeException ignored) {
            return fallback;
        }
    }

    private int jsonInt(JsonObject object, String key, int fallback) {
        if (object == null || !object.has(key) || object.get(key).isJsonNull()) {
            return fallback;
        }
        try {
            return object.get(key).getAsInt();
        } catch (RuntimeException ignored) {
            return fallback;
        }
    }

    private long jsonLong(JsonObject object, String key, long fallback) {
        if (object == null || !object.has(key) || object.get(key).isJsonNull()) {
            return fallback;
        }
        try {
            return object.get(key).getAsLong();
        } catch (RuntimeException ignored) {
            return fallback;
        }
    }

    private double jsonDouble(JsonObject object, String key, double fallback) {
        if (object == null || !object.has(key) || object.get(key).isJsonNull()) {
            return fallback;
        }
        try {
            return object.get(key).getAsDouble();
        } catch (RuntimeException ignored) {
            return fallback;
        }
    }

    private boolean jsonBoolean(JsonObject object, String key, boolean fallback) {
        if (object == null || !object.has(key) || object.get(key).isJsonNull()) {
            return fallback;
        }
        try {
            return object.get(key).getAsBoolean();
        } catch (RuntimeException ignored) {
            return fallback;
        }
    }

    private String nullToEmpty(String value) {
        return value == null ? "" : value;
    }
}
