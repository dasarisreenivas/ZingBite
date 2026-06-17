package com.app.zingbiteServlets;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebFilter(urlPatterns = "/api/*", asyncSupported = true)
public class RateLimitFilter implements Filter {

    private static final int MAX_REQUESTS = 100;
    private static final long WINDOW_MS = 60_000L;
    private static final Map<String, RateLimitEntry> requestCounts = new ConcurrentHashMap<>();

    @Override
    public void init(FilterConfig filterConfig) {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        String clientIp = getClientIp(req);
        if (clientIp == null) {
            chain.doFilter(request, response);
            return;
        }

        long now = System.currentTimeMillis();
        RateLimitEntry entry = requestCounts.compute(clientIp, (key, existing) -> {
            if (existing == null || now - existing.windowStart > WINDOW_MS) {
                return new RateLimitEntry(now, new AtomicInteger(1));
            }
            int newCount = existing.count.get() + 1;
            return new RateLimitEntry(existing.windowStart, new AtomicInteger(newCount));
        });

        int current = entry.count.get();
        int remaining = Math.max(0, MAX_REQUESTS - current);
        res.setHeader("X-RateLimit-Limit", String.valueOf(MAX_REQUESTS));
        res.setHeader("X-RateLimit-Remaining", String.valueOf(remaining));
        res.setHeader("X-RateLimit-Reset", String.valueOf((entry.windowStart + WINDOW_MS) / 1000));

        if (current > MAX_REQUESTS) {
            res.setContentType("application/json");
            res.setCharacterEncoding("UTF-8");
            res.setStatus(429);
            res.getWriter().write("{\"error\":\"Rate limit exceeded. Try again later.\"}");
            return;
        }

        chain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest req) {
        String ip = req.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = req.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = req.getRemoteAddr();
        }
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }

    @Override
    public void destroy() {
        requestCounts.clear();
    }

    private static class RateLimitEntry {
        final long windowStart;
        final AtomicInteger count;

        RateLimitEntry(long windowStart, AtomicInteger count) {
            this.windowStart = windowStart;
            this.count = count;
        }
    }
}
