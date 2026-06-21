import java.sql.*;
public class Count {
    public static void main(String[] args) throws Exception {
        String dbUser = "root";
        String dbPass = "Srinivas@192004";
        String dbUrl = "jdbc:mysql://localhost:3306/ZingBite";
        try (Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPass);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM restaurant")) {
            if (rs.next()) {
                System.out.println("Total restaurants: " + rs.getInt(1));
            }
        }
    }
}
