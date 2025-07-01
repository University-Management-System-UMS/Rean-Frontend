import * as Font from "expo-font";
import { useState, useEffect } from "react";

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        KhmerMPTC: require("@/assets/fonts/KhmerMPTC-Bold.ttf"),
        "NotoSansKhmer-Bold": require("@/assets/fonts/NotoSansKhmer-Bold.ttf"),
        "NotoSansKhmer-Regular": require("@/assets/fonts/NotoSansKhmer-Regular.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
