package com.app.daoimplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.app.DAO.MenuDAO;
import com.app.model.Menu;
import com.app.utils.DBUtils;

public class MenuDAOImplementation implements MenuDAO {

    private Connection con;

    // SQL Queries
    private static final String ADD_MENU =
            "INSERT INTO MENU(RESTAURANTID, MENUNAME, PRICE, DESCRIPTION, ISAVAILABLE, IMAGEPATH) VALUES (?,?,?,?,?,?)";
    private static final String GET_ALL_MENU =
            "SELECT * FROM MENU";
    private static final String GET_MENU_BY_ID =
            "SELECT * FROM MENU WHERE MENUID=?";
    private static final String UPDATE_MENU =
            "UPDATE MENU SET MENUNAME=?, PRICE=?, DESCRIPTION=?, ISAVAILABLE=?, IMAGEPATH=? WHERE MENUID=?";
    private static final String DELETE_MENU =
            "DELETE FROM MENU WHERE MENUID=?";

    public MenuDAOImplementation() {
        try {
            con = DBUtils.myConnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public int addMenu(Menu m) {
        try (PreparedStatement pstm = con.prepareStatement(ADD_MENU)) {
            pstm.setInt(1, m.getRestaurantId());
            pstm.setString(2, m.getMenuName());
            pstm.setDouble(3, m.getPrice());
            pstm.setString(4, m.getDescription());
            pstm.setBoolean(5, m.isAvailable());
            pstm.setString(6, m.getImagePath());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Menu> getAllMenu() {
        List<Menu> menuList = new ArrayList<>();
        try (PreparedStatement pstm = con.prepareStatement(GET_ALL_MENU);
             ResultSet res = pstm.executeQuery()) {
            menuList = extract(res);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return menuList;
    }

    @Override
    public Menu getMenuById(int menuId) {
        try (PreparedStatement pstm = con.prepareStatement(GET_MENU_BY_ID)) {
            pstm.setInt(1, menuId);
            try (ResultSet res = pstm.executeQuery()) {
                List<Menu> menuList = extract(res);
                return menuList.isEmpty() ? null : menuList.get(0);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int updateMenu(Menu m) {
        try (PreparedStatement pstm = con.prepareStatement(UPDATE_MENU)) {
            pstm.setString(1, m.getMenuName());
            pstm.setDouble(2, m.getPrice());
            pstm.setString(3, m.getDescription());
            pstm.setBoolean(4, m.isAvailable());
            pstm.setString(5, m.getImagePath());
            pstm.setInt(6, m.getMenuId());
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public int deleteMenu(int menuId) {
        try (PreparedStatement pstm = con.prepareStatement(DELETE_MENU)) {
            pstm.setInt(1, menuId);
            return pstm.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    // Helper method to map ResultSet to List<Menu>
    private List<Menu> extract(ResultSet res) throws SQLException {
        List<Menu> list = new ArrayList<>();
        while (res.next()) {
            list.add(new Menu(
                    res.getInt("menuId"),
                    res.getInt("restaurantId"),
                    res.getString("menuName"),
                    res.getDouble("price"),
                    res.getString("description"),
                    res.getBoolean("isAvailable"),
                    res.getString("imagePath")
            ));
        }
        return list;
    }
}
