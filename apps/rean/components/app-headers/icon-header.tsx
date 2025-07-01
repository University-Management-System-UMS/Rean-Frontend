import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { FontSize,  Spacing, Text } from '@repo/ums-agent';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface IconHeaderProps {
    title?: string;
    desc?: string;
    onBackPress?: () => void;
    rightIcon?: React.ReactNode;
    onRightPress?: () => void;
  
}

const IconHeader: React.FC<IconHeaderProps> = ({
    title,
    desc,
    onBackPress = () => router.back(),
    rightIcon,
    onRightPress = () => {},
}) => {

    return (
        <LinearGradient
            colors={[Color.primary, Color.gradient.primary]}>
            <SafeAreaView edges={['top']} style={styles.container}>
                <View style={styles.leftHeader}>
                    <TouchableOpacity style={styles.leftBackButton} onPress={onBackPress}>
                        <Ionicons name="arrow-back" size={FontSize['2xl']} color={Color.white} />
                        <Text variant='heading' style={styles.leftTitle}>{title}</Text>
                    </TouchableOpacity>
                    <Text variant='heading' style={styles.leftDesc}>{desc}</Text>
                </View>
                <View style={styles.rightHeader}>
                    {
                        !rightIcon ? (
                            <TouchableOpacity style={styles.rightHeader} onPress={onRightPress}>
                                <Ionicons style={styles.rightIcon} name="chatbox-ellipses"/>
                            </TouchableOpacity>
                        ) : (
                            rightIcon
                        )
                    }
                </View>
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
    leftHeader: {

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
        fontSize: FontSize.base,
    },
    rightHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
        borderRadius: 18,
        width: 36,
        height: 36,
    },
    rightIcon: {
        fontSize: FontSize['2xl'],
        color: Color.primary,
    }
});

export default IconHeader;