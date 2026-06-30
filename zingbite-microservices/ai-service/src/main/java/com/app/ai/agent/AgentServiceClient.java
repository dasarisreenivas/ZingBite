package com.app.ai.agent;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class AgentServiceClient {
    private final Gson gson = new Gson();
    private final HttpClient httpClient;
    private final String baseUrl;

    public AgentServiceClient() {
        String url = System.getenv("ZINGBITE_AGENT_SERVICE_URL");
        if (url == null || url.isBlank()) {
            url = System.getProperty("ZINGBITE_AGENT_SERVICE_URL", "http://localhost:8099");
        }
        if (url.endsWith("/")) {
            url = url.substring(0, url.length() - 1);
        }
        this.baseUrl = url;
        this.httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofMillis(4000))
            .build();
    }

    public JsonObject chat(JsonObject payload) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/agent/chat"))
                .timeout(Duration.ofMillis(6000))
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(gson.toJson(payload), StandardCharsets.UTF_8))
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            return parseJsonResponse(response, "Agent service");
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            JsonObject errorResponse = new JsonObject();
            errorResponse.addProperty("status", "error");
            errorResponse.addProperty("message", "Error connecting to python agent service: " + e.getMessage());
            return errorResponse;
        }
    }

    public JsonObject train() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/train"))
                .timeout(Duration.ofMillis(60000))
                .header("Accept", "application/json")
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            return parseJsonResponse(response, "Training");
        } catch (IOException | InterruptedException e) {
            if (e instanceof InterruptedException) {
                Thread.currentThread().interrupt();
            }
            JsonObject errorResponse = new JsonObject();
            errorResponse.addProperty("status", "error");
            errorResponse.addProperty("message", "Error starting training pipeline: " + e.getMessage());
            return errorResponse;
        }
    }

    private JsonObject parseJsonResponse(HttpResponse<String> response, String operationName) {
        JsonObject parsed = null;
        try {
            parsed = JsonParser.parseString(response.body()).getAsJsonObject();
        } catch (Exception ignored) {
            // Build a stable JSON response below.
        }

        if (response.statusCode() >= 200 && response.statusCode() < 300 && parsed != null) {
            return parsed;
        }

        JsonObject errorResponse = parsed != null ? parsed : new JsonObject();
        errorResponse.addProperty("status", "error");
        if (!errorResponse.has("message")) {
            errorResponse.addProperty("message", operationName + " returned status " + response.statusCode());
        }
        errorResponse.addProperty("upstreamStatus", response.statusCode());
        return errorResponse;
    }
}
