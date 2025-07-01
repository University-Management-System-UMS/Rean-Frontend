import Ionicons from "@expo/vector-icons/Ionicons";

export interface TabConfig {
  name: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export const TAB_CONFIG: TabConfig[] = [
  {
    name: "home",
    title: "Home",
    iconName: "home-outline",
  },
 
  {
    name: "events",
    title: "Events",
    iconName: "calendar-outline",
  },
  {
    name: "profile",
    title: "Profile",
    iconName: "image-outline",
  },
];
