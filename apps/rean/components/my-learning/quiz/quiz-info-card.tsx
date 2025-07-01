import { Color } from '@repo/colors';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FontSize, FontWeight, Shadows, Spacing, Text } from '@repo/ums-agent';
import { QuizData } from '@/api/types/my-learning/quiz';
import { useTranslation } from '@/hooks/useTranslation';

interface QuizCardProps {
  quiz: QuizData;
}

const QuizInfoCard: React.FC<QuizCardProps> = ({ quiz }) => {
  
  const { t  } = useTranslation();
  const getStatusColor = () => {
    switch (quiz.tagname) {
      case 'Submitted':
        return Color.alert.success; // Green
      case 'Incomplete':
        return Color.alert.warning; // Yellow
      case 'Overdue':
        return Color.alert.error; // Red
      default:
        return Color.alert.info;    // Fallback
    }
  };
  return (
    <View
      style={styles.card}
    >
      <View style={styles.subCard}>
        {/* Timer */}
        <View style={styles.timer}>
          <Image
            style={styles.Image}
            source={require("@/assets/images/quiz/time.png")}
          />
          <View>
            <Text style={styles.text}>{t('quiz.card.timeLimit')}</Text>
            <Text style={styles.info}>
              {quiz.duration}{"minutes"}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <Image style={styles.divider} source={require("@/assets/images/quiz/divider.png")} />

        {/* Question Progress */}
        <View style={styles.progress}>
          <Image
            style={styles.Image}
            source={require("@/assets/images/quiz/stickynote.png")}
          />
          <View>
            <Text style={styles.text}>{t('quiz.card.question')}</Text>
            <Text style={styles.info}>
              {quiz.questions}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.line}></View>
      <Text style={styles.title}>{quiz?.title}</Text>
      <Text style={styles.time}>{quiz?.time}</Text>
      <Text style={styles.description}>{quiz?.description}</Text>
      {/* tag/ status bar style*/}
      <View style={[styles.tag, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.tagText}>{quiz.tagname}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    backgroundColor: Color.white,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignContent: 'center',
    gap: Spacing.sm,
    overflow: 'visible', // Ensure the tag is visible
    ...Shadows.medium,
  },
  subCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: Spacing.xl,
    gap: Spacing.sm,
    width: '50%',
  },
  progress: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    width: '50%',
  },

  divider: {
    position: 'absolute',
    top: 0,
    left: '50%',
  },

  Image: {
    width: 32,
    height: 32,
  },
  info: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    lineHeight: 24,
  },
  text: {
    fontSize: FontSize.sm,
    color: Color.grayScale.grayOne,

  },
  //lower card content
  line: {
    borderBottomWidth: 2,
    borderBottomColor: Color.grayScale.grayThree,
    borderStyle: 'dashed',
    width: '100%',
    margin: Spacing.sm,
  },
  description: {
    fontSize: FontSize.sm,
    color: Color.black,
  },
  time: {
    fontSize: FontSize.sm,
    color: Color.alert.info,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginRight: Spacing.md,
  },

  //status bar/tag
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
  },
  tagText: {
    fontSize: FontSize.sm,
    color: Color.white,
  },
});

export default QuizInfoCard;

