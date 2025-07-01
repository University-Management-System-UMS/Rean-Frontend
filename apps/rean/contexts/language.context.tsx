import { createContext, useContext, useEffect, useState } from "react";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    initializeLanguage();
  }, []);

  const initializeLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("userLanguage");
      if (savedLanguage) {
        setLanguage(savedLanguage);
      } else {
        // Get device language
        const deviceLang = getLocales()[0].languageCode || "en";
        const supportedLang = ["en", "kh"].includes(deviceLang)
          ? deviceLang
          : "en";
        setLanguage(supportedLang);
      }
    } catch (error) {
      console.error("Error loading language preference:", error);
    }
  };

  const toggleLanguage = async () => {
    const newLang = language === "en" ? "kh" : "en";
    try {
      await AsyncStorage.setItem("userLanguage", newLang);
      setLanguage(newLang);
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
