import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@repo/ums-agent";

const EventsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Events Screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default EventsScreen;
