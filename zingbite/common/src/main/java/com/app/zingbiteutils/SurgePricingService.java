package com.app.zingbiteutils;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalTime;
import java.util.Locale;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class SurgePricingService {

    public static class SurgeDetails {
        private final float multiplier;
        private final String reason;

        public SurgeDetails(float multiplier, String reason) {
            this.multiplier = multiplier;
            this.reason = reason;
        }

        public float getMultiplier() {
            return multiplier;
        }

        public String getReason() {
            return reason;
        }
    }

    private static float getMultiplierForWmoCode(int code) {
        if (code >= 51 && code <= 57) {
            return 1.1f;
        } else if ((code >= 61 && code <= 63) || (code >= 71 && code <= 73) || code == 80 || code == 81 || code == 85) {
            return 1.25f;
        } else if (code == 65 || code == 75 || code == 82 || code == 86 || (code >= 95 && code <= 99)) {
            return 1.5f;
        }
        return 1.0f;
    }

    private static String getReasonForWmoCode(int code) {
        if (code >= 51 && code <= 57) {
            return "Drizzle";
        } else if ((code >= 61 && code <= 63) || (code >= 71 && code <= 73) || code == 80 || code == 81 || code == 85) {
            return "Rain/Snow";
        } else if (code == 65 || code == 75 || code == 82 || code == 86 || (code >= 95 && code <= 99)) {
            return "Thunderstorm";
        }
        return "Clear";
    }

    private static SurgeDetails getOfflineFallback(double latitude, double longitude, String mockWeather) {
        float weatherMultiplier = 1.0f;
        String weatherReason = "Clear";

        if (mockWeather != null && !mockWeather.trim().isEmpty()) {
            String normalized = mockWeather.trim().toLowerCase(Locale.US);
            try {
                int code = Integer.parseInt(normalized);
                weatherMultiplier = getMultiplierForWmoCode(code);
                weatherReason = getReasonForWmoCode(code);
            } catch (NumberFormatException e) {
                if (normalized.contains("drizzle")) {
                    weatherMultiplier = 1.1f;
                    weatherReason = "Drizzle";
                } else if (normalized.contains("rain") || normalized.contains("snow") || normalized.contains("moderate")) {
                    weatherMultiplier = 1.25f;
                    weatherReason = "Rain/Snow";
                } else if (normalized.contains("thunderstorm") || normalized.contains("heavy") || normalized.contains("storm")) {
                    weatherMultiplier = 1.5f;
                    weatherReason = "Thunderstorm";
                } else if (normalized.contains("clear")) {
                    weatherMultiplier = 1.0f;
                    weatherReason = "Clear";
                }
            }
        } else {
            String latStr = String.valueOf(latitude);
            String lngStr = String.valueOf(longitude);
            boolean endsWith999 = latStr.endsWith(".999") || lngStr.endsWith(".999")
                || Math.abs((Math.abs(latitude) % 1) - 0.999) < 1e-4
                || Math.abs((Math.abs(longitude) % 1) - 0.999) < 1e-4;

            if (endsWith999) {
                weatherMultiplier = 1.5f;
                weatherReason = "Thunderstorm";
            }
        }

        return new SurgeDetails(weatherMultiplier, weatherReason);
    }

    public static SurgeDetails calculateSurge(double latitude, double longitude, String mockWeather) {
        return calculateSurge(latitude, longitude, mockWeather, LocalTime.now());
    }

    public static SurgeDetails calculateSurge(double latitude, double longitude, String mockWeather, LocalTime time) {
        float weatherMultiplier = 1.0f;
        String weatherReason = "Clear";
        boolean bypassed = false;

        if (mockWeather != null && !mockWeather.trim().isEmpty()) {
            SurgeDetails mockResult = getOfflineFallback(latitude, longitude, mockWeather);
            weatherMultiplier = mockResult.getMultiplier();
            weatherReason = mockResult.getReason();
            bypassed = true;
        } else {
            String latStr = String.valueOf(latitude);
            String lngStr = String.valueOf(longitude);
            boolean endsWith999 = latStr.endsWith(".999") || lngStr.endsWith(".999")
                || Math.abs((Math.abs(latitude) % 1) - 0.999) < 1e-4
                || Math.abs((Math.abs(longitude) % 1) - 0.999) < 1e-4;

            if (endsWith999) {
                weatherMultiplier = 1.5f;
                weatherReason = "Thunderstorm";
                bypassed = true;
            }
        }

        if (!bypassed) {
            boolean apiSuccess = false;
            try {
                HttpClient client = HttpClient.newBuilder()
                    .connectTimeout(Duration.ofMillis(2000))
                    .build();

                String url = String.format(Locale.US, "https://api.open-meteo.com/v1/forecast?latitude=%.6f&longitude=%.6f&current_weather=true", latitude, longitude);

                HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofMillis(2000))
                    .GET()
                    .build();

                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                if (response.statusCode() == 200) {
                    JsonObject json = JsonParser.parseString(response.body()).getAsJsonObject();
                    if (json.has("current_weather")) {
                        JsonObject currentWeather = json.getAsJsonObject("current_weather");
                        int code = -1;
                        if (currentWeather.has("weathercode")) {
                            code = currentWeather.get("weathercode").getAsInt();
                        } else if (currentWeather.has("weather_code")) {
                            code = currentWeather.get("weather_code").getAsInt();
                        }
                        if (code != -1) {
                            weatherMultiplier = getMultiplierForWmoCode(code);
                            weatherReason = getReasonForWmoCode(code);
                            apiSuccess = true;
                        }
                    }
                }
            } catch (Exception e) {
                // Fallback will be triggered
            }

            if (!apiSuccess) {
                SurgeDetails fallback = getOfflineFallback(latitude, longitude, mockWeather);
                weatherMultiplier = fallback.getMultiplier();
                weatherReason = fallback.getReason();
            }
        }

        float peakMultiplier = 1.0f;
        String peakReason = "";

        if (!bypassed) {
            if (!time.isBefore(LocalTime.of(12, 0)) && time.isBefore(LocalTime.of(15, 0))) {
                peakMultiplier = 1.3f;
                peakReason = "Lunch Peak";
            } else if (!time.isBefore(LocalTime.of(19, 0)) && time.isBefore(LocalTime.of(22, 0))) {
                peakMultiplier = 1.4f;
                peakReason = "Dinner Peak";
            } else if (!time.isBefore(LocalTime.of(23, 0)) || time.isBefore(LocalTime.of(2, 0))) {
                peakMultiplier = 1.2f;
                peakReason = "Late Night Peak";
            }
        }

        float finalMultiplier = Math.max(weatherMultiplier, peakMultiplier);
        String finalReason;
        if (finalMultiplier == 1.0f) {
            finalReason = "Normal";
        } else if (weatherMultiplier > peakMultiplier) {
            finalReason = weatherReason;
        } else if (peakMultiplier > weatherMultiplier) {
            finalReason = peakReason;
        } else {
            finalReason = peakReason + " & " + weatherReason;
        }

        return new SurgeDetails(finalMultiplier, finalReason);
    }
}
