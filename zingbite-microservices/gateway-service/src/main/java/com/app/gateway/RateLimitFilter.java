package com.app.gateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Component
public class RateLimitFilter implements GlobalFilter, Ordered {

    @Autowired
    private ReactiveStringRedisTemplate redisTemplate;

    private static final int LIMIT = 100;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();

        String ip = "unknown";
        if (request.getRemoteAddress() != null && request.getRemoteAddress().getAddress() != null) {
            ip = request.getRemoteAddress().getAddress().getHostAddress();
        }

        String key = "ratelimit:" + ip;

        return redisTemplate.opsForValue().increment(key)
                .flatMap(current -> {
                    Mono<Duration> ttlMono = redisTemplate.getExpire(key);
                    return ttlMono.flatMap(duration -> {
                        long ttlSeconds = duration.isNegative() || duration.isZero() ? 60 : duration.getSeconds();
                        
                        // If it's a new key (current == 1), set expiration
                        Mono<Boolean> expireMono = Mono.just(true);
                        if (current == 1) {
                            expireMono = redisTemplate.expire(key, Duration.ofMinutes(1));
                        }

                        return expireMono.flatMap(success -> {
                            if (current > LIMIT) {
                                response.setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
                                response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
                                response.getHeaders().add("X-RateLimit-Limit", String.valueOf(LIMIT));
                                response.getHeaders().add("X-RateLimit-Remaining", "0");
                                response.getHeaders().add("X-RateLimit-Reset", String.valueOf(ttlSeconds));

                                String jsonError = "{\"error\":\"Rate limit exceeded. Try again later.\"}";
                                DataBuffer buffer = response.bufferFactory().wrap(jsonError.getBytes());
                                return response.writeWith(Mono.just(buffer));
                            } else {
                                response.getHeaders().add("X-RateLimit-Limit", String.valueOf(LIMIT));
                                response.getHeaders().add("X-RateLimit-Remaining", String.valueOf(LIMIT - current));
                                response.getHeaders().add("X-RateLimit-Reset", String.valueOf(ttlSeconds));
                                return chain.filter(exchange);
                            }
                        });
                    });
                });
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
