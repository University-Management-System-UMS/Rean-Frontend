import { Color } from '@repo/colors';
import { FontSize, FontWeight, Shadows, Spacing } from '@repo/ums-agent';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

type BoxProgressBarProps = {
  total: number;
  completedQuestions?: number[]; 
  current: number;
  onPress?: (index: number) => void;
};

const BoxProgressBar = ({
  total,
  completedQuestions = [], // Default to empty array
  current,
  onPress,
}: BoxProgressBarProps) => {
  const data = Array.from({ length: total }).map((_, index) => ({
    key: index.toString(),
    index,
  }));

  const renderItem = ({ item }: { item: { index: number } }) => {
    const questionNumber = item.index + 1;

    let backgroundColor;
    let textColor = Color.white;

    // Check if this question is completed 
    const isCompleted = completedQuestions.includes(questionNumber);

    if (isCompleted) {
      backgroundColor = Color.alert.success; // Green for completed
    } else if (questionNumber === current) {
      backgroundColor = Color.accent; // Blue for current
    } else {
      backgroundColor = Color.white; // Gray for incomplete
      textColor = Color.grayScale.grayOne;
    }

    return (
      <TouchableOpacity
        style={[styles.box, { backgroundColor }]}
        onPress={() => onPress?.(questionNumber)}
      >
        <Text style={[styles.number, { color: textColor }]}>{questionNumber}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.wrapper}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  box: {
    width: 42,
    height: 42,
    borderRadius: 12,
    marginRight: Spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.button,
  },
  number: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
  },
});

export default BoxProgressBar;
