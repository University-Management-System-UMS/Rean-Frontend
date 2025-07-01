import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ROUTES from './route.constant';

export const NavigationUtil = {
  // Auth Flow
  navigateToLogin: () => router.replace(ROUTES.AUTH.LOGIN),
  navigateToForgotPassword: () => router.push(ROUTES.AUTH.FORGOT_PASSWORD),
  navigateToPinCode: () => router.push(ROUTES.AUTH.PIN_CODE),
  navigateToSelectInstitute: () => router.replace(ROUTES.PUBLIC_ROUTES.SELECT_INSTITUTE),
  
  // Main App Flow
  navigateToHome: () => router.replace(ROUTES.TABS.HOME),
  
  // Onboarding Flow
  navigateToOnboarding: () => router.replace(ROUTES.PUBLIC_ROUTES.ONBOARDING),

  goBack: () => router.back(),

  // Session Management
  async completeOnboarding() {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    this.navigateToSelectInstitute();
  },

  async completeSelectInstitute(institute: string) {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    await AsyncStorage.setItem('selectInstitute', institute);
    this.navigateToLogin();
  },

  async login(loginDetail: string) {
    await AsyncStorage.setItem('loginDetail', loginDetail);
    this.navigateToHome();
  },

  async logout() {
    await AsyncStorage.removeItem('loginDetail');
    this.navigateToLogin();
  },
};