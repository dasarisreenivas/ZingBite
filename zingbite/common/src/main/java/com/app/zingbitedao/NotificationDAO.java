package com.app.zingbitedao;

import java.util.List;
import com.app.zingbitemodels.Notification;

public interface NotificationDAO {
    boolean addNotification(Notification notification);
    List<Notification> getNotificationsByUser(int userId);
    boolean markAsRead(int notificationId);
    boolean markAllAsRead(int userId);
    int getUnreadCount(int userId);
}
