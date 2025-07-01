import { Stack } from 'expo-router';

export default function Layout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Leave Review',
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            statusBarStyle: 'dark',
            headerShown:  false,
            presentation: 'modal',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="apply-leave"
        />
      </Stack>
  );
}