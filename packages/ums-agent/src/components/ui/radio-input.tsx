import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "@repo/colors";
import { Text } from "./custom-text";
import { FontSize, Spacing } from "../../constants/typography";

type Option = {
  label: string;
  value: string;
};

type RadioInputProps = {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
  gap?: number;
  isFlexColumn?: boolean;
};

export const RadioInput: React.FC<RadioInputProps> = ({
  options,
  selectedValue,
  onChange,
  activeColor = Color.primary,
  inactiveColor = Color.grayScale.grayTwo,
  textColor = Color.grayScale.black,
  containerStyle,
  optionStyle,
  textStyle,
  iconSize = 20,
  gap = Spacing["2xl"],
  isFlexColumn = false,
}) => {
  return (
    <View
      style={[
        isFlexColumn ? styles.wrapperColumn : styles.wrapper,
        { gap },
        containerStyle,
      ]}
    >
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          style={[styles.optionRow, optionStyle]}
          onPress={() => onChange(opt.value)}
        >
          <Ionicons
            name={
              selectedValue === opt.value
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={iconSize}
            color={selectedValue === opt.value ? activeColor : inactiveColor}
          />
          <Text style={[styles.optionText, { color: textColor }, textStyle]}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    flexShrink: 1,
    padding: Spacing.ms,
  },
  wrapperColumn: {
    flexDirection: "column",
    marginRight: Spacing.md,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  optionText: {
    marginLeft: Spacing.sm,
    fontSize: FontSize.base,
    flexShrink: 1,
  },
});
