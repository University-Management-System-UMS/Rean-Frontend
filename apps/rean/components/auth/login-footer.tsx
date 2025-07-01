import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "@repo/ums-agent";
import { Color } from "@repo/colors";

interface LoginFooterProps {
  text: string;
  linkText: string;
  onPress: () => void;
}

export const LoginFooter: React.FC<LoginFooterProps> = ({ text, linkText, onPress }) => (
  <View style={styles.footerSection}>
    <Text style={styles.footerText}>
      {text}
      <Text style={styles.linkText} onPress={onPress}> {linkText}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  footerSection: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    textAlign: "center",
    color: Color.grayScale.grayOne,
    fontSize: 14,
  },
  linkText: {
    color: Color.primary,
    fontWeight: "bold",
  },
});