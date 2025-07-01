import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

interface BaseNavHeaderProps {
  title?: string;
  onBackPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  showBackButton?: boolean;
  statusBarStyle?: 'light' | 'dark';
  description?: string;
  rightImage?: React.ReactNode;
}

export const BaseNavHeader: React.FC<BaseNavHeaderProps> = ({
  title,
  onBackPress=() => {router.back()},
  leftComponent,
  rightComponent,
  backgroundColor = Color.primary,
  textColor = Color.white,
  showBackButton = true,
  statusBarStyle = 'light',
  description,
  rightImage
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top, backgroundColor }]}>
      <StatusBar style={statusBarStyle} />
      <View style={styles.headerTop}>
        {
          leftComponent ? (
            <View style={styles.leftSection}>
              {leftComponent}
            </View>
          ) : (
            <View style={styles.leftSection}>
              {showBackButton && (
                <TouchableOpacity style={styles.navigation} onPress={onBackPress}>
                  <Ionicons name="arrow-back" size={24} color={Color.white} />
                  <Text style={[styles.title, { color: textColor }]}>
                    {title}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )
        }
        {rightComponent && (
          <View style={styles.rightSection}>
            {rightComponent}
          </View>
        )}
      </View>

      {(description || rightImage) && (
        <View style={styles.headerBottom}>
          <View style={styles.textContainer}>
            <Text style={[styles.description, { color: textColor }]}>
              {description}
            </Text>
          </View>
          {rightImage && (
            <View style={styles.imageContainer}>
              {rightImage}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    paddingHorizontal: Spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? Spacing.base : 0,
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  textContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: Spacing.xl,
    flex: 1,
  },
  description: {
    fontSize: FontSize.sm,
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    width: 124,
    height: 124,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
});