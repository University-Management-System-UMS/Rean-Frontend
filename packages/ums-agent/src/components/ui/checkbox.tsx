import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { Text } from './custom-text';
import { FontSize, Spacing } from '../../constants/typography';

type Option = {
  label: string;
  value: string;
};

type CheckboxProps = {
  options: Option[];
  selectedValues: string[];
  onChange: (value: string[]) => void;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
  gap?: number;
  multiSelect?: boolean;
  isFlexColumn?: boolean;
};

/**
 * CheckboxInput component for single or multiple selection
 * 
 * @example
 * // Single select checkbox
 * <CheckboxInput
 *   options={[{label: 'Option 1', value: '1'}, {label: 'Option 2', value: '2'}]}
 *   selectedValues={selected}
 *   onChange={setSelected}
 *   multiSelect={false}
 * />
 * 
 * @example
 * // Multi-select checkbox with custom colors
 * <CheckboxInput
 *   options={[{label: 'Option A', value: 'a'}, {label: 'Option B', value: 'b'}]}
 *   selectedValues={selected}
 *   onChange={setSelected}
 *   activeColor="#FF0000"
 *   inactiveColor="#CCCCCC"
 *   textColor="#333333"
 * />
 * 
 * @example
 * // Checkbox with custom styling
 * <CheckboxInput
 *   options={options}
 *   selectedValues={selected}
 *   onChange={setSelected}
 *   containerStyle={{padding: 10}}
 *   optionStyle={{marginBottom: 10}}
 *   textStyle={{fontWeight: 'bold'}}
 *   iconSize={30}
 *   gap={20}
 * />
 */

export const CheckboxInput: React.FC<CheckboxProps> = ({
  options,
  selectedValues = [],
  onChange,
  activeColor = Color.primary,
  inactiveColor = Color.grayScale.grayTwo,
  textColor = Color.grayScale.black,
  containerStyle,
  optionStyle,
  textStyle,
  iconSize = 20,
  gap = Spacing.md,
  multiSelect = true,
  isFlexColumn = false,
}) => {
  const toggle = (value: string) => {
    let newValues;
    if (multiSelect) {
      newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
    } else {
      newValues = selectedValues.includes(value) ? [] : [value];
    }
    onChange(newValues);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.wrapper, { gap }, isFlexColumn ? styles.wrapperColumn : styles.wrapper]}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.optionRow, optionStyle]}
            onPress={() => toggle(opt.value)}
          >
            <Ionicons
              name={selectedValues.includes(opt.value) ? "checkbox" : "checkbox-outline"}
              size={iconSize}
              color={selectedValues.includes(opt.value) ? activeColor : inactiveColor}
            />
            <Text style={[styles.optionText, { color: textColor }, textStyle]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    flexShrink: 1,
  },
   wrapperColumn: {
    flexDirection: 'column',
    marginRight: Spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
  },
  optionText: {
    marginLeft: Spacing.sm,
    fontSize: FontSize.base,
  },
});
