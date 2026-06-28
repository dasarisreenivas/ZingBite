package com.app.zingbiteutils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;
import java.sql.Driver;
import java.sql.DriverManager;
import java.util.Enumeration;

public class AppContextListener implements ServletContextListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(AppContextListener.class);

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        LOGGER.info("[AppContextListener] Web application initialization started.");
        LOGGER.info("[AppContextListener] Pre-initializing Hibernate SessionFactory...");
        try {
            var sf = DBUtils.getSessionFactory();
            if (sf == null) {
                LOGGER.warn("[AppContextListener] FATAL: SessionFactory is null. Skipping dependent startup tasks.");
                return;
            }
            LOGGER.info("[AppContextListener] SessionFactory pre-initialized successfully!");

            // Run database index initialization
            LOGGER.info("[AppContextListener] Running database index initialization...");
            try {
                DatabaseIndexInitializer.initialize();
                LOGGER.info("[AppContextListener] Database index initialization completed.");
            } catch (Exception e) {
                LOGGER.warn("[AppContextListener] Database index initialization failed: " + e.getMessage());
                LOGGER.error("Unexpected error", e);
            }

            // Pre-initialize RecommendationEngine asynchronously to warm the cache
            new Thread(() -> {
                try {
                    Thread.sleep(5000);
                    LOGGER.info("[AppContextListener] Warming up RecommendationEngine similarity matrix...");
                    RecommendationEngine.initialize();
                    LOGGER.info("[AppContextListener] RecommendationEngine similarity matrix warmed up!");
                } catch (Exception e) {
                    LOGGER.warn("[AppContextListener] Failed to warm up RecommendationEngine similarity matrix: " + e.getMessage());
                    LOGGER.error("Unexpected error", e);
                }
            }, "RecommendationEngine-Warmup").start();

            // Start background payment reconciliation scheduler
            LOGGER.info("[AppContextListener] Starting background PaymentReconciliation scheduler...");
            PaymentService.getInstance().startReconciliationScheduler();

        } catch (Exception e) {
            LOGGER.warn("[AppContextListener] Failed to pre-initialize SessionFactory: " + e.getMessage());
            LOGGER.error("Unexpected error", e);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        LOGGER.info("[AppContextListener] Web application shutdown started.");

        // 1. Close Hibernate SessionFactory (closes HikariCP pool and stops housekeeper thread)
        LOGGER.info("[AppContextListener] Closing Hibernate SessionFactory...");
        try {
            DBUtils.closeFactory();
            LOGGER.info("[AppContextListener] SessionFactory closed successfully.");
        } catch (Exception e) {
            LOGGER.warn("[AppContextListener] Error closing SessionFactory: " + e.getMessage());
            LOGGER.error("Unexpected error", e);
        }

        // 2. Deregister JDBC drivers to prevent Tomcat memory leaks
        LOGGER.info("[AppContextListener] Deregistering JDBC drivers...");
        Enumeration<Driver> drivers = DriverManager.getDrivers();
        while (drivers.hasMoreElements()) {
            Driver driver = drivers.nextElement();
            try {
                DriverManager.deregisterDriver(driver);
                LOGGER.info("[AppContextListener] Deregistered driver: " + driver.getClass().getName());
            } catch (Exception e) {
                LOGGER.warn("[AppContextListener] Error deregistering driver " + driver.getClass().getName() + ": " + e.getMessage());
            }
        }

        // 3. Shutdown the MySQL AbandonedConnectionCleanupThread
        LOGGER.info("[AppContextListener] Shutting down AbandonedConnectionCleanupThread...");
        try {
            AbandonedConnectionCleanupThread.checkedShutdown();
            LOGGER.info("[AppContextListener] AbandonedConnectionCleanupThread shutdown completed.");
        } catch (Exception e) {
            LOGGER.warn("[AppContextListener] Error shutting down AbandonedConnectionCleanupThread: " + e.getMessage());
        }

        // 4. Shutdown EmailService executor pool
        LOGGER.info("[AppContextListener] Shutting down EmailService executor...");
        try {
            EmailService.shutdown();
        } catch (Exception e) {
            LOGGER.warn("[AppContextListener] Error shutting down EmailService: " + e.getMessage());
        }

        // 5. Shutdown PaymentReconciliation scheduler
        LOGGER.info("[AppContextListener] Shutting down background PaymentReconciliation scheduler...");
        try {
            PaymentService.getInstance().stopReconciliationScheduler();
        } catch (Exception e) {
            LOGGER.warn("[AppContextListener] Error shutting down PaymentService scheduler: " + e.getMessage());
        }

        // 6. Shutdown AnalyticsQueueManager batch telemetry thread
        LOGGER.info("[AppContextListener] Shutting down AnalyticsQueueManager telemetry processor...");
        try {
            AnalyticsQueueManager.getInstance().shutdown();
        } catch (Exception e) {
            LOGGER.warn("[AppContextListener] Error shutting down AnalyticsQueueManager: " + e.getMessage());
        }

        LOGGER.info("[AppContextListener] Web application shutdown completed.");
    }
}
