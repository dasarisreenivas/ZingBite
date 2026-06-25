package com.app.chat;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * Enables Spring Boot's embedded Tomcat container to scan and register
 * `@ServerEndpoint` annotated classes (like ChatWebSocketEndpoint and GroupOrderWebSocketEndpoint).
 */
@Configuration
public class WebSocketConfig {
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
