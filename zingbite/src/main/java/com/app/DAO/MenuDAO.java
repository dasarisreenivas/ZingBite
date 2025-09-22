package com.app.DAO;

import java.util.List;

import com.app.model.Menu;

public interface MenuDAO {
	int addMenu(Menu menu);
	List<Menu> getAllMenu();
	Menu getMenuById(int menuId);
	int updateMenu(Menu menu);
	int deleteMenu(int menuId);
	
}
