package com.app.chat;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;

import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.User;

class ChatAuthorizationServiceTest {
    @Test
    void orderChatRequiresActualOrderMembership() {
        User rider = user(20, "delivery_partner");
        Orders order = new Orders();
        order.setUserId(10);
        order.setRiderId(30);
        Restaurant restaurant = new Restaurant();
        restaurant.setAdminId(40);
        order.setRestaurantId(restaurant);

        assertNull(ChatAuthorizationService.authorizeOrder(rider, order));

        order.setRiderId(20);
        assertNotNull(ChatAuthorizationService.authorizeOrder(rider, order));
    }

    private User user(int id, String role) {
        User user = new User();
        user.setUserID(id);
        user.setRole(role);
        user.setBlocked(false);
        return user;
    }
}
