import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Spacing } from '@repo/ums-agent'; 
import FileItem from './file-item';

interface File {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

interface FileListProps {
  files: File[];
  onFileRemoved?: (uri: string) => void;
}

export default function SelectedFileList({ files, onFileRemoved }: FileListProps) {
  return (
    <FlatList
      data={files}
      renderItem={({ item }) => <FileItem item={item} onFileRemoved={onFileRemoved} actionType={'remove'} />}
      keyExtractor={(item) => item.uri}
      style={styles.fileList}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    />
  )
}

const styles = StyleSheet.create({
  fileList: {
  },
  itemSeparator: {
    height: Spacing.base,
  },
});