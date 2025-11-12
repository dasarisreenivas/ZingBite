package com.app.zingbitedaoimpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitedao.OrderHistoryDAO;
import com.app.zingbitemodels.OrderHistory;
import com.app.zingbiteutils.DBUtils;

public class OrderHistoryDAOImplementation implements OrderHistoryDAO {

//    private Connection con;
//
//    // SQL Queries
//    private static final String ADD_ORDER_HISTORY =
//            "INSERT INTO ORDERHISTORY (ORDERID, USERID, ORDERDATE, TOTALAMOUNT, ORDERSTATUS) VALUES (?,?,?,?,?)";
//    private static final String GET_ALL_ORDER_HISTORY =
//            "SELECT * FROM ORDERHISTORY";
//    private static final String GET_ORDER_HISTORY_BY_ID =
//            "SELECT * FROM ORDERHISTORY WHERE ORDERHISTORYID=?";
//    private static final String UPDATE_ORDER_HISTORY =
//            "UPDATE ORDERHISTORY SET ORDERID=?, USERID=?, ORDERDATE=?, TOTALAMOUNT=?, ORDERSTATUS=? WHERE ORDERHISTORYID=?";
//    private static final String DELETE_ORDER_HISTORY =
//            "DELETE FROM ORDERHISTORY WHERE ORDERHISTORYID=?";
//
//    public OrderHistoryDAOImplementation() {
//        try {
//            Session session = DBUtils.openSession();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

	@Override
	public int addOrderHIstory(OrderHistory oH) {
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {

			tx = session.beginTransaction();
			session.persist(oH);
			tx.commit();
			return oH.getOrderHistoryId();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<OrderHistory> getAllOrderHistory() {
		List<OrderHistory> OrderHistoryList = new ArrayList<>();
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {
			String hql = "from OrderHistory";
			Query<OrderHistory> query = session.createQuery(hql, OrderHistory.class);
			OrderHistoryList = query.list();
			tx.commit();
			return OrderHistoryList;
		} catch (Exception e) {

			if (tx != null) {
				tx.rollback();
			}
			e.printStackTrace();
		}
		return OrderHistoryList;
	}

	@Override
	public OrderHistory getOrderHistoryById(int orderHistoryId) {
		Transaction tx = null;
		OrderHistory orderHistory = null;
		try (Session session = DBUtils.openSession()) {

			tx = session.beginTransaction();
			orderHistory = session.get(OrderHistory.class, orderHistoryId);
			tx.commit();
			return orderHistory;

		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return orderHistory;
	}

	@Override
	public int updateOrderHistory(OrderHistory oH) {
		Transaction tx = null;
		int result = 0;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			session.merge(oH);
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
	public int deleteOrderHistory(int orderHistoryId) {
		Transaction tx = null;

		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			OrderHistory orderHistory = session.get(OrderHistory.class, orderHistoryId);
			if (orderHistory != null) {
				session.delete(orderHistory);
				tx.commit();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

//    // Helper method to map ResultSet to List<OrderHistory>
//    private List<OrderHistory> extract(ResultSet res) throws SQLException {
//        List<OrderHistory> list = new ArrayList<>();
//        while (res.next()) {
//            list.add(new OrderHistory(
//                    res.getInt("ORDERHISTORYID"),
//                    res.getInt("ORDERID"),
//                    res.getInt("USERID"),
//                    res.getDate("ORDERDATE"),
//                    res.getDouble("TOTALAMOUNT"),
//                    res.getString("ORDERSTATUS")
//            ));
//        }
//        return list;
//    }
}
