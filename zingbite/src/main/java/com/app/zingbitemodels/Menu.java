package com.app.zingbitemodels;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu")
public class Menu implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY,generator="MenuId_seq_gen")
	@SequenceGenerator(
			name = "MenuId_seq_gen",
			sequenceName = "MenuId_seq",
			allocationSize =  1
			
			)
	
	@Column(name = "MENUID", nullable = false)
	private int menuId;

	// FK mapping
	@ManyToOne
	@JoinColumn(name = "RESTAURANTID", nullable = false)
	private Restaurant restaurant;

	@Column(name = "MENUNAME", nullable = false)
	private String menuName;

	@Column(name = "PRICE", nullable = false)
	private double price;

	@Column(name = "ITEMDESCRIPTION", nullable = false)
	private String description;

	@Column(name = "ISAVAILABLE", nullable = false)
	private boolean isAvailable;

	@Column(name = "IMAGEPATH", nullable = false)
	private String imagePath;

	public Menu() {
	}

	public Menu(Restaurant restaurant, String menuName, double price, String description, boolean isAvailable,
			String imagePath) {

		this.restaurant = restaurant;
		this.menuName = menuName;
		this.price = price;
		this.description = description;
		this.isAvailable = isAvailable;
		this.imagePath = imagePath;
	}

	public int getMenuId() {
		return menuId;
	}

	public void setMenuId(int menuId) {
		this.menuId = menuId;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	@Override
	public String toString() {
		return "Menu [menuId=" + menuId + ", restaurantId=" + (restaurant != null ? restaurant.getRestaurantId() : null)
				+ ", menuName=" + menuName + ", price=" + price + ", description=" + description + ", isAvailable="
				+ isAvailable + ", imagePath=" + imagePath + "]";
	}
}
