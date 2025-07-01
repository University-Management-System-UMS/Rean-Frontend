import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import { courseResponse } from '@/api/types/my-learning-course/course';
import ProgressBar from './progress-bar';

interface courseCardProps {
  course: courseResponse;
  onPress?: () => void;  // Add onPress prop
}

const CourseCard: React.FC<courseCardProps> = ({ course, onPress }) => {

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      {/* content on the right side (pdf and titles) */}
      <View style={styles.rightContent}>
        <Image
          style={styles.Image}
          source={
            { uri: course.img }
          }
        />
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {course.deptCd} - {course.SecNm}
            </Text>

          </View>
          <Text style={styles.title}>{course.subNm}</Text>
          <ProgressBar progress={course.progressBar} />
        </View>

      </View>

      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={18} color={Color.grayScale.grayOne} />
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    backgroundColor: Color.white,
    borderRadius: Spacing.md,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    gap: Spacing.md,
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: Color.grayScale.black,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  content: {
    width: '73%',
    alignContent: 'flex-start',

  },
  Image: {
    width: 72,
    height: 72,
    borderRadius: 12,
    objectFit: 'cover',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 40,
  },
  title: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  text: {
    fontSize: FontSize.sm,
    color: Color.grayScale.grayOne,

  },
  textContainer: {
    width: '100%',
    overflow: 'hidden',
  },
});

export default CourseCard;

