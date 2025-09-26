package com.app.zingbitedao;

import java.util.List;

import com.app.zingbitemodels.Menu;

public interface MenuDAO {
	int addMenu(Menu menu);
	List<Menu> getAllMenu();
	Menu getMenuById(int menuId);
	int updateMenu(Menu menu);
	int deleteMenu(int menuId);
	List<Menu> getMenuRestaurantById(int restaurantId);
	
}
