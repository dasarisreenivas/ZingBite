package com.app.zingbitedaoimpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitedao.OrdersDAo;
import com.app.zingbitemodels.Orders;
import com.app.zingbiteutils.DBUtils;

public class OrdersDAOImplementation implements OrdersDAo {

//    private Connection con;
//
//    // SQL Queries
//    private static final String ADD_ORDERS =
//            "INSERT INTO ORDERS (RESTAURANTID, USERID, ORDERTIME, TOTALAMOUNT, ORDERSTATUS, PAYMENTMETHOD) VALUES (?,?,?,?,?,?)";
//    private static final String GET_ALL_ORDERS =
//            "SELECT * FROM ORDERS";
//    private static final String GET_ORDERS_BY_ID =
//            "SELECT * FROM ORDERS WHERE ORDERID=?";
//    private static final String UPDATE_ORDERS =
//            "UPDATE ORDERS SET RESTAURANTID=?, USERID=?, ORDERTIME=?, TOTALAMOUNT=?, ORDERSTATUS=?, PAYMENTMETHOD=? WHERE ORDERID=?";
//    private static final String DELETE_ORDERS =
//            "DELETE FROM ORDERS WHERE ORDERID=?";
//
//    public OrdersDAOImplementation() {
//        try {
//            con = DBUtils.myConnect();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

	@Override
	public int addOrders(Orders orders) {
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			session.persist(orders);
			tx.commit();
			return orders.getOrderId();

		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<Orders> getAllOrders() {
		List<Orders> ordersList = new ArrayList<>();
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			String hql = "from Orders";
			Query<Orders> query = session.createQuery(hql, Orders.class);
			ordersList = query.list();
			tx.commit();

		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return ordersList;
	}

	@Override
	public Orders getOrdersById(int orderId) {
		Transaction tx = null;
		Orders orders = null;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			orders = session.get(Orders.class, orderId);
			tx.commit();
		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return orders;
	}

	@Override
	public int updateOrders(Orders orders) {
		Transaction tx = null;
		int result = 0;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			session.merge(orders);
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
	public int deleteOrders(int orderId) {
		Transaction tx = null;
		int result = 0;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			Orders orders = session.get(Orders.class, orderId);
			if (orders != null) {
				session.delete(orders);
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

// Helper method to map ResultSet to List<Orders>
//    private List<Orders> extract(ResultSet res) throws SQLException {
//        List<Orders> list = new ArrayList<>();
//        while (res.next()) {
//            list.add(new Orders(
//                    res.getInt("ORDERID"),
//                    res.getInt("RESTAURANTID"),
//                    res.getInt("USERID"),
//                    res.getString("ORDERTIME"),
//                    res.getFloat("TOTALAMOUNT"),
//                    res.getString("ORDERSTATUS"),
//                    res.getString("PAYMENTMETHOD")
//            ));
//        }
//        return list;
//    }

}
