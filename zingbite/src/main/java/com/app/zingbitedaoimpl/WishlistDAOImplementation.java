package com.app.zingbitedaoimpl;

import java.util.List;
import java.util.ArrayList;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import com.app.zingbitedao.WishlistDAO;
import com.app.zingbitemodels.WishlistItem;
import com.app.zingbitemodels.Menu;
import com.app.zingbiteutils.DBUtils;

public class WishlistDAOImplementation implements WishlistDAO {

    @Override
    public boolean addToWishlist(WishlistItem item) {
        Session session = null;
        Transaction tx = null;
        try {
            session = DBUtils.openSession();
            tx = session.beginTransaction();
            session.persist(item);
            tx.commit();
            return true;
        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                try {
                    tx.rollback();
                } catch (Exception ignored) {}
            }
            e.printStackTrace();
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
        return false;
    }

    @Override
    public boolean removeFromWishlist(int userId, int menuId) {
        Session session = null;
        Transaction tx = null;
        try {
            session = DBUtils.openSession();
            tx = session.beginTransaction();
            String hql = "DELETE FROM WishlistItem WHERE userId = :userId AND menuId = :menuId";
            Query<?> query = session.createQuery(hql);
            query.setParameter("userId", userId);
            query.setParameter("menuId", menuId);
            int result = query.executeUpdate();
            tx.commit();
            return result > 0;
        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                try {
                    tx.rollback();
                } catch (Exception ignored) {}
            }
            e.printStackTrace();
        } finally {
            if (session != null && session.isOpen()) {
                session.close();
            }
        }
        return false;
    }

    @Override
    public List<WishlistItem> getWishlistByUser(int userId) {
        try (Session session = DBUtils.openSession()) {
            String hql = "FROM WishlistItem WHERE userId = :userId";
            Query<WishlistItem> query = session.createQuery(hql, WishlistItem.class);
            query.setParameter("userId", userId);
            return query.list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    @Override
    public boolean isFavorite(int userId, int menuId) {
        try (Session session = DBUtils.openSession()) {
            String hql = "SELECT count(w) FROM WishlistItem w WHERE w.userId = :userId AND w.menuId = :menuId";
            Query<Long> query = session.createQuery(hql, Long.class);
            query.setParameter("userId", userId);
            query.setParameter("menuId", menuId);
            Long count = query.uniqueResult();
            return count != null && count > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<Menu> getWishlistMenusByUser(int userId) {
        try (Session session = DBUtils.openSession()) {
            // Join-based HQL query to load Menu details of all favorited items
            String hql = "SELECT m FROM Menu m, WishlistItem w WHERE w.menuId = m.menuId AND w.userId = :userId";
            Query<Menu> query = session.createQuery(hql, Menu.class);
            query.setParameter("userId", userId);
            return query.list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }
}
