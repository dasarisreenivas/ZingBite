package com.app.zingbitemodels;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name ="orders")

public class Orders implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="orderId")
	private int orderId;
	@Lob
	@Column(name ="restaurant", columnDefinition = "LONGBLOB")
	private Restaurant restaurantId;
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
	
	@Column(name ="riderId")
	private Integer riderId;

	@Column(name = "gpsProgress")
	private Double gpsProgress = 0.0;

	@Column(name = "gpsCoordinates")
	private String gpsCoordinates;
	
	public Orders() {
		super();
	}
	
	public Orders(Restaurant restaurantId, int userId, String orderTime, float totalAmount, String orderStatus,
			String paymentMethod) {
		super();
		this.restaurantId = restaurantId;
		this.userId = userId;
		this.orderTime = orderTime;
		this.totalAmount = totalAmount;
		this.orderStatus = orderStatus;
		this.paymentMethod = paymentMethod;
	}
	
	public Orders(int orderId, Restaurant restaurantId, int userId, String orderTime, float totalAmount, String orderStatus,
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

	public Restaurant getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Restaurant restaurantId) {
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

	public Integer getRiderId() {
		return riderId;
	}

	public void setRiderId(Integer riderId) {
		this.riderId = riderId;
	}

	public Double getGpsProgress() {
		return gpsProgress;
	}

	public void setGpsProgress(Double gpsProgress) {
		this.gpsProgress = gpsProgress;
	}

	public String getGpsCoordinates() {
		return gpsCoordinates;
	}

	public void setGpsCoordinates(String gpsCoordinates) {
		this.gpsCoordinates = gpsCoordinates;
	}

	@Override
	public String toString() {
		System.out.println("to Stirng() in Orders Model class");
		return "Orders [orderId=" + orderId + ", restaurantId=" + restaurantId + ", userId=" + userId + ", orderTime="
				+ orderTime + ", totalAmount=" + totalAmount + ", orderStatus=" + orderStatus + ", paymentMethod="
				+ paymentMethod + "]";
	}
	
	
}
