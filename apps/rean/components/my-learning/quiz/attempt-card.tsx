import { Color } from '@repo/colors';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import { useTranslation } from '@/hooks/useTranslation';

type AttemptCardProps = {
  attempts: number;
  openDate: string;
  closeDate: string;
  totalTime: string;
};

const AttemptCard: React.FC<AttemptCardProps> = ({
  attempts,
  openDate,
  closeDate,
  totalTime,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.upperContent}>
        <View style={styles.attemptContainer}>
          <View style={styles.calendarIconContainer}>
            <Image source={require('@/assets/images/apply-leave/calendar.png')} />
          </View>
          <View style={styles.dateTextContainer}>
            <Text style={styles.title}>{t('quiz.attempts.multiple')}</Text>
            <Text style={styles.attemptCount}>
              {attempts > 0 ? attempts.toString().padStart(2, '0') : '0'} 
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />
      {/*show the lower content of the card */}
      <View style={styles.lowerContent}>   
      <Text style={styles.label}>{t('quiz.attempts.open')}</Text>
        <Text style={styles.content}>{openDate}</Text>
      </View>

      <View style={styles.lowerContent}>
        <Text style={styles.label}>{t('quiz.attempts.close')}</Text>
        <Text style={styles.content}>{closeDate}</Text>
      </View>

      <View style={styles.lowerContent}>
        <Text style={styles.label}>{t('quiz.attempts.total')}</Text>
        <Text style={styles.content}>{totalTime}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

  cardContainer: {
    width: '100%',
    backgroundColor: Color.secondary6,
    borderRadius: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    borderWidth: 1,
    borderColor: Color.grayScale.grayThree,
  },
  content: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Color.grayScale.black,
  },
  label: {
    color: Color.grayScale.grayOne,
  },
  separator: {
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Color.grayScale.grayTwo,
    width: '100%',
    marginVertical: Spacing.lg,
  },
  upperContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attemptContainer: {
    flexDirection: 'row',
    gap: Spacing.base,
    alignItems: 'center',
  },
  calendarIconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTextContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  attemptCount: {
    color: Color.grayScale.grayOne,
  },
  lowerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});

export default AttemptCard;

