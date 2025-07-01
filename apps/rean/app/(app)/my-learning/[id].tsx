import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Color } from '@repo/colors';
import { ContentData } from '@/api/dummy_data/course-content.data';
import { contentResponse } from '@/api/types/course-detail';
import { CourseContentGroup } from '@/components/my-learning/my-learning-course-detail/content-group';
import TabComponent from '@/components/ums-tabs';
import IconHeader from '@/components/app-headers/icon-header';
import { Spacing } from '@repo/ums-agent';
import { router } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';

export default function CourseDetailScreen() {
  const contentData = ContentData as contentResponse[];
  const [contents] = useState(contentData);
  const { t } = useTranslation();

  const handleAssignmentItemPress = (item: contentResponse) => {
    router.push(`/my-learning/(learning-material)/assignment/${item._id}`);
  };
  

  const handleQuizItemPress = (item: contentResponse) => {
    router.push(`/my-learning/quiz/${item._id}`);
  }

  const handleAllItemPress = (item: contentResponse) => {
    if (item.cntType?.toLowerCase() === 'assignment') {
      handleAssignmentItemPress(item);
    } else if (item.cntType === 'quiz') {
      handleQuizItemPress(item);
    }
  }
  
  const contentTabContent = useMemo(() => {
      return [
        {
          label: t('myLearning.menu.all'),
          content: (
            <CourseContentGroup
              contentData={contents}
              onItemPress={(item) => handleAllItemPress(item)}
            />
          )
        },
        {
          label: t('myLearning.menu.assignment'),
          content: (
            <CourseContentGroup
              contentData={contents.filter(c => c.cntType?.toLowerCase() === 'assignment')}
              onItemPress={(item) => handleAssignmentItemPress(item)}
            />
          )
        },
        {
          label: t('myLearning.menu.quiz'),
          content: (
            <CourseContentGroup
              contentData={contents.filter(c => c.cntType === 'quiz')} 
              onItemPress={(item) => handleQuizItemPress(item)}
            />
          )
        },
        {
          label: t('myLearning.menu.grade'),
          content: (
            <CourseContentGroup
              contentData={contents.filter(c => c.cntType === 'graded')} />
          )
        }
      ];
  }, [contents]);
  return (
    <>
      <View style={styles.container}>
        <IconHeader
          title={'FIN- Finance'}
          desc='Financial Analysis (Year 1-Semester 2)'
          onRightPress={() => router.push('/my-learning/message-list')}
        />
        <TabComponent 
          tabs={contentTabContent}
          tabStyle={styles.tabStyle}
        />
        
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  tabStyle: {
    backgroundColor: Color.background,
    padding: Spacing.md
  }
});