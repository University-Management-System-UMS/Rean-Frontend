/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { Color } from '@repo/colors';
import { useFonts } from '../../context/font-context';
import { FontSize, FontWeight, FontWeightType, LineHeight } from '../../constants/typography';

interface CustomTextProps extends TextProps {
  variant?: 'body' | 'heading' | 'caption';
  weight?: FontWeightType;
}

export const Text: React.FC<CustomTextProps> = ({
  variant = 'body',
  style,
  ...props
}) => {
  const { fontsLoaded } = useFonts();
  const textStyle = [
    styles.base,
    styles[variant],
    style
  ];

  if (!fontsLoaded) {
    return <RNText style={[styles.base, style]} {...props} />;
  }
  return <RNText style={textStyle} {...props} />;
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'NotoSansKhmer-regular',
  },
  body: {
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
    fontWeight: FontWeight.medium,
    color: Color.grayScale.black
  },
  heading: {
    fontSize: FontSize.md,
    lineHeight: LineHeight.lg,
    fontWeight: FontWeight.bold,
  },
  caption: {
    fontSize: FontSize.sm,
    lineHeight: LineHeight.xs,
    color: Color.grayScale.grayOne,
  },
});

export default Text;