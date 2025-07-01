import { useDateInput } from '@/contexts/date-input.context';
import { useTranslation } from '@/hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { Calendar, CustomButton, Spacing, Text } from '@repo/ums-agent';
import { router, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CalendarScreenParams = {
  initialDate?: string;
  initialRangeStart?: string;
  initialRangeEnd?: string;
  mode?: 'single' | 'range';
};

export default function CalendarScreen() {
  return (
    <CalendarScreenContent />
  );
}

const CalendarScreenContent = () => {
  const { setSelectedDate, setSelectedRange } = useDateInput();
  const { t } = useTranslation();
  const params = useLocalSearchParams<CalendarScreenParams>();
  const mode = params.mode || 'single';
  const initialDate = params.initialDate ? new Date(params.initialDate) : null;
  const initialRange = params.initialRangeStart && params.initialRangeEnd ? {
    start: new Date(params.initialRangeStart),
    end: new Date(params.initialRangeEnd),
  } : undefined;

  const handleClose = () => {
    router.back();
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
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
            initialDate={initialDate}
            initialRange={initialRange}
            onSingleDateChange={(date) => {
              setSelectedDate(date);
            }}
            onDateRangeChange={(range) => setSelectedRange(range)}
          />

      <View style={styles.footer}>
        <CustomButton
          onPress={handleClose} 
          title={t('ok')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
})
