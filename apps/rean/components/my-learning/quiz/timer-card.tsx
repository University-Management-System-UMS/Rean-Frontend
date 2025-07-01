import { Color } from '@repo/colors';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FontSize, FontWeight, Shadows, Spacing, Text } from '@repo/ums-agent';
import { useTranslation } from '@/hooks/useTranslation';

interface QuizTimerCardProps {
  secondsLeft: number;
  currentQuestion: number;
  totalQuestions: number;
}


const QuizTimerCard: React.FC<QuizTimerCardProps> = ({
  secondsLeft,
  currentQuestion,
  totalQuestions,
}) => {

  const { t  } = useTranslation();
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return (
    <View style={styles.card}>
      {/* Timer */}
      <View style={styles.subContainer}>
        <Image
          style={styles.Image}
          source={require("@/assets/images/quiz/time.png")}
        />
        <View>
          <Text style={styles.text}>{t('quiz.card.timeLimit')}</Text>
          <Text style={styles.title}>
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <Image source={require("@/assets/images/quiz/divider.png")} />

      {/* Question Progress */}
      <View style={styles.subContainer}>
        <Image
          style={styles.Image}
          source={require("@/assets/images/quiz/stickynote.png")}
        />
        <View>
          <Text style={styles.text}>{t('quiz.card.question')}</Text>
          <Text style={styles.title}>
            {currentQuestion.toString().padStart(2, "0")}/{totalQuestions}
          </Text>
        </View>
      </View>
      <View style={styles.tag}>
        <Text style={styles.tagText}>Process</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    backgroundColor: Color.white,
    borderRadius: Spacing.md,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
    gap: Spacing.md,
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: Color.grayScale.black,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  Image: {
    width: 32,
    height: 32,
  },
  title: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  text: {
    fontSize: FontSize.sm,
    color: Color.grayScale.grayOne,

  },

  tag: {
    position: 'absolute',
    top: -10,
    right: -5,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 2,
    ...Shadows.medium,
    backgroundColor: Color.accent,
  },
  tagText: {
    fontSize: FontSize.sm,
    color: Color.white,
  },

});

export default QuizTimerCard;

