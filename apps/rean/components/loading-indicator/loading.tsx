import { Color } from '@repo/colors';
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';


const ballSize = 60;

const LoadingIndicator = ({ 
  size = ballSize, 
  duration = 800 
}) => {
  const ballSize = size * 0.25;
  const radius = size * 0.35;
  
  const animatedValues = useRef([
    new Animated.Value(0.6),
    new Animated.Value(0.6),
    new Animated.Value(0.6),
    new Animated.Value(0.6),
  ]).current;

  useEffect(() => {
    const createAnimation = () => {
      const animations = animatedValues.map((animatedValue, index) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(index * (duration / 4)),
            Animated.timing(animatedValue, {
              toValue: 1.2,
              duration: duration / 4,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0.6,
              duration: (duration * 3) / 4,
              useNativeDriver: true,
            }),
          ])
        );
      });

      Animated.parallel(animations).start();
    };

    createAnimation();
  }, [animatedValues, duration]);

  

  const renderBall = (index: number, color: string, angle: number) => {
    const x = Math.cos(angle) * radius + size / 2 - ballSize / 2;
    const y = Math.sin(angle) * radius + size / 2 - ballSize / 2;

    const ballStyle: ViewStyle = {
      backgroundColor: color,
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,
      transform: [{ scale: animatedValues[index] }],
      position: 'absolute',
      left: x,
      top: y,
    };
    
    return (
      <Animated.View
        key={index}
        style={ballStyle}
      />
    );
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={styles.ballContainer}>
        {renderBall(0, Color.secondary7, -Math.PI / 2)}
        
        {renderBall(1, Color.secondary, 0)}
        
        {renderBall(2, Color.secondary7, Math.PI / 2)}
        
        {renderBall(3, Color.secondary, Math.PI)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  ballContainer: {
    alignItems: 'center',
    marginBottom: ballSize
  },
  
});

export default LoadingIndicator;