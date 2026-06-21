package com.app.zingbitedaoimpl;

import java.util.List;
import java.util.ArrayList;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import com.app.zingbitedao.NotificationDAO;
import com.app.zingbitemodels.Notification;
import com.app.zingbiteutils.DBUtils;

public class NotificationDAOImplementation implements NotificationDAO {

    @Override
    public boolean addNotification(Notification notification) {
        Session session = null;
        Transaction tx = null;
        try {
            session = DBUtils.openSession();
            tx = session.beginTransaction();
            session.persist(notification);
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
    public List<Notification> getNotificationsByUser(int userId) {
        try (Session session = DBUtils.openSession()) {
            String hql = "FROM Notification WHERE userId = :userId ORDER BY createdAt DESC";
            Query<Notification> query = session.createQuery(hql, Notification.class);
            query.setParameter("userId", userId);
            // Limit to last 50 notifications to prevent payload bloating
            query.setMaxResults(50);
            return query.list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    @Override
    public boolean markAsRead(int notificationId) {
        Session session = null;
        Transaction tx = null;
        try {
            session = DBUtils.openSession();
            tx = session.beginTransaction();
            Notification n = session.get(Notification.class, notificationId);
            if (n != null) {
                n.setStatus("READ");
                session.merge(n);
                tx.commit();
                return true;
            }
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
    public boolean markAllAsRead(int userId) {
        Session session = null;
        Transaction tx = null;
        try {
            session = DBUtils.openSession();
            tx = session.beginTransaction();
            String hql = "UPDATE Notification SET status = 'READ' WHERE userId = :userId AND status = 'UNREAD'";
            Query<?> query = session.createQuery(hql);
            query.setParameter("userId", userId);
            query.executeUpdate();
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
    public int getUnreadCount(int userId) {
        try (Session session = DBUtils.openSession()) {
            String hql = "SELECT count(n) FROM Notification n WHERE n.userId = :userId AND n.status = 'UNREAD'";
            Query<Long> query = session.createQuery(hql, Long.class);
            query.setParameter("userId", userId);
            Long count = query.uniqueResult();
            return count != null ? count.intValue() : 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
}
