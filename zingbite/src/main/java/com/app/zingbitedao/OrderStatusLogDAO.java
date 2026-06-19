package com.app.zingbitedao;

import java.util.List;
import com.app.zingbitemodels.OrderStatusLog;

public interface OrderStatusLogDAO {
    int addLog(OrderStatusLog log);
    List<OrderStatusLog> getLogsByOrderId(int orderId);
}
