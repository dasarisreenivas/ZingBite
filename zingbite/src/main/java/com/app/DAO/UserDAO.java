package com.app.DAO;

import com.app.model.User;

public interface UserDAO {
	int addUser(User u);
	void getAllUsers();
	void getUser(String email);
	void updateUser(User u);
	void deleteUser(int userID);
}
