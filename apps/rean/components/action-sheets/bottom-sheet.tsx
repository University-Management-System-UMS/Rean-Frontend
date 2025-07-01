import { Color } from '@repo/colors';
import { Spacing } from '@repo/ums-agent';
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  PanResponder,
  Keyboard,
  KeyboardEvent,
  Platform,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetProps {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  height?: number;
  showHandle?: boolean;
  closeOnOverlayPress?: boolean;
  closeOnSwipeDown?: boolean;
  overlayOpacity?: number;
  borderRadius?: number;
  backgroundColor?: string;
  keyboardAvoidingBehavior?: 'padding' | 'position' | 'height';
}

export const BottomSheet = ({
  visible = false,
  onClose,
  children,
  height = screenHeight * 0.6,
  showHandle = true,
  closeOnOverlayPress = true,
  closeOnSwipeDown = true,
  overlayOpacity = 0.2,
  borderRadius = Spacing.xl,
  backgroundColor = Color.white,
}: BottomSheetProps) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Keyboard event listeners
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event: KeyboardEvent) => {
        const { height: kbHeight } = event.endCoordinates;
        setKeyboardHeight(kbHeight);
        setIsKeyboardVisible(true);
        
        // Animate bottom sheet up when keyboard appears
        if (visible) {
          const newPosition = screenHeight - height - kbHeight;
          Animated.timing(slideAnim, {
            toValue: newPosition,
            duration: Platform.OS === 'ios' ? event.duration || 250 : 250,
            useNativeDriver: true,
          }).start();
        }
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      (event: KeyboardEvent) => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
        
        // Animate bottom sheet back to original position
        if (visible) {
          Animated.timing(slideAnim, {
            toValue: screenHeight - height,
            duration: Platform.OS === 'ios' ? event.duration || 250 : 250,
            useNativeDriver: true,
          }).start();
        }
      }
    );

    return () => {
      keyboardWillShowListener?.remove();
      keyboardWillHideListener?.remove();
    };
  }, [visible, height, slideAnim]);

  // Pan responder for swipe to close
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnSwipeDown,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return closeOnSwipeDown && gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.8) {
          closeBottomSheet();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openBottomSheet = () => {
    const targetPosition = isKeyboardVisible 
      ? screenHeight - height - keyboardHeight 
      : screenHeight - height;
    
    Animated.timing(slideAnim, {
      toValue: targetPosition,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheet = () => {
    // Dismiss keyboard when closing bottom sheet
    Keyboard.dismiss();
    
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(panY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  useEffect(() => {
    if (visible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [visible]);

  // Close bottom sheet when component unmounts or visibility changes
  useEffect(() => {
    return () => {
      if (isKeyboardVisible) {
        Keyboard.dismiss();
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <View style={styles.fullScreenOverlay}>
      {/* Background Overlay */}
      <TouchableOpacity
        style={[styles.overlay, { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }]}
        activeOpacity={1}
        onPress={closeOnOverlayPress ? closeBottomSheet : undefined}
      />

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height,
            backgroundColor,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            transform: [
              { translateY: slideAnim },
              { translateY: panY },
            ],
          },
        ]}
        {...(closeOnSwipeDown ? panResponder.panHandlers : {})}
      >
        {showHandle && <View style={styles.handle} />}

        <SafeAreaView style={styles.contentContainer}>
          {children}
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Color.grayScale.grayFour,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: Spacing.sm,
  },
  contentContainer: {
    flex: 1,
  },
}); 