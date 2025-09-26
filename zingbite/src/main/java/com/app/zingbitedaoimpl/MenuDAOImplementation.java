package com.app.zingbitedaoimpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.app.zingbitedao.MenuDAO;
import com.app.zingbitemodels.Menu;
import com.app.zingbiteutils.DBUtils;

public class MenuDAOImplementation implements MenuDAO {

    // SQL queries are updated for correctness and consistency.
    private static final String ADD_MENU = "INSERT INTO MENU(RESTAURANTID, MENUNAME, PRICE, ITEMDESCRIPTION, ISAVAILABLE, IMAGEPATH) VALUES (?,?,?,?,?,?)";
    private static final String GET_ALL_MENU = "SELECT * FROM MENU";
    private static final String GET_MENU_BY_ID = "SELECT * FROM MENU WHERE MENUID=?";
    private static final String UPDATE_MENU = "UPDATE MENU SET MENUNAME=?, PRICE=?, ITEMDESCRIPTION=?, ISAVAILABLE=?, IMAGEPATH=? WHERE MENUID=?";
    private static final String DELETE_MENU = "DELETE FROM MENU WHERE MENUID=?";
    private static final String GET_MENU_BY_RESTAURANT = "SELECT * FROM MENU WHERE RESTAURANTID=?";

    @Override
    public int addMenu(Menu m) {
        // Using try-with-resources to automatically manage and close the connection.
        try (Connection con = DBUtils.myConnect();
             PreparedStatement pstm = con.prepareStatement(ADD_MENU)) {
            
            pstm.setInt(1, m.getRestaurantId());
            pstm.setString(2, m.getMenuName());
            pstm.setDouble(3, m.getPrice());
            pstm.setString(4, m.getDescription()); // Maps to the 4th '?' which is ITEMDESCRIPTION
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
        // try-with-resources for Connection, PreparedStatement, and ResultSet
        try (Connection con = DBUtils.myConnect();
             PreparedStatement pstm = con.prepareStatement(GET_ALL_MENU);
             ResultSet res = pstm.executeQuery()) {
            
            menuList = extract(res);
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return menuList;
    }

    @Override
    public Menu getMenuById(int menuId) {
        try (Connection con = DBUtils.myConnect();
             PreparedStatement pstm = con.prepareStatement(GET_MENU_BY_ID)) {
            
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
        try (Connection con = DBUtils.myConnect();
             PreparedStatement pstm = con.prepareStatement(UPDATE_MENU)) {
            
            pstm.setString(1, m.getMenuName());
            pstm.setDouble(2, m.getPrice());
            pstm.setString(3, m.getDescription()); // Maps to the 3rd '?' which is ITEMDESCRIPTION
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
        try (Connection con = DBUtils.myConnect();
             PreparedStatement pstm = con.prepareStatement(DELETE_MENU)) {
            
            pstm.setInt(1, menuId);
            return pstm.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Menu> getMenuRestaurantById(int restaurantId) {
        List<Menu> menuList = new ArrayList<>();
        try (Connection con = DBUtils.myConnect();
             PreparedStatement pstm = con.prepareStatement(GET_MENU_BY_RESTAURANT)) {
            
            pstm.setInt(1, restaurantId);
            try (ResultSet res = pstm.executeQuery()) {
                menuList = extract(res);
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return menuList;
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
                    res.getString("ITEMDESCRIPTION"), // *** CRITICAL FIX HERE ***
                    res.getBoolean("isAvailable"),
                    res.getString("imagePath")
            ));
        }
        return list;
    }
}