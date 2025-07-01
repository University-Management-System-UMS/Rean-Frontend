import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon
import { Color } from '@repo/colors';
import { FontSize,  Spacing, Text } from '@repo/ums-agent';
import { BaseNavHeader } from './base-nav-header';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface ReviewLeaveProps {
  title?: string;
  desc?: string;
  onBackPress?: () => void;
  onRightIconPress?: () => void;
}

const ReviewLeaveHeader: React.FC<ReviewLeaveProps> = ({
  title,
  desc,
  onBackPress = () => router.back(),
  onRightIconPress,
}) => {

  return (
    <LinearGradient
      colors={[Color.primary, Color.gradient.primary]}
      style={styles.container}
    >
    <BaseNavHeader
      title={title}
      backgroundColor={Color.transparent}
      onBackPress={onBackPress}
      rightComponent={
        <TouchableOpacity onPress={onRightIconPress}>
          <Ionicons name="search" size={FontSize['2xl']} color={Color.white} />
        </TouchableOpacity>
      }      
    />
      
      <View style={styles.headerBottom}>
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            {desc}
          </Text>
        </View>
        <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/scan-qr/Attendance.png')}
          style={styles.image}
        />
        </View>
      </View>

      </LinearGradient>
  );
};

const styles = StyleSheet.create({

  container: {
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  
  textContainer:{
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  description: {
    color: Color.white,
    fontSize: FontSize.sm,
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: 124,
    height: 124,
    marginTop: -Spacing.xl,
    marginRight: Spacing.xl,
  },
  image: {
    width: 124,
    height: 124
  },
});

export default ReviewLeaveHeader;