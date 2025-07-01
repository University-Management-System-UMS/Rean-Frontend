import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { NotificationGroup } from '@/components/notification/notification-group';
import { NotificationService } from '@/utils/notification.util';
import NoMessage from '@/components/no-message';
import { Notification, NotificationListProps } from '@/api/types/notification';
import { Color } from '@repo/colors';
import TabComponent from '@/components/ums-tabs';
import { initialNotifications } from "@/api/dummy_data/notification.data";
import { router } from 'expo-router';
import BasicHeader from '@/components/app-headers/basic-header';
import { Spacing } from '@repo/ums-agent';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handlePress = (notification: Notification) => {
    setNotifications((prev: Notification[]) => NotificationService.markAsRead(prev, notification.id));
    router.push({
      pathname: `/notification/[id]` as const,
      params: { 
        title: notification.title,
        id: notification.id
      }
    });
  };

  const tabContent = React.useMemo(() => [
    {
      label: 'All',
      content: <NotificationList notifications={notifications} onPress={handlePress} />
    },
    {
      label: 'General',
      content: <NotificationList 
        notifications={notifications.filter(n => n.category === 'general')} 
        onPress={handlePress} 
      />
    },
    {
      label: 'Faculty',
      content: <NotificationList 
        notifications={notifications.filter(n => n.category === 'faculty')} 
        onPress={handlePress} 
      />
    },
    {
      label: 'Billing',
      content: <NotificationList 
        notifications={notifications.filter(n => n.category === 'etc' || '')} 
        onPress={handlePress} 
      />
    },
    {
      label: 'etc',
      content: <NotificationList 
        notifications={notifications.filter(n => n.category === 'general')} 
        onPress={handlePress} 
      />
    }
  ], [notifications]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <BasicHeader title="Notifications" />
      <TabComponent tabs={tabContent} tabStyle={styles.tabs}/>
    </SafeAreaView>
  );
}

const NotificationList = React.memo(({ notifications, onPress }: NotificationListProps) => {
  const groupedNotifications = useMemo(() => 
    NotificationService.groupNotifications(notifications), 
    [notifications]
  );

  return (
     <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      contentContainerStyle={styles.listContentContainer}
      data={groupedNotifications}
      keyExtractor={item => item.date}
      renderItem={({ item }) => (
        <NotificationGroup
          date={item.date}
          notifications={item.notifications}
          onPress={onPress}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <NoMessage
            title="Empty notification"
            body="No notifications yet. We'll let you know when there's something new!!"
          />
        </View>
      }
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing['2xl']
  },
  tabs: {
    padding: Spacing.md
  },
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? Spacing["2xl"] : Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});