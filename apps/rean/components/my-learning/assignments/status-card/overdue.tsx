/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Color } from "@repo/colors";
import { FontSize, FontWeight, Spacing, Text } from "@repo/ums-agent";
import StatusCard from "@/components/my-learning/my-learning-course-detail/status-card";
import AutoHeightWebView from "@/components/my-learning/assignments/auto-height-web-view";
import { PointsTable } from "@/components/my-learning/assignments/table";
import { criteriaData } from "@/api/dummy_data/criterial-item.data";
import AssignmentSubmissionInput from "@/components/my-learning/assignments/assignment-submission-input";
import StickyBottomButton from "@/components/sticky-bottom-button";
import { useCustomAlert } from "@/contexts/custom-alert.context";
import { useTranslation } from "@/hooks/useTranslation";
import { SelectedFile } from "@/components/file/file-item";
import { AssignmentDetails } from "@/api/types/assignment";
import BasicHeader from "@/components/app-headers/basic-header";
import type { WebView as WebViewType } from "react-native-webview";

interface Props {
  assignment: AssignmentDetails;
}

const OverdueAssignment: React.FC<Props> = ({ assignment }) => {
  const webviewRef = useRef<WebViewType>(null);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [contentHeight, setContentHeight] = useState(0);
  const { alert } = useCustomAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = () => {
    alert(
      t("assignment.alert.lateTitle"),
      t("assignment.alert.lateDescription"),
      [
        { text: t("assignment.alert.cancelButton"), style: "cancel" },
        {
          text: t("assignment.alert.OkButton"),
          onPress: () => {
            setIsSubmitting(true);
            webviewRef.current?.postMessage("GET_CONTENT");
          },
        },
      ]
    );
  };

  const handleMessage = (event: any) => {
    const html = event.nativeEvent.data;

    if (typeof html === "string" && html.includes("<")) {
      setTimeout(() => {
        console.log("Submitted Data:");
        console.log("HTML Content:", html);
        console.log("URL:", url);
        console.log("Files:", files);

        files.forEach((file, index) => {
          console.log(`📄 File ${index + 1}:`, {
            name: file.name,
            uri: file.uri,
            type: file.type,
            size: file.size,
          });
        });
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
                        assignment,
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
        console.log("Error: ", err);
      }
    }
    handleMessage(event);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <BasicHeader
          title={t("assignment.addSubmission")}
        />
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={styles.assignmentDetailsContainer}>   */}
            {assignment && (
              <>
                <View style={styles.htmlSection}>
                  <Text style={styles.topTitle}>{assignment.title}</Text>
                  <View style={styles.row}>
                    <StatusCard status={assignment.tagname} />
                    <Text style={styles.submmitAt}>
                      Due date: {assignment.dueDt}
                    </Text>
                  </View>
                  
                  <AutoHeightWebView
                    htmlContent={assignment.htmlContent}
                    minHeight={contentHeight}
                  />
                </View>
              
                  <>
                    <PointsTable
                      data={criteriaData}
                      title={t("assignment.pointCriterial")}
                    />
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
                  </>
              </>
            )}
          {/* </View> */}
        </ScrollView>
          <StickyBottomButton
            title={t("assignment.submitButton")}
            onPress={handleSubmit}
          />
        {isSubmitting && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Color.primary} />
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default OverdueAssignment;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  htmlSection: { 
    paddingHorizontal: Spacing.sm,
    flex: 1, 
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Color.white,
    paddingBottom: Spacing.lg,
  },
  row: { flexDirection: "row", marginLeft: Spacing.sm },
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: Color.white,
    padding: Spacing.xl,
    borderRadius: 12,
    alignItems: "center",
  },
});
