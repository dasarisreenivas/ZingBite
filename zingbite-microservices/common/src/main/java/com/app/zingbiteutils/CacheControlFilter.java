package com.app.zingbiteutils;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "CacheControlFilter", urlPatterns = {"/*"}, asyncSupported = true)
public class CacheControlFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpReq = (HttpServletRequest) request;
        HttpServletResponse httpRes = (HttpServletResponse) response;
        String path = httpReq.getRequestURI().substring(httpReq.getContextPath().length());

        if (path.startsWith("/assets/") || path.equals("/favicon.svg")) {
            // Assets have content-hashed filenames so can be cached long-term
            httpRes.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
            // HTML and API responses: never cache — forces browser to always
            // fetch the latest index.html which references the newest hashed assets
            httpRes.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            httpRes.setHeader("Pragma", "no-cache");
            httpRes.setHeader("Expires", "0");
        }
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {}
}
