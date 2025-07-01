// CalendarRange.tsx
import React, { useState, useCallback  } from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import type { DateData } from 'react-native-calendars';
import { Color } from '@repo/colors';
import { Text } from '../ui/custom-text';
import { MarkedDates } from 'react-native-calendars/src/types';
import { CalendarRangeProps } from './types';
import { 
  formatDate, 
  parseDate, 
  generateYears, 
  getCalendarTheme, 
  sharedStyles, 
} from './utils';

/**
 * A full-screen calendar component for date range selection.
 * 
 * @component
 * @example
 * <CalendarRange
 *   onDateRangeChange={({ start, end }) => console.log('Selected range:', start, end)}
 *   initialRange={{ start: new Date(), end: null }}
 * />
 */

export const CalendarRange: React.FC<CalendarRangeProps> = ({
  onDateRangeChange,
  initialDate,
  initialRange = { start: null, end: null },
}) => {
  const [selectedRange, setSelectedRange] = useState({
    start: initialRange.start ? formatDate(initialRange.start) : '',
    end: initialRange.end ? formatDate(initialRange.end) : '',
  });
  const [selectedYear, setSelectedYear] = useState(
    initialDate?.getFullYear() || new Date().getFullYear()
  );
  const [yearChanged, setYearChanged] = useState(false);

  const handleDayPress = useCallback((day: DateData) => {
    if (!selectedRange.start || selectedRange.end) {
      // Start new selection
      setSelectedRange({ start: day.dateString, end: '' });
      onDateRangeChange?.({ 
        start: parseDate(day.dateString), 
        end: null 
      });
    } else {
      // Complete the range
      const startDate = parseDate(selectedRange.start);
      const endDate = parseDate(day.dateString);
      
      if (endDate < startDate) {
        // Swap dates if end is before start
        setSelectedRange({ 
          start: day.dateString, 
          end: selectedRange.start 
        });
        onDateRangeChange?.({ 
          start: endDate, 
          end: startDate 
        });
      } else {
        setSelectedRange({ 
          start: selectedRange.start, 
          end: day.dateString 
        });
        onDateRangeChange?.({ 
          start: startDate, 
          end: endDate 
        });
      }
    }
  }, [selectedRange, onDateRangeChange]);

  const markedDates = React.useMemo(() => {
    const dates: MarkedDates = {};
    
    // Mark today's date with a dot
    const today = formatDate(new Date());
    dates[today] = {
      startingDay: true,
      endingDay: true,
      color: Color.secondary,
    };
    
    // Mark start date
    if (selectedRange.start) {
      dates[selectedRange.start] = {
        ...dates[selectedRange.start],
        startingDay: true,
        color: Color.primary,
        textColor: Color.white,
      };
    }

    // Mark end date and fill range
    if (selectedRange.end) {
      dates[selectedRange.end] = {
        endingDay: true,
        color: Color.primary,
        textColor: Color.white,
      };

      // Fill in the range
      const start = new Date(selectedRange.start);
      const end = new Date(selectedRange.end);
      
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        const dateStr = formatDate(date);
        if (!dates[dateStr]) {
          dates[dateStr] = {
            color: Color.grayScale.grayFour,
            textColor: Color.grayScale.grayOne,
          };
        }
      }
    }

    return dates;
  }, [selectedRange]);

  const years = generateYears(selectedYear);
  const minDate = new Date(selectedYear, 0, 1);
  const maxDate = new Date(selectedYear + 1, 3, 30);
  const initialDisplayDate = yearChanged
  ? minDate
  : initialRange?.start || (new Date());


  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setYearChanged(true);
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
        current={formatDate(initialDisplayDate)}
        minDate={formatDate(minDate)}
        maxDate={formatDate(maxDate)}
        showScrollIndicator={false}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType="period"
        allowSelectionOutOfRange={false}
        theme={getCalendarTheme()}
        calendarHeight={350}
        renderHeader={(date) => {
          const month = date.toString('MMMM');
          const year = date.toString('yyyy');
          return (
            <View style={sharedStyles.calendarHeader}>
              <Text style={sharedStyles.monthText}>{month}</Text>
              <Text style={sharedStyles.yearText}>{year}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};