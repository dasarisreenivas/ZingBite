package com.app.zingbitedaoimpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.app.zingbitedao.OrdersDAo;
import com.app.zingbitemodels.Orders;
import com.app.zingbiteutils.DBUtils;

public class OrdersDAOImplementation implements OrdersDAo {

    private Connection con;

    // SQL Queries
    private static final String ADD_ORDERS =
            "INSERT INTO ORDERS (RESTAURANTID, USERID, ORDERTIME, TOTALAMOUNT, ORDERSTATUS, PAYMENTMETHOD) VALUES (?,?,?,?,?,?)";
    private static final String GET_ALL_ORDERS =
            "SELECT * FROM ORDERS";
    private static final String GET_ORDERS_BY_ID =
            "SELECT * FROM ORDERS WHERE ORDERID=?";
    private static final String UPDATE_ORDERS =
            "UPDATE ORDERS SET RESTAURANTID=?, USERID=?, ORDERTIME=?, TOTALAMOUNT=?, ORDERSTATUS=?, PAYMENTMETHOD=? WHERE ORDERID=?";
    private static final String DELETE_ORDERS =
            "DELETE FROM ORDERS WHERE ORDERID=?";

    public OrdersDAOImplementation() {
        try {
            con = DBUtils.myConnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public int addOrders(Orders orders) {
        try (PreparedStatement pstm = con.prepareStatement(ADD_ORDERS)) {
            pstm.setInt(1, orders.getRestaurantId());
            pstm.setInt(2, orders.getUserId());
            pstm.setString(3, orders.getOrderTime());
            pstm.setFloat(4, orders.getTotalAmount());
            pstm.setString(5, orders.getOrderStatus());
            pstm.setString(6, orders.getPaymentMethod());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Orders> getAllOrders() {
        List<Orders> list = new ArrayList<>();
        try (PreparedStatement pstm = con.prepareStatement(GET_ALL_ORDERS);
             ResultSet res = pstm.executeQuery()) {
            list = extract(res);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public Orders getOrdersById(int orderId) {
        try (PreparedStatement pstm = con.prepareStatement(GET_ORDERS_BY_ID)) {
            pstm.setInt(1, orderId);
            try (ResultSet res = pstm.executeQuery()) {
                List<Orders> list = extract(res);
                return list.isEmpty() ? null : list.get(0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int updateOrders(Orders orders) {
        try (PreparedStatement pstm = con.prepareStatement(UPDATE_ORDERS)) {
            pstm.setInt(1, orders.getRestaurantId());
            pstm.setInt(2, orders.getUserId());
            pstm.setString(3, orders.getOrderTime());
            pstm.setFloat(4, orders.getTotalAmount());
            pstm.setString(5, orders.getOrderStatus());
            pstm.setString(6, orders.getPaymentMethod());
            pstm.setInt(7, orders.getOrderId());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int deleteOrders(int orderId) {
        try (PreparedStatement pstm = con.prepareStatement(DELETE_ORDERS)) {
            pstm.setInt(1, orderId);
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    // Helper method to map ResultSet to List<Orders>
    private List<Orders> extract(ResultSet res) throws SQLException {
        List<Orders> list = new ArrayList<>();
        while (res.next()) {
            list.add(new Orders(
                    res.getInt("ORDERID"),
                    res.getInt("RESTAURANTID"),
                    res.getInt("USERID"),
                    res.getString("ORDERTIME"),
                    res.getFloat("TOTALAMOUNT"),
                    res.getString("ORDERSTATUS"),
                    res.getString("PAYMENTMETHOD")
            ));
        }
        return list;
    }


}
