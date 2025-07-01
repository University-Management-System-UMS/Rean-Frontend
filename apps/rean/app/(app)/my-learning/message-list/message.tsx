import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  Animated,
  Image,
} from 'react-native';
import { Color } from '@repo/colors';
import { CustomTextInput, Spacing } from '@repo/ums-agent';
import { Message } from '@/api/types/my-learning/chat';
import { sampleMessages, users } from '@/api/dummy_data/chat.data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@/hooks/useTranslation';
import { MessageBubble } from '@/components/my-learning/message/message-bubble';
import { MessageHeader } from '@/components/my-learning/message/message-header';
import { MessageList } from '@/components/my-learning/message/message-list';


// Utility functions
const generateId = (): string => 
  Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

export default function MessageScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState<string>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [currentUserId] = useState<string>('6822c56f1fde39272b71cca9');
  const flatListRef = useRef<FlatList>(null);

  const { t } = useTranslation();

  useEffect(() => {
    setMessages(sampleMessages);
  
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      // Add animation instead of direct scroll
      Animated.timing(scrollY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      });
    });

    const keyboardDidhideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidhideListener.remove();
    };
  }, []);

  useLayoutEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 400);
  }, [])

  const scrollY = useRef(new Animated.Value(0)).current;

  const sendMessage = (): void => {
    if (!value.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    const newMessage: Message = {
      _id: generateId(),
      chtGpId: "6822c56f1fde39272b71cca6",
      srId: currentUserId,
      mCont: value.trim(),
      conType: "text",
      CrAt: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setValue('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 300);
  };

  const shouldShowDateSeparator = (currentMessage: Message, previousMessage?: Message): boolean => {
      if (!previousMessage) return true;
      return new Date(currentMessage.CrAt).toDateString() !== 
          new Date(previousMessage.CrAt).toDateString();
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
      const isCurrentUser = item.srId === currentUserId;
      const user = users[item.srId];
      const previousMessage = index > 0 ? messages[index - 1] : undefined;
      const showDateSeparator = shouldShowDateSeparator(item, previousMessage);
      return (
      <MessageBubble
          message={item}
          isCurrentUser={isCurrentUser}
          user={user}
          showDateSeparator={showDateSeparator}
      />
  )};

  const SendMessageButton = ({onPress, input}: {onPress:() => void, input: string}) => {
    return (
      <TouchableOpacity 
          onPress={onPress}
          disabled={!input.trim()}
        >
          <Image
            source={require('@/assets/icons/messageSend.png')}
            style={styles.sendButtonIcon}
          />
        </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView 
      edges={['bottom']}
      style={styles.safeAreaView}>
      <MessageHeader groupName='Group Name' />
      <KeyboardAvoidingView 
        style={[styles.container] }
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={isKeyboardVisible} // this helpful when working with android and after the keyboard is hide there are white space below the input
        >
          <MessageList 
            messages={messages}
            flatListRef={flatListRef}
            renderMessage={renderMessage}
          />
          <View style={styles.inputContainer}>
            <CustomTextInput
              inputBorderStyle={styles.textInput}
              value={value}
              onChangeText={setValue}
              placeholder={t('myLearning.chatting.chatInput')}
            />
            <SendMessageButton onPress={sendMessage} input={value}/>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Color.white,
  },
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.base,
    backgroundColor: Color.white,
    borderTopWidth: 1,
    borderTopColor: Color.grayScale.grayThree,
    gap: Spacing.md,
  },
  textInput: {
    minHeight: 34,
    borderWidth: 0,
    backgroundColor: Color.grayScale.grayFour,
    borderRadius: 36,
    paddingHorizontal: Spacing.md,
  },
  sendButtonIcon: {
    width: 24,
    height: 24,
  }
  
});