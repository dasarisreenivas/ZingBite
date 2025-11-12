package com.app.zingbitedaoimpl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitedao.OrderItemDAO;
import com.app.zingbitemodels.OrderItem;
import com.app.zingbiteutils.DBUtils;

public class OrderItemDAOImplementation implements OrderItemDAO {

//    private Connection con;
//
//    // SQL Queries
//    private static final String ADD_ORDER_ITEM =
//            "INSERT INTO ORDERITEM (ORDERID, MENUID, QUANTITY, SUBTOTAL) VALUES (?,?,?,?)";
//    private static final String GET_ALL_ORDER_ITEMS =
//            "SELECT * FROM ORDERITEM";
//    private static final String GET_ORDER_ITEM_BY_ID =
//            "SELECT * FROM ORDERITEM WHERE ORDERITEMID=?";
//    private static final String UPDATE_ORDER_ITEM =
//            "UPDATE ORDERITEM SET ORDERID=?, MENUID=?, QUANTITY=?, SUBTOTAL=? WHERE ORDERITEMID=?";
//    private static final String DELETE_ORDER_ITEM =
//            "DELETE FROM ORDERITEM WHERE ORDERITEMID=?";
//
//    public OrderItemDAOImplementation() {
//        try {
//            con = DBUtils.myConnect();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

	@Override
	public int addOrderItem(OrderItem orderItem) {
		Transaction tx = null;

		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			session.persist(orderItem);
			tx.commit();
			return orderItem.getMenuId();
		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<OrderItem> getAllOrderItem() {
		List<OrderItem> list = new ArrayList<>();
		Transaction tx = null;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			String hql = "from OrderItem";
			Query<OrderItem> query = session.createQuery(hql, OrderItem.class);
			list = query.list();
			tx.commit();
		} catch (Exception e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public OrderItem getOrderItemById(int orderItemId) {
		OrderItem orderItem = null;
		try (Session session = DBUtils.openSession()) {
			orderItem = session.get(OrderItem.class, orderItemId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orderItem;
	}

	@Override
	public int updateOrderItem(OrderItem orderItem) {
		Transaction tx = null;
		int result = 0;
		try (Session session = DBUtils.openSession()) {
			tx = session.beginTransaction();
			session.merge(orderItem);
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
	public int deleteOrderItem(int orderItemId) {
		Transaction tx = null;
		int result = 0;
		try (Session session = DBUtils.openSession()) {

			tx = session.beginTransaction();
			OrderItem orderItem = session.get(OrderItem.class, orderItemId);
			if (orderItem != null) {
				session.delete(orderItemId);
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

// Helper method to map ResultSet to List<OrderItem>
//    private List<OrderItem> extract(ResultSet res) throws SQLException {
//        List<OrderItem> list = new ArrayList<>();
//        while (res.next()) {
//            list.add(new OrderItem(
//                    res.getInt("ORDERITEMID"),
//                    res.getInt("ORDERID"),
//                    res.getInt("MENUID"),
//                    res.getInt("QUANTITY"),
//                    res.getDouble("SUBTOTAL")
//            ));
//        }
//        return list;
//    }
}
