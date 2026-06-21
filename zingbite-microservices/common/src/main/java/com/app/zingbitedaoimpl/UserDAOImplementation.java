package com.app.zingbitedaoimpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitedao.UserDAO;
import com.app.zingbitemodels.User;
import com.app.zingbiteutils.DBUtils;

public class UserDAOImplementation implements UserDAO {

//    private Connection con;
//
//    // SQL Queries
//    private static final String ADD_USER =
//            "INSERT INTO USER(USERNAME, EMAIL, PASSWORD, PHONENUMBER, ADDRESS) VALUES (?,?,?,?,?)";
//    private static final String GET_ALL_USERS =
//            "SELECT * FROM USER";
//    private static final String GET_USER_BY_EMAIL =
//            "SELECT * FROM USER WHERE EMAIL=?";
//    private static final String UPDATE_USER_ON_EMAIL =
//            "UPDATE USER SET USERNAME=?, PASSWORD=?, PHONENUMBER=?, ADDRESS=? WHERE EMAIL=?";
//    private static final String DELETE_USER_ON_USER_ID =
//            "DELETE FROM USER WHERE USERID=?";
//
//    public UserDAOImplementation() {
//        try {
//            con = DBUtils.myConnect();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

	@Override
	public int addUser(User u) {
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			session.persist(u);
			tx.commit();
			return u.getUserID();
		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<User> getAllUsers() {
		List<User> userList = new ArrayList<>();
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			String hql = "from User ";
			Query<User> query = session.createQuery(hql, User.class);
			userList = query.list();
			tx.commit();

		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return userList;
	}

	@Override
	public User getUserById(String email) {
		Transaction tx = null;
		User user = null;
		try (Session session = DBUtils.openSession()) {

			tx = session.beginTransaction();
			String hql = "FROM User WHERE email = :email";
			Query<User> query = session.createQuery(hql, User.class);
			query.setParameter("email", email);

			user = query.uniqueResult();

			tx.commit();
			return user;
		} catch (Exception e) {
			try {
				if (tx != null && tx.isActive())
					tx.rollback();
			} catch (Exception rbf) {
				System.err.println("rollback failed" + rbf);
				e.printStackTrace();
			}
		}
		return user;
	}

	@Override
	public int updateUser(User u) {
		int result = 0;
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			session.merge(u);
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
	public int deleteUser(int userID) {
		int result = 0;
		Transaction tx = null;

		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			User user = session.get(User.class, userID);
			if (user != null) {
				session.remove(user);
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

//    // Helper method to map ResultSet to List<User>
//    private List<User> extract(ResultSet res) throws SQLException {
//        List<User> list = new ArrayList<>();
//        while (res.next()) {
//            list.add(new User(
//                    res.getInt("USERID"),
//                    res.getString("USERNAME"),
//                    res.getString("EMAIL"),
//                    res.getString("PASSWORD"),
//                    res.getLong("PHONENUMBER"),
//                    res.getString("ADDRESS")
//            ));
//        }
//        return list;
//    }
}
