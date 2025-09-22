package com.app.DAO;

import java.util.List;

import com.app.model.User;

public interface UserDAO {
	int addUser(User u);
	List<User> getAllUsers();
	User getUserById(String email);
	int updateUser(User u);
	int deleteUser(int userID);
}
