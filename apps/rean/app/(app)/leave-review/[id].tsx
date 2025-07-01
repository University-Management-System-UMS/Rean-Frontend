import React from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/contexts/language.context';
import { DateUtils } from '@/utils/date.util';
import { Color } from '@repo/colors';
import { FontSize, Spacing, Text } from '@repo/ums-agent';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/hooks/useTranslation';
import { LeaveDetail, LeaveStatusType } from '@/components/review-leave/apply-leave/leave-detail';
import { LeaveData } from '@/api/types/leave';
import { useStudentDetails } from '@/hooks/useStudentDetails';
import { useQueryClient } from '@tanstack/react-query';
import { useLeaves } from '@/hooks/useLeave';

export default function LeaveDetailScreen() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  const params = useLocalSearchParams();
  const leaveId = params.id;
  const studentId = useStudentDetails()?.StuID;
  const queryClient = useQueryClient();

  // Check if data exists in cache first
  const cachedData = queryClient.getQueryData<LeaveData[]>(['leaveData', studentId]);
  const hasCache = !!cachedData;

  // Only use the hook if no cached data exists
  const { data: freshData } = useLeaves({
    enabled: !hasCache && !!studentId
  });

  const leaveList = cachedData || freshData;
  const leave = leaveList?.find((l) => String(l._id) === String(leaveId));

  // Safely handle dates
  const startDate = leave?.start ? new Date(leave.start) : null;
  const endDate = leave?.end ? new Date(leave.end) : null;

  const leaveDetails = {
    category: leave?.Stus ?? '',
    reason: leave?.Rson ?? '',
    startDate: startDate
      ? (language === 'kh'
          ? DateUtils.format.toKhmerDate(startDate)
          : DateUtils.format.toDate(startDate))
      : '-',
    endDate: endDate
      ? (language === 'kh'
          ? DateUtils.format.toKhmerDate(endDate)
          : DateUtils.format.toDate(endDate))
      : '-',
    details: leave?.aLvDtls
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={router.back} 
          style={styles.arrowBack}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={FontSize['2xl']} color={Color.grayScale.black} />
        </TouchableOpacity>
        <Text style={styles.title} variant='heading'>{t('leaveReviewScreen.leaveDetail')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
    
        {leave && (
          <LeaveDetail
            status={leave.Stus as LeaveStatusType}
            leaveDetails={leaveDetails}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
    
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.grayScale.grayTwo,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  arrowBack: {
    position: 'absolute',
    left: Spacing.md,
    zIndex: 1,
  },
  title: {
    color: Color.grayScale.black,
  },
});
