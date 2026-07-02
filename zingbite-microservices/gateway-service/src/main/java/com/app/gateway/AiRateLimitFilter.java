package com.app.gateway;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.time.Duration;

/**
 * A stricter, per-IP rate limit filter that applies only to AI endpoints
 * (/api/ai/**). Prevents cost abuse from external LLM API calls.
 * Runs after the global RateLimitFilter (HIGHEST_PRECEDENCE + 1).
 */
@Component
public class AiRateLimitFilter implements GlobalFilter, Ordered {
    private static final Logger LOGGER = LoggerFactory.getLogger(AiRateLimitFilter.class);

    private static final String CLIENT_IP_HEADER = "X-ZingBite-Client-IP";

    @Autowired
    private ReactiveStringRedisTemplate redisTemplate;

    @Value("${ratelimit.ai.limit:15}")
    private int aiLimit;

    @Value("${ratelimit.ai.duration-minutes:1}")
    private int aiDurationMinutes;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        // Only apply to AI endpoints
        if (!path.contains("/api/ai/")) {
            return chain.filter(exchange);
        }

        // Use the resolved client IP from the global rate limit filter
        String clientIp = exchange.getRequest().getHeaders().getFirst(CLIENT_IP_HEADER);
        if (clientIp == null || clientIp.isBlank()) {
            clientIp = exchange.getRequest().getRemoteAddress() != null
                    && exchange.getRequest().getRemoteAddress().getAddress() != null
                    ? exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
                    : "unknown";
        }

        String key = "ratelimit:ai:" + clientIp;
        ServerHttpResponse response = exchange.getResponse();

        return redisTemplate.opsForValue().increment(key)
                .defaultIfEmpty(1L)
                .onErrorReturn(-1L)
                .flatMap(current -> {
                    if (current < 0) {
                        LOGGER.warn("[AiRateLimitFilter] Redis unavailable; allowing AI request");
                        return chain.filter(exchange);
                    }
                    Mono<Boolean> expiry = current == 1
                            ? redisTemplate.expire(key, Duration.ofMinutes(aiDurationMinutes)).defaultIfEmpty(true)
                            : Mono.just(true);
                    return expiry
                        .then(redisTemplate.getExpire(key))
                        .defaultIfEmpty(Duration.ofMinutes(aiDurationMinutes))
                        .onErrorReturn(Duration.ofMinutes(aiDurationMinutes))
                        .flatMap(duration -> {
                            long ttlSeconds = duration.isNegative() || duration.isZero()
                                    ? aiDurationMinutes * 60L
                                    : duration.getSeconds();
                            if (current > aiLimit) {
                                response.setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                                response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
                                response.getHeaders().add("X-RateLimit-Limit", String.valueOf(aiLimit));
                                response.getHeaders().add("X-RateLimit-Remaining", "0");
                                response.getHeaders().add("X-RateLimit-Reset", String.valueOf(ttlSeconds));

                                String jsonError = "{\"error\":\"AI rate limit exceeded. Please wait before sending more AI requests.\"}";
                                DataBuffer buffer = response.bufferFactory()
                                        .wrap(jsonError.getBytes(StandardCharsets.UTF_8));
                                return response.writeWith(Mono.just(buffer));
                            } else {
                                response.getHeaders().add("X-AI-RateLimit-Limit", String.valueOf(aiLimit));
                                response.getHeaders().add("X-AI-RateLimit-Remaining", String.valueOf(aiLimit - current));
                                response.getHeaders().add("X-AI-RateLimit-Reset", String.valueOf(ttlSeconds));
                                return chain.filter(exchange);
                            }
                        });
                });
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE + 1;
    }
}
