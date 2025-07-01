import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import { Text } from "./custom-text";
import { StyleSheet } from "react-native";
import { Color } from "@repo/colors";
import { Ionicons } from "@expo/vector-icons";
import { FontSize, Spacing } from "../../constants/typography";
import { InputContainer } from "./input-container";
import { Shadows } from "../../constants/shadow";

type Option = {
  label: string;
  value: string;
  image?: string;
};

type DropDownProps = {
  label: string;
  placeholder: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
};

export const DropDownInput: React.FC<DropDownProps> = ({
  label,
  placeholder,
  options,
  selectedValue,
  onChange,
  error,
  required = false,
}) => {
  const [open, setOpen] = useState(false);

  const selectItem = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <InputContainer
      label={label}
      error={error}
      inputBorderStyle={open ? styles.whenOpen : undefined}
      required={required}
    >
      <TouchableOpacity
        style={[styles.dropdownToggle]}
        onPress={() => setOpen(!open)}
      >
        <Text
          style={[styles.placeholderColor, selectedValue && styles.valueText]}
        >
          {selectedValue
            ? options.find(o => o.value === selectedValue)?.label
            : placeholder}
        </Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name={open ? "chevron-up" : "chevron-down"}
            size={FontSize.lg}
            color={Color.grayScale.grayOne}
          />
        </View>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownWrapper}>
          <ScrollView
            style={styles.dropdownContainer}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {options.map((opt) => (
              <TouchableHighlight
                key={opt.value}
                style={styles.dropdownItem}
                onPress={() => selectItem(opt.value)}
                underlayColor={Color.grayScale.grayThree}
              >
                <View style={styles.itemRow}>
                  {opt.image && (
                    <Image
                      source={{ uri: opt.image }}
                      style={styles.itemImage}
                    />
                  )}
                  <Text>{opt.label}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
      )}
    </InputContainer>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignContent: "center",
    justifyContent: "center",
  },
  placeholderColor: {
    fontSize: FontSize.base,
    color: Color.grayScale.grayOne,
  },
  valueText: {
    fontSize: FontSize.base,
    color: Color.grayScale.black,
  },
  dropdownToggle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  dropdownWrapper: {
    marginTop: Spacing.sm,
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 999,
  },
  dropdownContainer: {
    maxHeight: 200,
    marginVertical: Spacing.xs,
    shadowColor: Color.grayScale.grayOne,
    backgroundColor: Color.white,
    borderRadius: 16,
    ...Shadows.small,
  },
  dropdownItem: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  whenOpen: {
    borderColor: Color.accent,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 30,
    height: 30,
    marginRight: Spacing.sm,
    borderRadius: 4,
  },
});
