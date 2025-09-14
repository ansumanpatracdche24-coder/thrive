import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getNotifications, getUnreadNotificationCount } from '@/services/data';

export interface Notification {
  id: string;
  type: 'match' | 'message' | 'reveal' | 'like' | 'post' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  userId?: string;
  avatar?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch notifications from database
  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);
    try {
      const result = await getNotifications();
      if (result.success && result.data) {
        // Transform database notifications to match our interface
        const transformedNotifications = result.data.map(dbNotif => ({
          id: dbNotif.id,
          type: dbNotif.type as any,
          title: dbNotif.title,
          message: dbNotif.message || '',
          timestamp: new Date().toLocaleString(), // Use current time for now
          read: dbNotif.isRead,
          userId: dbNotif.id, // Use notification id as fallback
        }));
        setNotifications(transformedNotifications);
      }

      // Get unread count
      const countResult = await getUnreadNotificationCount();
      if (countResult.success) {
        setUnreadCount(countResult.count);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch notifications when user changes
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      // Update local state immediately for better UX
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));

      // TODO: Update in database when backend is ready
      // await markNotificationAsRead(id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Revert local state on error
      fetchNotifications();
    }
  }, [fetchNotifications]);

  const markAllAsRead = useCallback(async () => {
    try {
      // Update local state immediately
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      setUnreadCount(0);

      // TODO: Update in database when backend is ready
      // await markAllNotificationsAsRead();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // Revert local state on error
      fetchNotifications();
    }
  }, [fetchNotifications]);

  const deleteNotification = useCallback(async (id: string) => {
    try {
      // Update local state immediately
      setNotifications(prev => {
        const notification = prev.find(n => n.id === id);
        if (notification && !notification.read) {
          setUnreadCount(prevCount => Math.max(0, prevCount - 1));
        }
        return prev.filter(n => n.id !== id);
      });

      // TODO: Delete from database when backend is ready
      // await deleteNotificationFromDB(id);
    } catch (error) {
      console.error('Error deleting notification:', error);
      // Revert local state on error
      fetchNotifications();
    }
  }, [fetchNotifications]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: 'now',
    };
    setNotifications(prev => [newNotification, ...prev]);
    if (!newNotification.read) {
      setUnreadCount(prev => prev + 1);
    }
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    refreshNotifications: fetchNotifications,
  };
};