import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Color } from '@repo/colors';
import { FontSize, FontWeight, Shadows, Spacing, Text } from'@repo/ums-agent';

interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
}


interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;

}

export const getNotificationImage = (title: string): ImageSourcePropType => {
  switch (title.toLowerCase()) {
    case 'new message':
      return require("@/assets/images/mainApp/new-message.png");
    case 'system update':
      return require("@/assets/images/mainApp/notificationIcon.png");
    case 'reminder':
      return require("@/assets/images/mainApp/reminder.png");
    case 'payment received':
      return require("@/assets/images/mainApp/payment.png");
    case 'new follower':
      return  require("@/assets/images/mainApp/new-message.png");
    default:
      return require("@/assets/images/mainApp/new-message.png");
  }
};

const NotificationCard: React.FC<NotificationItemProps> = ({ notification, onPress }) => {

  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(notification)}
        style={[styles.container, !notification.isRead && styles.unreadContainer]}>

        <View style={styles.iconContainer}>

          <Image
            source={getNotificationImage(notification.title)}
            style={styles.iconContainer}
          />
        </View>
        <View style={styles.content}>

          <View style={styles.topContent}>
            <Text style={[styles.title, !notification.isRead && styles.titleUnread]}>
              {notification.title}
            </Text>
            <Text style={styles.date}>{notification.timestamp}</Text>
          </View>

          <View style={styles.bottomContent}>
            <Text style={[styles.body, !notification.isRead && styles.bodyUnread]} numberOfLines={2}>{notification.body}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  //containers state: read and unread
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: Color.grayScale.grayFour,
    gap: Spacing.base,
    borderRadius: 12,
    ...Shadows.card
  },
  unreadContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Color.white,
    
  },

  //notification icon
  iconContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 44,
    height: 44,
  },
  //contents of each card container
  content: {
    width: '82%',
  },
  topContent: {
    flexDirection: 'row',
    flex: 2,
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomContent: {
    flexDirection: 'row',
    width: '85%',
  },
  //title read and unread
  title: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Color.grayScale.grayOne,
    marginBottom: Spacing.xs,
  },
  titleUnread: {
    fontWeight: FontWeight.bold,
    color: Color.grayScale.black,
  },
  //descriptions
  bodyUnread: {
    fontSize: FontSize.sm,
    marginBottom: Spacing.xs,
    color: Color.grayScale.black,
  },
  body: {
    fontSize: FontSize.sm,
    marginBottom: Spacing.xs,
    color: Color.grayScale.grayOne,
  },
  date: {
    color: Color.grayScale.grayOne,
  },
});

export default NotificationCard;