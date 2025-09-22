package com.app.DAO;

import java.util.List;

import com.app.model.Restaurant;


public interface RestaurantDAO {
	int addRestaurant(Restaurant restaurnat);
	List<Restaurant> getAllRestaurants();
	Restaurant getRestaurantById(int restaurantId);
	int updateRestaurant(Restaurant restaurant);
	int deleteRestaurant(int restaurnatId);
}
