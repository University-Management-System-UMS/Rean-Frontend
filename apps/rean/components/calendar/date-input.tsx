import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Modal, View, SafeAreaView } from 'react-native';
import { Text, InputContainer, FontSize, Calendar, CustomButton, Spacing } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from '@/hooks/useTranslation';

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

export const DateInput = memo(({ 
  label, 
  value, 
  placeholder = '',
  onDateRangeChange,
  onSingleDateChange,
  initialRange,
  initialDate,
  mode = 'range',
  error,
}: DateInputProps) => {

  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const handleDateRangeChange = useCallback((range: { start: Date | null; end: Date | null }) => {
    onDateRangeChange?.(range);
  }, [onDateRangeChange]);

  const handleSingleDateChange = useCallback((date: Date | null) => {
    onSingleDateChange?.(date);
  }, [onSingleDateChange]);

  const handleClose = () => setModalVisible(false);

  const getButtonTitle = () => {
    if (mode === 'range') {
      return initialRange?.start && initialRange?.end 
        ? `${initialRange.start.toLocaleDateString()} - ${initialRange.end.toLocaleDateString()}`
        : t('ok');
    }
    return initialDate ? initialDate.toLocaleDateString() : t('ok');
  };

  return (
    <InputContainer label={label} error={error}>
      <TouchableOpacity 
        style={styles.dateInputButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.dateText, value ? styles.valueText : styles.placeholderText]}>
          {value?.toLocaleDateString() || placeholder}
        </Text>
        <Ionicons 
          name={modalVisible ? "chevron-up" : "chevron-down"} 
          size={18} 
          color={Color.grayScale.grayOne} 
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="overFullScreen"
      >
        <SafeAreaView style={styles.modalContainer}>
          <StatusBar style="dark" />
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={handleClose} 
              style={styles.arrowBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={Color.grayScale.black} />
            </TouchableOpacity>
            <Text style={styles.title} variant='heading'>{t('calendar')}</Text>
          </View>
          
          <Calendar
            mode={mode}
            onDateRangeChange={handleDateRangeChange}
            onSingleDateChange={handleSingleDateChange}
            initialDate={initialDate}
            initialRange={initialRange}
          />
          <View style={styles.footer}>
            <CustomButton
              onPress={handleClose} 
              title={getButtonTitle()}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </InputContainer>
  );
});

DateInput.displayName = 'DateInput';

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
  modalContainer: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.grayScale.grayThree,
  },
  arrowBack: {
    position: 'absolute',
    left: Spacing.md,
    zIndex: 1,
  },
  title: {
    color: Color.primary,
  },
  footer: {
    padding: Spacing.md,
  }
});
