import { TouchableOpacity, View, Image, Platform } from "react-native";
import { StyleSheet } from "react-native";
import { Color } from "@repo/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Spacing } from "@repo/ums-agent";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeHeader() {

  return (
    <LinearGradient
      colors={[Color.primary, Color.gradient.primary]}>
      <SafeAreaView edges={['top']} style={styles.container}>
          <StatusBar style="light" />
          <View style={styles.leftHeader}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/logo/rean_p_light_w.png")}
            />
            <Image
              source={require("@/assets/icons/Romdoul.png")}
              style={styles.romdoul}
            />
          </View>
          <View style={styles.rightHeader}>
            <Link href="/(app)/notification" asChild>
              <TouchableOpacity >
                <Ionicons name="notifications" size={24} color={Color.white} />
              </TouchableOpacity>
            </Link>
          </View>
        </SafeAreaView>
        <View style={styles.layer}/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    paddingTop: Platform.OS === "android" ? Spacing.md : 0,
    flexDirection: "row",
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    gap: Spacing.ms,
  },

  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: Spacing.ms,
  },
  logo: {
    width: 96,
    height: 48,
  },
  layer: {
    height: Spacing.xl,
    backgroundColor: Color.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  romdoul: {
    position: "absolute",
    width: 169,
    height: 169,
    top: -Spacing.md,
    left: -Spacing.lg,
  },
});
