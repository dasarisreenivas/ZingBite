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

public class DBUtils {

	private static SessionFactory sf;

	static {
		try {
			Configuration config = new Configuration().configure("hibernate.cfg.xml")
									.addAnnotatedClass(Menu.class)
									.addAnnotatedClass(OrderHistory.class)
									.addAnnotatedClass(Orders.class)
									.addAnnotatedClass(OrderItem.class)
									.addAnnotatedClass(Restaurant.class)
									.addAnnotatedClass(User.class);
			sf =config.buildSessionFactory();
			System.out.println("session factory created successfully");

		} catch (Exception e) {
			System.out.println("Session factory failed to create" + e);
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
