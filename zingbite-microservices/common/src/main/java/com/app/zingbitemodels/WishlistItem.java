package com.app.zingbitemodels;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "wishlist", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"userId", "menuId"})
})
public class WishlistItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlistId")
    private int wishlistId;

    @Column(name = "userId", nullable = false)
    private int userId;

    @Column(name = "menuId", nullable = false)
    private int menuId;

    // Constructors
    public WishlistItem() {
        super();
    }

    public WishlistItem(int userId, int menuId) {
        super();
        this.userId = userId;
        this.menuId = menuId;
    }

    public WishlistItem(int wishlistId, int userId, int menuId) {
        super();
        this.wishlistId = wishlistId;
        this.userId = userId;
        this.menuId = menuId;
    }

    // Getters and Setters
    public int getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(int wishlistId) {
        this.wishlistId = wishlistId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    @Override
    public String toString() {
        return "WishlistItem [wishlistId=" + wishlistId + ", userId=" + userId + ", menuId=" + menuId + "]";
    }
}
