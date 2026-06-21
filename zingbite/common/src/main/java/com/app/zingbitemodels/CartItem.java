package com.app.zingbitemodels;

import java.io.Serializable;

public class CartItem implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int itemId;
	private int restaurantId;
	private String itemName;
	private double price;
	private int quantity;
	private float subTotal;
	
	public CartItem() {
		super();
	}

	public CartItem(int restaurantId, String itemName, double price, int quantity, float subTotal) {
		super();
		this.restaurantId = restaurantId;
		this.itemName = itemName;
		this.price = price;
		this.quantity = quantity;
		this.subTotal = subTotal;
	}

	public CartItem(int itemId, int restaurantId, String itemName, double price, int quantity, float subTotal) {
		super();
		this.itemId = itemId;
		this.restaurantId = restaurantId;
		this.itemName = itemName;
		this.price = price;
		this.quantity = quantity;
		this.subTotal = subTotal;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(float subTotal) {
		this.subTotal = subTotal;
	}

	@Override
	public String toString() {
		return "CartItem [itemId=" + itemId + ", restaurantId=" + restaurantId + ", itemName=" + itemName + ", price="
				+ price + ", quantity=" + quantity + ", subTotal=" + subTotal + "]";
	}
	
	
}
