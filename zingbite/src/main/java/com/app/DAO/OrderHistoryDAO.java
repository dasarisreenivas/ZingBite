 package com.app.DAO;

import java.util.List;

import com.app.model.OrderHistory;

public interface OrderHistoryDAO {
	int addOrderHIstory(OrderHistory oH);
	List<OrderHistory> getAllOrderHistory();
	OrderHistory getOrderHistoryById(int userId);
	int updateOrderHistory(OrderHistory oH);
	int deleteOrderHistory(int orderId);
}
