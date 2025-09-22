package com.app.daoimplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.app.DAO.OrderItemDAO;
import com.app.model.OrderItem;
import com.app.utils.DBUtils;

public class OrderItemDAOImplementation implements OrderItemDAO {

    private Connection con;

    // SQL Queries
    private static final String ADD_ORDER_ITEM =
            "INSERT INTO ORDERITEM (ORDERID, MENUID, QUANTITY, SUBTOTAL) VALUES (?,?,?,?)";
    private static final String GET_ALL_ORDER_ITEMS =
            "SELECT * FROM ORDERITEM";
    private static final String GET_ORDER_ITEM_BY_ID =
            "SELECT * FROM ORDERITEM WHERE ORDERITEMID=?";
    private static final String UPDATE_ORDER_ITEM =
            "UPDATE ORDERITEM SET ORDERID=?, MENUID=?, QUANTITY=?, SUBTOTAL=? WHERE ORDERITEMID=?";
    private static final String DELETE_ORDER_ITEM =
            "DELETE FROM ORDERITEM WHERE ORDERITEMID=?";

    public OrderItemDAOImplementation() {
        try {
            con = DBUtils.myConnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public int addOrderItem(OrderItem orderItem) {
        try (PreparedStatement pstm = con.prepareStatement(ADD_ORDER_ITEM)) {
            pstm.setInt(1, orderItem.getOrderId());
            pstm.setInt(2, orderItem.getMenuId());
            pstm.setInt(3, orderItem.getQuantity());
            pstm.setDouble(4, orderItem.getSubTotal());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<OrderItem> getAllOrderItem() {
        List<OrderItem> list = new ArrayList<>();
        try (PreparedStatement pstm = con.prepareStatement(GET_ALL_ORDER_ITEMS);
             ResultSet res = pstm.executeQuery()) {
            list = extract(res);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public OrderItem getOrderItemById(int orderItemId) {
        try (PreparedStatement pstm = con.prepareStatement(GET_ORDER_ITEM_BY_ID)) {
            pstm.setInt(1, orderItemId);
            try (ResultSet res = pstm.executeQuery()) {
                List<OrderItem> list = extract(res);
                return list.isEmpty() ? null : list.get(0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int updateOrderItem(OrderItem orderItem) {
        try (PreparedStatement pstm = con.prepareStatement(UPDATE_ORDER_ITEM)) {
            pstm.setInt(1, orderItem.getOrderId());
            pstm.setInt(2, orderItem.getMenuId());
            pstm.setInt(3, orderItem.getQuantity());
            pstm.setDouble(4, orderItem.getSubTotal());
            pstm.setInt(5, orderItem.getOrderItemId());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int deleteOrderItem(int orderItemId) {
        try (PreparedStatement pstm = con.prepareStatement(DELETE_ORDER_ITEM)) {
            pstm.setInt(1, orderItemId);
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    // Helper method to map ResultSet to List<OrderItem>
    private List<OrderItem> extract(ResultSet res) throws SQLException {
        List<OrderItem> list = new ArrayList<>();
        while (res.next()) {
            list.add(new OrderItem(
                    res.getInt("ORDERITEMID"),
                    res.getInt("ORDERID"),
                    res.getInt("MENUID"),
                    res.getInt("QUANTITY"),
                    res.getDouble("SUBTOTAL")
            ));
        }
        return list;
    }
}
