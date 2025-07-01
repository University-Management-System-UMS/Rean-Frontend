import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomButton, FontSize, FontWeight, RadioInput, Spacing } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { CheckboxInput, Text } from '@repo/ums-agent';
import { Questions } from '@/api/types/my-learning/quiz';
import { quizDataList, QuizQuestions } from '@/api/dummy_data/quiz.data';
import BoxProgressBar from '@/components/my-learning/quiz/box-progress-bar';
import QuizTimerCard from '@/components/my-learning/quiz/timer-card';
import { router, useLocalSearchParams } from 'expo-router';
import { useCustomAlert } from '@/contexts/custom-alert.context';
import { useQuizContext } from '@/contexts/quiz-answer-context';
import { useTranslation } from '@/hooks/useTranslation';
import QuizHeader from '@/components/app-headers/quiz-header';
import { SafeAreaView } from 'react-native-safe-area-context';

type SelectedAnswers = {
  [questionId: number]: string[];
};

//test the type of conditions 

export default function QuizScreen () {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const { addQuizAttempt } = useQuizContext();

  // Initialize timer once base on currentQuestion's duration
  const quizId = params.id || params.quizId;
  const quizQuestionData: Questions[] = QuizQuestions;
  const currentQuiz = quizDataList.find(q => String(q.id) === String(quizId));


  const initialSeconds = ((currentQuiz?.duration ?? 1)) * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  //go to questions muy muy
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});


  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const currentQuestion = quizQuestionData[currentQuestionIndex];
  const questionId = currentQuestion.id;
  const selectedValues = selectedAnswers[questionId] || [];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === quizQuestionData.length - 1;

  //progress when quiz is changed or complete 
  const handleOpionsChange = (values: string[]) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: values
    });

      // Mark question as completed if at least one option is selected
    if (values.length > 0 && !completedQuestions.includes(currentQuestion.id)) {
      setCompletedQuestions([...completedQuestions, currentQuestion.id]);
    }
    // Mark question as incomplete if no options are selected
    else if (values.length === 0 && completedQuestions.includes(currentQuestion.id)) {
      setCompletedQuestions(completedQuestions.filter(id => id !== currentQuestion.id));
    }

    // Store answers to show on results screen
    if (values.length === 0 && completedQuestions.includes(currentQuestion.id)) {
      setCompletedQuestions(completedQuestions.filter(id => id !== currentQuestion.id));
    }
  };
  

  //box show current question color when press (accent)
  const handlePress = (index: number) => {
    if (!currentQuiz?.config.allowJumpToQuestion) return;
    setCurrentQuestionIndex(index - 1);
  };


  const handleClose = () => {
    router.back();
  }
  const goToNext = () => {
    if (
      currentQuiz?.config.forceSequentialAnswering &&
      (!selectedAnswers[currentQuestion.id] || selectedAnswers[currentQuestion.id].length === 0)
    ) {
      return; // Don't go to next if unanswered
    }
    if (currentQuestionIndex < quizQuestionData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };


  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

const handleSubmit = () => {
  addQuizAttempt(selectedAnswers);
  router.push(`/(app)/my-learning/(learning-material)/quiz/quiz-result?id=${quizId}`);
};
  //show submit actions alert
  const { alert } = useCustomAlert();
  const showAlertWrapper = (alertFunction: () => void) => {
    setTimeout(() => {
      alertFunction();
    }, 300); // Wait for modal to close
  };
  const showConfirmAlert = () => { //translate
    alert(
      t('quiz.confirmAlert.submit'),
      t('quiz.confirmAlert.descript'),
      [
        {
          text: t('quiz.confirmAlert.cancel'),
          style: 'cancel',
        },
        {
          text: t('quiz.confirmAlert.ok'),
          onPress: handleSubmit,
        },
      ]
    );
  };
  // show warning alert
  const showWarningAlert = () => {
    alert(
      t('quiz.warningAlert.end'),
      t('quiz.warningAlert.descript'),
      [
        {
          text: t('quiz.confirmAlert.ok'),
          onPress: handleClose,
        },
        {
          text: t('quiz.confirmAlert.cancel'),
          style: 'cancel',
        },
      ]
    );
  };

  const handleBackQuiz = () => {
    showAlertWrapper(showWarningAlert);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.main}>
      <QuizHeader title={t('quiz.takeTest')} onBackPress={handleBackQuiz}/>
      <View style={styles.container}>
        <QuizTimerCard
          secondsLeft={secondsLeft}
          currentQuestion={currentQuestion.id}
          totalQuestions={QuizQuestions.length}
        />
        <View>
          <BoxProgressBar
            total={QuizQuestions.length}
            completedQuestions={completedQuestions}
            current={currentQuestion.id}
            onPress={handlePress} />
        </View>
        <View style={styles.questionsData}>
          <Text style={styles.questionText}>{currentQuestion.id} .</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>
        {currentQuestion.type === 'checkbox' ? (
          <CheckboxInput
            options={currentQuestion.options.map(option => ({ label: option, value: option }))}
            selectedValues={selectedValues}
            onChange={handleOpionsChange}
            multiSelect={true}
            activeColor={Color.primary}
            inactiveColor={Color.grayScale.grayTwo}
            textColor={Color.grayScale.black}
            iconSize={20}
            gap={Spacing.md}
            isFlexColumn={true}
          />
        ) : (
          <RadioInput
            options={currentQuestion.options.map(option => ({ label: option, value: option }))}
            selectedValue={selectedValues[0] || ''}
            onChange={(value: string) => handleOpionsChange([value])}
            activeColor={Color.primary}
            inactiveColor={Color.grayScale.grayTwo}
            textColor={Color.grayScale.black}
            iconSize={20}
            gap={Spacing.md}
            isFlexColumn={true}
          />
        )}

      </View>
      <View style={styles.navButtons}>
        {!isFirstQuestion && (
          <CustomButton
            title={t('quiz.button.previous')}
            onPress={goToPrevious}
            containerStyle={styles.main}
            variant='outline'
          />
        )}
        {isLastQuestion ? (
          <CustomButton
            title={t('quiz.button.submit')}
            onPress={() => showAlertWrapper(showConfirmAlert)}
            containerStyle={styles.main}
            disabled={
              currentQuiz?.config.forceSequentialAnswering &&
              (!selectedAnswers[currentQuestion.id] || selectedAnswers[currentQuestion.id].length === 0)
            }
          />
        ) : (
          <CustomButton
            title={t('quiz.button.next')}
            onPress={goToNext}
            containerStyle={styles.main}
            disabled={
              currentQuiz?.config.forceSequentialAnswering &&
              (!selectedAnswers[currentQuestion.id] || selectedAnswers[currentQuestion.id].length === 0)
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    gap: Spacing.md,
    padding: Spacing.md,
    flex: 1,
    top: -Spacing['5xl'],
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  questionText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
  },
  questionsData: {
    flexDirection: 'row',
  },
});