import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Notification } from '@/api/types/notification';
import { Color } from '@repo/colors';
import { FontWeight, Spacing, Text } from'@repo/ums-agent';
import NotificationCard from './notification-card';

interface NotificationGroupProps {
  date: string;
  notifications: Notification[];
  onPress: (notification: Notification) => void;
}

export const NotificationGroup = ({ date, notifications, onPress }: NotificationGroupProps) => (
  <View>
    <Text style={styles.dateHeader}>{date}</Text>
    <View style={styles.notificationGroup}>
      {notifications.map(notification => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onPress={() => onPress(notification)}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  dateHeader: {
    fontWeight: FontWeight.semiBold,
    color: Color.grayScale.grayOne,
    paddingVertical: Spacing.md,
  },
  notificationGroup: {
    gap: Spacing.base,
  },
});