package com.app.zingbiteutils;

import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.app.zingbitedao.WishlistDAO;
import com.app.zingbitedaoimpl.WishlistDAOImplementation;
import com.app.zingbitemodels.WishlistItem;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Restaurant;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class WishlistDAOTest {

    private WishlistDAO wishlistDAO;
    private int tempUserId;
    private int tempMenuId;
    private int tempRestaurantId;

    @BeforeEach
    public void setUp() {
        wishlistDAO = new WishlistDAOImplementation();

        // Set up temporary user, restaurant and menu item
        try (Session session = DBUtils.openSession()) {
            Transaction tx = session.beginTransaction();

            User user = new User();
            user.setUserName("WishlistTestUser");
            user.setEmail("wishlist_test@example.com");
            user.setPassword("Pass123!");
            user.setPhoneNumber(1234567890L);
            user.setAddress("Test Address");
            session.persist(user);

            Restaurant restaurant = new Restaurant();
            restaurant.setRestaurantName("Test Restaurant");
            restaurant.setAddress("Test Restaurant Address");
            restaurant.setDeliveryTime("30 mins");
            restaurant.setCusineType("Italian");
            restaurant.setRating(4.5f);
            restaurant.setImagePath("/images/rest.jpg");
            restaurant.setActive(true);
            session.persist(restaurant);

            Menu menu = new Menu();
            menu.setRestaurant(restaurant);
            menu.setMenuName("Test Pizza");
            menu.setPrice(299.0);
            menu.setDescription("Delicious test pizza");
            menu.setAvailable(true);
            menu.setImagePath("/images/pizza.jpg");
            session.persist(menu);

            tx.commit();

            tempUserId = user.getUserID();
            tempMenuId = menu.getMenuId();
            tempRestaurantId = restaurant.getRestaurantId();
        }
    }

    @AfterEach
    public void tearDown() {
        try (Session session = DBUtils.openSession()) {
            Transaction tx = session.beginTransaction();

            // Clear wishlist items first
            session.createMutationQuery("DELETE FROM WishlistItem WHERE userId = :userId")
                   .setParameter("userId", tempUserId)
                   .executeUpdate();

            // Clear menu
            session.createMutationQuery("DELETE FROM Menu WHERE menuId = :menuId")
                   .setParameter("menuId", tempMenuId)
                   .executeUpdate();

            // Clear restaurant
            session.createMutationQuery("DELETE FROM Restaurant WHERE restaurantId = :restaurantId")
                   .setParameter("restaurantId", tempRestaurantId)
                   .executeUpdate();

            // Clear user
            session.createMutationQuery("DELETE FROM User WHERE userID = :userId")
                   .setParameter("userId", tempUserId)
                   .executeUpdate();

            tx.commit();
        }
    }

    @Test
    public void testAddToWishlistSuccess() {
        WishlistItem item = new WishlistItem(tempUserId, tempMenuId);
        boolean added = wishlistDAO.addToWishlist(item);
        assertTrue(added);

        assertTrue(wishlistDAO.isFavorite(tempUserId, tempMenuId));
        List<WishlistItem> items = wishlistDAO.getWishlistByUser(tempUserId);
        assertEquals(1, items.size());
        assertEquals(tempMenuId, items.get(0).getMenuId());
    }

    @Test
    public void testAddToWishlistDuplicateConstraint() {
        WishlistItem item1 = new WishlistItem(tempUserId, tempMenuId);
        boolean added1 = wishlistDAO.addToWishlist(item1);
        assertTrue(added1);

        // Attempting to add duplicate should fail constraint check
        WishlistItem item2 = new WishlistItem(tempUserId, tempMenuId);
        boolean added2 = wishlistDAO.addToWishlist(item2);
        assertFalse(added2);
    }

    @Test
    public void testRemoveFromWishlist() {
        WishlistItem item = new WishlistItem(tempUserId, tempMenuId);
        wishlistDAO.addToWishlist(item);
        assertTrue(wishlistDAO.isFavorite(tempUserId, tempMenuId));

        boolean removed = wishlistDAO.removeFromWishlist(tempUserId, tempMenuId);
        assertTrue(removed);
        assertFalse(wishlistDAO.isFavorite(tempUserId, tempMenuId));
    }

    @Test
    public void testGetWishlistMenusByUser() {
        WishlistItem item = new WishlistItem(tempUserId, tempMenuId);
        wishlistDAO.addToWishlist(item);

        List<Menu> menus = wishlistDAO.getWishlistMenusByUser(tempUserId);
        assertEquals(1, menus.size());
        assertEquals("Test Pizza", menus.get(0).getMenuName());
    }
}
