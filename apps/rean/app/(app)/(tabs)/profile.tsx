import { ToggleLanguage } from "@/components/toggle-language";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@repo/ums-agent";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <ToggleLanguage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProfileScreen;
