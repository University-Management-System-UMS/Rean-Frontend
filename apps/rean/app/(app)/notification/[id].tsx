import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { router, useLocalSearchParams } from 'expo-router';
import NoMessage from '@/components/no-message';
import LoadingOverlay from '@/components/loading-indicator/loading-overlay';
import { Ionicons } from '@expo/vector-icons';
import { initialNotifications } from '@/api/dummy_data/notification.data';
import { Notification } from '@/api/types/notification';
import BasicHeader from '@/components/app-headers/basic-header';
import { getNotificationImage } from '@/components/notification/notification-card';

export default function NotificationDetailScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundNotification = initialNotifications.find(n => n.id === id);
      setNotification(foundNotification || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const renderHeader = () => {

    if (Platform.OS === 'android') {
      return <BasicHeader title={notification?.title} />;
    }

    return (
      <View style={styles.header}>
        <Ionicons
          name="close"
          size={FontSize['2xl']}
          color={Color.black}
          onPress={router.back}
        />
        <Text style={styles.title}>{notification?.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />

      {!loading && (
        <>
          {renderHeader()}

          {notification ? (
            <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image
                  source={getNotificationImage(notification.title)}
                  style={styles.innerImage}
                />
              </View>
              <Text style={styles.detailedTitle}>{notification.title}</Text>
              <Text style={styles.detailedDate}>{notification.timestamp}</Text>
              <Text style={styles.detailedDescriptions}>{notification.body}</Text>
            </View>
          ) : (
            <View style={styles.noMessage}>
              <NoMessage />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderColor: Color.grayScale.grayTwo,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: Spacing['2xl'],
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  imageContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: Spacing['2xl'],
  },
  innerImage: {
    width: 150,
    height: 150,
  },
  detailedTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: FontSize.lg,
    marginBottom: Spacing.sm,
  },
  detailedDate: {
    fontWeight: '600',
    textAlign: 'center',
    color: Color.grayScale.grayOne,
    marginBottom: Spacing.sm,
  },
  detailedDescriptions: {
    textAlign: 'center',
    color: Color.grayScale.grayOne,
    fontSize: FontSize.base,
  },
  noMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: Spacing['2xl'],
  },
});
