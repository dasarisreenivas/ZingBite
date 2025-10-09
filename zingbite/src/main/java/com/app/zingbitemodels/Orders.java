package com.app.zingbitemodels;

import java.io.Serializable;

public class Orders implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int orderId;
	private int restaurantId;
	private int userId;
	private String orderTime;
	private float totalAmount;
	private String orderStatus;
	private String paymentMethod;
	
	public Orders() {
		super();
	}
	
	public Orders(int restaurantId, int userId, String orderTime, float totalAmount, String orderStatus,
			String paymentMethod) {
		super();
		this.restaurantId = restaurantId;
		this.userId = userId;
		this.orderTime = orderTime;
		this.totalAmount = totalAmount;
		this.orderStatus = orderStatus;
		this.paymentMethod = paymentMethod;
	}
	
	public Orders(int orderId, int restaurantId, int userId, String orderTime, float totalAmount, String orderStatus,
			String paymentMethod) {
		super();
		this.orderId = orderId;
		this.restaurantId = restaurantId;
		this.userId = userId;
		this.orderTime = orderTime;
		this.totalAmount = totalAmount;
		this.orderStatus = orderStatus;
		this.paymentMethod = paymentMethod;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	public float getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(float totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	@Override
	public String toString() {
		System.out.println("to Stirng() in Orders Model class");
		return "Orders [orderId=" + orderId + ", restaurantId=" + restaurantId + ", userId=" + userId + ", orderTime="
				+ orderTime + ", totalAmount=" + totalAmount + ", orderStatus=" + orderStatus + ", paymentMethod="
				+ paymentMethod + "]";
	}
	
	
}
