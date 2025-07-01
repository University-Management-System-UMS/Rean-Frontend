import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="[id]"
      />
      <Stack.Screen
        name="take-quiz"
      />
      <Stack.Screen
        name="quiz-result"
      />
    </Stack>
  );
}