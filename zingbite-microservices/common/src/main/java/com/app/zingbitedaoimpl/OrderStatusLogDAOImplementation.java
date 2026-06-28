package com.app.zingbitedaoimpl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import com.app.zingbitedao.OrderStatusLogDAO;
import com.app.zingbitemodels.OrderStatusLog;
import com.app.zingbiteutils.DBUtils;

public class OrderStatusLogDAOImplementation implements OrderStatusLogDAO {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderStatusLogDAOImplementation.class);

    @Override
    public int addLog(OrderStatusLog log) {
        Transaction tx = null;
        try (Session session = DBUtils.openSession()) {
            tx = session.beginTransaction();
            session.persist(log);
            tx.commit();
            return log.getId();
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            LOGGER.error("Unexpected error", e);
        }
        return 0;
    }

    @Override
    public List<OrderStatusLog> getLogsByOrderId(int orderId) {
        List<OrderStatusLog> logList = new ArrayList<>();
        Transaction tx = null;
        try (Session session = DBUtils.openSession()) {
            tx = session.beginTransaction();
            String hql = "from OrderStatusLog where orderId = :orderId order by timestamp asc";
            Query<OrderStatusLog> query = session.createQuery(hql, OrderStatusLog.class);
            query.setParameter("orderId", orderId);
            logList = query.list();
            tx.commit();
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            LOGGER.error("Unexpected error", e);
        }
        return logList;
    }
}
