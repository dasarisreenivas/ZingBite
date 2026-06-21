package com.app.zingbitemodels;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orderhistory")
public class OrderHistory implements Serializable{
	
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "orderHistoryId")
	private int orderHistoryId;
	@Column(name = "orderId")
	private int orderId;
	@Column(name = "userId")
	private int userID;
	@Column(name = "orderDate")
	private Date orderDate;
	@Column(name = "totalAmount")
	private double totalAmount;
	@Column(name = "orderStatus")
	private String orderStatus;
	
	public OrderHistory() {
		super();
	}

	public OrderHistory(int orderId, int userID, Date orderDate, double totalAmount, String orderStatus) {
		super();
		this.orderId = orderId;
		this.userID = userID;
		this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.orderStatus = orderStatus;
	}

	public OrderHistory(int orderHistoryId, int orderId, int userID, Date orderDate, double totalAmount,
			String orderStatus) {
		super();
		this.orderHistoryId = orderHistoryId;
		this.orderId = orderId;
		this.userID = userID;
		this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.orderStatus = orderStatus;
	}

	public int getOrderHistoryId() {
		return orderHistoryId;
	}

	public void setOrderHistoryId(int orderHistoryId) {
		this.orderHistoryId = orderHistoryId;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	
	@Override
	public String toString() {
		
		return "OrderHistory [orderHistoryId=" + orderHistoryId + ", orderId=" + orderId + ", userID=" + userID
				+ ", orderDate=" + orderDate + ", totalAmount=" + totalAmount + ", orderStatus=" + orderStatus + "]";
	}
	
	
	
	
}
