import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Color } from "@repo/colors";
import { FontSize, FontWeight, Spacing, Text } from "@repo/ums-agent";
import StatusCard from "@/components/my-learning/my-learning-course-detail/status-card";
import AutoHeightWebView from "@/components/my-learning/assignments/auto-height-web-view";
import { useTranslation } from "@/hooks/useTranslation";
import { AssignmentDetails } from "@/api/types/assignment";
import BasicHeader from "@/components/app-headers/basic-header";

interface Props {
  assignment: AssignmentDetails;
}
const AssignmentMissed: React.FC<Props> = ({ assignment }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <BasicHeader
        title={t("assignment.assignmentHeader")}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.assignmentDetailsContainer}>
          <Text style={styles.topTitle}>{assignment.title}</Text>
          <View style={styles.row}>
            <StatusCard status={assignment.tagname} />
            <Text style={styles.submmitAt}>{assignment.dueDt}</Text>
          </View>
          <AutoHeightWebView htmlContent={assignment.htmlContent} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AssignmentMissed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  assignmentDetailsContainer: {
    backgroundColor: Color.white,
    paddingHorizontal: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    marginLeft: Spacing.sm,
  },
  submmitAt: {
    marginLeft: Spacing.base,
    color: Color.alert.error,
    fontWeight: FontWeight.medium,
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
  },
  topTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginVertical: Spacing.md,
    paddingLeft: Spacing.sm,
  },
});
