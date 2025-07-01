// CustomCalendar.tsx
import React from 'react';
import  { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Color } from '@repo/colors';
import { Text } from'../components/ui/custom-text';


type Props = {
  onDateSelect?: (date: string) => void;
  initialDate?: string;
};

type DateObject = {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  };

export const CustomCalendar: React.FC<Props> = ({ 
  onDateSelect, 
  initialDate = moment().format('YYYY-MM-DD'),
}) => {
  const [selected, setSelected] = useState(initialDate);

  const handleDayPress = (day: DateObject) => {
    const formattedDate = moment(day.dateString).format('DD-MM-YYYY');
    setSelected(day.dateString);
    onDateSelect?.(formattedDate);
  };

  const customHeader = (
    <Text style={styles.header}>
      {moment(selected).format('MMMM-YYYY')}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        current={selected}
        onDayPress={handleDayPress}
        onMonthChange={(month) => {
          setSelected(month.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, selectedColor: Color.primary},
        }}
        theme={{
          monthTextColor: Color.primary,
          textMonthFontWeight: 'bold',
          textMonthFontSize: 16,
          selectedDayBackgroundColor: Color.primary, 
          selectedDayTextColor: Color.white,
          'stylesheet.calendar.main': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 5
            },
            dayContainer: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }
          },
          'stylesheet.day.basic': {
            base: {
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center'
            },
            selected: {
              borderRadius: 18,
              backgroundColor: Color.primary
            }
          },
          todayTextColor: Color.primary,
          todayBackgroundColor: Color.grayScale.grayTwo,
          arrowColor: Color.primary,
          textDayFontWeight: '500',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 14,
          textDayHeaderFontSize: 14,
        }}
        customHeaderTitle={customHeader}
        enableSwipeMonths={true}
        hideExtraDays={false}
        showSixWeeks={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    padding: 8,
    borderRadius: 16,
    shadowColor: Color.black,
  },
  header: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: Color.primary
  },
  calendar: {
    borderRadius: 16,
  },
});
