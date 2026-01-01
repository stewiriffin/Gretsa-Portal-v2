import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { syncNotificationAdd, syncNotificationRead, syncNotificationClearAll } from '../services/broadcastChannel';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Assignment Posted',
    message: 'Dr. Wanjiku posted a new assignment in Data Structures',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Grade Released',
    message: 'Your grade for Web Development Quiz 2 is now available',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Fee Payment Reminder',
    message: 'Your semester fees are due in 3 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
  },
];

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  // Initialize from localStorage if available
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem('notifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
      }
      return defaultNotifications;
    } catch (error) {
      console.warn('Error loading notifications from localStorage:', error);
      return defaultNotifications;
    }
  });

  // Persist to localStorage whenever notifications change
  useEffect(() => {
    try {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.warn('Error saving notifications to localStorage:', error);
    }
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
    // Sync to other tabs
    syncNotificationAdd(newNotification);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    // Sync to other tabs
    syncNotificationRead(id);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    // Sync to other tabs
    syncNotificationClearAll();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
