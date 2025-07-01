import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import CircularProgressWithPercentage from '../review-leave/apply-leave/circle-progree-download';


export interface SelectedFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

interface FileItemProps {
  item: SelectedFile;
  actionType: 'remove' | 'download';
  onFileRemoved?: (uri: string) => void;
  onDownload?: (uri: string) => void;
  downloadProgress?: number;
}

type AllowedIconNames = "image" | "document-text" | "grid" | "document" | "document-outline";

const getFileIcon = (type: string): { name: AllowedIconNames; color: string } => {
  if (type.includes('image')) {
    return { name: 'image', color: Color.primary };
  } else if (type.includes('pdf')) {
    return { name: 'document-text', color: Color.alert.error };
  } else if (type.includes('spreadsheet')) {
    return { name: 'grid', color: Color.alert.success };
  } else if (type.includes('word')) {
    return { name: 'document', color: Color.alert.warning };
  }
  return { name: 'document-outline', color: Color.grayScale.grayOne };
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '0 KB';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileItem: React.FC<FileItemProps> = ({ item, actionType, onFileRemoved, onDownload, downloadProgress }) => {
  const fileIcon = getFileIcon(item.type);

  return (
    <View style={styles.fileItem}>
      <View style={[styles.iconContainer, { backgroundColor: `${fileIcon.color}10` }]}>
        <Ionicons name={fileIcon.name} size={24} color={fileIcon.color} />
      </View>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName}>{item.name}</Text>
        <Text style={styles.fileSize}>{formatFileSize(item.size)}</Text>
      </View>
      <View style={styles.actions}>
        {actionType === 'remove' && onFileRemoved && (
          <TouchableOpacity
            onPress={() => onFileRemoved(item.uri)}
            accessibilityLabel={`Remove ${item.name}`}
            accessibilityRole="button"
          >
            <Ionicons style={styles.removeIcon} name="trash" />
          </TouchableOpacity>
        )}
        {actionType === 'download' && onDownload && (
          <>
            {downloadProgress && downloadProgress < 100 ? (
              <CircularProgressWithPercentage progress={downloadProgress} />
            ) : (
              <TouchableOpacity
                onPress={() => onDownload(item.uri)}
                accessibilityLabel={`Download ${item.name}`}
                accessibilityRole="button"
              >
                <MaterialCommunityIcons style={styles.downloadIcon} name="download" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.base,
    borderRadius: Spacing.md,
    backgroundColor: Color.white,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    gap: Spacing.xs,
  },
  fileName: {
    fontWeight: FontWeight.semiBold,
  },
  fileSize: {
    color: Color.grayScale.grayOne,
    fontWeight: FontWeight.medium,
  },
  removeIcon: {
    fontSize: FontSize['xl'],
    color: Color.alert.error,
    backgroundColor: Color.grayScale.grayThree,
    padding: Spacing.xs,
    borderRadius: 50,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadIcon: {
    fontSize: FontSize['xl'],
    color: Color.grayScale.grayOne,
    backgroundColor: Color.grayScale.grayThree,
    padding: Spacing.xs,
    borderRadius: 50,
    marginLeft: Spacing.sm,
  },
});

export default FileItem;