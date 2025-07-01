import { User } from "@/api/dummy_data/chat.data";
import { Message } from "@/api/types/my-learning/chat";
import { Color } from "@repo/colors";
import { View, StyleSheet, Image } from "react-native";
import { FontSize, FontWeight, Shadows, Spacing, Text } from "@repo/ums-agent";
import { LinearGradient } from "expo-linear-gradient";
import { DateUtils } from "@/utils/date.util";

const cleanHtmlContent = (htmlContent: string): string => 
    htmlContent
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
  
export const MessageBubble: React.FC<{
  message: Message;
  isCurrentUser: boolean;
  user: User;
  showDateSeparator: boolean;
}> = ({ 
  message, 
  isCurrentUser, 
  user, 
  showDateSeparator }) => {
  const messageContent = cleanHtmlContent(message.mCont);
  
  return (
    <View>
      {showDateSeparator && (
        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>{DateUtils.formatString.toContextualDate(message.CrAt)}</Text>
        </View>
      )}
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        {!isCurrentUser && (
          <View style={styles.messageHeader}>
            {user.oUser?.PhotoImgID && (
              <Image
                source={{ uri: user.oUser?.PhotoImgID }}
                style={styles.userAvatar}
              />
            )}
          </View>
        )}
        {isCurrentUser ? (
          <LinearGradient
            colors={[Color.primary, Color.gradient.primary]}
            style={[styles.messageBubble, styles.currentUserBubble]}>
              <Text style={styles.currentUserText}>
              {messageContent}
              </Text>
              <Text style={[styles.timeText, styles.currentUserTime]}>
              {DateUtils.formatString.toTime(message.CrAt)}
              </Text>
          </LinearGradient>
          ) : (
          <View style={[styles.messageBubble, styles.otherUserBubble]}>
              <Text style={styles.otherUserText}>{messageContent}</Text>
              <Text style={[styles.timeText, styles.otherUserTime]}>{DateUtils.formatString.toTime(message.CrAt)}</Text>
          </View>
        )}

      </View>
    </View>
  );
};
  
const styles = StyleSheet.create({
    dateSeparator: {
        alignItems: 'center',
        marginVertical: Spacing.base,
      },
      dateText: {
        color: Color.grayScale.black,
        fontWeight: FontWeight.bold,
      },
      messageContainer: {
        marginVertical: Spacing.xs,
      },
      currentUserMessage: {
        alignItems: 'flex-end',
      },
      otherUserMessage: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      messageHeader: {
        width: 32,
        height: 32,
        backgroundColor: Color.grayScale.grayThree,
        borderRadius: 16,
        marginRight: Spacing.base,
      },
      userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
      },
    
      messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: 20,
        ...Shadows.small,
      },
      currentUserBubble: {
        backgroundColor: Color.primary,
      },
      otherUserBubble: {
        backgroundColor: Color.white,
      },
      currentUserText: {
        color: Color.white,
      },
      otherUserText: {
        fontSize: FontSize.base,
        color: Color.grayScale.black,
      },
      timeText: {
        fontSize: FontSize.xs,
        marginTop: Spacing.xs,
        fontWeight: FontWeight.regular,
      },
      currentUserTime: {
        color: Color.grayScale.grayFour,
        textAlign: 'right',
      },
      otherUserTime: {
        color: Color.grayScale.grayOne,
        textAlign: 'left',
      },
})