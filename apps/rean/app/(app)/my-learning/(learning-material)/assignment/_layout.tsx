import { Stack } from "expo-router";

export default function AssignmentLayout() {
  return (
    <Stack
      screenOptions={{
       headerShown: false,
       gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="[id]"
      />
      <Stack.Screen
        name="assignment-submission"
      />
      <Stack.Screen
        name="edit-assignment"
      />
    </Stack>
  );
}