import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Splash from '@/components/splash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LanguageProvider } from "@/contexts/language.context";
import { StyleSheet } from "react-native";
import { FontProvider, useFonts } from '@repo/ums-agent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation, TranslationPath } from '@/hooks/useTranslation';
import { AlertProvider } from '@/contexts/custom-alert.context';
import { ClearDateOnRouteChange, DateInputProvider } from '@/contexts/date-input.context';
import { GlobalBottomSheetProvider } from '@/contexts/bottom-sheet.context';
import { QuizProvider } from '@/contexts/quiz-answer-context';
import { reanHttpClient, universityHttpClient } from '@/api/seperate-client';

SplashScreen.preventAutoHideAsync();

// Create QueryClient instance outside component
const queryClient = new QueryClient();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const fontsLoaded = useFonts();

  if (!fontsLoaded || !isReady) {
    return <Splash onFinish={() => setIsReady(true)} />;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.container}>
        <LanguageProvider>
          <QuizProvider>
          <FontProvider>
            <TranslationInitializer>
              <AlertProvider>
                <GlobalBottomSheetProvider>
                <DateInputProvider>
                <ClearDateOnRouteChange />
                <StatusBar style="dark" />
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(public)" />
                  <Stack.Screen name="(app)" />
                </Stack>
                </DateInputProvider>
                </GlobalBottomSheetProvider>
              </AlertProvider>
            </TranslationInitializer>
          </FontProvider>
          </QuizProvider>
        </LanguageProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

// Create a separate component for translation initialization
function TranslationInitializer({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  useEffect(() => {
    reanHttpClient.setTranslator((key: TranslationPath) => t(key));
    universityHttpClient.setTranslator((key: TranslationPath) => t(key));
  }, [t]);

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
