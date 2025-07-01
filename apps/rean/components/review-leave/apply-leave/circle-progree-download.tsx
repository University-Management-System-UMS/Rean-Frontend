// components/CircularProgressWithPercentage.tsx
import { Color } from '@repo/colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgressWithPercentageProps {
  radius?: number;
  strokeWidth?: number;
  progress: number;
}

const CircularProgressWithPercentage: React.FC<CircularProgressWithPercentageProps> = ({
  radius = 20,
  strokeWidth = 3,
  progress,
}) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          stroke= {Color.grayScale.grayThree}  
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <Circle
          stroke= {Color.alert.success}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </Svg>
      <Text style={styles.percentage}>{Math.round(progress)}%</Text>
    </View>
  );
};

export default CircularProgressWithPercentage;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '600',
    color: Color.grayScale.grayOne,
  },
});
