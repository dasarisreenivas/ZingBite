package com.app.zingbiteutils;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.HandshakeResponse;
import jakarta.websocket.server.HandshakeRequest;
import jakarta.websocket.server.ServerEndpointConfig;

public class GetHttpSessionConfigurator extends ServerEndpointConfig.Configurator {
    @Override
    public void modifyHandshake(ServerEndpointConfig config, HandshakeRequest request, HandshakeResponse response) {
        HttpSession httpSession = (HttpSession) request.getHttpSession();
        if (httpSession != null) {
            config.getUserProperties().put("httpSession", httpSession);
        }
    }

    @Override
    public boolean checkOrigin(String originHeaderValue) {
        if (originHeaderValue == null || originHeaderValue.isEmpty()) {
            return true;
        }
        return originHeaderValue.equals("http://localhost:5173") ||
               originHeaderValue.equals("http://127.0.0.1:5173") ||
               originHeaderValue.equals("http://localhost:8080") ||
               originHeaderValue.equals("http://127.0.0.1:8080") ||
               originHeaderValue.equals("http://localhost:8090") ||
               originHeaderValue.equals("http://127.0.0.1:8090") ||
               originHeaderValue.equals("http://localhost:8086") ||
               originHeaderValue.equals("http://127.0.0.1:8086") ||
               originHeaderValue.endsWith(".trycloudflare.com");
    }
}
