import { Ionicons } from "@expo/vector-icons"
import { Color } from "@repo/colors"
import { router } from "expo-router"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Text,FontSize, Spacing } from "@repo/ums-agent"
import { getColorFromString, getInitials } from "@/utils/common.util"
import { BaseNavHeader } from "@/components/app-headers/base-nav-header"

interface MessageHeaderProps {
    groupName: string
}


  
export const MessageHeader = ({
    groupName,
}: MessageHeaderProps) => {
    const initials = getInitials(groupName);
    const bgColor = getColorFromString(groupName);

    return (
    <BaseNavHeader
        leftComponent={
        <View style={styles.header}>
            <TouchableOpacity onPress={router.back}>
            <Ionicons name="arrow-back" size={FontSize["2xl"]} color={Color.white} />
            </TouchableOpacity>
            <View style={[styles.groupImgContainer, { backgroundColor: bgColor }]}>
                <Text variant="heading" style={styles.initials}>
                {initials}
                </Text>
            </View>
            <View style={styles.groupNameContainer}>
                <Text variant='heading' style={styles.groupName}>{groupName}</Text>
            </View>
        </View>
        }
    />
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.base,
        paddingBottom: Spacing.base,
    },
    groupImgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Color.grayScale.grayTwo,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    initials: {
        color: Color.white,
        fontSize: FontSize.md,
    },
    groupNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupName: {
        color: Color.white,
        fontSize: FontSize.md,
    },
})