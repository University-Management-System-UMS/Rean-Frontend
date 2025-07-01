import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Color } from "@repo/colors";
interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
  iconName: keyof typeof Ionicons.glyphMap;
}

export function TabIcon({ focused, color, size, iconName }: TabIconProps) {
  return (
    <View style={styles.tabIconContainer}>
      {focused && <View style={styles.activeIndicator} />}
      <Ionicons
        style={styles.icons}
        name={iconName}
        size={size}
        color={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activeIndicator: {
    width: 75,
    height: 4.5,
    backgroundColor: Color.primary,
    borderRadius: 2,
    marginBottom: 4,
    alignContent: "center",
  },
  icons: {
    justifyContent: "center",
    textAlign: "center",
  },
  tabIconContainer: {
    alignItems: "center",
  },
});
