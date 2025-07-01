import { Color } from '@repo/colors';
import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StatusBar,
  Platform,
  PanResponder,
} from 'react-native';
import { Shadows } from '../../constants/shadow';
import { Spacing } from '../../constants/typography';

// Single Responsibility: Define clear interface for props
interface TopSheetProps {
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
export const TopSheet: React.FC<TopSheetProps> = ({
  visible,
  onClose,
  children,
  sheetStyle,
  overlayColor = Color.overlay,
  animationDuration = 400,
  maxHeight,
  showHandle = true,
  handleStyle,
}) => {
  // Add internal state to control modal visibility
  const [modalVisible, setModalVisible] = useState(visible);

  // Dependency Inversion: Animation abstraction
  const [animation] = useState<AnimationConfig>({
    slideAnim: new Animated.Value(-400),
    fadeAnim: new Animated.Value(0),
    duration: animationDuration,
  });

  // Handle close with animation
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(animation.slideAnim, {
        toValue: -400,
        duration: animation.duration,
        useNativeDriver: true,
      }),
      Animated.timing(animation.fadeAnim, {
        toValue: 0,
        duration: animation.duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Only call onClose after animation completes
      setModalVisible(false);
      onClose();
    });
  };

  // Single Responsibility: Handle animation lifecycle
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      // Small delay to ensure modal is rendered before animating
      requestAnimationFrame(() => {
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
      });
    } else if (modalVisible) {
      // Trigger close animation when visible becomes false
      handleClose();
    }
  }, [visible]);

  // Updated pan responder for bottom-to-top swipe dismiss
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          // Only respond to upward swipes (negative dy values)
          if (gestureState.dy < 0) {
            animation.slideAnim.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          // If swiped up more than 100 units, close the sheet
          if (gestureState.dy < -100) {
            handleClose();
          } else {
            // Otherwise, snap back to original position
            Animated.spring(animation.slideAnim, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [handleClose, animation.slideAnim]
  );

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <StatusBar barStyle="dark-content" />
      {/* Overlay */}
      <Animated.View
        style={[
          styles.overlay, 
          { backgroundColor: overlayColor, opacity: animation.fadeAnim },
        ]} >
        <TouchableOpacity
          onPress={handleClose}
          style={styles.overlayTouchable}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Action Sheet */}
      <Animated.View
        style={[
          styles.actionSheet,
          { transform: [{ translateY: animation.slideAnim }],maxHeight: maxHeight, },
          sheetStyle,
        ]} >

        <View style={styles.content}>
          {children}
          {showHandle && (
            <View style={styles.footer} {...panResponder.panHandlers}>
              <View style={[styles.handle, handleStyle]} />
            </View>
          )}
        </View>

      </Animated.View>
    </Modal>
  );
};

// Single Responsibility: Styling concerns separated
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTouchable: {
    flex: 1,
  },
  actionSheet: {
    position: 'absolute',
    top: Platform.OS === 'android' ? -(StatusBar.currentHeight || 0) : 0,
    left: 0,
    right: 0,
    backgroundColor: Color.white,
    borderBottomLeftRadius: Spacing.md,
    borderBottomRightRadius: Spacing.md,
    ...Shadows.card,
    paddingTop: StatusBar.currentHeight || 44,
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