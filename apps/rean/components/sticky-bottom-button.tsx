import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { CustomButton, Shadows, Spacing } from '@repo/ums-agent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from '@repo/colors';

interface StickyBottomButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

const StickyBottomButton: React.FC<StickyBottomButtonProps> = ({ 
  title, 
  onPress, 
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, {paddingBottom: insets.bottom+16}]}>
      <CustomButton title={ title } onPress={onPress}/>
    </View>
  );
};

// {buttonHeight: 44, paddingVerticalHeight: 32}, for preventing footer over the main content
const CONTAINER_HEIGHT = 76;
const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: Spacing.md,
    paddingTop: 16,
    justifyContent: 'flex-end',
    backgroundColor: Color.white,
    ...Shadows.large,
  },
  
  spacer: {
    height: CONTAINER_HEIGHT,
  },
});

export const StickyBottomButtonWrapper = (props: StickyBottomButtonProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingBottom: insets.bottom }}>
      <StickyBottomButton {...props} />
    </View>
  );
};

export const StickyBottomSpacer = () => {
  return <View style={styles.spacer} />;
};

export default StickyBottomButton;