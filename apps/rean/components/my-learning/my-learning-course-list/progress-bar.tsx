import { Color } from '@repo/colors';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import React from 'react';
import { View,  StyleSheet } from 'react-native';

const ProgressBar = ({ progress = 0.5 }) => {
  const percentage = Math.round(progress * 100);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.text}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  container: {
    flex: 1,
    height: 6,
    backgroundColor: Color.grayScale.grayThree,
    borderRadius: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Color.alert.success,
  },
  text: {
    fontSize: FontSize.sm,
    width: 40,
    textAlign: 'right',
    fontWeight: FontWeight.semiBold,
    color: Color.alert.success,
  },
});

export default ProgressBar;
