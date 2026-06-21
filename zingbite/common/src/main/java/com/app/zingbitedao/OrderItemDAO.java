package com.app.zingbitedao;

import java.util.List;

import com.app.zingbitemodels.OrderItem;

public interface OrderItemDAO {
	int addOrderItem(OrderItem orderItem);
	List<OrderItem> getAllOrderItem();
	OrderItem getOrderItemById(int orderId);
	int updateOrderItem(OrderItem oH);
	int deleteOrderItem(int orderId);
}
