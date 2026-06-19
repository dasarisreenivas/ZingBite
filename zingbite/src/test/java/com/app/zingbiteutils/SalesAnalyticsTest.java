package com.app.zingbiteutils;

import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.app.zingbitemodels.User;
import com.app.zingbitemodels.Restaurant;
import com.app.zingbitemodels.Menu;
import com.app.zingbitemodels.Orders;
import com.app.zingbitemodels.OrderItem;
import com.app.zingbitemodels.OrderStatus;

public class SalesAnalyticsTest {

    private int tempUserId;
    private int tempRestaurantId;
    private int tempMenuId1;
    private int tempMenuId2;
    private int tempOrderId1;
    private int tempOrderId2;
    private int tempOrderId3;

    @BeforeEach
    public void setUp() {
        try (Session session = DBUtils.openSession()) {
            Transaction tx = session.beginTransaction();

            // 1. Create User
            User user = new User();
            user.setUserName("AnalyticsTestUser");
            user.setEmail("analytics_test@example.com");
            user.setPassword("Pass123!");
            user.setPhoneNumber(9876543210L);
            user.setAddress("456 Analytics St");
            session.persist(user);
            tempUserId = user.getUserID();

            // 2. Create Restaurant
            Restaurant restaurant = new Restaurant();
            restaurant.setRestaurantName("Analytics Bistro");
            restaurant.setAddress("789 Analytics Blvd");
            restaurant.setDeliveryTime("25 mins");
            restaurant.setCusineType("Continental");
            restaurant.setRating(4.8f);
            restaurant.setImagePath("/images/bistro.jpg");
            restaurant.setActive(true);
            session.persist(restaurant);
            tempRestaurantId = restaurant.getRestaurantId();

            // 3. Create Menu Items
            Menu menu1 = new Menu();
            menu1.setRestaurant(restaurant);
            menu1.setMenuName("Delicious Burger");
            menu1.setPrice(150.00);
            menu1.setDescription("Burger description");
            menu1.setAvailable(true);
            menu1.setImagePath("/images/burger.jpg");
            session.persist(menu1);
            tempMenuId1 = menu1.getMenuId();

            Menu menu2 = new Menu();
            menu2.setRestaurant(restaurant);
            menu2.setMenuName("Cold Coffee");
            menu2.setPrice(80.00);
            menu2.setDescription("Coffee description");
            menu2.setAvailable(true);
            menu2.setImagePath("/images/coffee.jpg");
            session.persist(menu2);
            tempMenuId2 = menu2.getMenuId();

            // 4. Create Orders
            // Order 1: Delivered, amount = 230.0
            Orders order1 = new Orders();
            order1.setRestaurantId(restaurant);
            order1.setUserId(tempUserId);
            order1.setOrderTime("June 19, 2026");
            order1.setTotalAmount(230.0f);
            order1.setOrderStatus(OrderStatus.DELIVERED);
            order1.setPaymentMethod("UPI");
            order1.setStatusUpdatedAt(new Date());
            session.persist(order1);
            tempOrderId1 = order1.getOrderId();

            // Order 2: Delivered, amount = 150.0
            Orders order2 = new Orders();
            order2.setRestaurantId(restaurant);
            order2.setUserId(tempUserId);
            order2.setOrderTime("June 19, 2026");
            order2.setTotalAmount(150.0f);
            order2.setOrderStatus(OrderStatus.DELIVERED);
            order2.setPaymentMethod("COD");
            order2.setStatusUpdatedAt(new Date());
            session.persist(order2);
            tempOrderId2 = order2.getOrderId();

            // Order 3: Pending payment (should not count in revenue or delivered items)
            Orders order3 = new Orders();
            order3.setRestaurantId(restaurant);
            order3.setUserId(tempUserId);
            order3.setOrderTime("June 19, 2026");
            order3.setTotalAmount(80.0f);
            order3.setOrderStatus(OrderStatus.PENDING_PAYMENT);
            order3.setPaymentMethod("Card");
            order3.setStatusUpdatedAt(new Date());
            session.persist(order3);
            tempOrderId3 = order3.getOrderId();

            // 5. Create Order Items for Delivered Orders
            // Order 1 items: 1 Burger (150.0), 1 Coffee (80.0) -> Total = 230.0
            OrderItem oi1 = new OrderItem(tempOrderId1, tempMenuId1, 1, 150.0);
            OrderItem oi2 = new OrderItem(tempOrderId1, tempMenuId2, 1, 80.0);
            session.persist(oi1);
            session.persist(oi2);

            // Order 2 items: 1 Burger (150.0) -> Total = 150.0
            OrderItem oi3 = new OrderItem(tempOrderId2, tempMenuId1, 1, 150.0);
            session.persist(oi3);

            tx.commit();
        }
    }

    @AfterEach
    public void tearDown() {
        try (Session session = DBUtils.openSession()) {
            Transaction tx = session.beginTransaction();

            // Clear Order Items
            session.createMutationQuery("DELETE FROM OrderItem WHERE orderId in (:id1, :id2, :id3)")
                   .setParameter("id1", tempOrderId1)
                   .setParameter("id2", tempOrderId2)
                   .setParameter("id3", tempOrderId3)
                   .executeUpdate();

            // Clear Orders
            session.createMutationQuery("DELETE FROM Orders WHERE orderId in (:id1, :id2, :id3)")
                   .setParameter("id1", tempOrderId1)
                   .setParameter("id2", tempOrderId2)
                   .setParameter("id3", tempOrderId3)
                   .executeUpdate();

            // Clear Menu Items
            session.createMutationQuery("DELETE FROM Menu WHERE menuId in (:m1, :m2)")
                   .setParameter("m1", tempMenuId1)
                   .setParameter("m2", tempMenuId2)
                   .executeUpdate();

            // Clear Restaurant
            session.createMutationQuery("DELETE FROM Restaurant WHERE restaurantId = :rId")
                   .setParameter("rId", tempRestaurantId)
                   .executeUpdate();

            // Clear User
            session.createMutationQuery("DELETE FROM User WHERE userID = :uId")
                   .setParameter("uId", tempUserId)
                   .executeUpdate();

            tx.commit();
        }
    }

    @Test
    public void testRevenueAggregation() {
        try (Session session = DBUtils.openSession()) {
            String revHql = "select coalesce(sum(o.totalAmount), 0.0) from Orders o " +
                             "where o.restaurantId.restaurantId = :restaurantId " +
                             "  and o.orderStatus = com.app.zingbitemodels.OrderStatus.DELIVERED";
            Double totalRevenue = session.createQuery(revHql, Double.class)
                .setParameter("restaurantId", tempRestaurantId)
                .uniqueResult();

            assertNotNull(totalRevenue);
            // Expected: 230.0 + 150.0 = 380.0
            assertEquals(380.0, totalRevenue, 0.01);
        }
    }

    @Test
    public void testOrderVolumeAggregation() {
        try (Session session = DBUtils.openSession()) {
            String volHql = "select count(o.orderId) from Orders o " +
                             "where o.restaurantId.restaurantId = :restaurantId " +
                             "  and o.orderStatus != com.app.zingbitemodels.OrderStatus.PENDING_PAYMENT";
            Long orderVolume = session.createQuery(volHql, Long.class)
                .setParameter("restaurantId", tempRestaurantId)
                .uniqueResult();

            assertNotNull(orderVolume);
            // Expected: 2 orders (Order 1, Order 2). Order 3 is PENDING_PAYMENT.
            assertEquals(2, orderVolume.intValue());
        }
    }

    @Test
    public void testBestsellingAggregation() {
        try (Session session = DBUtils.openSession()) {
            String bestHql = "select m.menuName, sum(oi.quantity), sum(oi.subTotal) " +
                             "from OrderItem oi, Orders o, Menu m " +
                             "where oi.orderId = o.orderId " +
                             "  and oi.menuId = m.menuId " +
                             "  and o.restaurantId.restaurantId = :restaurantId " +
                             "  and o.orderStatus = com.app.zingbitemodels.OrderStatus.DELIVERED " +
                             "group by m.menuName " +
                             "order by sum(oi.quantity) desc";
            List<Object[]> bestList = session.createQuery(bestHql, Object[].class)
                .setParameter("restaurantId", tempRestaurantId)
                .setMaxResults(5)
                .list();

            assertNotNull(bestList);
            assertFalse(bestList.isEmpty());

            // Best seller should be "Delicious Burger" with qty = 2
            Object[] topRow = bestList.get(0);
            assertEquals("Delicious Burger", topRow[0]);
            assertEquals(2L, ((Number) topRow[1]).longValue());
            assertEquals(300.0, ((Number) topRow[2]).doubleValue(), 0.01);

            // Second should be "Cold Coffee" with qty = 1
            if (bestList.size() > 1) {
                Object[] secondRow = bestList.get(1);
                assertEquals("Cold Coffee", secondRow[0]);
                assertEquals(1L, ((Number) secondRow[1]).longValue());
                assertEquals(80.0, ((Number) secondRow[2]).doubleValue(), 0.01);
            }
        }
    }

    @Test
    public void testDailySalesAggregation() {
        try (Session session = DBUtils.openSession()) {
            String dailyHql = "select o.orderTime, sum(o.totalAmount) " +
                              "from Orders o " +
                              "where o.restaurantId.restaurantId = :restaurantId " +
                              "  and o.orderStatus = com.app.zingbitemodels.OrderStatus.DELIVERED " +
                              "group by o.orderTime " +
                              "order by min(o.statusUpdatedAt) asc";
            List<Object[]> dailyList = session.createQuery(dailyHql, Object[].class)
                .setParameter("restaurantId", tempRestaurantId)
                .setMaxResults(7)
                .list();

            assertNotNull(dailyList);
            assertEquals(1, dailyList.size()); // Both delivered orders are on the same day: "June 19, 2026"

            Object[] row = dailyList.get(0);
            assertEquals("June 19, 2026", row[0]);
            assertEquals(380.0, ((Number) row[1]).doubleValue(), 0.01);
        }
    }
}
