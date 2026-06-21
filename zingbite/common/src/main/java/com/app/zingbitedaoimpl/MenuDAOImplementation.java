package com.app.zingbitedaoimpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitemodels.Menu;
import com.app.zingbiteutils.DBUtils;

public class MenuDAOImplementation implements MenuDAO {

	// SQL queries are updated for correctness and consistency.
//    private static final String ADD_MENU = "INSERT INTO MENU(RESTAURANTID, MENUNAME, PRICE, ITEMDESCRIPTION, ISAVAILABLE, IMAGEPATH) VALUES (?,?,?,?,?,?)";
//    private static final String GET_ALL_MENU = "SELECT * FROM MENU";
//    private static final String GET_MENU_BY_ID = "SELECT * FROM MENU WHERE MENUID=?";
//    private static final String UPDATE_MENU = "UPDATE MENU SET MENUNAME=?, PRICE=?, ITEMDESCRIPTION=?, ISAVAILABLE=?, IMAGEPATH=? WHERE MENUID=?";
//    private static final String DELETE_MENU = "DELETE FROM MENU WHERE MENUID=?";
//    private static final String GET_MENU_BY_RESTAURANT = "SELECT * FROM MENU WHERE RESTAURANTID=?";

	@Override
	public int addMenu(Menu m) {
		Transaction tx = null;
		// Using try-with-resources to automatically manage and close the connection.
		try (Session session = DBUtils.openSession()) {

			tx = session.beginTransaction();
			session.persist(m);
			tx.commit();
			return m.getMenuId();

		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<Menu> getAllMenu() {
		List<Menu> menuList = new ArrayList<>();
		Transaction tx = null;
		// try-with-resources for Connection, PreparedStatement, and ResultSet
		try (Session session = DBUtils.openSession()) {

			tx = session.beginTransaction();
			String hql = "from Menu";
			Query<Menu> query = session.createQuery(hql, Menu.class);
			menuList = query.list();
			tx.commit();

			return menuList;

		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return menuList;
	}

	@Override
	public Menu getMenuById(int menuId) {
		Menu menu = null;
		try (Session session = DBUtils.openSession()) {
			menu = session.get(Menu.class, menuId);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return menu;
	}

	@Override
	public int updateMenu(Menu m) {
		Transaction tx = null;
		int result = 0;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			session.merge(m);
			tx.commit();
			result = 1;
		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public int deleteMenu(int menuId) {
		Transaction tx = null;
		int result = 0;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			Menu menu = session.get(Menu.class, menuId);
			if (menu != null) {
				session.remove(menu);
				tx.commit();
				result = 1;
			}
		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List<Menu> getMenuRestaurantById(int restaurantId) {
		List<Menu> menuList = new ArrayList<>();
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {

			tx = session.beginTransaction();
			String hql = " from Menu m where m.restaurant.restaurantId = :rid";
			Query<Menu> query = session.createQuery(hql, Menu.class);
			query.setParameter("rid", restaurantId);
			menuList = query.list();
			tx.commit();

		} catch (Exception e) {

			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return menuList;
	}

}