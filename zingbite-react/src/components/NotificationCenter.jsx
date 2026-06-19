import React, { useState, useRef, useEffect } from 'react';
import { Bell, BellOff, X, CheckSquare, MessageSquare, Info, ShieldAlert, CheckCircle } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import '../styles/notification-center.css';

export default function NotificationCenter() {
  const { 
    notifications, 
    unreadCount, 
    toasts, 
    markAsRead, 
    markAllAsRead, 
    removeToast 
  } = useNotifications();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (id, status) => {
    if (status === 'UNREAD') {
      markAsRead(id);
    }
  };

  const getIcon = (title) => {
    const t = (title || '').toLowerCase();
    if (t.includes('order')) return <MessageSquare size={16} />;
    if (t.includes('alert') || t.includes('security')) return <ShieldAlert size={16} />;
    return <Info size={16} />;
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} />;
      case 'warning': return <ShieldAlert size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      {/* Bell Button */}
      <button 
        type="button" 
        className="notification-bell-btn" 
        onClick={toggleDropdown}
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
      >
        <Bell size={21} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                type="button" 
                className="mark-all-read-btn" 
                onClick={() => { markAllAsRead(); setIsOpen(false); }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty-state">
                <BellOff size={32} strokeWidth={1.5} />
                <p>No notifications yet.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`notification-item ${n.status === 'UNREAD' ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(n.id, n.status)}
                >
                  <div className="notification-item-icon">
                    {getIcon(n.title)}
                  </div>
                  <div className="notification-item-content">
                    <h4 className="notification-item-title">{n.title}</h4>
                    <p className="notification-item-msg">{n.message}</p>
                    <span className="notification-item-time">
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Portal container (rendered locally but positioned absolutely fixed) */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-alert">
            <div className="toast-icon">
              {getToastIcon(toast.type)}
            </div>
            <div className="toast-body">
              <h4 className="toast-title">{toast.title}</h4>
              <p className="toast-message">{toast.message}</p>
            </div>
            <button 
              type="button" 
              className="toast-close-btn" 
              onClick={() => removeToast(toast.id)}
              aria-label="Close alert"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
