package com.app.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        com.app.zingbiteutils.DBUtils.loadEnvFile();
        SpringApplication.run(GatewayApplication.class, args);
    }
}
