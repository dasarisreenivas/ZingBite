package com.app.zingbiteutils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class DatabaseIndexInitializer {
    private static final Logger LOGGER = LoggerFactory.getLogger(DatabaseIndexInitializer.class);

    public static void initialize() {
        LOGGER.info("[DBIndex] Starting Database Index Initialization...");
        String[][] indexes = {
            {"idx_orders_user", "orders", "userId"},
            {"idx_orders_rider", "orders", "riderId"},
            {"idx_orders_status", "orders", "orderStatus"},
            {"idx_menu_restaurant", "menu", "RESTAURANTID"}
        };

        try (Session session = DBUtils.openSession()) {
            for (String[] idx : indexes) {
                String idxName = idx[0], table = idx[1], column = idx[2];
                Transaction tx = null;
                try {
                    tx = session.beginTransaction();
                    Number count = (Number) session.createNativeQuery(
                        "SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = :tbl AND index_name = :idx"
                    ).setParameter("tbl", table).setParameter("idx", idxName).getSingleResult();
                    if (count.longValue() == 0) {
                        session.createNativeQuery("CREATE INDEX " + idxName + " ON " + table + " (" + column + ")").executeUpdate();
                        LOGGER.info("[DBIndex] Created index: " + idxName + " ON " + table + " (" + column + ")");
                    } else {
                        LOGGER.info("[DBIndex] Index already exists: " + idxName);
                    }
                    tx.commit();
                } catch (Exception e) {
                    if (tx != null) {
                        try { tx.rollback(); } catch (Exception ignored) {}
                    }
                    LOGGER.warn("[DBIndex] Failed to create index " + idxName + ": " + e.getMessage());
                }
            }
        } catch (Exception e) {
            LOGGER.error("Unexpected error", e);
        }
        LOGGER.info("[DBIndex] Finished database index check/creation.");
    }

    public static void main(String[] args) {
        initialize();
        DBUtils.closeFactory();
    }
}
