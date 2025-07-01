 
import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, Platform } from 'react-native';
import { Color } from '@repo/colors';
import { FontSize, Spacing, Text } from '@repo/ums-agent';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface ImageHeaderProps {
  title?: string;
  desc?: string;
  imageSource?: ImageSourcePropType | undefined;
}

const ImageHeader: React.FC<ImageHeaderProps> = ({
  title,
  desc,
  imageSource,
}: ImageHeaderProps) => {
  return (
    <LinearGradient
      colors={[Color.primary, Color.gradient.primary]}
    >
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.leftHeader}>
                <TouchableOpacity style={styles.leftBackButton} onPress={router.back}>
                    <Ionicons name="arrow-back" size={FontSize['2xl']} color={Color.white} />
                    <Text variant='heading' style={styles.leftTitle}>{title}</Text>
                </TouchableOpacity>
                <Text style={styles.leftDesc}>{desc}</Text>
            </View>
            <View style={styles.rightHeader}>
                <Image style={styles.image} source={imageSource} />
            </View>
        </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Platform.OS === 'android' ? Spacing.base : 0,
    paddingBottom: Spacing.base,
    alignItems: 'flex-start',
  },
  leftHeader: {
    flex: 1, // take all available space
    paddingRight: Spacing.sm,
    gap: Spacing.md,
  },
  leftBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  leftTitle: {
    color: Color.white,
  },
  leftDesc: {
    color: Color.white,
    lineHeight: 18,
  },
  rightHeader: {
    marginTop: Spacing.md,
    width: 112,
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  

});

export default ImageHeader;