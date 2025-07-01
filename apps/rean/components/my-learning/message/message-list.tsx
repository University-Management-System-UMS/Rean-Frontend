import { Message } from "@/api/types/my-learning/chat";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Spacing } from "@repo/ums-agent";
import { RefObject } from "react";

interface MessageListProps {
    messages: Message[];
    flatListRef: RefObject<FlatList | null>;
    renderMessage: ListRenderItem<Message>;
  }

export const MessageList=  ({
    messages,
    flatListRef,
    renderMessage,
}: MessageListProps) => {
    return (
        <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    messagesContainer: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
    },
});