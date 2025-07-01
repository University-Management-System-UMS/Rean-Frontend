import React, { createContext, useContext } from 'react';
import * as Font from 'expo-font';

type FontContextType = {
  fontsLoaded: boolean;
};

const FontContext = createContext<FontContextType>({
  fontsLoaded: false,
});

export const useFonts = () => useContext(FontContext);

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'NotoSansKhmer': require('../assets/fonts/NotoSansKhmer.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};