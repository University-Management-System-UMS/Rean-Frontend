/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontSize, FontWeight, Spacing, Text } from "@repo/ums-agent";
import { Color } from "@repo/colors";
import StickyBottomButton from "@/components/sticky-bottom-button";
import { router } from "expo-router";
import { PointsTable } from "@/components/my-learning/assignments/table";
import { criteriaData } from "@/api/dummy_data/criterial-item.data";
import { useCustomAlert } from "@/contexts/custom-alert.context";
import { assignmentDataList } from "@/api/dummy_data/assignment.data";
import StatusCard from "@/components/my-learning/my-learning-course-detail/status-card";
import AutoHeightWebView from "@/components/my-learning/assignments/auto-height-web-view";
import AssignmentSubmissionInput from "@/components/my-learning/assignments/assignment-submission-input";
import { useTranslation } from "@/hooks/useTranslation";
import { SelectedFile } from "@/components/file/file-item";
import { AssignmentDetails } from "@/api/types/assignment";
import BasicHeader from "@/components/app-headers/basic-header";
import LoadingOverlay from "@/components/loading-indicator/loading-overlay";
import type { WebView as WebViewType } from "react-native-webview";


interface Props {
  assignment: AssignmentDetails;
}

const TodoAssignment: React.FC<Props> = ({ assignment }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const webviewRef = useRef<WebViewType>(null);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [contentHeight, setContentHeight] = useState(0);
  const { alert } = useCustomAlert();
  const { t } = useTranslation();

  const assignmentData = assignmentDataList.find(
    (item) => item._id === assignment._id
  );

  const handleSubmit = () => {
    alert(
      t("assignment.submitButton"),
      t("assignment.alert.description"),
      [
        { text: t("assignment.alert.cancelButton"), style: "cancel" },
        {
          text: t("assignment.alert.OkButton"),
          onPress: () => {
            setIsSubmitting(true);
            webviewRef.current?.postMessage("GET_CONTENT"); // Send message to WebView to get content
          },
        },
      ]
    );
  };

  const handleMessage = (event: any) => {
    const html = event.nativeEvent.data;
    if (typeof html === "string" && html.includes("<")) {
      setTimeout(() => {
        setIsSubmitting(false);
        setFiles([]);
        setUrl("");

        alert(
          t("assignment.completedAlert.title"),
          t("assignment.completedAlert.description"),
          [
            {
              text: t("assignment.completedAlert.doneButton"),
              onPress: () => {
                router.push({
                  pathname: "/(app)/my-learning/(learning-material)/assignment/assignment-submission",
                  params: {
                    submissionData: encodeURIComponent(
                      JSON.stringify({
                        htmlContent: html,
                        url: url,
                        files: files,
                        assignmentData,
                      })
                    ),
                  },
                });
              },
            },
          ],
          {
            imageSource: require("@/assets/images/scan-qr/Success-check.png"),
            imageStyle: { width: 100, height: 100 },
          }
        );
      }, 1000);
    }
  };

  const handleWebViewMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message.startsWith("{") || message.startsWith("[")) {
      try {
        const data = JSON.parse(message);
        if (data?.type === "contentHeight") {
          setContentHeight(Math.max(data.height, 700));
          return;
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
    handleMessage(event);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LoadingOverlay visible={isSubmitting}/>

      <View style={styles.container}>
        <BasicHeader title={t("assignment.assignmentHeader")} />

        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.assignmentDetailsContainer}>
            <Text style={styles.topTitle}>{assignmentData?.title}</Text>
            <View style={styles.row}>
              <StatusCard status={assignment.tagname} />
              <Text style={styles.submmitAt}>{assignmentData?.dueDt}</Text>
            </View>
            <AutoHeightWebView
              htmlContent={assignmentData?.htmlContent}
              minHeight={contentHeight}
            />
          </View>

          <View style={styles.table}>
            <PointsTable
              data={criteriaData}
              title={t("assignment.pointCriterial")}
            />
          </View>

          <AssignmentSubmissionInput
            webviewRef={webviewRef}
            url={url}
            setUrl={setUrl}
            urlError={urlError}
            setUrlError={setUrlError}
            files={files}
            setFiles={setFiles}
            onMessage={handleWebViewMessage}
          />
        </ScrollView>

        <StickyBottomButton
          title={t("assignment.submitButton")}
          onPress={handleSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default TodoAssignment;

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  scrollView: { flex: 1, backgroundColor: Color.white },
  table: { flex: 1 },
  row: { flexDirection: "row", marginLeft: Spacing.sm },
  submmitAt: {
    marginLeft: Spacing.base,
    color: Color.primary,
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
  assignmentDetailsContainer: {
    backgroundColor: Color.white,
    paddingHorizontal: Spacing.sm,
  },
});
