package com.app.zingbiteutils;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SecurityHeadersFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        httpResponse.setHeader("X-Content-Type-Options", "nosniff");
        httpResponse.setHeader("X-Frame-Options", "DENY");
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");
        httpResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        httpResponse.setHeader("Permissions-Policy", "geolocation=(self), microphone=(), camera=(), payment=(self \"https://checkout.razorpay.com\" \"https://api.razorpay.com\")");
        httpResponse.setHeader("Cross-Origin-Resource-Policy", "same-origin");
        httpResponse.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
        httpResponse.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
        httpResponse.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        httpResponse.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com; img-src 'self' data: https: blob: https://*.razorpay.com; font-src 'self' data:; connect-src 'self' http://localhost:* https://*.openstreetmap.org https://nominatim.openstreetmap.org wss: https://api.razorpay.com; frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com; object-src 'none'; base-uri 'self'; form-action 'self'");

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {}
}
