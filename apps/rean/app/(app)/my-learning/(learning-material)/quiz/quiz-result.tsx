import { View, StyleSheet, Dimensions } from "react-native";
import { CustomButton, FontSize,  Spacing, Text } from "@repo/ums-agent";
import { quizDataList, QuizQuestions } from "@/api/dummy_data/quiz.data";
import QuizInfoCard from "@/components/my-learning/quiz/quiz-info-card";
import { Color } from "@repo/colors";
import { useState } from "react";
import { useQuizContext } from "@/contexts/quiz-answer-context";
import { Questions } from "@/api/types/my-learning/quiz";
import AttemptCard from "@/components/my-learning/quiz/attempt-card";
import { useTranslation } from "@/hooks/useTranslation";
import { BottomSheet } from "@/components/action-sheets/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import ReviewQuizList from "@/components/my-learning/quiz/review-quiz-list";
import QuizHeader from "@/components/app-headers/quiz-header";
import BarSubHeader from "@/components/bar-subheader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const { height: screenHeight } = Dimensions.get("window");


export default function QuizResultScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();

  const [visible, setVisible] = useState(false);

  const quizId = params.id || params.quizId;
  const quiz = quizDataList.find(q => String(q.id) === String(quizId));

  const quizData: Questions[] = QuizQuestions;
  const { quizHistory } = useQuizContext();
  const latestAttempt = quizHistory[quizHistory.length - 1] || {};

  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);

  return (
    <SafeAreaView edges={['bottom']} style={styles.main}>
      <QuizHeader title={t('quiz.button.review')} />
      <View style={styles.container}>
        {quiz && <QuizInfoCard quiz={quiz} />}
        <BarSubHeader title={t('quiz.yourSubmission')} />
        <AttemptCard
          attempts={quiz?.config.maxRetries || 0}
          openDate="31 Nov 2025, 18:09"
          closeDate="31 Nov 2025, 18:09"
          totalTime="27 minutes 18 seconds"
        />
      </View>

      <View style={styles.button}>
        <CustomButton
          title={t('quiz.button.review')}
          onPress={handleOpenModal}
        />
      </View>
     
      <BottomSheet
        visible={visible}
        onClose={handleCloseModal}
        showHandle ={false}
        height={screenHeight * 0.85}
        closeOnSwipeDown={false}
      >
        <View style={styles.resultContainer}>
          <View style={styles.header}>
            <Ionicons
              name="close"
              size={FontSize['2xl']}
              color={Color.grayScale.grayOne}
              onPress={() => setVisible(false)}
            />
            <Text variant="heading">{t('quiz.quizResult')}</Text>
          </View>

          <ReviewQuizList
            quizData={quizData}
            latestAttempt={latestAttempt}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    padding: Spacing.md,
    gap: Spacing.md,
    flex: 1,
    top: -Spacing['5xl'],
  },
  header: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
    padding:Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Color.grayScale.grayThree,
  },
  resultContainer: {
    flex: 1,
  },
  button: {
    justifyContent: 'flex-end',
    padding: Spacing.md,
  },
 
});