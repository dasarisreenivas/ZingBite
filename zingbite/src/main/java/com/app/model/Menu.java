package com.app.model;

public class Menu {
	
	private int menuId;
	private int RestaurantId;
	private String menuName;
	private double price;
	private String description;
	private boolean isAvailable;
	private String imagePath;
	
	public Menu() {
		super();
	}
	
	public Menu(int restaurantId, String menuName, double price, String description, boolean isAvailable,
			String imagePath) {
		super();
		RestaurantId = restaurantId;
		this.menuName = menuName;
		this.price = price;
		this.description = description;
		this.isAvailable = isAvailable;
		this.imagePath = imagePath;
	}
	
	public Menu(int menuId, int restaurantId, String menuName, double price, String description, boolean isAvailable,
			String imagePath) {
		super();
		this.menuId = menuId;
		RestaurantId = restaurantId;
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

	public int getRestaurantId() {
		return RestaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		RestaurantId = restaurantId;
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
		return "Menu [menuId=" + menuId + ", RestaurantId=" + RestaurantId + ", menuName=" + menuName + ", price="
				+ price + ", description=" + description + ", isAvailable=" + isAvailable + ", imagePath=" + imagePath
				+ "]";
	}
	
	
}
