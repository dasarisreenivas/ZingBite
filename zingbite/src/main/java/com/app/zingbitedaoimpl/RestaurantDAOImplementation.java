package com.app.zingbitedaoimpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.app.zingbitedao.RestaurantDAO;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbiteutils.DBUtils;

public class RestaurantDAOImplementation implements RestaurantDAO {

    private Connection con;

    // SQL Queries
    private static final String ADD_RESTAURANT =
            "INSERT INTO RESTAURANT (RESTAURANTNAME, DELIVERYTIME, CUSINETYPE, ADDRESS, RATING, ISACTIVE, ADMINID, IMAGEPATH) VALUES (?,?,?,?,?,?,?,?)";
    private static final String GET_ALL_RESTAURANTS =
            "SELECT * FROM RESTAURANT";
    private static final String GET_RESTAURANT_BY_ID =
            "SELECT * FROM RESTAURANT WHERE RESTAURANTID=?";
    private static final String UPDATE_RESTAURANT =
            "UPDATE RESTAURANT SET RESTAURANTNAME=?, DELIVERYTIME=?, CUSINETYPE=?, ADDRESS=?, RATING=?, ISACTIVE=?, ADMINID=?, IMAGEPATH=? WHERE RESTAURANTID=?";
    private static final String DELETE_RESTAURANT =
            "DELETE FROM RESTAURANT WHERE RESTAURANTID=?";

    public RestaurantDAOImplementation() {
        try {
            con = DBUtils.myConnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public int addRestaurant(Restaurant restaurant) {
        try (PreparedStatement pstm = con.prepareStatement(ADD_RESTAURANT)) {
            pstm.setString(1, restaurant.getRestaurantName());
            pstm.setString(2, restaurant.getDeliveryTime());
            pstm.setString(3, restaurant.getCusineType());
            pstm.setString(4, restaurant.getAddress());
            pstm.setFloat(5, restaurant.getRating());
            pstm.setBoolean(6, restaurant.isActive());
            pstm.setInt(7, restaurant.getAdminId());
            pstm.setString(8, restaurant.getImagePath());

            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> list = new ArrayList<>();
        try (PreparedStatement pstm = con.prepareStatement(GET_ALL_RESTAURANTS);
             ResultSet res = pstm.executeQuery()) {
            list = extract(res);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public Restaurant getRestaurantById(int restaurantId) {
        try (PreparedStatement pstm = con.prepareStatement(GET_RESTAURANT_BY_ID)) {
            pstm.setInt(1, restaurantId);
            try (ResultSet res = pstm.executeQuery()) {
                List<Restaurant> list = extract(res);
                return list.isEmpty() ? null : list.get(0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int updateRestaurant(Restaurant restaurant) {
        try (PreparedStatement pstm = con.prepareStatement(UPDATE_RESTAURANT)) {
            pstm.setString(1, restaurant.getRestaurantName());
            pstm.setString(2, restaurant.getDeliveryTime());
            pstm.setString(3, restaurant.getCusineType());
            pstm.setString(4, restaurant.getAddress());
            pstm.setFloat(5, restaurant.getRating());
            pstm.setBoolean(6, restaurant.isActive());
            pstm.setInt(7, restaurant.getAdminId());
            pstm.setString(8, restaurant.getImagePath());
            pstm.setInt(9, restaurant.getRestaurantId());

            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int deleteRestaurant(int restaurantId) {
        try (PreparedStatement pstm = con.prepareStatement(DELETE_RESTAURANT)) {
            pstm.setInt(1, restaurantId);
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    // Helper method to map ResultSet to List<Restaurant>
    private List<Restaurant> extract(ResultSet res) throws SQLException {
        List<Restaurant> list = new ArrayList<>();
        while (res.next()) {
            list.add(new Restaurant(
                    res.getInt("RESTAURANTID"),
                    res.getString("RESTAURANTNAME"),
                    res.getString("DELIVERYTIME"),
                    res.getString("CUSINETYPE"),
                    res.getString("ADDRESS"),
                    res.getFloat("RATINGS"),
                    res.getBoolean("ISACTIVE"),
                    res.getInt("ADMINID"),
                    res.getString("IMAGEPATH")
            ));
        }
        return list;
    }
}
