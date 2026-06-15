package com.app.zingbiteutils;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class DatabaseIndexInitializer {
    public static void initialize() {
        System.out.println("[DBIndex] Starting Database Index Initialization...");
        String[] indexSqls = {
            "CREATE INDEX IF NOT EXISTS idx_orders_user ON orders (userId)",
            "CREATE INDEX IF NOT EXISTS idx_orders_rider ON orders (riderId)",
            "CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (orderStatus)",
            "CREATE INDEX IF NOT EXISTS idx_menu_restaurant ON menu (RESTAURANTID)"
        };

        try (Session session = DBUtils.openSession()) {
            for (String sql : indexSqls) {
                Transaction tx = null;
                try {
                    tx = session.beginTransaction();
                    session.createNativeQuery(sql).executeUpdate();
                    tx.commit();
                    System.out.println("[DBIndex] Successfully executed: " + sql);
                } catch (Exception e) {
                    if (tx != null) {
                        try { tx.rollback(); } catch (Exception ignored) {}
                    }
                    String msg = e.getMessage();
                    if (msg != null && (msg.contains("Duplicate key name") || msg.contains("already exists"))) {
                        System.out.println("[DBIndex] Index already exists: " + sql);
                    } else {
                        System.err.println("[DBIndex] Failed to execute: " + sql + " - Error: " + msg);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("[DBIndex] Finished database index check/creation.");
    }

    public static void main(String[] args) {
        initialize();
        DBUtils.closeFactory();
    }
}
