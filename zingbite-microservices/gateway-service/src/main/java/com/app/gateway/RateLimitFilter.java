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
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

@Component
public class RateLimitFilter implements GlobalFilter, Ordered {
    private static final Logger LOGGER = LoggerFactory.getLogger(RateLimitFilter.class);

    private static final String CLIENT_IP_HEADER = "X-ZingBite-Client-IP";

    @Autowired
    private ReactiveStringRedisTemplate redisTemplate;

    @Value("${ratelimit.limit:100}")
    private int limit;

    @Value("${ratelimit.duration-minutes:1}")
    private int durationMinutes;

    @Value("${ratelimit.trust-forwarded-headers:false}")
    private boolean trustForwardedHeaders;

    @Value("${ratelimit.trusted-proxies:127.0.0.1,::1}")
    private String trustedProxies;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();

        String remoteIp = request.getRemoteAddress() != null
                && request.getRemoteAddress().getAddress() != null
                ? request.getRemoteAddress().getAddress().getHostAddress()
                : "unknown";
        boolean requestFromTrustedProxy = Arrays.stream(trustedProxies.split(","))
                .map(String::trim)
                .anyMatch(remoteIp::equals);

        String ip = remoteIp;
        if (trustForwardedHeaders && requestFromTrustedProxy) {
            String forwardedFor = request.getHeaders().getFirst("X-Forwarded-For");
            if (forwardedFor != null && !forwardedFor.isBlank()) {
                String candidate = forwardedFor.split(",", 2)[0].trim();
                if (candidate.length() <= 64 && candidate.matches("[0-9a-fA-F:.]+")) {
                    ip = candidate;
                }
            }
        }

        final String clientIp = ip;
        ServerHttpRequest downstreamRequest = request.mutate()
                .headers(headers -> {
                    headers.remove(CLIENT_IP_HEADER);
                    headers.set(CLIENT_IP_HEADER, clientIp);
                })
                .build();
        ServerWebExchange downstreamExchange = exchange.mutate().request(downstreamRequest).build();

        String key = "ratelimit:" + clientIp;

        return redisTemplate.opsForValue().increment(key)
                .defaultIfEmpty(1L)
                .onErrorReturn(-1L)
                .flatMap(current -> {
                    if (current < 0) {
                        LOGGER.warn("[RateLimitFilter] Redis unavailable; allowing request");
                        return chain.filter(downstreamExchange);
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
                                return chain.filter(downstreamExchange);
                            }
                        });
                });
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
