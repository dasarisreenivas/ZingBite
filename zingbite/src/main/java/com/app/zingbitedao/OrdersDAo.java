package com.app.zingbitedao;

import java.util.List;

import com.app.zingbitemodels.Orders;

public interface OrdersDAo {
	int addOrders(Orders orders);
	List<Orders> getAllOrders();
	Orders getOrdersById(int userId );
	int updateOrders(Orders orders);
	int deleteOrders(int userId);
}
