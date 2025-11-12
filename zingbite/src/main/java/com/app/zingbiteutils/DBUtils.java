package com.app.zingbiteutils;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class DBUtils {

	private static SessionFactory sf;

	static {
		try {
			sf = new Configuration().configure().buildSessionFactory();
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
