import { Color } from '@repo/colors';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { LeavePeriodDetail } from '@/api/types/leave';
import { LeaveDaysDetail } from './leave-day-details';

export enum LeaveStatusType {
  REJECTED = 'Rejected',
  APPROVED = 'Approved',
  SUBMITTED = 'Submitted',
  CANCELLED = 'Cancelled',
}

interface LeaveDetails {
  category?: string;
  reason?: string;
  startDate?: string;
  endDate?: string;
  details?: LeavePeriodDetail[];
}

interface LeaveStatusScreenProps {
  status?: LeaveStatusType;
  leaveDetails?: LeaveDetails;
  message?: string;
}


export const LeaveDetail: React.FC<LeaveStatusScreenProps> = ({ 
  status, 
  leaveDetails, 
  message 
}) => {
  const { t } = useTranslation();

  const STATUS_CONFIG = {
    [LeaveStatusType.REJECTED]: {
      title: t('leaveStatus.rejected.title'),
      defaultMessage: t('leaveStatus.rejected.message'),
      badgeImage: require('@/assets/images/apply-leave/reject.png'),
    },
    [LeaveStatusType.APPROVED]: {
      title: t('leaveStatus.approved.title'),
      defaultMessage: t('leaveStatus.approved.message'),
      badgeImage: require('@/assets/images/apply-leave/approve.png'),
    },
    [LeaveStatusType.SUBMITTED]: {
      title: t('leaveStatus.submitted.title'),
      defaultMessage: t('leaveStatus.submitted.message'),
      badgeImage: require('@/assets/images/apply-leave/submit.png'),
    },
    [LeaveStatusType.CANCELLED]: {
      title: t('leaveStatus.cancelled.title'),
      defaultMessage: t('leaveStatus.cancelled.message'),
      badgeImage: require('@/assets/images/apply-leave/cancelled.png'),
    }
  };

  const config = STATUS_CONFIG[status!];

  const duration = leaveDetails?.details?.reduce((acc, detail) => {
    const dayCount = detail?.lvTknDay?.includes?.('0.5') ? 0.5 : 1;
    return acc + dayCount;
  }
  , 0) || 0;

  return (
    <View style={styles.container}>
      
      <View style={styles.badge}>
        <Image source={config.badgeImage} style={styles.badgeImage} />
      </View>
      
      <View style={styles.headerTitle}>
        <Text variant='heading'>{config.title}</Text>
        
        <Text style={styles.message}>
          {message || config.defaultMessage}
        </Text>
      </View>
      
      
      <View style={styles.leaveContainer}>
        <View style={styles.leaveDetailsContainer}>
          <Text style={styles.leaveCategory}>{leaveDetails?.category}</Text>
          <Text style={styles.leaveReason}>{leaveDetails?.reason}</Text>
          
          <View style={styles.separator} />
          
          <View style={styles.totalLeaveSection}>
            <View style={styles.dateContainer}>
              <View style={styles.calendarIconContainer}>
                <Image source={require('@/assets/images/apply-leave/calendar.png')} />
              </View>
              <View style={styles.dateTextContainer}>
                <Text style={styles.leaveLabel}>{t('leave.totalLeave')}</Text>
                <Text style={styles.leaveDate}>
                  {`${leaveDetails?.startDate} ${t('to')} ${leaveDetails?.endDate}`}
                </Text>
              </View>
            </View>
            <Text style={styles.leaveDuration}>
              {duration
                ? `${duration} ${t(duration === 1 ? t('day') : t('days'))}`
                : ''}
            </Text>

          </View>
          
        </View>
      </View>

      <LeaveDaysDetail 
        details={leaveDetails?.details} 
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', 
    gap: Spacing.xl,
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Color.background,
  },
  leaveContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: Spacing.md,
  },
  badge: {
    width: 124,
    height: 124,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeImage: {
    width: '100%',
    height: '100%',
  },

  headerTitle: {
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.lg
  },
  
  message: {
    textAlign: 'center',
  },
  leaveDetailsContainer: {
    width: '100%',
    backgroundColor: Color.secondary6,
    borderRadius: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    borderWidth: 1,
    borderColor: Color.grayScale.grayThree,
  },
  leaveCategory: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Color.grayScale.black,
  },
  leaveReason: {
    color: Color.grayScale.grayOne,
  },
  separator: {
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Color.grayScale.grayTwo,
    width: '100%',
    marginVertical: Spacing.lg,
  },
  totalLeaveSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: Spacing.base,
    alignItems: 'center',
  },
  calendarIconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTextContainer: {
    flexDirection: 'column',
  },
  leaveLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  leaveDate: {
    color: Color.grayScale.grayOne,
    paddingVertical: Spacing.xs, //to prevent khmer text from cut off
  },
  leaveDuration: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Color.secondary
  },
});
