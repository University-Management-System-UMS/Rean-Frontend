import { View, StyleSheet } from "react-native";
import { Text } from "@repo/ums-agent";
import { Color } from "@repo/colors";

interface AuthHeaderTitleProps {
  title?: string;
  description?: string;
}

export default function AuthHeaderTitle({
  title,
  description,
}: AuthHeaderTitleProps) {
  return (
    <View>
      <Text style={styles.welcomeTitle}>{title}</Text>
      <Text style={styles.welcomeDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Color.grayScale.black,
  },
  welcomeDescription: {
    fontSize: 12,
    color: Color.grayScale.grayOne,
    lineHeight: 18,
  },
});
