package com.app.gateway;

import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

/** Applies browser security headers to both static frontend and proxied responses. */
@Component
public class GatewaySecurityHeadersFilter implements WebFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        HttpHeaders headers = exchange.getResponse().getHeaders();
        headers.set("X-Content-Type-Options", "nosniff");
        headers.set("X-Frame-Options", "DENY");
        headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
        headers.set("Permissions-Policy", "geolocation=(self), microphone=(), camera=(), payment=(self \"https://checkout.razorpay.com\" \"https://api.razorpay.com\")");
        headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        headers.set("Content-Security-Policy",
                "default-src 'self'; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com "
                + "https://unpkg.com https://cdnjs.cloudflare.com; "
                + "style-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com; "
                + "img-src 'self' data: https: blob:; "
                + "font-src 'self' data:; connect-src 'self' https://*.openstreetmap.org "
                + "https://nominatim.openstreetmap.org wss: https://api.razorpay.com; "
                + "frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com; "
                + "object-src 'none'; base-uri 'self'; form-action 'self'");
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
