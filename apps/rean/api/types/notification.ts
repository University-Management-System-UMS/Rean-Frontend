export interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  category?: string;
}

export interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export interface NotificationGroup {
  date: string;
  notifications: Notification[];
}

export interface NotificationListProps {
    notifications: Notification[];
    onPress: (notification: Notification) => void;
}