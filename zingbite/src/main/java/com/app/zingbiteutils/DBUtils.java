package com.app.zingbiteutils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtils {
	
	private static final  String URL = "jdbc:mysql://localhost:3306/foodapp";
	private static final String DB_USERNAME = "root";
	private static final String DB_PASSWORD = "Srinivas@192004";
	private static Connection con;
	
	public static  Connection myConnect() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection(URL,DB_USERNAME,DB_PASSWORD);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return con;
	}
	
}
