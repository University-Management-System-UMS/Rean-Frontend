import { View, StyleSheet, Image, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Color } from "@repo/colors";
import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

type Props = {
  onFinish: () => void;
};

const Splash = ({ onFinish }: Props) => {
  const [appReady, setAppReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();
      setAppReady(true);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setTimeout(onFinish, 3000);
    };

    prepare();
  }, [onFinish, fadeAnim]);

  if (!appReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={require("@/assets/images/logo/rean_title_light.png")}
          style={styles.image}
        />
      </Animated.View>
      <Animated.Text style={[styles.verText, { opacity: fadeAnim }]}>
        Version 1.2
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  verText: {
    fontSize: 16,
    color: Color.grayScale.grayOne,
    textAlign: "center",
  },
});

export default Splash;
