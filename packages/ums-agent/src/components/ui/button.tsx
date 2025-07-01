import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Image,
  ImageSourcePropType
} from "react-native";
import { Color } from "@repo/colors";
import { Text } from "../ui/custom-text";
import { FontWeight, Spacing } from "../../constants/typography";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  variant?: "primary" | "secondary" | "outline";
  icon? : ImageSourcePropType;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  containerStyle,
  textStyle,
  variant = "primary",
  icon,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryContainer;
      case "outline":
        return styles.outlineContainer;
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryText;
      case "outline":
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getContainerStyle(),
        disabled && styles.disabledContainer,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? Color.primary : Color.white}
        />
      ) : (
        <View style={styles.row}>
          {icon && (
            <Image
              source={icon}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        </View> 
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },
  primaryContainer: {
    backgroundColor: Color.primary,
  },
  secondaryContainer: {
    backgroundColor: Color.grayScale.grayThree,
  },
  outlineContainer: {
    backgroundColor: Color.transparent,
    borderWidth: 1,
    borderColor: Color.primary,
  },
  disabledContainer: {
    backgroundColor: Color.grayScale.disable,
  },
  text: {
    fontWeight: FontWeight.semiBold,
  },
  primaryText: {
    color: Color.white,
  },
  secondaryText: {
    color: Color.grayScale.black,
  },
  outlineText: {
    color: Color.primary,
  },
  icon: {
   width: 24, 
   height: 24, 
   marginRight: 8,
  },
  row: {
    flexDirection: 'row'
  }
});

export default CustomButton;