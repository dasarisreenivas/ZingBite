 package com.app.zingbitedao;

import java.util.List;

import com.app.zingbitemodels.OrderHistory;

public interface OrderHistoryDAO {
	int addOrderHIstory(OrderHistory oH);
	List<OrderHistory> getAllOrderHistory();
	OrderHistory getOrderHistoryById(int userId);
	int updateOrderHistory(OrderHistory oH);
	int deleteOrderHistory(int orderId);
}
