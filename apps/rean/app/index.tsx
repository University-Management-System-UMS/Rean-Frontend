import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Splash from '@/components/splash';
import ROUTES from '@/utils/route.constant';

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      const [hasOnboarded, selecteInstitute, loginDetails] = await Promise.all([
        AsyncStorage.getItem('hasOnboarded'),
        AsyncStorage.getItem('selectedInstitute'),
        AsyncStorage.getItem('loginDetails') 
      ]);

      if (!hasOnboarded) {
        setInitialRoute(ROUTES.PUBLIC_ROUTES.ONBOARDING);
      } else if (!selecteInstitute) {
        setInitialRoute(ROUTES.PUBLIC_ROUTES.SELECT_INSTITUTE);
      } else if (!loginDetails) { // if data still exist in storage user can login
        setInitialRoute(ROUTES.AUTH.LOGIN);
      } else {
        setInitialRoute(ROUTES.TABS.HOME);
      }
    } catch (error) {
      console.error('Error checking initial route:', error);
      setInitialRoute(ROUTES.PUBLIC_ROUTES.ONBOARDING);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Splash onFinish={() => {}} />
      </View>
    );
  }

  return <Redirect href={initialRoute as RouteType || ROUTES.PUBLIC_ROUTES.ONBOARDING} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

type RouteType = (typeof ROUTES.PUBLIC_ROUTES | typeof ROUTES.AUTH | typeof ROUTES.TABS)[keyof (typeof ROUTES.PUBLIC_ROUTES | typeof ROUTES.AUTH | typeof ROUTES.TABS)];