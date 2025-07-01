import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from "react-native";
import { Color } from "@repo/colors";
import { ReactNode } from "react";
import { FontSize, Spacing } from "../../constants/typography";
import { InputContainer } from "../ui/input-container";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  textArea?: boolean;
  inputBorderStyle?: ViewStyle;
  required?: boolean;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  icon,
  rightIcon,
  multiline = false,
  numberOfLines = 1,
  textArea = false,
  inputBorderStyle,
  required = false,
  ...props
}) => {
  return (
    <InputContainer
      label={label}
      error={error}
      containerStyle={containerStyle}
      inputBorderStyle={inputBorderStyle}
      required={required}
    >
      <View
        style={[
          styles.inputWrapper,
          textArea && styles.textAreaWrapper,
          inputStyle,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            icon ? styles.inputWithLeftIcon : {},
            rightIcon ? styles.inputWithRightIcon : {},
            textArea && styles.textArea,
          ]}
          multiline={textArea || multiline}
          numberOfLines={textArea ? 4 : numberOfLines}
          textAlignVertical={textArea ? "top" : "center"}
          placeholderTextColor={Color.grayScale.grayOne}
          {...props}
        />
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
    </InputContainer>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontFamily: 'NotoSansKhmer-regular',
    fontSize: FontSize.base,
    color: Color.grayScale.black,
    paddingVertical: Spacing.sm,
  },
  iconContainer: {
    marginRight: Spacing.sm,
  },
  rightIconContainer: {
    marginLeft: Spacing.sm,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.none,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.none,
  },
  textAreaWrapper: {
    minHeight: 120,
    alignItems: "flex-start",
  },
  textArea: {
    height: "100%",
    paddingTop: Spacing.sm,
    textAlignVertical: "top",
  },
});

export default CustomTextInput;
