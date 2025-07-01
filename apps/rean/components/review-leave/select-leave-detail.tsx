import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@repo/ums-agent';
import { Spacing, FontWeight, FontSize } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
  status?: string;
  onCancel: () => void;
  onViewDetails: () => void;
}

const CANCELABLE_STATUS = 'submitted';

export const LeaveBottomSheetActions: React.FC<Props> = ({
  status,
  onCancel,
  onViewDetails,
}) => {
  const isCancelable = status?.toLocaleLowerCase() === CANCELABLE_STATUS;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();


  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <TouchableOpacity style={styles.viewButton} onPress={onViewDetails}>
        <Text style={styles.viewText}>{t('leave.applyLeave.viewDetails')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.cancelButton,
          !isCancelable && styles.cancelButtonDisabled,
        ]}
        onPress={isCancelable ? onCancel : undefined}
        disabled={!isCancelable}
        activeOpacity={isCancelable ? 0.7 : 1}
      >
        <Text
          style={[
            styles.cancelText,
            !isCancelable && styles.cancelTextDisabled,
          ]}
        >
          {t('leave.applyLeave.cancelLeave')}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  viewButton: {
    backgroundColor: Color.grayScale.grayFour,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
  },
  viewText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Color.grayScale.black,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: Color.grayScale.grayFour,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
  },
  cancelText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: Color.alert.error,
    textAlign: 'center',
  },
  cancelButtonDisabled: {
    backgroundColor: Color.grayScale.grayFour,
  },
  cancelTextDisabled: {
    color: Color.grayScale.grayTwo,
  },
});

