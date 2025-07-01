import {
  View,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { CustomButton, CustomTextInput, Spacing } from "@repo/ums-agent";
import { Color } from "@repo/colors";
import AuthHeader from "@/components/app-headers/auth-header";
import AuthHeaderTitle from "@/components/auth/auth-header-title";
import { useTranslation } from "@/hooks/useTranslation";
import { ScrollView } from "react-native-gesture-handler";

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSend = async () => {
    setEmailError("");

    if (!email) {
      setEmailError(t("loginPage").emailError);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t("loginPage").emailValidate);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert(
        t("forgotPasswordPage.resetSent"),
        '',
        [
          {
            text: t("ok"),
          },
        ],
      );
    } catch (error) {
      setEmailError(`${t("forgotPasswordPage.sendError")} ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <View style={styles.container}>
        <AuthHeader />
        <View style={styles.body}>
          <AuthHeaderTitle
            title={t("forgotPasswordPage.forgotPassword")}
            description={t("forgotPasswordPage.enterEmail")}
          />
          <ScrollView contentContainerStyle={styles.form}>
            <CustomTextInput
                label={t("loginPage.email")}
                placeholder={t("forgotPasswordPage.emailPlaceholder")}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                error={emailError}
              />
              <CustomButton
                title={isLoading ? t("forgotPasswordPage.loading") : t("forgotPasswordPage.sendReset")}
                onPress={handleSend}
                loading={isLoading}
                disabled={!email}
              />
          </ScrollView>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  body: {
    flexGrow: 1,
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
    color: Color.grayScale.black,
  },
  form: {
    gap: Spacing.md,
  }
});
