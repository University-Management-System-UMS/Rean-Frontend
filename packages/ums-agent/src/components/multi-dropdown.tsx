import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import { StyleSheet } from "react-native";
import { Color } from "@repo/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "./ui/custom-text";
import { FontSize, Spacing } from "../constants/typography";
import { InputContainer } from "./ui/input-container";
import { Shadows } from "../constants/shadow";

type Option = {
  label: string;
  value: string;
  image?: string;
};

type MultiSelectDropDownProps = {
  label: string;
  placeholder: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
  maxSelections?: number;
  showSelectedCount?: boolean;
  selectAllOption?: boolean;
};

export const MultiSelectDropDown: React.FC<MultiSelectDropDownProps> = ({
  label,
  placeholder,
  options,
  selectedValues,
  onChange,
  error,
  required = false,
  maxSelections,
  showSelectedCount = true,
  selectAllOption = false,
}) => {
  const [open, setOpen] = useState(false);

  const toggleItem = (value: string) => {
    if (selectedValues.includes(value)) {
      // Remove item
      onChange(selectedValues.filter(v => v !== value));
    } else {
      // Add item (check max selections)
      if (maxSelections && selectedValues.length >= maxSelections) {
        return; // Don't add if max reached
      }
      onChange([...selectedValues, value]);
    }
  };

  const selectAll = () => {
    if (selectedValues.length === options.length) {
      // Deselect all
      onChange([]);
    } else {
      // Select all (respect max selections)
      const allValues = options.map(opt => opt.value);
      if (maxSelections) {
        onChange(allValues.slice(0, maxSelections));
      } else {
        onChange(allValues);
      }
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    
    if (selectedValues.length === 1) {
      return options.find(opt => opt.value === selectedValues[0])?.label || '';
    }
    
    if (showSelectedCount) {
      return `${selectedValues.length} selected`;
    }
    
    // Show first selected item + count
    const firstItem = options.find(opt => opt.value === selectedValues[0])?.label || '';
    return `${firstItem} +${selectedValues.length - 1} more`;
  };

  const isAllSelected = selectedValues.length === options.length && options.length > 0;
  const canSelectMore = !maxSelections || selectedValues.length < maxSelections;

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
          style={[
            styles.placeholderColor,
            selectedValues.length > 0 && styles.valueText
          ]}
        >
          {getDisplayText()}
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
          <View style={styles.dropdownContainer}>
            {/* Action buttons */}
            {(selectAllOption || selectedValues.length > 0) && (
              <View style={styles.actionsContainer}>
                {selectAllOption && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={selectAll}
                  >
                    <Text style={styles.actionText}>
                      {isAllSelected ? 'Deselect All' : 'Select All'}
                    </Text>
                  </TouchableOpacity>
                )}
                {selectedValues.length > 0 && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={clearAll}
                  >
                    <Text style={[styles.actionText, styles.clearText]}>
                      Clear
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <ScrollView
              style={styles.scrollContainer}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {options.map((opt) => {
                const isSelected = selectedValues.includes(opt.value);
                const isDisabled = !isSelected && !canSelectMore;
                
                return (
                  <TouchableHighlight
                    key={opt.value}
                    style={[
                      styles.dropdownItem,
                      isSelected && styles.selectedItem,
                      isDisabled && styles.disabledItem
                    ]}
                    onPress={() => !isDisabled && toggleItem(opt.value)}
                    underlayColor={Color.grayScale.grayThree}
                    disabled={isDisabled}
                  >
                    <View style={styles.itemRow}>
                      <View style={styles.itemContent}>
                        {opt.image && (
                          <Image
                            source={{ uri: opt.image }}
                            style={styles.itemImage}
                          />
                        )}
                        <Text style={[
                          styles.itemText,
                          isDisabled && styles.disabledText
                        ]}>
                          {opt.label}
                        </Text>
                      </View>
                      
                      <View style={styles.checkboxContainer}>
                        <View style={[
                          styles.checkbox,
                          isSelected && styles.checkedBox
                        ]}>
                          {isSelected && (
                            <Ionicons
                              name="checkmark"
                              size={FontSize.sm}
                              color={Color.white}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              })}
            </ScrollView>

            {/* Selected count footer */}
            {maxSelections && (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                  {selectedValues.length} of {maxSelections} selected
                </Text>
              </View>
            )}
          </View>
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
    maxHeight: 300,
    marginVertical: Spacing.xs,
    shadowColor: Color.grayScale.grayOne,
    backgroundColor: Color.white,
    borderRadius: 16,
    ...Shadows.small,
  },
  scrollContainer: {
    maxHeight: 200,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Color.grayScale.grayThree,
  },
  actionButton: {
    paddingVertical: Spacing.xs,
  },
  actionText: {
    fontSize: FontSize.sm,
    color: Color.accent,
    fontWeight: '500',
  },
  clearText: {
    color: Color.alert.error || Color.grayScale.grayOne,
  },
  dropdownItem: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  selectedItem: {
    backgroundColor: Color.grayScale.grayFour || 'rgba(0,0,0,0.05)',
  },
  disabledItem: {
    opacity: 0.5,
  },
  whenOpen: {
    borderColor: Color.accent,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemText: {
    fontSize: FontSize.base,
    color: Color.grayScale.black,
  },
  disabledText: {
    color: Color.grayScale.grayTwo,
  },
  itemImage: {
    width: 30,
    height: 30,
    marginRight: Spacing.sm,
    borderRadius: 4,
  },
  checkboxContainer: {
    marginLeft: Spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Color.grayScale.grayTwo,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  checkedBox: {
    backgroundColor: Color.primary,
    borderColor: Color.primary,
  },
  footerContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Color.grayScale.grayThree,
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Color.grayScale.grayTwo,
  },
});