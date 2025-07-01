import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LeaveList from '@/components/review-leave/leave-list';
import { router } from 'expo-router';
import ReviewLeaveHeader from '@/components/app-headers/leave-review-header';
import StickyBottomButton from '@/components/sticky-bottom-button';
import { useTranslation } from '@/hooks/useTranslation';
import { TopSheet } from '@/components/action-sheets/top-sheet';
import { ReviewLeaveTopSheet } from '@/components/review-leave/review-leave-top-sheet';
import { Color } from '@repo/colors';
import { LeaveData } from '@/api/types/leave';
import { LeaveFilterProvider, useFilter } from '@/contexts/leave-filter-context';
import { useLeaves } from '@/hooks/useLeave';
import LoadingOverlay from '@/components/loading-indicator/loading-overlay';
import { useCustomAlert } from '@/contexts/custom-alert.context';
import { LeaveBottomSheetActions } from '@/components/review-leave/select-leave-detail';
import { useCancelLeave } from '@/hooks/leave/useCancelLeave';
import { BottomSheet } from '@repo/ums-agent';

export default function LeaveReview() {
  return (
    <LeaveFilterProvider>
      <LeaveReviewContent />
    </LeaveFilterProvider>
  );
}

const LeaveReviewContent = () => {
  const { t } = useTranslation();
  const { filters } = useFilter();
  const { data, isLoading, isError, error, refetch } = useLeaves();
  const cancelLeaveMutation = useCancelLeave();
  const [isOpenTopSheet, setIsOpenTopSheet] = useState(false);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const {alert} = useCustomAlert();

  useEffect(() => {
    if (isError) {
      getLeaveFailed();
    }
  }, [isError]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };
  
  const getLeaveFailed = () => {
    if (isError && error) {
      const translatedMessage = error.translationKey ? t(error.translationKey) : error.message;
      alert(
        t('error.title'),
        translatedMessage
      );
    }
  };

  // Apply filters to the data from API
  const filteredLeaveData = useMemo(() => {
    if (!data) return [];
    return data.filter((leave: LeaveData) => {
      const matchesStatus = filters.status && filters.status !== 'All' 
        ? leave.Stus === filters.status 
        : true;

      const matchesDateRange = filters.dateRange?.start && filters.dateRange?.end
        ? new Date(leave.start) >= filters.dateRange.start && 
          new Date(leave.end) <= filters.dateRange.end
        : true;

      return matchesStatus && matchesDateRange;
    });
  }, [filters, data]);

  const handleApplyLeave = () => {
    router.push('/(app)/leave-review/apply-leave');
  }

  const handlePressLeaveItem = (leave: LeaveData) => {
    setIsOpenBottomSheet(true);
    setSelectedLeave(leave);
  }

  const handleOpenTopSheet = () => {
    setIsOpenTopSheet(true);
  }; 

  const handleCloseTopSheet = () => {
    setIsOpenTopSheet(false);
  };
  
  const handleCloseBottomSheet = () => {
    setIsOpenBottomSheet(false);
    setSelectedLeave(null);
  };

  const handleViewDetails = () => {
    if (!selectedLeave) return;
    router.push(`/(app)/leave-review/${selectedLeave._id}`);
    handleCloseBottomSheet();
  };

  const handleCancelLeave = () => {
    cancelLeaveMutation.mutate(
      { leaveID: selectedLeave?._id || '', refID: selectedLeave?.refId || ''},
      {
        onSuccess: () => {
          alertOnSuccess();
        },
        onError: (error) => {
          console.log(error);
          alertOnError();
        },
      }
    );
    handleCloseBottomSheet();
  };

  const alertOnSuccess = () => {
    alert(
      t('leaveStatus.cancelled.title'),
      t('leaveStatus.cancelled.message'),
      [
        {
          text: t('ok'),
          onPress: () => {
            refetch();
            handleCloseTopSheet();
          },
        },
      ]
    );
  }

  const alertOnError = () => {
    alert(
      t('leaveStatus.cancelled.title'),
      `${t('leaveStatus.cancelled.message')}`,
      [
        {
          text: t('ok'),
          onPress: () => {
            refetch();
            handleCloseTopSheet();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={isLoading} />

      <ReviewLeaveHeader 
        title={t('homeMenu.home')} 
        desc={t("leaveReviewScreen.headerContent")}
        onRightIconPress={handleOpenTopSheet}/>
  
      <View style={styles.leaveListContainer}>
        <LeaveList
          data={filteredLeaveData}
          onPressItem={handlePressLeaveItem}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </View>
  
      <TopSheet 
        visible={isOpenTopSheet} 
        onClose={handleCloseTopSheet}
        showHandle={false}
        >
          <ReviewLeaveTopSheet onClose= {handleCloseTopSheet}/>
      </TopSheet>

      <BottomSheet
        visible={isOpenBottomSheet}
        onClose={handleCloseBottomSheet}
      >
       <LeaveBottomSheetActions 
        status={selectedLeave?.Stus}
        onCancel={handleCancelLeave} 
        onViewDetails={handleViewDetails}/>
      </BottomSheet>

      
      <StickyBottomButton
        title={t('leave.applyLeave.title')}
        onPress={handleApplyLeave}
      />
  
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leaveListContainer: {
    flex: 1,
    backgroundColor: Color.white,
  },
});