import { Color } from "@repo/colors";
import { FontSize, FontWeight, Spacing } from "@repo/ums-agent";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="login"
        />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="pin-code" />
      </Stack>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectInt: {
    color: Color.white,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    marginLeft: Spacing.sm,
  }
};
