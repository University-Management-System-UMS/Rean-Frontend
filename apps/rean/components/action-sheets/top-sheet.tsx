import { Color } from '@repo/colors';
import { Shadows, Spacing } from '@repo/ums-agent';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  PanResponder,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

interface TopSheetProps {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  height?: number;
  showHandle?: boolean;
  closeOnOverlayPress?: boolean;
  closeOnSwipeUp?: boolean;
  overlayOpacity?: number;
  borderRadius?: number;
  backgroundColor?: string;
}

export const TopSheet = ({
  visible = false,
  onClose,
  children,
  height = screenHeight * 0.6,
  showHandle = true,
  closeOnOverlayPress = true,
  closeOnSwipeUp = true,
  overlayOpacity = 0.2,
  borderRadius = Spacing.xl,
  backgroundColor = 'white',
}: TopSheetProps) => {
  const slideAnim = useRef(new Animated.Value(-height)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const overlayOpacityAnim = useRef(new Animated.Value(0)).current;

  // Pan responder for swipe to close (swipe up to close)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnSwipeUp,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return closeOnSwipeUp && gestureState.dy < 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -100 || gestureState.vy < -0.8) {
          closeTopSheet();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openTopSheet = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeTopSheet = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(panY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  useEffect(() => {
    if (visible) {
      openTopSheet();
    } else {
      // Reset animations when not visible
      slideAnim.setValue(-height);
      panY.setValue(0);
      overlayOpacityAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.fullScreenOverlay} pointerEvents="box-none">
      <StatusBar style="dark" />
      
      {/* Animated Background Overlay */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacityAnim,
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          },
        ]}
        pointerEvents="auto"
      >
        <TouchableOpacity
          style={[styles.overlay, { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }]}
          activeOpacity={1}
          onPress={closeOnOverlayPress ? closeTopSheet : undefined}
        />
      </Animated.View>

      {/* Top Sheet */}
      <Animated.View
        style={[
          styles.topSheet,
          {
            maxHeight: height,
            backgroundColor,
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
            transform: [
              { translateY: slideAnim },
              { translateY: panY },
            ],
          },
        ]}
        pointerEvents="auto"
        {...(closeOnSwipeUp ? panResponder.panHandlers : {})}
      >
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.childrenContainer}>
            {children}
          </View>
          {showHandle && <View style={styles.handle} />}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topSheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    ...Shadows.small
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: Color.grayScale.grayFour,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.base,
  },
  contentContainer: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
  },
});