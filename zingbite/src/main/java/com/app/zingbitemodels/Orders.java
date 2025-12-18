package com.app.zingbitemodels;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="orders")

public class Orders implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name ="orderId")
	private int orderId;
	@Column(name ="restaurant")
	private Restaurant restaurant;
	@Column(name ="userId")
	private int userId;
	@Column(name ="orderTime")
	private String orderTime;
	@Column(name ="totalAmount")
	private float totalAmount;
	@Column(name ="orderStatus")	
	private String orderStatus;
	@Column(name ="paymentMethod")
	private String paymentMethod;
	
	public Orders() {
		super();
	}
	
	public Orders(int restaurantId, int userId, String orderTime, float totalAmount, String orderStatus,
			String paymentMethod) {
		super();
		this.restaurant = restaurantId;
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
		this.restaurant = restaurantId;
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
		return restaurant;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurant = restaurantId;
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
		return "Orders [orderId=" + orderId + ", restaurantId=" + restaurant + ", userId=" + userId + ", orderTime="
				+ orderTime + ", totalAmount=" + totalAmount + ", orderStatus=" + orderStatus + ", paymentMethod="
				+ paymentMethod + "]";
	}
	
	
}
