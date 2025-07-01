/* eslint-disable @typescript-eslint/no-explicit-any */
import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import FilePicker from "@/components/file/file-picker";
import { WebView } from "react-native-webview";
import { Color } from "@repo/colors";
import { router, useLocalSearchParams } from "expo-router";
import SelectedFileList from "@/components/file/selected-file-list";
import { ALL_TYPES, pickDocument } from "@/utils/document.util";
import {
  CustomTextInput,
  FontSize,
  FontWeight,
  Spacing,
} from "@repo/ums-agent";
import { richTextEditorHtml } from "@/components/my-learning/assignments/rich-text-html";
import StickyBottomButton from "@/components/sticky-bottom-button";
import { useTranslation } from "@/hooks/useTranslation";
import BasicHeader from "@/components/app-headers/basic-header";

interface SelectedFile {
  uri: string;
  name: string;
  type: string;
  size: number;
}
interface SubmissionData {
  htmlContent: string;
  url: string;
  files: SelectedFile[];
}

export default function EditAssignmentScreen() {
  const { submissionData } = useLocalSearchParams();
  const [htmlContent, setHtmlContent] = useState("");
  const webviewRef = useRef(null);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [contentHeight, setContentHeight] = useState(700);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof submissionData === "string") {
      try {
        const rawData = submissionData;

        let parsed: SubmissionData;
        try {
          parsed = JSON.parse(rawData);
        } catch {
          parsed = JSON.parse(decodeURIComponent(rawData));
        }

        setHtmlContent(parsed.htmlContent);
        setUrl(parsed.url);
        setFiles(parsed.files);
      } catch (err) {
        console.error("Failed to parse submission data in Edit screen", err);
      }
    }
  }, [submissionData]);

  const handleDocumentPick = async () => {
    const selectedFiles = await pickDocument(ALL_TYPES);
    if (selectedFiles) {
      const formattedFiles: SelectedFile[] = selectedFiles.map((file) => ({
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/octet-stream",
        size: file.size || 0,
      }));

      const uniqueFiles = formattedFiles.filter(
        (newFile) =>
          !files.some((existingFile) => existingFile.name === newFile.name)
      );

      setFiles((prev) => [...prev, ...uniqueFiles]);
    }
  };

  const handleFileRemoved = (uri: string) => {
    setFiles((prev) => prev.filter((file) => file.uri !== uri));
  };
  const validateUrl = (value: string) => {
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    if (!value) {
      return t("assignment.needUrl");
    } else if (!urlPattern.test(value)) {
      return t("assignment.wrongUrl");
    }
    return "";
  };

  const escapedHtmlContent = htmlContent.replace(/`/g, "\\`");
  const injectedScript = `
    if (window.ReactNativeWebView && ${JSON.stringify(htmlContent)}) {
      window.ReactNativeWebView.onMessage({
        data: JSON.stringify({ type: "SET_CONTENT", html: \`${escapedHtmlContent}\` })
      });
    }
    true;
  `;

  const handleSubmit = () => {
    webviewRef.current?.postMessage("GET_CONTENT");
  };


  const handleWebViewMessage = (event: any) => {
    const message = event.nativeEvent.data;
  
    try {
      const data = JSON.parse(message);
      if (data?.type === 'contentHeight') {
        setContentHeight(Math.max(data.height, 700));
        return;
      }
    } catch {
      const html = message;
      router.replace({
        pathname: '/my-learning/assignment/assignment-submission',
        params: {
          submissionData: encodeURIComponent(JSON.stringify({
            htmlContent: html,
            url: url,
            files: files,
          })),
        }
      });
    }
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setUrlError(validateUrl(value));
  };

  return (
    <>
      <View style={styles.container}>
        <BasicHeader
          title={t("assignment.editHeader")}
        />
        <ScrollView>
          <View style={styles.subContainer}>
            <Text style={styles.title}>{t("assignment.addSubmission")}</Text>
            <Text style={styles.label}>{t("assignment.freeText")}</Text>

            <View style={styles.card}>
              <WebView
                ref={webviewRef}
                originWhitelist={["*"]}
                source={{ html: richTextEditorHtml }}
                onMessage={handleWebViewMessage}
                javaScriptEnabled={true}
                style={[styles.webview, { height: contentHeight }]}
                injectedJavaScript={injectedScript}
              />
            </View>
            <View>
              <CustomTextInput
                label={t("assignment.urlText")}
                placeholder={t("assignment.urlInput")}
                value={url}
                onChangeText={handleUrlChange}
                error={urlError}
              />
            </View>
            <View style={styles.filePickContainer}>
              <Text style={styles.label}>{t("assignment.uploadFile")}</Text>
              <View style={styles.filePick}>
                <FilePicker onPress={handleDocumentPick} />
                <SelectedFileList
                  files={files}
                  onFileRemoved={handleFileRemoved}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <StickyBottomButton
        title={t("assignment.submitButton")}
        onPress={handleSubmit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  subContainer: {
    flexGrow: 1,
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: Color.primary,
    paddingLeft: Spacing.sm,
  },
  label: {
    color: Color.grayScale.black,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.xs,
  },
  card: {
    height: 350,
    borderRadius: 12,
    backgroundColor: Color.white,
    marginBottom: Spacing.base,
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
  filePickContainer: {
    marginTop: Spacing.base,
  },
  filePick: {
    gap: Spacing.base,
  },
});
