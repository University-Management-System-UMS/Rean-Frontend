import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import { CustomTextInput, CustomButton, Spacing } from "@repo/ums-agent";
import AuthHeader from "@/components/app-headers/auth-header";
import AuthHeaderTitle from "@/components/auth/auth-header-title";
import { LoginFooter } from "@/components/auth/login-footer";
import { NavigationUtil } from "@/utils/navigation.util";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import ROUTES from "@/utils/route.constant";
import { useCustomAlert } from "@/contexts/custom-alert.context";

export default function LoginScreen() {
  const { t } = useTranslation();
  const { alert } = useCustomAlert();
  const { login, isLoggingIn, loginError, loginDetails } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (loginDetails) {
      router.replace(ROUTES.TABS.HOME);
    }
  }, [loginDetails]);

  // Handle login error
  useEffect(() => {
    if (loginError) {
      alert(t('loginPage.error.title'), loginError.message);
    }
  }, [loginError]);

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };

    if (!email) newErrors.email = t('loginPage.error').emailRequrired;
    if (!password) newErrors.password = t('loginPage.error').pwRequired;

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      login({
        Email: email,
        pwd: password,
        dtype: 'A',
        isMobile: true
      });
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        title={t('instituteScreen.selectInstitute')}
        onBackPress={() => router.replace('/(public)/select-institute')}/>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <AuthHeaderTitle
            title={t("loginPage.welcome")}
            description={t("loginPage.descript")}
          />

          <View style={styles.form}>
            <CustomTextInput
              label={t("loginPage.email")}
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />
            <CustomTextInput
              label={t("loginPage.password")}
              placeholder={t("loginPage.pwPlaceholder")}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={errors.password}
            />

            <CustomButton
              title={t("loginPage.login")}
              onPress={handleSubmit}
              loading={isLoggingIn}
              disabled={!email || !password}
            />
          </View>

          <View style={styles.footer}>
            <LoginFooter
              text={t("loginPage.dontRememberPw")}
              linkText={t("loginPage.reset")}
              onPress={NavigationUtil.navigateToForgotPassword}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    paddingTop: Spacing.xl,
    padding: Spacing.md
  },
  form: {
    paddingTop: Spacing.xl,
    gap: Spacing.md,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
