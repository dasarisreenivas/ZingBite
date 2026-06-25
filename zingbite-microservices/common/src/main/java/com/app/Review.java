package com.app.zingbitemodels;

import java.io.Serializable;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "reviews")
public class Review implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "userId", nullable = false)
    private int userId;

    @Column(name = "restaurantId", nullable = false)
    private int restaurantId;

    @Column(name = "rating", nullable = false)
    private int rating;

    @Column(name = "reviewText", nullable = false, length = 1000)
    private String reviewText;

    @Column(name = "createdAt", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "restaurantReply", length = 1200)
    private String restaurantReply;

    @Column(name = "restaurantReplyAt")
    @Temporal(TemporalType.TIMESTAMP)
    private Date restaurantReplyAt;

    public Review() {
        super();
        this.createdAt = new Date();
    }

    public Review(int userId, int restaurantId, int rating, String reviewText) {
        super();
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.rating = rating;
        this.reviewText = reviewText;
        this.createdAt = new Date();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getRestaurantReply() {
        return restaurantReply;
    }

    public void setRestaurantReply(String restaurantReply) {
        this.restaurantReply = restaurantReply;
    }

    public Date getRestaurantReplyAt() {
        return restaurantReplyAt;
    }

    public void setRestaurantReplyAt(Date restaurantReplyAt) {
        this.restaurantReplyAt = restaurantReplyAt;
    }
}
