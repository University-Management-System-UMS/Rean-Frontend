// utils.ts
import { StyleSheet } from 'react-native';
import { Color } from '@repo/colors';
import { FontSize, FontWeight, Spacing } from '../../constants/typography';

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const generateYears = (selectedYear: number): number[] => {
  return Array.from(
    { length: 7 },
    (_, i) => selectedYear - 2 + i
  );
};

export const getCalendarTheme = () => ({
  // Text colors
  textDayFontSize: FontSize.base,
  textMonthFontSize: FontSize.sm,
  textDayHeaderFontSize: FontSize.sm,
  
  // Font weights
  textDayFontWeight: FontWeight.medium,
  textMonthFontWeight: FontWeight.bold,
  textDayHeaderFontWeight: FontWeight.semiBold,

  // Colors
  selectedDayBackgroundColor: Color.primary,
  selectedDayTextColor: Color.white,
  todayTextColor: Color.white,
  todayDotColor: Color.primary,
  dayTextColor: Color.grayScale.black,
  textDisabledColor: Color.grayScale.grayThree,
  monthTextColor: Color.grayScale.black,
  textSectionTitleColor: Color.grayScale.grayOne,
  dotColor: Color.primary,
  selectedDotColor: Color.white,
});

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  headerContainer: {
    backgroundColor: Color.white,
    zIndex: 1000,
    paddingVertical: Spacing.sm,
  },
  yearList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  yearButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.ms,
    borderRadius: 26,
    backgroundColor: Color.grayScale.grayFour,
  },
  selectedYearButton: {
    backgroundColor: Color.primary,
  },
  yearButtonText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Color.grayScale.grayOne,
  },
  selectedYearButtonText: {
    color: Color.white,
  },
  calendarHeader: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    gap: Spacing.xs
  },
  monthText: {
    fontSize: FontSize.sm, 
    fontWeight: FontWeight.bold
  },
  yearText: {
    color: Color.grayScale.grayOne,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium
  }
});


export const getCurrentInitialDate = (initialDate?: Date) => {
  if (initialDate) {
    return initialDate;
  } 
  else {
    return new Date();
  }
};