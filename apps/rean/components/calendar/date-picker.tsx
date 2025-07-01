import { useTranslation } from "@/hooks/useTranslation"
import { Ionicons } from "@expo/vector-icons"
import { Color } from "@repo/colors"
import { FontSize, Calendar, CustomButton, Text, Spacing } from "@repo/ums-agent"
import { StatusBar } from "expo-status-bar"
import { Platform, View, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface DatePickerProps {
    mode?: 'single' | 'range';
    onDateRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
    onSingleDateChange?: (date: Date | null) => void;
    initialRange?: { start: Date | null; end: Date | null };
    initialDate?: Date | null;
    onPressBack?: () => void
    onHandleSelect: () => void
    statusBarStyle?: 'light' | 'dark'
}

export const DateRangePicker = ({
    onDateRangeChange,
    onSingleDateChange,
    initialRange,
    initialDate,
    mode = 'range',
    onPressBack,
    onHandleSelect,
    statusBarStyle='dark'
}: DatePickerProps) => {
    const { t } = useTranslation();
    
    return (
        <SafeAreaView edges={Platform.OS === 'ios' ? [] : ['top', 'bottom']}  style={styles.calendarContainer}>
            <StatusBar style={statusBarStyle} />
            <View style={styles.header}>
                <TouchableOpacity onPress={onPressBack}>
                    <Ionicons name="close" size={FontSize['2xl']} color={Color.grayScale.grayOne} />
                </TouchableOpacity>
                <Text variant='heading'>{ t('calendar') }</Text>
            </View>
            <View style={styles.divider}/>
            <Calendar
                mode={mode}
                onDateRangeChange={onDateRangeChange}
                initialRange={initialRange}
                onSingleDateChange={onSingleDateChange}
                initialDate={initialDate}
            />
            <View style={styles.footerContainer}>
                <CustomButton title={ t('confirm') } onPress={onHandleSelect}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        backgroundColor: Color.white,
    },
    header: {
        flexDirection: 'row',
        gap: Spacing.sm,
        alignItems: "center",
        paddingHorizontal: Spacing.md,
        paddingTop: Platform.OS === 'ios' ? 0 : Spacing.base,
        paddingBottom: Spacing.ms
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: Color.grayScale.grayThree,
        marginBottom: Spacing.md
    },
    footerContainer: {
        backgroundColor: Color.white,
        borderTopWidth: 1,
        borderTopColor: Color.grayScale.grayThree,
        padding: Spacing.md,
    }
})