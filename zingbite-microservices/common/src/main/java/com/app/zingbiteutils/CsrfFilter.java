package com.app.zingbiteutils;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CsrfFilter implements Filter {

    private static final String[] EXCLUDED_PATHS = {
        "/api/login", "/api/register", "/api/payment/webhook", "/api/ws/", "/api/analytics", "/api/contact",
        "/api/ai/voice-command", "/api/ai/assistant", "/api/ai/search-rank", "/api/ai/cart-optimize",
        "/api/ai/eta", "/api/ai/feedback", "/api/ai/chat-assist"
    };

    @Override
    public void init(FilterConfig filterConfig) {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        String method = req.getMethod();
        String path = req.getRequestURI();

        // Skip CSRF for WebSocket upgrade requests and excluded paths
        String upgradeHeader = req.getHeader("Upgrade");
        if ("websocket".equalsIgnoreCase(upgradeHeader)) {
            chain.doFilter(request, response);
            return;
        }

        boolean isExcluded = false;
        for (String excluded : EXCLUDED_PATHS) {
            if (path.equals(excluded) || (excluded.endsWith("/") && path.startsWith(excluded))) {
                isExcluded = true;
                break;
            }
        }

        if (!isExcluded && ("POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method) || "DELETE".equalsIgnoreCase(method))) {
            if (!CsrfUtils.validateToken(req)) {
                resp.setContentType("application/json");
                resp.setCharacterEncoding("UTF-8");
                resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
                resp.getWriter().write("{\"error\":\"Invalid or missing CSRF token\"}");
                return;
            }
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {}
}
