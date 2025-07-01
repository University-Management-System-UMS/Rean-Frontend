// CalendarSingle.tsx
import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import type { DateData } from 'react-native-calendars';
import { Color } from '@repo/colors';
import { Text } from '../ui/custom-text';
import { MarkedDates } from 'react-native-calendars/src/types';
import { CalendarSingleProps } from './types';
import { 
  formatDate, 
  parseDate, 
  generateYears, 
  getCalendarTheme, 
  sharedStyles, 
  getCurrentInitialDate
} from './utils';

/**
 * A full-screen calendar component for single date selection.
 * 
 * @component
 * @example
 * <CalendarSingle
 *   onSingleDateChange={(date) => console.log('Selected date:', date)}
 * />
 */
export const CalendarSingle: React.FC<CalendarSingleProps> = ({
  onSingleDateChange,
  initialDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    initialDate ? formatDate(initialDate) : ''
  );
  const [selectedYear, setSelectedYear] = useState(
    initialDate?.getFullYear() || new Date().getFullYear()
  );

  const handleDayPress = useCallback((day: DateData) => {
    const date = parseDate(day.dateString);
    setSelectedDate(day.dateString);
    onSingleDateChange?.(date);
  }, [onSingleDateChange]);

  const markedDates = React.useMemo(() => {
    const dates: MarkedDates = {};
    
    // Mark today's date with a dot
    const today = formatDate(new Date());
    dates[today] = {
      startingDay: true,
      endingDay: true,
      color: Color.secondary,
    };
    
    // Mark selected date
    if (selectedDate) {
      dates[selectedDate] = {
        ...dates[selectedDate],
        selected: true,
        startingDay: true,
        endingDay: true,
        color: Color.primary,
        textColor: Color.white,
      };
    }

    return dates;
  }, [selectedDate]);

  const years = generateYears(selectedYear);
  const minDate = new Date(selectedYear, 0, 1);
  const maxDate = new Date(selectedYear + 1, 3, 30);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={sharedStyles.headerContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={sharedStyles.yearList}
        >
          {years.map(year => (
            <TouchableOpacity
              key={year}
              style={[
                sharedStyles.yearButton,
                year === selectedYear && sharedStyles.selectedYearButton
              ]}
              onPress={() => handleYearSelect(year)}
            >
              <Text style={[
                sharedStyles.yearButtonText,
                year === selectedYear && sharedStyles.selectedYearButtonText
              ]}>
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <CalendarList
        current={formatDate(getCurrentInitialDate(initialDate || new Date()))}
        minDate={formatDate(minDate)}
        maxDate={formatDate(maxDate)}
        showScrollIndicator={false}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType="period"
        allowSelectionOutOfRange={false}
        theme={getCalendarTheme()}
      />
    </SafeAreaView>
  );
};