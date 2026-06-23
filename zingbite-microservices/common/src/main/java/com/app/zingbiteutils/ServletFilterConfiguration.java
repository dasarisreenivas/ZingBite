package com.app.zingbiteutils;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** Registers only the shared HTTP filters, without discovering utility listeners. */
@Configuration
public class ServletFilterConfiguration {
    @Bean
    FilterRegistrationBean<SecurityHeadersFilter> securityHeadersFilterRegistration() {
        FilterRegistrationBean<SecurityHeadersFilter> registration =
                new FilterRegistrationBean<>(new SecurityHeadersFilter());
        registration.addUrlPatterns("/*");
        registration.setAsyncSupported(true);
        registration.setOrder(1);
        return registration;
    }

    @Bean
    FilterRegistrationBean<CacheControlFilter> cacheControlFilterRegistration() {
        FilterRegistrationBean<CacheControlFilter> registration =
                new FilterRegistrationBean<>(new CacheControlFilter());
        registration.addUrlPatterns("/*");
        registration.setAsyncSupported(true);
        registration.setOrder(2);
        return registration;
    }

    @Bean
    FilterRegistrationBean<CsrfFilter> csrfFilterRegistration() {
        FilterRegistrationBean<CsrfFilter> registration =
                new FilterRegistrationBean<>(new CsrfFilter());
        registration.addUrlPatterns("/api/*");
        registration.setAsyncSupported(true);
        registration.setOrder(3);
        return registration;
    }
}
