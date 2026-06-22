package com.app.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication(exclude = {
        DataSourceAutoConfiguration.class,
        HibernateJpaAutoConfiguration.class
})
public class GatewayApplication {
    public static void main(String[] args) {
        com.app.zingbiteutils.DBUtils.loadEnvFile();
        SpringApplication.run(GatewayApplication.class, args);
    }
}
