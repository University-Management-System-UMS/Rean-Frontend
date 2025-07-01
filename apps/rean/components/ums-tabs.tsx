import { Color } from '@repo/colors';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Spacing, Text } from '@repo/ums-agent';

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabComponentProps {
  tabs: TabItem[];
  containerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs, containerStyle, tabStyle }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label || '');

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Tab Header - Fixed at top */}
      <View style={[styles.tabHeader, tabStyle]}>
        <ScrollView 
          horizontal
          style={styles.scrollContainer}
          contentContainerStyle={styles.tabRow}
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.label}
              style={[styles.tab, activeTab === tab.label && styles.activeTab]}
              onPress={() => setActiveTab(tab.label)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab.label && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View  style={styles.contentContainer}>
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.transparent,
  },
  tabHeader: {
    flexShrink: 0, // Prevent header from shrinking
  },
  scrollContainer: {
    flexGrow: 0,
    flexShrink: 0,
  },
  tabRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  tab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 26,
    backgroundColor: Color.grayScale.grayFour
  },
  activeTab: {
    backgroundColor: Color.primary,
  },
  tabText: {
    color: Color.grayScale.grayOne,
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabText: {
    color: Color.white,
  },
  contentContainer: {
    flex: 1,
  },
  
});

export default TabComponent;