package com.app.chat;

import org.hibernate.Session;

import com.app.zingbitemodels.Application;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.User;

/** Resolves database-backed membership for order and application chat rooms. */
public final class ChatAuthorizationService {
    private ChatAuthorizationService() {}

    public static ChatAccess authorize(Session session, int userId, String type, int targetId) {
        User user = session.get(User.class, userId);
        if (user == null || Boolean.TRUE.equals(user.getBlocked())) {
            return null;
        }

        if ("order".equalsIgnoreCase(type)) {
            Orders order = session.get(Orders.class, targetId);
            return authorizeOrder(user, order);
        }

        if ("application".equalsIgnoreCase(type)) {
            Application application = session.get(Application.class, targetId);
            if (application == null) {
                return null;
            }
            boolean applicant = application.getUserId() == userId;
            boolean superAdmin = "super_admin".equals(user.getRole());
            return applicant || superAdmin
                    ? new ChatAccess(user, superAdmin ? application.getUserId() : 0)
                    : null;
        }

        return null;
    }

    static ChatAccess authorizeOrder(User user, Orders order) {
        if (user == null || order == null || Boolean.TRUE.equals(user.getBlocked())) {
            return null;
        }
        int userId = user.getUserID();
        Restaurant restaurant = order.getRestaurantId();
        boolean customer = order.getUserId() == userId;
        boolean assignedRider = "delivery_partner".equals(user.getRole())
                && order.getRiderId() != null
                && order.getRiderId() == userId;
        boolean restaurantAdmin = "restaurant_admin".equals(user.getRole())
                && restaurant != null
                && restaurant.getAdminId() != null
                && restaurant.getAdminId() == userId;
        boolean superAdmin = "super_admin".equals(user.getRole());
        if (!customer && !assignedRider && !restaurantAdmin && !superAdmin) {
            return null;
        }

        int receiverId;
        if (customer) {
            receiverId = order.getRiderId() != null
                    ? order.getRiderId()
                    : restaurant != null && restaurant.getAdminId() != null
                            ? restaurant.getAdminId()
                            : 0;
        } else {
            receiverId = order.getUserId();
        }
        return new ChatAccess(user, receiverId);
    }

    public record ChatAccess(User user, int receiverId) {}
}
