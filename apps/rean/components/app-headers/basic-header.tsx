import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { FontSize,  Spacing, Text } from '@repo/ums-agent';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface BasicHeaderProps {
    title?: string;
    onBackPress?: () => void;
  
}

const BasicHeader: React.FC<BasicHeaderProps> = ({
    title,
    onBackPress = () => router.back(),
}) => {

  return (
    <LinearGradient colors={[Color.primary, Color.gradient.primary]}>
        <SafeAreaView edges={['top']} style={styles.container}>
            <TouchableOpacity style={styles.leftBackButton} onPress={onBackPress}>
                <Ionicons name="arrow-back" size={FontSize['2xl']} color={Color.white} />
                <Text variant='heading' style={styles.leftTitle}>{title}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingTop: Platform.OS === 'android' ? Spacing.base : 0,
        paddingBottom: Spacing.base,
    },
    leftBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    leftTitle: {
        color: Color.white,
    },
});

export default BasicHeader;