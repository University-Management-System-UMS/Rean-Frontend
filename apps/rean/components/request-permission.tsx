import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Color } from '@repo/colors';
import { CustomButton, Text } from '@repo/ums-agent';
import { StatusBar } from 'expo-status-bar';

interface RequestPermissionProps {
  title: string;
  message: string;
  onRequestPermission: () => void;
  buttonTitle?: string;
  image?: ImageSourcePropType;
}

export default function RequestPermission({
  title,
  message,
  onRequestPermission,
  buttonTitle = "Grant Permission",
  image,
}: RequestPermissionProps) {
  return (
    <View style={styles.container}>
        <StatusBar style="dark" />
      {image && (
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <CustomButton 
        onPress={onRequestPermission} 
        title={buttonTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.black,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: Color.black,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
  },
});