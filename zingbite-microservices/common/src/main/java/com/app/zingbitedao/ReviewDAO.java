package com.app.zingbitedao;

import java.util.List;
import com.app.zingbitemodels.Review;

public interface ReviewDAO {
    boolean addReview(Review review);
    List<Review> getReviewsByRestaurant(int restaurantId);
    boolean hasCompletedOrder(int userId, int restaurantId);
    double getAverageRating(int restaurantId);
    int getReviewCount(int restaurantId);
}
