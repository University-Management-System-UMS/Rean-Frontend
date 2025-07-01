import { Stack } from "expo-router";

export default function LearningMaterialLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="assignment"
      />
      <Stack.Screen
        name="quiz"
      />
    </Stack>
  );
}