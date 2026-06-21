import java.sql.*;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

public class TestDB {
    public static void main(String[] args) {
        String dbUser = null;
        String dbPass = null;
        String dbUrl = null;

        // Load .env
        try {
            java.io.File envFile = new java.io.File("D:\\ZingBite\\.env");
            if (!envFile.exists()) {
                envFile = new java.io.File("C:\\Users\\HP\\ZingBite\\.env");
            }
            if (envFile.exists()) {
                Properties props = new Properties();
                try (InputStream is = new FileInputStream(envFile)) {
                    props.load(is);
                    dbUser = props.getProperty("ZINGBITE_DB_USER");
                    dbPass = props.getProperty("ZINGBITE_DB_PASSWORD");
                    dbUrl = props.getProperty("ZINGBITE_DB_URL");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (dbUser == null) dbUser = System.getenv("ZINGBITE_DB_USER");
        if (dbPass == null) dbPass = System.getenv("ZINGBITE_DB_PASSWORD");
        if (dbUrl == null) dbUrl = System.getenv("ZINGBITE_DB_URL");

        System.out.println("Connecting to: " + dbUrl + " as " + dbUser);

        try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPass)) {
            System.out.println("Connection successful!");

            System.out.println("\n--- Tables ---");
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SHOW TABLES")) {
                while (rs.next()) {
                    System.out.println(rs.getString(1));
                }
            }

            System.out.println("\n--- Columns in menu ---");
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("DESCRIBE menu")) {
                while (rs.next()) {
                    System.out.println(rs.getString(1) + " - " + rs.getString(2));
                }
            }

            System.out.println("\n--- Columns in combo_mappings ---");
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("DESCRIBE combo_mappings")) {
                while (rs.next()) {
                    System.out.println(rs.getString(1) + " - " + rs.getString(2));
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
