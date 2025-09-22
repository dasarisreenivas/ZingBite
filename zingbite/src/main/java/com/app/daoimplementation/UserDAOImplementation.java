package com.app.daoimplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.app.DAO.UserDAO;
import com.app.model.User;
import com.app.utils.DBUtils;

public class UserDAOImplementation implements UserDAO {

    private Connection con;

    // SQL Queries
    private static final String ADD_USER =
            "INSERT INTO USER(USERNAME, EMAIL, PASSWORD, PHONENUMBER, ADDRESS) VALUES (?,?,?,?,?)";
    private static final String GET_ALL_USERS =
            "SELECT * FROM USER";
    private static final String GET_USER_BY_EMAIL =
            "SELECT * FROM USER WHERE EMAIL=?";
    private static final String UPDATE_USER_ON_EMAIL =
            "UPDATE USER SET USERNAME=?, PASSWORD=?, PHONENUMBER=?, ADDRESS=? WHERE EMAIL=?";
    private static final String DELETE_USER_ON_USER_ID =
            "DELETE FROM USER WHERE USERID=?";

    public UserDAOImplementation() {
        try {
            con = DBUtils.myConnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public int addUser(User u) {
        try (PreparedStatement pstm = con.prepareStatement(ADD_USER)) {
            pstm.setString(1, u.getUserName());
            pstm.setString(2, u.getEmail());
            pstm.setString(3, u.getPassword());
            pstm.setLong(4, u.getPhoneNumber());
            pstm.setString(5, u.getAddress());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> userList = new ArrayList<>();
        try (PreparedStatement pstm = con.prepareStatement(GET_ALL_USERS);
             ResultSet res = pstm.executeQuery()) {
            userList = extract(res);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userList;
    }

    @Override
    public User getUserById(String email) {
        try (PreparedStatement pstm = con.prepareStatement(GET_USER_BY_EMAIL)) {
            pstm.setString(1, email);
            try (ResultSet res = pstm.executeQuery()) {
                List<User> userList = extract(res);
                return userList.isEmpty() ? null : userList.get(0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int updateUser(User u) {
        try (PreparedStatement pstm = con.prepareStatement(UPDATE_USER_ON_EMAIL)) {
            pstm.setString(1, u.getUserName());
            pstm.setString(2, u.getPassword());
            pstm.setLong(3, u.getPhoneNumber());
            pstm.setString(4, u.getAddress());
            pstm.setString(5, u.getEmail());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int deleteUser(int userID) {
        try (PreparedStatement pstm = con.prepareStatement(DELETE_USER_ON_USER_ID)) {
            pstm.setInt(1, userID);
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    // Helper method to map ResultSet to List<User>
    private List<User> extract(ResultSet res) throws SQLException {
        List<User> list = new ArrayList<>();
        while (res.next()) {
            list.add(new User(
                    res.getInt("USERID"),
                    res.getString("USERNAME"),
                    res.getString("EMAIL"),
                    res.getString("PASSWORD"),
                    res.getLong("PHONENUMBER"),
                    res.getString("ADDRESS")
            ));
        }
        return list;
    }
}
