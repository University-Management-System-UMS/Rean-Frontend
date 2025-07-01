import { Color } from '@repo/colors';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from '@repo/ums-agent';

interface TabItem {
  label: string;
  value: string;
}

interface TabProps {
  tabs: TabItem[];
  containerStyle?: ViewStyle;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabNoRenderComponent: React.FC<TabProps> = ({
  tabs,
  containerStyle,
  activeTab = '',
  onTabChange
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        style={styles.scrollContainer}
        contentContainerStyle={styles.tabRow}
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tab, activeTab === tab.value && styles.activeTab]}
            onPress={() => onTabChange(tab.value)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab.value && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: Color.transparent,
  },
  scrollContainer: {
    flexGrow: 0,
    flexShrink: 0,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 26,
    backgroundColor: Color.grayScale.grayFour,
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
});

export default TabNoRenderComponent;