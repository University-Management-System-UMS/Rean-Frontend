import { Modal, View, TouchableOpacity, ScrollView, Image, StyleSheet, Platform } from 'react-native';
import { Text } from '@repo/ums-agent';
import { Ionicons } from '@expo/vector-icons';
import { NotificationItemProps } from '@/api/types/notification';
import { getNotificationImage } from './notification-card';
import { Color } from '@repo/colors';
import { StatusBar as RNStatusBar } from 'react-native';

interface NotificationDetailModalProps {
  notification: NotificationItemProps['notification'];
  visible: boolean;
  onClose: () => void;
}

export const NotificationDetailModal = ({ notification, visible, onClose }: NotificationDetailModalProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={Color.grayScale.black} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{notification.title}</Text>
          <View style={styles.invisible} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image source={getNotificationImage(notification.title)} style={styles.innerImage} />
          </View>
          <Text style={styles.detailedTitle}>{notification.title}</Text>
          <Text style={styles.detailedDate}>{notification.timestamp}</Text>
          <Text style={styles.detailedDescriptions}>{notification.body}</Text>
        </ScrollView>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? RNStatusBar.currentHeight || 44 : 0,
  },
  modalContent: {
    backgroundColor: Color.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Color.grayScale.grayTwo,
    paddingBottom: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  invisible: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 32,
  },
  innerImage: {
    width: 150,
    height: 150,
    padding: 16,
  },
  detailedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  detailedDate: {
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: Color.grayScale.grayOne,
  },
  detailedDescriptions: {
    textAlign: 'center',
    fontSize: 12,
    color: Color.grayScale.grayOne,
  },
})