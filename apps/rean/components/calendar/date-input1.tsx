/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import { CalendarProps, FontSize, InputContainer, Spacing, Text } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { useDateInput } from '@/contexts/date-input.context';

interface DateInputProps {
  label: string;
  value: Date | null;
  placeholder?: string;
  mode?: 'single' | 'range';
  onDateRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  onSingleDateChange?: (date: Date | null) => void;
  initialRange?: { start: Date | null; end: Date | null };
  initialDate?: Date | null;
  error?: string;
}

const DateInput2 = ({ 
  label,
  value,
  placeholder,
  onDateRangeChange,
  onSingleDateChange,
  mode,
  initialDate,
  initialRange,
  error,
}: DateInputProps) => {
return (
  <InputContainer label={label} error={error}>
      <TouchableOpacity 
        style={styles.dateInputButton}
        onPress={() => {
          router.push({
            pathname: '/(app)/calendar-screen',
            params: {
              initialRangeStart: initialRange?.start?.toISOString(),
              initialRangeEnd: initialRange?.end?.toISOString(),
              initialDate: initialDate?.toISOString(),
              mode: mode
            }
          })
        }}
        activeOpacity={0.7}
      >
        <Text style={[styles.dateText, initialDate ? styles.valueText : styles.placeholderText]}>
          {value?.toLocaleDateString() || placeholder}
        </Text>
        <Ionicons 
          name={"chevron-down"} 
          size={18} 
          color={Color.grayScale.grayOne} 
        />
      </TouchableOpacity>
    </InputContainer>
)
}

export default DateInput2;

const styles = StyleSheet.create({
  dateInputButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: Color.grayScale.black,
    fontSize: FontSize.base
  },
  valueText: {
    color: Color.grayScale.black,
  },
  placeholderText: {
    color: Color.grayScale.grayOne,
    fontSize: FontSize.base
  },
});
