import { View, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { Color } from "@repo/colors";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { FontSize, Spacing, Text } from "@repo/ums-agent";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export default function AuthHeader({
  title,
  showBackButton = true,
  onBackPress = router.back,
}: Props) {
  return (
    <LinearGradient
      colors={[Color.primary, Color.gradient.primary]}
      style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.leftSection}>
            {showBackButton && (
              <TouchableOpacity style={styles.navigation} onPress={onBackPress}>
                <Ionicons name="arrow-back" size={24} color={Color.white} />
                <Text variant='heading' style={styles.title}>
                  {title}
                </Text>
              </TouchableOpacity>
            )}
        </View>

        <Image
          source={require("@/assets/images/logo/rean_p_light_w.png")}  
          style={styles.logo}
        />
        <Svg
          style={styles.wave}
          width="100%"
          height={100}
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
        >
          <Path
            fill={Color.background}
            d="M0,64L60,85.3C120,107,240,149,360,176C480,203,600,213,720,181.3C840,149,960,75,1080,48C1200,21,1320,43,1380,53.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
        </Svg>
        <Image
          source={require("@/assets/icons/Romdoul.png")}
          style={styles.romdoul}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
  },
  title: {
    color: Color.white, 
    fontSize: FontSize.base,
  },
  
  leftSection: {
    paddingHorizontal : Spacing.md,
    paddingTop: Platform.OS === 'android' ? Spacing.base : 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  logo: {
    position: 'absolute',
    bottom: '35%',
    width: 160,
    height: 80,
    alignSelf: 'center',
  },
  romdoul: {
    position: 'absolute',
    bottom: 0,
    right: -80,
  },
  wave: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    right: 0,
  }

});
