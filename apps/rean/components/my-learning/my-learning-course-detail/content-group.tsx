import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { contentResponse } from '@/api/types/course-detail';
import CourseContentCard from './course-content-card';
import { Spacing } from '@repo/ums-agent';


interface ContentGroupProps {
  contentData: contentResponse[];
  onItemPress?: (item: contentResponse) => void
}

export const CourseContentGroup = ({ contentData, onItemPress }: ContentGroupProps) => {
  return (
    <FlatList
      data={contentData}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <CourseContentCard content={item} onPress={() => {
          if (onItemPress) {
            onItemPress(item);
          }
        }}/>
      )}
      contentContainerStyle={styles.listContentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing['2xl'],
    paddingTop: Spacing.md
  },
});