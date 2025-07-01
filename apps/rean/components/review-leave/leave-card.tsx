import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontSize, FontWeight, LineHeight, Shadows, Spacing, Text } from '@repo/ums-agent';
import { LeaveData } from '@/api/types/leave';
import { DateUtils } from '@/utils/date.util';
import { useTranslation } from '@/hooks/useTranslation';

interface LeaveCardProps {
  leave: LeaveData;
  onPress?: () => void;
}

const LeaveCard = ({ leave, onPress }: LeaveCardProps) => {
  const { t } = useTranslation();

  //todo this is not safe to put fix value here
  const getStatusColor = () => {
    switch (leave.Stus) {
      case 'Submitted':
        return Color.alert.info;
      case 'Approved':
        return Color.alert.success;
      case 'Rejected':
        return Color.alert.error; 
      case 'Cancelled':
        return Color.grayScale.grayOne;
      default:
        return Color.grayScale.grayTwo; 
    }
  };

  const leaveStatus = () => {
    switch (leave.Stus) {
      case 'Submitted':
        return t('leaveStatus.tabs.submitted'); 
      case 'Approved':
        return t('leaveStatus.tabs.approved');
      case 'Rejected':
        return t('leaveStatus.tabs.rejected');
      case 'Cancelled':
        return t('leaveStatus.tabs.cancelled');
      default:
        return t('leaveStatus.tabs.unknown'); 
    }
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.rightContent}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{leave.LvTy}</Text>
          <Text style={styles.text}>
            { DateUtils.formatString.toContextualDate(leave.start) } - { DateUtils.formatString.toContextualDate(leave.end) }
          </Text>
          <Text style={styles.text} numberOfLines={2}>{leave.Rson.trim()}</Text>
        </View>
      </View>


      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={FontSize.lg} color={Color.grayScale.grayOne} />
      </View>

      {/* tag/ status bar style*/}
      <View style={[styles.tag, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.tagText}>{leaveStatus()}</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    backgroundColor: Color.white,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    gap: Spacing.sm,
    ...Shadows.card
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  content: {
  },
  iconContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
  tag: {
    position: 'absolute',
    top: -10,
    right: -5,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    minWidth: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 2,
  },
  tagText: {
    fontSize: 12,
    color: Color.white,
  },
  title: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    lineHeight: LineHeight.md,
  },

  text: {
    color: Color.grayScale.grayOne,
  },
});

export default LeaveCard;

