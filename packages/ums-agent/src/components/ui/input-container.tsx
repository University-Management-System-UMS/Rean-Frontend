import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./custom-text";
import { FontSize, FontWeight, Spacing } from "../../constants/typography";
import { Color } from "@repo/colors";

interface InputContainerProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputBorderStyle?: ViewStyle;
  required?: boolean;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  children,
  label,
  error,
  containerStyle,
  inputBorderStyle,
  required = false,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.requiredStar}>*</Text>}
        </View>
      )}
      <View
        style={[
          styles.container,
          inputBorderStyle,
          error && styles.errorContainer,
        ]}
      >
        {children}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: Spacing.xs,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  container: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: Color.grayScale.grayTwo,
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Color.white,
    justifyContent: "center",
  },
  errorContainer: {
    borderColor: Color.alert.error,
  },
  label: {
    fontSize: FontSize.sm,
    color: Color.grayScale.black,
    fontWeight: FontWeight.medium,
  },
  requiredStar: {
    color: Color.alert.error,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  error: {
    color: Color.alert.error,
    fontSize: FontSize.sm,
  },
});
