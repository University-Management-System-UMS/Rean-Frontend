import { Notification } from '@/api/types/notification';
import { DateUtils } from '@/utils/date.util';

export const NotificationService = {
  groupNotifications: (notifications: Notification[]) => {
    const groups: { [key: string]: Notification[] } = {};
    
    notifications.forEach(notification => {
      const date = DateUtils.parse.fromYYYYMMDDHHMMSS(notification.timestamp);
      const groupKey = DateUtils.relative.getRelativeDay(date);
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(notification);
    });
    
    return Object.entries(groups).map(([date, notifications]) => ({
      date,
      notifications: notifications.map(notification => ({
        ...notification,
        timestamp: DateUtils.format.toTime(DateUtils.parse.fromYYYYMMDDHHMMSS(notification.timestamp))
      }))
    }));
  },

  markAsRead: (notifications: Notification[], notificationId: string): Notification[] => {
    return notifications.map(n =>
      n.id === notificationId ? { ...n, isRead: true } : n
    );
  }
};