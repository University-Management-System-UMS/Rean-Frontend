import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

import onboadingImg1 from "@/assets/images/onBoarding/first-image.png";
import onboadingImg2 from "@/assets/images/onBoarding/second-image.png";
import onboadingImg3 from "@/assets/images/onBoarding/third-image.png";
import { Color } from "@repo/colors";
import { Font } from "@/styles/fonts/fonts";
import { NavigationUtil } from '@/utils/navigation.util';
import { useTranslation } from "@/hooks/useTranslation";
import { CustomButton } from "@repo/ums-agent";


export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      image: onboadingImg1,
      title: (t("onBoardingScreen").title1),
      description: (t("onBoardingScreen").descript),
    },
    {
      id: 2,
      image: onboadingImg2,
      title: (t("onBoardingScreen").title2),
      description: (t("onBoardingScreen").descript),
    },
    {
      id: 3,
      image: onboadingImg3,
      title: (t("onBoardingScreen").title3),
      description: (t("onBoardingScreen").descript),
    },
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      NavigationUtil.completeOnboarding();
    }
  };

  const handleSkip = () => {
    NavigationUtil.completeOnboarding();
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={slides[currentSlide].image}
          style={styles.image}
          testID="screenRender"
        />
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentSlide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{slides[currentSlide].title}</Text>
        <Text style={styles.description}>
          {slides[currentSlide].description}
        </Text>
        <View style={styles.buttonContainer}>
          {currentSlide === slides.length - 1 ? (
            <CustomButton
              title={t("onBoardingScreen").start}
              onPress={handleSkip}
              containerStyle={styles.startButton}
              textStyle={styles.nextButtonText}
            />
          ) : (
            <>
              <CustomButton
                title={t("onBoardingScreen").skip}
                onPress={handleSkip}
                containerStyle={styles.skipButton}
                textStyle={styles.skipButtonText}
              />
              <CustomButton
                title={t("onBoardingScreen").next}
                onPress={handleNext}
                containerStyle={styles.nextButton}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 82,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    flex: 1,
    width: width - 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: Font.KhmerMPTC,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  pagination: {
    position: "absolute",
    flexDirection: "row",
    bottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Color.white,
    width: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    bottom: 20,
    flex: 1,
    gap: 10,
  },
  startButton: {
    backgroundColor: Color.primary,
    width: width / 1.1,
    alignSelf: "flex-end",
  },
  skipButton: {
    borderWidth: 1,
    width: width / 2.2,
    borderColor: Color.primary,
    backgroundColor: "transparent",
  },
  nextButton: {
    backgroundColor: Color.primary,
    width: width / 2.2,
  },
  skipButtonText: {
    color: Color.primary,
  },
  nextButtonText: {
    color: Color.white,
  },
});
