import { Stack } from "expo-router";
import { Color } from "@repo/colors";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="notification" />
      <Stack.Screen name="qr-scanner" />
      <Stack.Screen
        name="ui-testing"
        options={{
          headerShown: true,
          headerTintColor: Color.white,
          headerTitle: "UI Testing for Developer",
        }}
      />
      <Stack.Screen name="leave-review" />
      <Stack.Screen name="view-attendance" />

      <Stack.Screen name="calendar-screen" />
      <Stack.Screen name="my-learning" />
      
    </Stack>
  );
}