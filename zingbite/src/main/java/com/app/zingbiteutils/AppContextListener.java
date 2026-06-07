package com.app.zingbiteutils;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;
import java.sql.Driver;
import java.sql.DriverManager;
import java.util.Enumeration;

@WebListener
public class AppContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("[AppContextListener] Web application initialization started.");
        System.out.println("[AppContextListener] Pre-initializing Hibernate SessionFactory...");
        try {
            DBUtils.getSessionFactory();
            System.out.println("[AppContextListener] SessionFactory pre-initialized successfully!");
        } catch (Exception e) {
            System.err.println("[AppContextListener] Failed to pre-initialize SessionFactory: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("[AppContextListener] Web application shutdown started.");
        
        // 1. Close Hibernate SessionFactory (closes HikariCP pool and stops housekeeper thread)
        System.out.println("[AppContextListener] Closing Hibernate SessionFactory...");
        try {
            DBUtils.closeFactory();
            System.out.println("[AppContextListener] SessionFactory closed successfully.");
        } catch (Exception e) {
            System.err.println("[AppContextListener] Error closing SessionFactory: " + e.getMessage());
            e.printStackTrace();
        }

        // 2. Deregister JDBC drivers to prevent Tomcat memory leaks
        System.out.println("[AppContextListener] Deregistering JDBC drivers...");
        Enumeration<Driver> drivers = DriverManager.getDrivers();
        while (drivers.hasMoreElements()) {
            Driver driver = drivers.nextElement();
            try {
                DriverManager.deregisterDriver(driver);
                System.out.println("[AppContextListener] Deregistered driver: " + driver.getClass().getName());
            } catch (Exception e) {
                System.err.println("[AppContextListener] Error deregistering driver " + driver.getClass().getName() + ": " + e.getMessage());
            }
        }

        // 3. Shutdown the MySQL AbandonedConnectionCleanupThread
        System.out.println("[AppContextListener] Shutting down AbandonedConnectionCleanupThread...");
        try {
            AbandonedConnectionCleanupThread.checkedShutdown();
            System.out.println("[AppContextListener] AbandonedConnectionCleanupThread shutdown completed.");
        } catch (Exception e) {
            System.err.println("[AppContextListener] Error shutting down AbandonedConnectionCleanupThread: " + e.getMessage());
        }

        // 4. Shutdown EmailService executor pool
        System.out.println("[AppContextListener] Shutting down EmailService executor...");
        try {
            EmailService.shutdown();
        } catch (Exception e) {
            System.err.println("[AppContextListener] Error shutting down EmailService: " + e.getMessage());
        }

        System.out.println("[AppContextListener] Web application shutdown completed.");
    }
}