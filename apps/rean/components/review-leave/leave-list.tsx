import React from "react";
import { FlatList, Platform, View } from "react-native";
import LeaveCard from "./leave-card";
import NoMessage from "../no-message";
import { StyleSheet } from "react-native";
import { LeaveData } from "@/api/types/leave";
import { useTranslation } from "@/hooks/useTranslation";
import { Spacing } from "@repo/ums-agent";
import { RefreshControl } from "react-native-gesture-handler";

interface LeaveListProps {
  data: LeaveData[];
  onPressItem: (leave: LeaveData) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function LeaveList({
  data,
  onPressItem,
  onRefresh = () => {},
  refreshing = false,
}: LeaveListProps) {
  const { t } = useTranslation();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      contentContainerStyle={styles.listContentContainer}
      data={data}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <LeaveCard
          leave={item}
          onPress={() => onPressItem(item)}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <NoMessage
            title={t("leave.empty.title")}
            body={t("leave.empty.message")}
          />
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: Spacing.md
  },
  listContentContainer: {
    flexGrow: 1,
    paddingTop: Spacing.md,
    paddingBottom: Platform.OS === 'android' ? Spacing["2xl"] : Spacing.md,
    gap: Spacing.md + Spacing.base,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});