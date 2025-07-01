import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import {
  CustomButton,
  FontSize,
  FontWeight,
  Spacing,
  Text,
} from "@repo/ums-agent";
import { Color } from "@repo/colors";
import { router } from "expo-router";
import { BaseNavHeader } from "@/components/app-headers/base-nav-header";
import { WebView } from "react-native-webview";
import SelectedFileList from "@/components/file/selected-file-list";
import { useCustomAlert } from "@/contexts/custom-alert.context";
import StatusCard from "@/components/my-learning/my-learning-course-detail/status-card";
import { useTranslation } from "@/hooks/useTranslation";
import { AssignmentDetails } from "@/api/types/assignment";
import BasicHeader from "@/components/app-headers/basic-header";
import { WebViewMessageEvent } from "react-native-webview";
import { useSubmission } from "@/contexts/submission-context";

interface Props {
  assignment: AssignmentDetails;
}

const SubmittedAssignmentScreen: React.FC<Props> = ({ assignment }) => {
  const { alert } = useCustomAlert();
  const { t } = useTranslation();

  const [detailsHeight, setDetailsHeight] = useState(0);
  const [reviewHeight, setReviewHeight] = useState(400);
  const { submissionData: contextSubmissionData, setSubmissionData } = useSubmission();

let submissionData = contextSubmissionData;
if (!submissionData) {
  submissionData = {
    htmlContent: "<p>This is your previously submitted HTML content.</p>",
    url: "https://example.com",
    files: [
      {
        name: "assignment.pdf",
        uri: "file:///path/to/assignment.pdf",
        type: "application/pdf",
        size: 1024000,
      },
    ],
  };
}
  

  const handleDetailsMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "contentHeight" && data.source === "details") {
        setDetailsHeight(data.height);
      }
    } catch (err) {
      console.error("Failed to parse details WebView message:", err);
    }
  };

  const handleReviewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "contentHeight" && data.source === "review") {
        setReviewHeight(data.height);
      }
    } catch (err) {
      console.error("Failed to parse review WebView message:", err);
    }
  };

  const injectedHeightScript = (source: string) => `
    (function() {
      const sendHeight = () => {
        const height = document.documentElement.scrollHeight || document.body.scrollHeight;
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'contentHeight', height, source: '${source}' }));
      };
      document.addEventListener("DOMContentLoaded", sendHeight);
      window.addEventListener("load", sendHeight);
      const observer = new MutationObserver(() => sendHeight());
      observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
      setTimeout(sendHeight, 300);
    })();
    `;

  const wrapUserInputHtml = (html: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; font-size: 14px; padding: 8px; margin: 0; background-color: #EFEFEF; }
        </style>
      </head>
      <body>${html}
        <script>setTimeout(() => {
          const height = document.body.scrollHeight;
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'contentHeight', height: height, source: 'review' }));
        }, 100);
        </script>
      </body>
    </html>`;

  const handleRemove = () => {
    alert(
      t("assignment.alert.removeTitle"),
      t("assignment.alert.removeDescription"),
      [
        { text: t("assignment.alert.cancelButton"), style: "cancel" },
        {
          text: t("assignment.alert.OkButton"),
          onPress: () => router.replace("/(app)/my-learning/[id]"),
        },
      ]
    );
  };

  const handleEdit = () => {
    if (submissionData) {
      setSubmissionData(submissionData);
      router.push("/(app)/my-learning/(learning-material)/assignment/edit-assignment");
    }
  };

  const handleUrlPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
    else console.warn("Don't know how to open this URL:", url);
  };

  if (!submissionData) {
    return (
      <View style={styles.container}>
        <BaseNavHeader
          title={t("assignment.assignmentHeader")}
          onBackPress={() => router.replace("/(app)/(tabs)/home")}
        />
        <Text>{t("assignment.error")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BasicHeader title={t("assignment.assignmentHeader")} />
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.assignmentDetailsContainer}>
          <Text style={styles.topTitle}>{assignment.title}</Text>
          <View style={styles.row}>
            <StatusCard status={assignment?.tagname} />
            <Text style={styles.submmitAt}>{assignment.dueDt}</Text>
          </View>
          <WebView
            originWhitelist={["*"]}
            source={{ html: assignment.htmlContent }}
            style={[styles.webview, { height: detailsHeight }]}
            scrollEnabled={false}
            javaScriptEnabled
            onMessage={handleDetailsMessage}
            injectedJavaScript={injectedHeightScript("details")}
          />
        </View>

        <View style={styles.submitssionContainer}>
          <Text style={styles.sectionTitle}>
            {t("assignment.addSubmission")}
          </Text>
        </View>

        <View style={styles.assignmentReviewContainer}>
          <WebView
            originWhitelist={["*"]}
            source={{ html: wrapUserInputHtml(submissionData.htmlContent) }}
            style={[styles.webview, { height: reviewHeight }]}
            javaScriptEnabled
            domStorageEnabled
            scrollEnabled={false}
            onMessage={handleReviewMessage}
            injectedJavaScript={injectedHeightScript("review")}
          />

          {submissionData.url && (
            <View style={styles.urlContainer}>
              <TouchableOpacity
                onPress={() => handleUrlPress(submissionData.url)}
              >
                <Text style={[styles.urlValue, styles.link]}>
                  {submissionData.url}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {submissionData.files.length > 0 && (
            <View style={styles.filesContainer}>
              <SelectedFileList files={submissionData.files} />
            </View>
          )}
        </View>   
      </ScrollView>
        <View style={styles.buttonContainer}>
            <CustomButton
              title={t("assignment.removeText")}
              onPress={handleRemove}
              containerStyle={styles.removeButton}
              textStyle={styles.removeText}
            />
            <CustomButton
              title={t("assignment.editText")}
              onPress={handleEdit}
              containerStyle={styles.editButton}
              textStyle={styles.editText}
            />
          </View>
    </View>
  );
};

export default SubmittedAssignmentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.white },
  content: { flex: 1 },
  assignmentDetailsContainer: {
    backgroundColor: Color.white,
    paddingHorizontal: Spacing.sm,
  },
  scrollContent: {
    flexGrow: 1,
  },
  assignmentReviewContainer: {
    backgroundColor: Color.grayScale.grayFour,
    paddingHorizontal: Spacing.md,
    borderRadius: 24,
    margin: 16,
  },
  webview: {
    flex: 1,
    fontSize: FontSize["2xl"],
    color: Color.grayScale.grayThree,
  },
  submitssionContainer: {
    marginHorizontal: Spacing.md,
    fontSize: FontSize.base,
  },
  urlContainer: { marginLeft: Spacing.sm },
  urlValue: { fontSize: FontSize.base, color: Color.primary },
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
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Color.primary,
    paddingHorizontal: Spacing.sm,
  },
  filesContainer: { marginVertical: Spacing.md, gap: 16 },
  link: { textDecorationLine: "underline" },
  buttonContainer: {
    flexDirection: "row",
    margin: Spacing.lg,
    marginBottom: Spacing["3xl"],
    gap: 10,
  },
  removeButton: {
    flex: 1,
    width: "45%",
    backgroundColor: Color.white,
    borderColor: Color.primary,
    borderWidth: 1,
  },
  removeText: {
    color: Color.primary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  editButton: { flex: 1, width: "45%" },
  editText: { fontSize: FontSize.base, fontWeight: FontWeight.bold },
});
