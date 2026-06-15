package com.app.zingbiteutils;

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

	public class DBUtils {

	private static SessionFactory sf;

	static {
		try {
			String defaultPass = "Srinivas@192004";
			String dbUser = System.getenv().getOrDefault("ZINGBITE_DB_USER", "root");
			String dbPass = System.getenv().getOrDefault("ZINGBITE_DB_PASS", defaultPass);
			String dbUrl = System.getenv().getOrDefault("ZINGBITE_DB_URL", "jdbc:mysql://localhost:3306/ZingBite");

			if (!System.getenv().containsKey("ZINGBITE_DB_PASS")) {
				System.out.println("[DBUtils] WARNING: ZINGBITE_DB_PASS env var not set. Using default (hardcoded) password. Set ZINGBITE_DB_PASS in your environment for production security.");
			}

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
									.addAnnotatedClass(AnalyticsEvent.class);
			sf = config.buildSessionFactory();
			System.out.println("session factory created successfully");

		} catch (Exception e) {
			e.printStackTrace();
		}
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
