import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingIndicator from './loading';
import { Color } from '@repo/colors';

interface LoadingOverlayProps {
  visible: boolean;
  backgroundColor?: string;
  opacity?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  visible, 
  backgroundColor = Color.overlay80,
  opacity = 1 
}) => {
  if (!visible) return null;

  return (
    <View style={[styles.overlay, { backgroundColor, opacity }]}>
      <LoadingIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default LoadingOverlay;