import { View, StyleSheet } from "react-native";
import { CustomButton, Spacing } from "@repo/ums-agent";
import { router, useLocalSearchParams } from "expo-router";
import { quizDataList } from "@/api/dummy_data/quiz.data";
import QuizInfoCard from "@/components/my-learning/quiz/quiz-info-card";
import QuizHeader from "@/components/app-headers/quiz-header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/loading-indicator/loading-overlay";

export default function QuizScreen() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const id = params.id;
  const quiz = quizDataList.find(q => String(q.id) === String(id));
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (quiz?.tagname === 'Submitted' && quiz.config?.allowRetry) {
        router.replace(`/(app)/my-learning/(learning-material)/quiz/quiz-result?id=${id}`);
      }
      setLoading(false);
    };
    check();
  }, []);

  const handleStartQuiz = () => {
    // gate to check if user has taking the test or not, if not yet, it will direct to take quiz screen.
    router.push(`/(app)/my-learning/(learning-material)/quiz/take-quiz?id=${id}`);
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.main}>
      <QuizHeader title={t('myLearning.menu.quiz')} />
      <View style={styles.container}>
        {quiz && <QuizInfoCard quiz={quiz} />}

      </View>
      <View style={styles.button}>
        <CustomButton
          title={t('quiz.button.start')}
          onPress={handleStartQuiz}
        />
      </View>
       <LoadingOverlay visible={loading} />
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
  button: {
    justifyContent: 'flex-end',
    padding: Spacing.md,

  },
});