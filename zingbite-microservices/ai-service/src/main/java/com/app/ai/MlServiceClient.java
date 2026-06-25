package com.app.ai;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Map;
import java.util.Optional;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class MlServiceClient {
    private static final Map<String, String> MODEL_FLAGS = Map.of(
        "recommender", "ZINGBITE_AI_RECOMMENDER_ENABLED",
        "search_rank", "ZINGBITE_AI_SEARCH_RANK_ENABLED",
        "cart_optimizer", "ZINGBITE_AI_CART_OPTIMIZER_ENABLED",
        "demand_forecast", "ZINGBITE_AI_DEMAND_FORECAST_ENABLED",
        "eta", "ZINGBITE_AI_ETA_ENABLED",
        "fraud", "ZINGBITE_AI_FRAUD_ENABLED",
        "nlp", "ZINGBITE_AI_NLP_ENABLED"
    );

    private final Gson gson = new Gson();
    private final HttpClient httpClient;
    private final String baseUrl;

    public MlServiceClient() {
        this(getConfig("ZINGBITE_ML_SERVICE_URL", "http://localhost:5010"));
    }

    MlServiceClient(String baseUrl) {
        this.baseUrl = trimTrailingSlash(baseUrl);
        this.httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofMillis(900))
            .build();
    }

    public Optional<JsonObject> predict(String modelName, JsonObject payload) {
        if (!isModelEnabled(modelName)) {
            return Optional.empty();
        }
        return post("/predict/" + urlEncode(modelName), payload);
    }

    public Optional<JsonObject> train(String modelName) {
        if (!flagEnabled("ZINGBITE_ML_TRAINING_ENABLED", false)) {
            return Optional.empty();
        }
        return post("/train/" + urlEncode(modelName), new JsonObject());
    }

    public Optional<JsonObject> trainAll() {
        if (!flagEnabled("ZINGBITE_ML_TRAINING_ENABLED", false)) {
            return Optional.empty();
        }
        return post("/train/all", new JsonObject());
    }

    private Optional<JsonObject> post(String path, JsonObject payload) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .timeout(Duration.ofMillis(1600))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(gson.toJson(payload), StandardCharsets.UTF_8))
                .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                return Optional.empty();
            }
            return Optional.of(JsonParser.parseString(response.body()).getAsJsonObject());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return Optional.empty();
        } catch (IOException | RuntimeException e) {
            return Optional.empty();
        }
    }

    private boolean isModelEnabled(String modelName) {
        if (!flagEnabled("ZINGBITE_AI_ENABLED", true)) {
            return false;
        }
        String flag = MODEL_FLAGS.get(modelName);
        return flag == null || flagEnabled(flag, true);
    }

    private static boolean flagEnabled(String key, boolean defaultValue) {
        String value = getConfig(key, null);
        if (value == null || value.isBlank()) {
            return defaultValue;
        }
        return value.equalsIgnoreCase("true")
            || value.equalsIgnoreCase("1")
            || value.equalsIgnoreCase("yes")
            || value.equalsIgnoreCase("on");
    }

    private static String getConfig(String key, String fallback) {
        String value = System.getenv(key);
        if (value == null || value.isBlank()) {
            value = System.getProperty(key);
        }
        return value == null || value.isBlank() ? fallback : value;
    }

    private static String trimTrailingSlash(String value) {
        if (value == null || value.isBlank()) {
            return "http://localhost:5010";
        }
        return value.endsWith("/") ? value.substring(0, value.length() - 1) : value;
    }

    private static String urlEncode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
