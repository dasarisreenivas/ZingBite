package com.app.zingbitedaoimpl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.ArrayList;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import com.app.zingbitedao.ReviewDAO;
import com.app.zingbitemodels.Review;
import com.app.zingbitemodels.OrderStatus;
import com.app.zingbiteutils.DBUtils;

public class ReviewDAOImplementation implements ReviewDAO {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewDAOImplementation.class);

    @Override
    public boolean addReview(Review review) {
        Session session = null;
        Transaction tx = null;
        try {
            session = DBUtils.openSession();
            tx = session.beginTransaction();
            session.persist(review);
            
            // Also update the restaurant's average rating in the DB dynamically!
            int restaurantId = review.getRestaurantId();
            tx.commit(); // commit review first
            
            // update restaurant rating in a separate transaction or same
            updateRestaurantAverageRating(restaurantId);
            
            return true;
        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                try {
                    tx.rollback();
                } catch (Exception ignored) {}
            }
            LOGGER.error("Unexpected error", e);
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
        return false;
    }

    private void updateRestaurantAverageRating(int restaurantId) {
        Session session = null;
        Transaction tx = null;
        try {
            double avg = getAverageRating(restaurantId);
            session = DBUtils.openSession();
            tx = session.beginTransaction();
            
            // Query the Restaurant entity
            com.app.zingbitemodels.Restaurant restaurant = session.get(com.app.zingbitemodels.Restaurant.class, restaurantId);
            if (restaurant != null) {
                restaurant.setRating((float) avg);
                session.merge(restaurant);
            }
            tx.commit();
        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                try {
                    tx.rollback();
                } catch (Exception ignored) {}
            }
            LOGGER.error("Unexpected error", e);
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
    }

    @Override
    public List<Review> getReviewsByRestaurant(int restaurantId) {
        try (Session session = DBUtils.openSession()) {
            String hql = "FROM Review WHERE restaurantId = :restaurantId ORDER BY createdAt DESC";
            Query<Review> query = session.createQuery(hql, Review.class);
            query.setParameter("restaurantId", restaurantId);
            return query.list();
        } catch (Exception e) {
            LOGGER.error("Unexpected error", e);
        }
        return new ArrayList<>();
    }

    @Override
    public boolean hasCompletedOrder(int userId, int restaurantId) {
        try (Session session = DBUtils.openSession()) {
            String hql = "SELECT count(o) FROM Orders o WHERE o.userId = :userId AND o.restaurantId.restaurantId = :restaurantId AND o.orderStatus = :status";
            Query<Long> query = session.createQuery(hql, Long.class);
            query.setParameter("userId", userId);
            query.setParameter("restaurantId", restaurantId);
            query.setParameter("status", OrderStatus.DELIVERED);
            Long count = query.uniqueResult();
            return count != null && count > 0;
        } catch (Exception e) {
            LOGGER.error("Unexpected error", e);
        }
        return false;
    }

    @Override
    public double getAverageRating(int restaurantId) {
        try (Session session = DBUtils.openSession()) {
            String hql = "SELECT avg(r.rating) FROM Review r WHERE r.restaurantId = :restaurantId";
            Query<Double> query = session.createQuery(hql, Double.class);
            query.setParameter("restaurantId", restaurantId);
            Double avg = query.uniqueResult();
            return avg != null ? avg : 0.0;
        } catch (Exception e) {
            LOGGER.error("Unexpected error", e);
        }
        return 0.0;
    }

    @Override
    public int getReviewCount(int restaurantId) {
        try (Session session = DBUtils.openSession()) {
            String hql = "SELECT count(r) FROM Review r WHERE r.restaurantId = :restaurantId";
            Query<Long> query = session.createQuery(hql, Long.class);
            query.setParameter("restaurantId", restaurantId);
            Long count = query.uniqueResult();
            return count != null ? count.intValue() : 0;
        } catch (Exception e) {
            LOGGER.error("Unexpected error", e);
        }
        return 0;
    }
}
