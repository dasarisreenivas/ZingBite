package com.app.zingbiteutils;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class DatabaseIndexInitializer {
    public static void main(String[] args) {
        System.out.println("Starting Database Index Initialization...");
        String[] indexSqls = {
            "CREATE INDEX idx_orders_user ON orders (userId)",
            "CREATE INDEX idx_orders_rider ON orders (riderId)",
            "CREATE INDEX idx_orders_restaurant ON orders (restaurant(255))",
            "CREATE INDEX idx_orders_status ON orders (orderStatus)",
            "CREATE INDEX idx_menu_restaurant ON menu (RESTAURANTID)"
        };

        try (Session session = DBUtils.openSession()) {
            for (String sql : indexSqls) {
                Transaction tx = null;
                try {
                    tx = session.beginTransaction();
                    session.createNativeQuery(sql).executeUpdate();
                    tx.commit();
                    System.out.println("Successfully executed: " + sql);
                } catch (Exception e) {
                    if (tx != null) {
                        try { tx.rollback(); } catch (Exception ignored) {}
                    }
                    String msg = e.getMessage();
                    if (msg != null && (msg.contains("Duplicate key name") || msg.contains("already exists"))) {
                        System.out.println("Index already exists: " + sql);
                    } else {
                        System.err.println("Failed to execute: " + sql + " - Error: " + msg);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBUtils.closeFactory();
        }
        System.out.println("Finished database index check/creation.");
    }
}
