import { Stack } from "expo-router";
import { Color } from "@repo/colors";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Color.primary,
        },
      }}
    >
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="[id]"
      />
      <Stack.Screen
        name="message-list"
      />
      <Stack.Screen 
        name="(learning-material)"
        />
    </Stack>
  );
}