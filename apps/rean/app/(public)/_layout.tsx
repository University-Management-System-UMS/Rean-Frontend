import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function PublicLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="select-institute" 
          options={{
            animation: 'fade',
          }}/>
      </Stack>
    </>
  );
}