package com.app.agent;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import com.google.gson.JsonObject;
import com.google.gson.Gson;

@RestController
public class AgentController {
    private static final int DEFAULT_PYTHON_AGENT_PORT = 5020;

    private final Gson gson = new Gson();
    private Process pythonProcess = null;
    private volatile boolean pythonReady = false;
    private final String pythonBaseUrl = resolvePythonBaseUrl();
    private final HttpClient httpClient = HttpClient.newBuilder()
        .connectTimeout(Duration.ofMillis(3000))
        .build();

    @PostConstruct
    public void startPythonAgentService() {
        String pythonPath = getPythonExecutable();
        File script = getScriptFile("app.py");

        try {
            List<String> command = new ArrayList<>();
            command.add(pythonPath);
            command.add(script.getAbsolutePath());

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.directory(script.getParentFile());
            pb.redirectErrorStream(true);

            // Set environment variable
            Map<String, String> env = pb.environment();
            env.put("PYTHONIOENCODING", "utf-8");
            env.putIfAbsent("ZINGBITE_AGENT_PORT", String.valueOf(resolvePythonAgentPort()));

            System.out.println("[Agent Service Wrapper] Launching Python Flask daemon: " + pythonPath + " " + script.getAbsolutePath());
            pythonProcess = pb.start();

            // Read startup output in a background thread so it doesn't block the Spring main thread
            Thread logThread = new Thread(() -> {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(pythonProcess.getInputStream(), StandardCharsets.UTF_8))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        System.out.println("[Python Agent Log] " + line);
                    }
                } catch (IOException e) {
                    System.err.println("[Agent Service Wrapper] Error reading Python stdout: " + e.getMessage());
                }
            }, "zingbite-python-agent-log");
            logThread.setDaemon(true);
            logThread.start();

            pythonReady = waitForPythonHealth(Duration.ofSeconds(45));
            if (!pythonReady) {
                System.err.println("[Agent Service Wrapper] Python agent did not become healthy within startup timeout.");
            }

        } catch (Exception e) {
            System.err.println("[Agent Service Wrapper] Failed to start Python Agent daemon: " + e.getMessage());
        }
    }

    @PreDestroy
    public void stopPythonAgentService() {
        if (pythonProcess != null) {
            System.out.println("[Agent Service Wrapper] Shutting down Python Flask daemon...");
            pythonReady = false;
            pythonProcess.destroy();
            try {
                if (!pythonProcess.waitFor(5, TimeUnit.SECONDS)) {
                    pythonProcess.destroyForcibly();
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                pythonProcess.destroyForcibly();
            }
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        boolean processAlive = isPythonProcessAlive();
        boolean pythonHealthy = processAlive && isPythonAvailable();
        JsonObject body = new JsonObject();
        body.addProperty("service", "agent-service-wrapper");
        body.addProperty("status", pythonHealthy ? "healthy" : "degraded");
        body.addProperty("pythonProcessAlive", processAlive);
        body.addProperty("pythonReady", pythonHealthy);
        return ResponseEntity.status(pythonHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE)
            .body(gson.toJson(body));
    }

    @PostMapping("/agent/chat")
    public ResponseEntity<String> chat(@RequestBody String body) {
        if (!isPythonAvailable()) {
            return agentUnavailableResponse();
        }
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(pythonBaseUrl + "/agent/chat"))
                .timeout(Duration.ofMillis(8000))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            return ResponseEntity.status(response.statusCode()).body(response.body());
        } catch (Exception e) {
            pythonReady = false;
            JsonObject errObj = new JsonObject();
            errObj.addProperty("status", "error");
            errObj.addProperty("message", "Failed to forward request to python agent: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(gson.toJson(errObj));
        }
    }

    @PostMapping("/train")
    public ResponseEntity<String> train() {
        if (!isPythonAvailable()) {
            return agentUnavailableResponse();
        }
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(pythonBaseUrl + "/train"))
                .timeout(Duration.ofMillis(60000))
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            return ResponseEntity.status(response.statusCode()).body(response.body());
        } catch (Exception e) {
            pythonReady = false;
            JsonObject errObj = new JsonObject();
            errObj.addProperty("status", "error");
            errObj.addProperty("message", "Failed to forward training request to python agent: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(gson.toJson(errObj));
        }
    }

    private String getPythonExecutable() {
        String explicit = System.getenv("ZINGBITE_PYTHON");
        if (explicit != null && !explicit.isBlank()) {
            return explicit;
        }
        return "python";
    }

    private File getScriptFile(String relativeScript) {
        String repoRoot = System.getProperty("user.dir");
        if (repoRoot.endsWith("zingbite-microservices") || repoRoot.endsWith("zingbite-microservices\\")) {
            repoRoot = new File(repoRoot).getParent();
        }
        return new File(repoRoot, "zingbite-agent-service/" + relativeScript);
    }

    private String resolvePythonBaseUrl() {
        String explicit = System.getenv("ZINGBITE_PYTHON_AGENT_URL");
        if (explicit == null || explicit.isBlank()) {
            explicit = "http://127.0.0.1:" + DEFAULT_PYTHON_AGENT_PORT;
        }
        return explicit.endsWith("/") ? explicit.substring(0, explicit.length() - 1) : explicit;
    }

    private int resolvePythonAgentPort() {
        try {
            int port = URI.create(pythonBaseUrl).getPort();
            return port > 0 ? port : DEFAULT_PYTHON_AGENT_PORT;
        } catch (Exception e) {
            return DEFAULT_PYTHON_AGENT_PORT;
        }
    }

    private boolean waitForPythonHealth(Duration timeout) throws InterruptedException {
        long deadline = System.nanoTime() + timeout.toNanos();
        while (System.nanoTime() < deadline) {
            if (!isPythonProcessAlive()) {
                return false;
            }
            if (isPythonAvailable()) {
                return true;
            }
            Thread.sleep(500);
        }
        return false;
    }

    private boolean isPythonProcessAlive() {
        return pythonProcess != null && pythonProcess.isAlive();
    }

    private boolean isPythonAvailable() {
        if (!isPythonProcessAlive()) {
            pythonReady = false;
            return false;
        }
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(pythonBaseUrl + "/health"))
                .timeout(Duration.ofMillis(1500))
                .GET()
                .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            pythonReady = response.statusCode() >= 200 && response.statusCode() < 300;
            return pythonReady;
        } catch (Exception e) {
            pythonReady = false;
            return false;
        }
    }

    private ResponseEntity<String> agentUnavailableResponse() {
        JsonObject errObj = new JsonObject();
        errObj.addProperty("status", "error");
        errObj.addProperty("message", "AI agent is starting or unavailable. Please try again shortly.");
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(gson.toJson(errObj));
    }
}
