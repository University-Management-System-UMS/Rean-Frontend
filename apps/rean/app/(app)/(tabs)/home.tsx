import HomeHeader from "@/components/app-headers/home-header";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { NavigationUtil } from "@/utils/navigation.util";
import { Color } from "@repo/colors";
import { CustomCalendar, FontWeight, Spacing, Text } from "@repo/ums-agent";
import { router } from "expo-router";
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { logout, isLoggingOut } = useAuth();

  const menuItems = [
    {
      id: "1",
      name: t("homeMenu").viewAttendance,
      source: require("@/assets/icons/receipt-item.png"),
    },
    {
      id: "2",
      name: t("homeMenu").myLearning,
      source: require("@/assets/icons/Graduate.png"),
    },
    {
      id: "3",
      name: t("homeMenu").leaveReview,
      source: require("@/assets/icons/Calendar.png"),
    },
    {
      id: "4",
      name: "UI Testing",
      source: require("@/assets/icons/Enquiry.png"),
    },
    {
      id: "5",
      name: t("homeMenu").scanAttendance,
      source: require("@/assets/icons/Enquiry.png"),
    },
    {
      id: "6",
      name: t("homeMenu").logout,
      source: require("@/assets/icons/Enquiry.png"),
    },
  ];

  const handleViewAttendance = () => {
    router.push("/view-attendance");
  };

  const handleMylearning = () => {
    router.navigate("/my-learning");
  };

  const handleLeaveReview = () => {
    router.push("/leave-review");
  };

  const handleUITesting = () => {
    router.push("/ui-testing");
  };

  const handleScanQr = () => {
    router.push("/qr-scanner");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            logout();
            if (isLoggingOut) {
              return <ActivityIndicator size="large" color={Color.primary} />;
            } else NavigationUtil.navigateToLogin();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getHandlerForItem = (id: string) => {
    switch (id) {
      case "1":
        return handleViewAttendance;
      case "2":
        return handleMylearning;
      case "3":
        return handleLeaveReview;
      case "4":
        return handleUITesting;
      case "5":
        return handleScanQr;
      case "6":
        return handleLogout;
      default:
        return () => { };
    }
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dashboard}>
          <View style={styles.dashboardMenu}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={getHandlerForItem(item.id)}
              >
                <Image source={item.source} style={styles.dashboardImage} />
                <Text style={styles.text} numberOfLines={2}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.calendar}>
          <View style={styles.titleCalendar}>
            <Text style={styles.text}>{t("calendar")}</Text>
          </View>
          <CustomCalendar />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Color.background,
    position: "relative",
    top: -Spacing.xl,
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.md,
    marginBottom: -Spacing.xl,
  },
  calendar: {
    backgroundColor: Color.background,
  },
  dashboard: {
    backgroundColor: Color.background,
    borderTopEndRadius: Spacing.xl,
    borderTopStartRadius: Spacing.xl,
  },
  dashboardMenu: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: Color.white,
    flexDirection: "row",
    gap: Spacing.ms,
    padding: Spacing.ms,
    borderRadius: 12,
    alignItems: "center",
    width: "48%",
    marginBottom: Spacing.md,
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    fontWeight: FontWeight.bold,
  },
  titleCalendar: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Color.primary,
    paddingLeft: Spacing.ms,
  },
  dashboardImage: {
    width: 48,
    height: 48,
  },
});

export default HomeScreen;
