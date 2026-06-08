package com.app.zingbiteutils;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "CacheControlFilter", urlPatterns = {"/assets/*", "/css/*", "/script/*", "/videos/*", "/favicon.svg", "/icons.svg"}, asyncSupported = true)
public class CacheControlFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        // Cache static assets for 1 year (31536000 seconds)
        httpResponse.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {}
}
