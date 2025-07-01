import React, { useEffect, useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import ImageHeader from "@/components/app-headers/image-header";
import { Spacing } from "@repo/ums-agent";
import { useTranslation } from "@/hooks/useTranslation";
import CourseList from "@/components/my-learning/my-learning-course-list/course-listing";
import LoadingOverlay from "@/components/loading-indicator/loading-overlay";
import { courseResponse } from "@/api/types/my-learning-course/course";
import { CourseData } from "@/api/dummy_data/course.data";
import { useLmsToken } from "@/hooks/useLmsToken";
import { useLmsAuth } from "@/hooks/useLmsAuth";

const MylearningScreen = () => {
  const courseData = CourseData as courseResponse[];
  const { t } = useTranslation();
  const hasAttemptedAuth = useRef(false);
  
  const { data: token, isLoading: isTokenLoading } = useLmsToken();
  const { mutateAsync: authenticateLms, isPending: isAuthPending } = useLmsAuth();

  const performLmsAuth = useCallback(async () => {
    if (token && !isAuthPending && !hasAttemptedAuth.current) {
      hasAttemptedAuth.current = true;
      try {
       await authenticateLms(token);
      } catch (error) {
        console.error("LMS auth error", error);
      }
    }
  }, [token, isAuthPending, authenticateLms]);

  useEffect(() => {
    performLmsAuth();
  }, [performLmsAuth]);

  const handlePressCourseItem = (course: courseResponse) => {
    router.push(`/(app)/my-learning/${course._id}`);
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={isTokenLoading || isAuthPending} />
      <ImageHeader
        title={t("myLearning.title")}
        desc={t("myLearning.desc")}
        imageSource={require("@/assets/images/img.png")}
      />
      <View style={styles.content}>
        <CourseList data={courseData} onPressItem={handlePressCourseItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.md
  }
});

export default MylearningScreen;
