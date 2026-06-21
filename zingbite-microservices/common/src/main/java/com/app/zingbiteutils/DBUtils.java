package com.app.zingbiteutils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.OrderHistory;
import com.app.zingbitemodels.OrderItem;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Job;
import com.app.zingbitemodels.Application;
import com.app.zingbitemodels.RestaurantRequest;
import com.app.zingbitemodels.EmailNotification;
import com.app.zingbitemodels.ChatMessage;
import com.app.zingbitemodels.ContactMessage;
import com.app.zingbitemodels.OrderStatusConverter;
import com.app.zingbitemodels.Payment;
import com.app.zingbitemodels.AnalyticsEvent;
import com.app.zingbitemodels.OrderStatusLog;
import com.app.zingbitemodels.WishlistItem;
import com.app.zingbitemodels.Review;
import com.app.zingbitemodels.Notification;
import com.app.zingbitemodels.ComboMapping;

	public class DBUtils {

	private static SessionFactory sf;

	static {
		loadEnvFile();

		try {
			String dbUser = getEnvRequired("ZINGBITE_DB_USER");
			String dbPass = getEnvRequired("ZINGBITE_DB_PASSWORD");
			String dbUrl = getEnvRequired("ZINGBITE_DB_URL");

			Configuration config = new Configuration().configure("hibernate.cfg.xml")
									.setProperty("hibernate.connection.username", dbUser)
									.setProperty("hibernate.connection.password", dbPass)
									.setProperty("hibernate.connection.url", dbUrl)
									.addAnnotatedClass(Menu.class)
									.addAnnotatedClass(OrderHistory.class)
									.addAnnotatedClass(Orders.class)
									.addAnnotatedClass(OrderItem.class)
									.addAnnotatedClass(Restaurant.class)
									.addAnnotatedClass(User.class)
									.addAnnotatedClass(Job.class)
									.addAnnotatedClass(Application.class)
									.addAnnotatedClass(RestaurantRequest.class)
									.addAnnotatedClass(EmailNotification.class)
									.addAnnotatedClass(ChatMessage.class)
									.addAnnotatedClass(ContactMessage.class)
									.addAnnotatedClass(OrderStatusConverter.class)
									.addAnnotatedClass(Payment.class)
									.addAnnotatedClass(AnalyticsEvent.class)
									.addAnnotatedClass(OrderStatusLog.class)
									.addAnnotatedClass(WishlistItem.class)
									.addAnnotatedClass(Review.class)
									.addAnnotatedClass(Notification.class)
									.addAnnotatedClass(ComboMapping.class);
			sf = config.buildSessionFactory();
			System.out.println("session factory created successfully");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void loadEnvFile() {
		java.io.File envFile = null;
		String[] searchPaths = {
			System.getProperty("catalina.base"),
			System.getProperty("wtp.deploy"),
			System.getProperty("user.dir"),
			".",
			"..",
			"../..",
			"../../..",
			System.getProperty("user.home") + System.getProperty("file.separator") + "ZingBite",
			System.getenv("ZINGBITE_HOME"),
			"D:\\ZingBite"
		};
		for (String path : searchPaths) {
			if (path == null) continue;
			envFile = new java.io.File(path, ".env");
			if (envFile.exists()) break;
		}
		if (envFile == null || !envFile.exists()) {
			envFile = new java.io.File(".." + System.getProperty("file.separator") + ".." + System.getProperty("file.separator") + ".." + System.getProperty("file.separator") + ".env");
		}
		if (envFile.exists()) {
			try (InputStream is = new FileInputStream(envFile)) {
				Properties props = new Properties();
				props.load(is);
				for (String key : props.stringPropertyNames()) {
					if (System.getenv(key) == null) {
						System.setProperty(key, props.getProperty(key));
					}
				}
				System.out.println("[DBUtils] Loaded " + props.size() + " config entries from " + envFile.getAbsolutePath());
			} catch (Exception e) {
				System.err.println("[DBUtils] Could not load .env file: " + e.getMessage());
			}
		} else {
			System.out.println("[DBUtils] No .env file found, using system env vars / defaults");
		}
	}

	private static String getEnv(String key, String fallback) {
		String val = System.getenv(key);
		if (val == null || val.isEmpty()) {
			val = System.getProperty(key);
		}
		return (val != null && !val.isEmpty()) ? val : fallback;
	}

	private static String getEnvRequired(String key) {
		String val = System.getenv(key);
		if (val == null || val.isEmpty()) {
			val = System.getProperty(key);
		}
		if (val == null || val.isEmpty()) {
			throw new RuntimeException("Required environment variable not set: " + key
				+ ". Please set it in your .env file or system environment.");
		}
		return val;
	}

	public static SessionFactory getSessionFactory() {
		return sf;
	}

	public static Session openSession() {
		return getSessionFactory().openSession();
	}

	public static void closeFactory() {
		if (sf != null && !sf.isClosed()) {
			sf.close();
		}
	}

}
