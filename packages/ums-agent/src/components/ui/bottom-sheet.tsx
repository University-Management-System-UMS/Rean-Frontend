import { Color } from '@repo/colors';
import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  PanResponder,
} from 'react-native';
import { Shadows } from '../../constants/shadow';
import { Spacing } from '../../constants/typography';

// Single Responsibility: Define clear interface for props
interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  sheetStyle?: ViewStyle;
  overlayColor?: string;
  animationDuration?: number;
  maxHeight?: number;
  showHandle?: boolean;
  handleStyle?: ViewStyle;
}

// Interface Segregation: Separate animation concerns
interface AnimationConfig {
  slideAnim: Animated.Value;
  fadeAnim: Animated.Value;
  duration: number;
}

// Open/Closed: Component is open for extension through props, closed for modification
export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  sheetStyle,
  overlayColor = Color.overlay,
  animationDuration = 300,
  maxHeight,
  showHandle = true,
  handleStyle,
}) => {
  // Dependency Inversion: Animation abstraction
  const [animation] = useState<AnimationConfig>({
    slideAnim: new Animated.Value(400),
    fadeAnim: new Animated.Value(0),
    duration: animationDuration,
  });

  // Single Responsibility: Handle animation lifecycle
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(animation.slideAnim, {
          toValue: 0,
          duration: animation.duration,
          useNativeDriver: true,
        }),
        Animated.timing(animation.fadeAnim, {
          toValue: 1,
          duration: animation.duration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animation.slideAnim, {
          toValue: 400,
          duration: animation.duration,
          useNativeDriver: true,
        }),
        Animated.timing(animation.fadeAnim, {
          toValue: 0,
          duration: animation.duration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, animation]);

  useEffect(() => {
    if (!visible) {
      // Reset to initial position when hiding
      animation.slideAnim.setValue(400);
      animation.fadeAnim.setValue(0);
    }
  }, [visible]);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dy) > 5;
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            animation.slideAnim.setValue(gestureState.dy);
            animation.fadeAnim.setValue(1 - gestureState.dy / 400);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          const velocity = Math.abs(gestureState.vy);
          const isQuickSwipe = velocity > 0.5;
          const shouldClose = gestureState.dy > 100 || (isQuickSwipe && gestureState.dy > 50);

          if (shouldClose) {
            Animated.parallel([
              Animated.timing(animation.slideAnim, {
                toValue: 400,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(animation.fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start(onClose);
          } else {
            Animated.parallel([
              Animated.spring(animation.slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                velocity: gestureState.vy,
                tension: 40,
                friction: 8,
              }),
              Animated.spring(animation.fadeAnim, {
                toValue: 1,
                useNativeDriver: true,
              }),
            ]).start();
          }
        },
      }),
    [onClose, animation]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          { backgroundColor: overlayColor, opacity: animation.fadeAnim },
        ]}
      >
        <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.actionSheet,
          {
            transform: [{ translateY: animation.slideAnim }],
            maxHeight: maxHeight,
          },
          sheetStyle,
        ]}
      >
        {showHandle && (
          <View style={styles.footer} {...panResponder.panHandlers}>
            <View style={[styles.handle, handleStyle]} />
          </View>
        )}
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTouchable: {
    flex: 1,
  },
  actionSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Color.white,
    borderTopLeftRadius: Spacing.md,
    borderTopRightRadius: Spacing.md,
    ...Shadows.card,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.base,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Color.grayScale.grayTwo,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
});

