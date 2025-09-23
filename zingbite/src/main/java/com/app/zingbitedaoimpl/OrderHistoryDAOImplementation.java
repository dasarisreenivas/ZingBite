package com.app.zingbitedaoimpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.app.zingbitedao.OrderHistoryDAO;
import com.app.zingbitemodels.OrderHistory;
import com.app.zingbiteutils.DBUtils;

public class OrderHistoryDAOImplementation implements OrderHistoryDAO {

    private Connection con;

    // SQL Queries
    private static final String ADD_ORDER_HISTORY =
            "INSERT INTO ORDERHISTORY (ORDERID, USERID, ORDERDATE, TOTALAMOUNT, ORDERSTATUS) VALUES (?,?,?,?,?)";
    private static final String GET_ALL_ORDER_HISTORY =
            "SELECT * FROM ORDERHISTORY";
    private static final String GET_ORDER_HISTORY_BY_ID =
            "SELECT * FROM ORDERHISTORY WHERE ORDERHISTORYID=?";
    private static final String UPDATE_ORDER_HISTORY =
            "UPDATE ORDERHISTORY SET ORDERID=?, USERID=?, ORDERDATE=?, TOTALAMOUNT=?, ORDERSTATUS=? WHERE ORDERHISTORYID=?";
    private static final String DELETE_ORDER_HISTORY =
            "DELETE FROM ORDERHISTORY WHERE ORDERHISTORYID=?";

    public OrderHistoryDAOImplementation() {
        try {
            con = DBUtils.myConnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public int addOrderHIstory(OrderHistory oH) {
        try (PreparedStatement pstm = con.prepareStatement(ADD_ORDER_HISTORY)) {
            pstm.setInt(1, oH.getOrderId());
            pstm.setInt(2, oH.getUserID());
            pstm.setDate(3, new java.sql.Date(oH.getOrderDate().getTime()));
            pstm.setDouble(4, oH.getTotalAmount());
            pstm.setString(5, oH.getOrderStatus());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<OrderHistory> getAllOrderHistory() {
        List<OrderHistory> list = new ArrayList<>();
        try (PreparedStatement pstm = con.prepareStatement(GET_ALL_ORDER_HISTORY);
             ResultSet res = pstm.executeQuery()) {
            list = extract(res);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public OrderHistory getOrderHistoryById(int orderHistoryId) {
        try (PreparedStatement pstm = con.prepareStatement(GET_ORDER_HISTORY_BY_ID)) {
            pstm.setInt(1, orderHistoryId);
            try (ResultSet res = pstm.executeQuery()) {
                List<OrderHistory> list = extract(res);
                return list.isEmpty() ? null : list.get(0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int updateOrderHistory(OrderHistory oH) {
        try (PreparedStatement pstm = con.prepareStatement(UPDATE_ORDER_HISTORY)) {
            pstm.setInt(1, oH.getOrderId());
            pstm.setInt(2, oH.getUserID());
            pstm.setDate(3, new java.sql.Date(oH.getOrderDate().getTime()));
            pstm.setDouble(4, oH.getTotalAmount());
            pstm.setString(5, oH.getOrderStatus());
            pstm.setInt(6, oH.getOrderHistoryId());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int deleteOrderHistory(int orderHistoryId) {
        try (PreparedStatement pstm = con.prepareStatement(DELETE_ORDER_HISTORY)) {
            pstm.setInt(1, orderHistoryId);
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    // Helper method to map ResultSet to List<OrderHistory>
    private List<OrderHistory> extract(ResultSet res) throws SQLException {
        List<OrderHistory> list = new ArrayList<>();
        while (res.next()) {
            list.add(new OrderHistory(
                    res.getInt("ORDERHISTORYID"),
                    res.getInt("ORDERID"),
                    res.getInt("USERID"),
                    res.getDate("ORDERDATE"),
                    res.getDouble("TOTALAMOUNT"),
                    res.getString("ORDERSTATUS")
            ));
        }
        return list;
    }
}
