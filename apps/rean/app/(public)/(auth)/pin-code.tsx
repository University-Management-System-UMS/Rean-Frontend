import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { CustomButton, CustomTextInput, Text } from "@repo/ums-agent";
import { useRouter } from "expo-router";
import { Color } from "@repo/colors";
import AuthHeader from "@/components/app-headers/auth-header";
import AuthHeaderTitle from "@/components/auth/auth-header-title";

export default function PinCodeScreen() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async () => {
    setPinError("");

    if (!pin) {
      setPinError("PIN code is required");
      return;
    }

    if (pin.length !== 6) {
      setPinError("Please enter a valid 6-digit PIN code");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/forgot-password");
    } catch (error) {
      setPinError(`Invalid PIN code ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Add resend logic here
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <AuthHeader />
        <View style={styles.body}>
          <AuthHeaderTitle
            title="Verify PIN Code"
            description="Enter the 6-digit code sent to your email"
          />
          <View style={styles.content}>
            <CustomTextInput
              label="PIN Code"
              placeholder="Enter 6-digit PIN"
              value={pin}
              onChangeText={(text) => {
                setPin(text.replace(/[^0-9]/g, "").slice(0, 6));
                setPinError("");
              }}
              error={pinError}
              keyboardType="number-pad"
              maxLength={6}
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                title={isLoading ? "Verifying..." : "Verify"}
                onPress={handleVerify}
                loading={isLoading}
              />
            </View>
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Didn't receive the code?{" "}
                <Text style={styles.resendLink} onPress={handleResend}>
                  {resendLoading ? "Resending..." : "Resend"}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    paddingHorizontal: 18,
    flex: 1,
  },
  content: {
    marginTop: 24,
  },
  buttonContainer: {
    marginTop: 16,
  },
  resendContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  resendText: {
    color: Color.grayScale.grayOne,
    fontSize: 14,
  },
  resendLink: {
    color: Color.primary,
    fontWeight: "bold",
  },
});
