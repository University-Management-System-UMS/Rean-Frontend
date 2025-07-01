import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontSize, Spacing, Text } from '@repo/ums-agent';
import { contentResponse } from '@/api/types/course-detail';

interface ContentCardProps {
  content: contentResponse;
  onPress?: () => void;
}

const CourseContentCard: React.FC<ContentCardProps> = ({ content, onPress }) => {

  const getStatusColor = () => {
    switch (content.tagname) {
      case 'Submitted':
        return Color.alert.success; 
      case 'Todo': 
        return Color.alert.info;
        case 'Missed':
        return Color.alert.error;
      case 'Incomplete':
        return Color.alert.warning; // Yellow
      case 'Overdue':
        return Color.alert.error; // Red
      default:
        return Color.alert.info;    // Fallback
    }
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      {/* content on the right side (pdf and titles) */}
      <View style={styles.rightContent}>
        <View style={styles.content}>
          <Text style={styles.text}>
            {content.cntType}
          </Text>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.text} numberOfLines={2}>{content.descriptions}</Text>
          <Text style={styles.time}>{content.time}</Text>
        </View>
      </View>


      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={18} color={Color.grayScale.grayOne} />
      </View>

      {/* tag/ status bar style*/}
      <View style={[styles.tag, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.tagText}>{content.tagname}</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    backgroundColor: Color.white,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    gap: Spacing.sm,
    elevation: 2,
    overflow: 'visible', // Ensure the tag is visible
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
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 50,
  },

  //status bar/tag
  tag: {
    position: 'absolute',
    top: -10,
    right: -5,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 2,
  },
  tagText: {
    fontSize: FontSize.sm,
    color: Color.white,
  },
  title: {
    fontWeight: 'bold',
    fontSize: FontSize.md,
    lineHeight: 24,
  },

  text: {
    fontSize: FontSize.sm,
    color: Color.grayScale.grayOne,
    lineHeight: 20,
  },
  time: {
    fontSize: FontSize.sm,
    color: Color.alert.info,
    lineHeight: 20,
  },
});

export default CourseContentCard;

