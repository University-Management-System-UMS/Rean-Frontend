import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { CustomButton, FontSize, Spacing, Text } from '@repo/ums-agent';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import TabNoRenderComponent from '../tabs-no-render';
import { LeaveFilterType, useFilter } from '@/contexts/leave-filter-context';
import { Range } from '@/contexts/date-input.context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomSheet } from '@/contexts/bottom-sheet.context';
import DateInput3 from '../calendar/date-input3';
import { DateRangePicker } from '../calendar/date-picker';
import BarSubHeader from '../bar-subheader';

const { height: screenHeight } = Dimensions.get('window');
 
interface ReviewLeaveTopSheetProps {
  onClose: () => void;
}

export const ReviewLeaveTopSheet: React.FC<ReviewLeaveTopSheetProps> = ({onClose}) => {
  const { t } = useTranslation();
  const { filters, setFilters } = useFilter();
  const [ localFilters, setLocalFilters ] = useState<LeaveFilterType>(filters);
  const [dateRangeError, setDateRangeError] = useState('');
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const leaveStatusList = [
      { label: t('leaveStatus.tabs.all'), value: 'All' },
      { label: t('leaveStatus.tabs.submitted'), value: 'Submitted' },
      { label: t('leaveStatus.tabs.rejected'), value: 'Rejected' },
      { label: t('leaveStatus.tabs.approved'), value: 'Approved' },
      { label: t('leaveStatus.tabs.cancelled'), value: 'Cancelled' },
  ];

  const handleLeaveStatus = (leaveStatus: string) => {
      setLocalFilters({ ...localFilters, status: leaveStatus });
  }

  const handleDateRangeChange = (selectedRange: Range) => {
      setLocalFilters({ ...localFilters, dateRange: selectedRange });
  };

  const handleSelectFilter = () => {
      // Validate date range
      if (localFilters.dateRange.start && !localFilters.dateRange.end) {
          setDateRangeError(t('leave.applyLeave.error.endDateRequired'));
          return;
      }
      setDateRangeError('');
      
      const updatedFilters: LeaveFilterType = {
          status: localFilters.status,
          dateRange: {
              start: localFilters.dateRange.start,
              end: localFilters.dateRange.end
          }
      };
      setFilters(updatedFilters);
      onClose();
  }

  const handleOpenCalendar = () => {
      showBottomSheet({
        content: (<DateRangePicker 
          initialRange={localFilters.dateRange}
          onDateRangeChange={handleDateRangeChange}
          onPressBack={hideBottomSheet}
          onHandleSelect={hideBottomSheet}
          />),
        height: screenHeight,
        showHandle: false,
        borderRadius: 0,
        closeOnSwipeDown: false,
      });
  };

    return (
        <View style={styles.container}>

            <SafeAreaView edges={Platform.OS === 'ios' ? [] : ['top']} style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                    <Ionicons name="close" size={FontSize['2xl']} color={Color.grayScale.grayOne} />
                </TouchableOpacity>
                <Text variant='heading'>{ t('leave.search') }</Text>
            </SafeAreaView>
            
            <View style={styles.divider}/>

            <View style={styles.content}>
                <BarSubHeader title={t('leaveReviewScreen.leaveStatus')}/>
                <TabNoRenderComponent 
                  tabs={leaveStatusList} 
                  activeTab={localFilters.status || leaveStatusList[0].label} 
                  onTabChange={(leaveStatus) => handleLeaveStatus(leaveStatus)}
                />

                <BarSubHeader title={t('leaveReviewScreen.dateOption')}/>
                <View style={styles.calendarInputContainer}>
                   <DateInput3
                        label={t('leave.applyLeave.startDate')}
                        initialDate={localFilters.dateRange.start}
                        value={localFilters.dateRange.start}
                        placeholder={t('leave.applyLeave.startDate')}
                        onPress={handleOpenCalendar}
                    />
                    <DateInput3
                        label={t('leave.applyLeave.endDate')}
                        initialDate={localFilters.dateRange.end}
                        value={localFilters.dateRange.end }
                        placeholder={t('leave.applyLeave.endDate')}
                        error={dateRangeError}
                        onPress={handleOpenCalendar}
                    />
                </View>

                <CustomButton title={ t('filter') } onPress={handleSelectFilter}/>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingTop: Platform.OS === 'ios' ? 0 : Spacing.base
  },
  divider: {
    height: 1,
    backgroundColor: Color.grayScale.grayFour
  },
  content: {
    padding: Spacing.md,
    flexDirection: 'column',
    gap: Spacing.md
  },
  calendarInputContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  
});