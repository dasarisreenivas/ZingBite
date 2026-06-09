package com.app.zingbitemodels;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "restaurant")
public class Restaurant implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "RESTAURANTID")
	private int restaurantId;
	@Column(name = "RESTAURANTNAME")
	private String restaurantName;
	@Column(name = "DELIVERYTIME")
	private String deliveryTime;
	@Column(name = "CUSINETYPE")
	private String cusineType;
	@Column(name = "ADDRESS")
	private String address;
	@Column(name = "RATINGS")
	private float rating;
	@Column(name = "ISACTIVE")
	private boolean isActive;
	@Column(name = "ADMINID")
	private Integer adminId;
	@Column(name = "IMAGEPATH")
	private String imagePath;
	
	@Column(name = "latitude")
	private Double latitude;
	
	@Column(name = "longitude")
	private Double longitude;
	
	@Column(name = "ISOPEN", nullable = false, columnDefinition = "boolean default true")
	private boolean isOpen = true;

	@Column(name = "TOTALORDERS", nullable = false, columnDefinition = "int default 0")
	private int totalOrders = 0;

	@Column(name = "TOTALIMPRESSIONS", nullable = false, columnDefinition = "int default 0")
	private int totalImpressions = 0;
	
	public Restaurant() {
		super();
	}

	public Restaurant(String restaurantName, String deliveryTime, String cusineType, String address, float rating,
			boolean isActive, Integer adminId, String imagePath) {
		super();
		this.restaurantName = restaurantName;
		this.deliveryTime = deliveryTime;
		this.cusineType = cusineType;
		this.address = address;
		this.rating = rating;
		this.isActive = isActive;
		this.adminId = adminId;
		this.imagePath = imagePath;
	}

	public Restaurant(int restaurantId, String restaurantName, String deliveryTime, String cusineType, String address,
			float rating, boolean isActive, int adminId, String imagePath) {
		super();
		this.restaurantId = restaurantId;
		this.restaurantName = restaurantName;
		this.deliveryTime = deliveryTime;
		this.cusineType = cusineType;
		this.address = address;
		this.rating = rating;
		this.isActive = isActive;
		this.adminId = adminId;
		this.imagePath = imagePath;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(String deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public String getCusineType() {
		return cusineType;
	}

	public void setCusineType(String cusineType) {
		this.cusineType = cusineType;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		this.adminId = adminId;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public boolean isOpen() {
		return isOpen;
	}

	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}

	public int getTotalOrders() {
		return totalOrders;
	}

	public void setTotalOrders(int totalOrders) {
		this.totalOrders = totalOrders;
	}

	public int getTotalImpressions() {
		return totalImpressions;
	}

	public void setTotalImpressions(int totalImpressions) {
		this.totalImpressions = totalImpressions;
	}

	@Override
	public String toString() {
		return "Restaurant [restaurantId=" + restaurantId + ", restaurantName=" + restaurantName + ", deliveryTime="
				+ deliveryTime + ", cusineType=" + cusineType + ", address=" + address + ", rating=" + rating
				+ ", isActive=" + isActive + ", adminId=" + adminId + ", imagePath=" + imagePath 
				+ ", latitude=" + latitude + ", longitude=" + longitude + ", isOpen=" + isOpen
				+ ", totalOrders=" + totalOrders + ", totalImpressions=" + totalImpressions + "]";
	}
}
