package com.app.orders;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication(scanBasePackages = "com.app")
@ServletComponentScan(basePackages = "com.app.zingbiteServlets")
public class OrdersApplication {
    public static void main(String[] args) {
        com.app.zingbiteutils.DBUtils.loadEnvFile();
        SpringApplication.run(OrdersApplication.class, args);
    }
}
