import React, { createContext, useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const esRef = useRef(null);

  // Fetch notifications from server
  const fetchNotifications = useCallback(async (showLoading = false) => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }
    if (showLoading) setLoading(true);
    try {
      const res = await axios.get('/api/notifications');
      if (res.data) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('[ZingBite] Failed to fetch notifications:', err);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [user]);

  // Add toast helper
  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  // Mark single notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      // Optimistic update
      setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, status: 'READ' } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      await axios.post('/api/notifications', { notificationId });
    } catch (err) {
      console.error('[ZingBite] Failed to mark notification as read:', err);
      fetchNotifications();
    }
  }, [fetchNotifications]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      // Optimistic update
      setNotifications(prev => prev.map(n => ({ ...n, status: 'READ' })));
      setUnreadCount(0);
      
      await axios.post('/api/notifications', {}); // empty body = mark all read
    } catch (err) {
      console.error('[ZingBite] Failed to mark all as read:', err);
      fetchNotifications();
    }
  }, [fetchNotifications]);

  // Set up SSE listener for real-time notifications
  useEffect(() => {
    if (!user) {
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Initial load
    fetchNotifications(true);

    const sseUrl = `${axios.defaults.baseURL || '/zingbite'}/api/stream?topic=user_orders`;
    console.log('[ZingBite] Connecting Notification SSE stream to:', sseUrl);
    
    const es = new EventSource(sseUrl);
    esRef.current = es;

    es.onopen = () => {
      console.log('[ZingBite] Notification SSE connection opened');
    };

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[ZingBite] SSE notification update received:', data);
        
        // Construct visual toast parameters based on the event
        const orderId = data.orderId;
        const status = data.status || 'PLACED';
        const restName = data.restaurantName || 'Restaurant';

        let statusText = status.toLowerCase().replace(/_/g, ' ');
        // Capitalize status text
        statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1);

        const title = `Order #${orderId}`;
        const message = `Your order from ${restName} is now: ${statusText}.`;
        
        // Show toast
        addToast(title, message, 'success');
        
        // Refetch database state to update badge and list
        fetchNotifications(false);
      } catch (err) {
        console.error('[ZingBite] Error parsing SSE event data:', err);
      }
    };

    es.onerror = (err) => {
      console.warn('[ZingBite] Notification SSE connection error, reconnecting...', err);
    };

    return () => {
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };
  }, [user, fetchNotifications, addToast]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const contextValue = useMemo(() => ({
    notifications,
    unreadCount,
    loading,
    toasts,
    markAsRead,
    markAllAsRead,
    addToast,
    removeToast,
    fetchNotifications
  }), [notifications, unreadCount, loading, toasts, markAsRead, markAllAsRead, addToast, removeToast, fetchNotifications]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
