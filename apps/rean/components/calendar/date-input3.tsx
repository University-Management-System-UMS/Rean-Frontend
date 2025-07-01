import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontSize, InputContainer, Text } from "@repo/ums-agent";
import { Color } from "@repo/colors";

interface DateInputProps {
  label: string;
  value: Date | null | undefined;
  placeholder?: string;
  onPress?: () => void;
  initialDate?: Date | null;
  error?: string;
  required?: boolean;
}

const DateInput3 = ({
  label,
  value,
  placeholder,
  onPress,
  initialDate,
  error,
  required = false,
}: DateInputProps) => {
  return (
    <InputContainer label={label} error={error} required={required}>
      <TouchableOpacity
        style={styles.dateInputButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dateText,
            initialDate ? styles.valueText : styles.placeholderText,
          ]}
        >
          {value?.toLocaleDateString() || placeholder}
        </Text>
        <Ionicons
          name={"chevron-down"}
          size={FontSize.lg}
          color={Color.grayScale.grayOne}
        />
      </TouchableOpacity>
    </InputContainer>
  );
};

export default DateInput3;

const styles = StyleSheet.create({
  dateInputButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    color: Color.grayScale.black,
    fontSize: FontSize.base,
  },
  valueText: {
    color: Color.grayScale.black,
  },
  placeholderText: {
    color: Color.grayScale.grayOne,
    fontSize: FontSize.base,
  },
});
