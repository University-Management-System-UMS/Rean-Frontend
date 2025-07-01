import React from "react";
import { FlatList, Platform, View } from "react-native";
import CourseCard from "./course-card";
import { StyleSheet } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import { Spacing } from "@repo/ums-agent";
import { courseResponse } from "@/api/types/my-learning-course/course";
import NoMessage from "@/components/no-message";

interface CourseListProps {
  data: courseResponse[];
  onPressItem: (course: courseResponse) => void;
}

export default function CourseList ({
  data,
  onPressItem,
}: CourseListProps) {
  const { t } = useTranslation();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      contentContainerStyle={styles.listContentContainer}
      data={data}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <CourseCard
          course={item}
          onPress={() => onPressItem(item)}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <NoMessage
            title={t("leave.empty.title")}
            body={t("leave.empty.message")}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? Spacing["2xl"] : Spacing.md,
    gap: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});