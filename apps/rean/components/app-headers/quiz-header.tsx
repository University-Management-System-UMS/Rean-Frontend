import { View, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { Color } from "@repo/colors";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { FontSize, Spacing, Text } from "@repo/ums-agent";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ReactElement } from "react";

interface Props {
  title?: string;
  backButtonIcon?: ReactElement;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export default function QuizHeader({
  title,
  showBackButton = true,
  backButtonIcon = <Ionicons name={'arrow-back'} size={FontSize['2xl']} color={Color.white} />,
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
                {backButtonIcon}
                <Text variant='heading' style={styles.title}>
                  {title}
                </Text>
              </TouchableOpacity>
            )}
        </View>

        <Svg
          style={styles.wave}
          width="100%"
          height={100}
          viewBox="0 0 1440 640"
          preserveAspectRatio="none"
        >
          <Path
            fill={Color.background}
            d="M0,96L40,122.7C80,149,160,203,240,240C320,277,400,299,480,309.3C560,320,640,320,720,288C800,256,880,192,960,165.3C1040,139,1120,149,1200,176C1280,203,1360,245,1400,266.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
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
    height: Platform.OS === 'ios' ? 170 : 150,
  },
  title: {
    color: Color.white, 
    fontSize: FontSize.md,
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
  romdoul: {
    position: 'absolute',
    top: 10,
    right: -70,
  },
  wave: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    right: 0,
  }

});
