/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  CustomTextInput,
  FontSize,
  FontWeight,
  Spacing,
  Text,
} from "@repo/ums-agent";
import { WebView } from "react-native-webview";
import { Color } from "@repo/colors";
import FilePicker from "@/components/file/file-picker";
import { ALL_TYPES, pickDocument } from "@/utils/document.util";
import SelectedFileList from "@/components/file/selected-file-list";
import { richTextEditorHtml } from "@/components/my-learning/assignments/rich-text-html";
import { useTranslation } from "@/hooks/useTranslation";
import { SelectedFile } from "@/components/file/file-item";

interface Props {
  webviewRef?: React.RefObject<any>;
  url?: string;
  setUrl?: (value: string) => void;
  urlError?: string;
  setUrlError?: (value: string) => void;
  files?: SelectedFile[];
  setFiles?: (files: SelectedFile[]) => void;
  onMessage?: (event: any) => void;
}

const AssignmentSubmissionInput: React.FC<Props> = ({
  webviewRef,
  url = "",
  setUrl,
  urlError = "",
  setUrlError,
  files = [],
  setFiles,
  onMessage,
}) => {

    const { t } = useTranslation();

  const handleUrlChange = (value: string) => {
    if (setUrl) setUrl(value);
    if (setUrlError) setUrlError(validateUrl(value));
  };

  const validateUrl = (value: string) => {
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    if (!value) return t("assignment.needUrl");
    if (!urlPattern.test(value)) return t("assignment.wrongUrl");
    return "";
  };

  const handleDocumentPick = async () => {
    if (!setFiles) return;
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

      setFiles([...files, ...uniqueFiles]);
    }
  };

  const handleFileRemoved = (uri: string) => {
    if (!setFiles) return;
    setFiles(files.filter((file) => file.uri !== uri));
  };

  return (
    <View style={styles.subContainer}>
      <Text style={styles.title}>{t('assignment.addSubmission')}</Text>
      <Text style={styles.label}>{t('assignment.freeText')}</Text>

      <View style={styles.card}>
        <WebView
          ref={webviewRef}
          originWhitelist={["*"]}
          source={{ html: richTextEditorHtml }}
          scrollEnabled={false}
          onMessage={onMessage}
          javaScriptEnabled={true}
          style={styles.webview}
        />
      </View>

      <CustomTextInput
        label={t('assignment.urlText')}
        placeholder={t('assignment.urlInput')}
        value={url}
        onChangeText={handleUrlChange} 
        error={urlError}
      />

      <View style={styles.filePickContainer}>
        <Text style={styles.label}>{t('assignment.uploadFile')}</Text>
        <View style={styles.filePick}>
          <FilePicker onPress={handleDocumentPick} />
          <SelectedFileList files={files} onFileRemoved={handleFileRemoved} />
        </View>
      </View>
    </View>
  );
};

export default AssignmentSubmissionInput;

const styles = StyleSheet.create({
  subContainer: {
    flexGrow: 1,
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.sm,
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
    backgroundColor: Color.background,
  },
  filePickContainer: {
    marginTop: Spacing.base,
  },
  filePick: {
    gap: Spacing.base,
  },
});
