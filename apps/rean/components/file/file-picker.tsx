import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Spacing, Text, FontSize, FontWeight } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { useTranslation } from '@/hooks/useTranslation';

interface FilePickerProps {
  onPress: () => void;
  supportedFiles?: string;
}

const FilePicker: React.FC<FilePickerProps> = ({ 
  onPress,
  supportedFiles = '.doc,.png,.jpg,.jpeg,.pdf,.xlsx,.docx'
}) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.uploadBox}>
        <View style={styles.iconContainer}>
          <Image 
            source={require('@/assets/icons/upload.png')} 
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>{t('leave.applyLeave.selectToUploadFile')}</Text>
        <Text style={styles.supportedText}>
          {t('leave.applyLeave.supportFiles')}: {supportedFiles}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBox: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Color.grayScale.grayTwo,
    borderRadius: Spacing.md,
    padding: Spacing.md,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 50,
    padding: Spacing.base,
    backgroundColor: Color.grayScale.grayThree,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 42,
    height: 42,
  },
  title: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold, 
    color: Color.primary,
    marginTop: Spacing.base,
  },
  supportedText: {
    fontSize: FontSize.sm,
    color: Color.grayScale.grayOne,
    marginTop: Spacing.xs,
  },
});

export default FilePicker;