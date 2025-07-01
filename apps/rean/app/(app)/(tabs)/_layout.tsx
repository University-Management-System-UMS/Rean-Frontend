import { Tabs } from "expo-router";
import React from "react";
import { TabIcon } from "@/components/tab-icon";
import { TAB_CONFIG } from "@/configs/tab.config";

export default function TabLayout() {

  return (
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        {TAB_CONFIG.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ color, size, focused }) => (
                <TabIcon
                  focused={focused}
                  color={color}
                  size={size}
                  iconName={tab.iconName}
                />
              ),
            }}
          />
        ))}
      </Tabs>
  );
}