import { Color } from '@repo/colors';
import React from 'react';
import { Text, StyleSheet, View, FlatList} from 'react-native';
import { CheckboxInput, FontSize, FontWeight, RadioInput, Spacing } from '@repo/ums-agent';
import { Questions } from '@/api/types/my-learning/quiz';

interface ReviewQuizModalProps {
  quizData: Questions[];
  latestAttempt: Record<string, string[]>;
}

const ReviewQuizList = ({ quizData, latestAttempt }: ReviewQuizModalProps) => {
  return (
    <FlatList
      data={quizData}
      keyExtractor={(item) => item.id.toString()}
      style={styles.flatList}
      initialNumToRender={5}
      showsVerticalScrollIndicator={false}
      windowSize={10}
      renderItem={({ item }) => {
        const selectedValues = latestAttempt[item.id] || [];

        return (
          <View style={styles.questionsData}>
            <Text style={styles.questionText}>{item.id}. {item.question}</Text>
            <View>
              {item.type === 'checkbox' ? (
                <CheckboxInput
                  options={item.options.map((option) => ({ label: option, value: option }))}
                  multiSelect
                  activeColor={Color.primary}
                  inactiveColor={Color.grayScale.grayTwo}
                  textColor={Color.grayScale.black}
                  iconSize={20}
                  gap={Spacing.md}
                  isFlexColumn
                  selectedValues={selectedValues}
                  onChange={() => { }}
                />
              ) : (
                <RadioInput
                  options={item.options.map((option) => ({ label: option, value: option }))}
                  activeColor={Color.primary}
                  inactiveColor={Color.grayScale.grayTwo}
                  textColor={Color.grayScale.black}
                  iconSize={FontSize['2xl']}
                  gap={Spacing.md}
                  isFlexColumn
                  selectedValue={selectedValues[0] || ''}
                  onChange={() => { }}
                />
              )}
            </View>
          </View>
        );
      }}
    />
     
  );
};

const styles = StyleSheet.create({
  questionText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.md,
  },
  questionsData: {
    padding: Spacing.md
  },

  flatList: {
    flex: 1,
  },
});

export default ReviewQuizList;