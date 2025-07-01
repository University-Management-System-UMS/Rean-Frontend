import { View, StyleSheet } from "react-native";
import { FontSize, FontWeight, Spacing, Text } from "@repo/ums-agent";
import { Color } from "@repo/colors";

interface BarSubHeaderProps {
  title?: string;
}

export default function BarSubHeader(props: BarSubHeaderProps) {
  return (
    <View style={styles.subHeader}>
        <View style={styles.barIcon}>
        </View>
        <Text style={styles.subtitle}>{ props.title }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subHeader: {
      flexDirection: 'row',
      alignContent: 'flex-start',
      gap: Spacing.sm,
    },
    subtitle: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.bold,
      marginBottom: Spacing.sm,
    },
    barIcon: {
      width: 4,
      backgroundColor: Color.primary,
      height: 20,
      borderRadius: 4.5,
    },
});