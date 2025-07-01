import { Color } from '@repo/colors';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { LeavePeriodDetail } from '@/api/types/leave';
import BarSubHeader from '@/components/bar-subheader';
import { useTranslation } from '@/hooks/useTranslation';

interface LeaveDaysDetailProps {
  details?: LeavePeriodDetail[];
}

export const LeaveDaysDetail: React.FC<LeaveDaysDetailProps> = ({ 
  details, 
}) => {

  const { t } = useTranslation();

  if (!details || details.length === 0) {
    return null;
  }

  const renderLeaveDayItem = ({ item, index }: { item: LeavePeriodDetail; index: number }) => (
    <View style={[
      styles.leaveDayRow,
      index === details.length - 1 && styles.lastRow
    ]}>
      <View style={styles.dayInfo}>
        <View style={styles.calendarIconContainer}>
          <Text style={styles.calendarEmoji}>🗓</Text>
        </View>
        <Text style={styles.dayDate}>{item.lvTknDt}</Text>
      </View>
      
      <View style={styles.dayTypeContainer}>
        <Text style={styles.dayType}>
          {item?.aPeriodDtls
            ? item.aPeriodDtls
            : item?.lvTknDay?.includes('0.5')
              ? `${t('leaveReviewScreen.halfDay')} (${item?.lvTknDay?.includes('AM') ? t('leaveReviewScreen.am') : t('leaveReviewScreen.pm')})`
              : t('leaveReviewScreen.fullDay')}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.leaveDaysContainer}>
      <BarSubHeader title="Leave Days" />
      
      <View style={styles.leaveDaysCard}>
        <FlatList
          data={details}
          renderItem={renderLeaveDayItem}
          keyExtractor={(item, index) => `${item.lvTknDt}-${index}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leaveDaysContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  leaveDaysCard: {
    backgroundColor: Color.secondary6,
    borderRadius: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    borderWidth: 1,
    borderColor: Color.grayScale.grayThree,
  },
  leaveDayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.grayScale.grayTwo,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  calendarIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    marginRight: Spacing.xs,
  },
  calendarEmoji: {
    fontSize: FontSize.lg,
  },
  dayDate: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Color.grayScale.black,
  },
  dayTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  
  dayType: {
    fontSize: FontSize.sm,
    color: Color.grayScale.grayOne,
    textAlign: 'right',
  },
});