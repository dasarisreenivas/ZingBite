package com.app.gateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.nio.charset.StandardCharsets;

@Component
public class RateLimitFilter implements GlobalFilter, Ordered {

    @Autowired
    private ReactiveStringRedisTemplate redisTemplate;

    @Value("${ratelimit.limit:100}")
    private int limit;

    @Value("${ratelimit.duration-minutes:1}")
    private int durationMinutes;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();

        String ip = "unknown";
        String forwardedFor = request.getHeaders().getFirst("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            ip = forwardedFor.split(",", 2)[0].trim();
        } else if (request.getRemoteAddress() != null && request.getRemoteAddress().getAddress() != null) {
            ip = request.getRemoteAddress().getAddress().getHostAddress();
        }

        String key = "ratelimit:" + ip;

        return redisTemplate.opsForValue().increment(key)
                .defaultIfEmpty(1L)
                .onErrorReturn(-1L)
                .flatMap(current -> {
                    if (current < 0) {
                        System.err.println("[RateLimitFilter] Redis unavailable; allowing request");
                        return chain.filter(exchange);
                    }
                    Mono<Boolean> expiry = current == 1
                            ? redisTemplate.expire(key, Duration.ofMinutes(durationMinutes)).defaultIfEmpty(true)
                            : Mono.just(true);
                    return expiry
                        .then(redisTemplate.getExpire(key))
                        .defaultIfEmpty(Duration.ofMinutes(durationMinutes))
                        .onErrorReturn(Duration.ofMinutes(durationMinutes))
                        .flatMap(duration -> {
                            long ttlSeconds = duration.isNegative() || duration.isZero()
                                    ? durationMinutes * 60L
                                    : duration.getSeconds();
                            if (current > limit) {
                                response.setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                                response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
                                response.getHeaders().add("X-RateLimit-Limit", String.valueOf(limit));
                                response.getHeaders().add("X-RateLimit-Remaining", "0");
                                response.getHeaders().add("X-RateLimit-Reset", String.valueOf(ttlSeconds));

                                String jsonError = "{\"error\":\"Rate limit exceeded. Try again later.\"}";
                                DataBuffer buffer = response.bufferFactory()
                                        .wrap(jsonError.getBytes(StandardCharsets.UTF_8));
                                return response.writeWith(Mono.just(buffer));
                            } else {
                                response.getHeaders().add("X-RateLimit-Limit", String.valueOf(limit));
                                response.getHeaders().add("X-RateLimit-Remaining", String.valueOf(limit - current));
                                response.getHeaders().add("X-RateLimit-Reset", String.valueOf(ttlSeconds));
                                return chain.filter(exchange);
                            }
                        });
                });
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
