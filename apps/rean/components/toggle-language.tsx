import { TouchableOpacity, StyleSheet } from "react-native";
import { useLanguage } from "../contexts/language.context";
import { Text } from "@repo/ums-agent";

export function ToggleLanguage() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <TouchableOpacity onPress={toggleLanguage} style={styles.button}>
      <Text style={styles.text}>{language === "en" ? "KH" : "EN"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
