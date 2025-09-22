package com.app.model;

public class OrderItem {
	
	private int orderItemId;
	private int intOrderId;
	private int menuId;
	private int quantity;
	private double subTotal;
	
	public OrderItem() {
		super();
	}
	
	public OrderItem(int intOrderId, int menuId, int quantity, double subTotal) {
		super();
		this.intOrderId = intOrderId;
		this.menuId = menuId;
		this.quantity = quantity;
		this.subTotal = subTotal;
	}
	
	public OrderItem(int orderItemId, int intOrderId, int menuId, int quantity, double subTotal) {
		super();
		this.orderItemId = orderItemId;
		this.intOrderId = intOrderId;
		this.menuId = menuId;
		this.quantity = quantity;
		this.subTotal = subTotal;
	}
	public int getOrderItemId() {
		return orderItemId;
	}
	public void setOrderItemId(int orderItemId) {
		this.orderItemId = orderItemId;
	}
	
	public int getIntOrderId() {
		return intOrderId;
	}
	public void setIntOrderId(int intOrderId) {
		this.intOrderId = intOrderId;
	}
	
	public int getMenuId() {
		return menuId;
	}
	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}
	
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	public double getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(double subTotal) {
		this.subTotal = subTotal;
	}
	
	@Override
	public String toString() {
		return "OrderItem [orderItemId=" + orderItemId + ", intOrderId=" + intOrderId + ", menuId=" + menuId
				+ ", quantity=" + quantity + ", subTotal=" + subTotal + "]";
	}
	
}
