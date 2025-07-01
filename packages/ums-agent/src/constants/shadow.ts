import { Color } from '@repo/colors';
import { StyleSheet } from 'react-native';

export const Shadows = StyleSheet.create({
  small: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  medium: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  large: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 8,
  },
  xlarge: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 16,
  },
  button: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  
  card: {
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: Color.grayScale.grayOne,
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
});

export type ShadowType = keyof typeof Shadows;