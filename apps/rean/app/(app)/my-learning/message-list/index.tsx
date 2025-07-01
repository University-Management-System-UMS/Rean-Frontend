import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MessageList } from '@/api/dummy_data/message-list.data'; 
import { ChatItem } from '@/api/types/chat-item';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '@repo/colors';
import { CustomButton, CustomTextInput, FontSize, FontWeight, LineHeight, Spacing, Text } from '@repo/ums-agent';
import { Ionicons } from '@expo/vector-icons';
import NoMessage from '@/components/no-message';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import ImageHeader from '@/components/app-headers/image-header';
import { BottomSheet } from '@/components/action-sheets/bottom-sheet';
import { getColorFromString, getInitials } from '@/utils/common.util';
const { height: screenHeight } = Dimensions.get('window');

export default function MessageListingScreen() {

  const { t } = useTranslation();

  const [showForm, setShowForm] = useState(false);

  const GroupName = ({groupName}: {groupName:string}) => {
    const initials = getInitials(groupName);
    const backgroundColor = getColorFromString(groupName);

    return (
      <View style={[styles.groupName, { backgroundColor }]}>
        <Text style={styles.textGroupname} variant='heading'>{initials}</Text>
      </View>
    )
  }
  
  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.item} onPress={() => router.navigate('/my-learning/message-list/message')}>
      <GroupName groupName = {item.name}/>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.message, item.unread > 0 && styles.unreadMessage]}>
          {item.message}
        </Text>

      </View>
      <View style={styles.meta}>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
        <View style={styles.badgeWrapper}>
          {item.unread > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          ) : (
            <View>
              <Ionicons name="checkmark-sharp" size={FontSize.md} color={Color.grayScale.grayOne} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const MessageForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.formHeader}>
        <Ionicons
          name="close"
          size={FontSize['3xl']}
          color={Color.grayScale.grayOne}
          onPress={() => setShowForm(false)}
        />
        <Text variant="heading">{t('messageCompose.newMessage')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        <CustomTextInput
          label={t('messageCompose.subject')}
          placeholder={t('messageCompose.subjectPlaceholder')}
        />
        <CustomTextInput
          label={t('messageCompose.message')}
          placeholder={t('messageCompose.messagePlaceholder')}
          textArea={true}
          multiline={true}
        />
      </ScrollView>

      <CustomButton
        title={t('messageCompose.submit')}
        onPress={() => setShowForm(false)}
      />
    </View>
  );

  return (
    <>
      <SafeAreaView edges={['bottom']} style={[styles.container]}>
        <ImageHeader
          title={ t('message.title') }
          desc={ t('message.desc') }
          imageSource={require('@/assets/images/message.png')}
        />
        <View style={styles.contentContainer}>
          
          <FlatList
            data={MessageList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <View style={styles.noMessageContainer}>
              <NoMessage
                title={ t('message.empty.title') }
                body={ t('message.empty.message') }
              />
              </View>}
              contentContainerStyle={MessageList.length === 0 && styles.emptyContent}
          />
          <TouchableOpacity style={styles.fab} onPress={() => {setShowForm(true)}}>
            <Ionicons name="add-sharp" size={FontSize['3xl']} color={Color.white} />
          </TouchableOpacity>
          
          

        </View>
      </SafeAreaView>
      
      <BottomSheet
        visible={showForm}
        onClose={() => setShowForm(false)}
        height={screenHeight*0.52}
        showHandle={false}
      >
        <MessageForm />
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Color.background,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomColor: Color.grayScale.grayThree,
  },
  groupName: {
    width: 52,
    height: 52,
    borderColor: Color.grayScale.grayTwo,
    borderWidth: 2,
    borderRadius: Spacing['2xl'],
    marginRight: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textGroupname: {
    color: Color.white,
  },
  
  badgeWrapper: {
    height: LineHeight.sm,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: FontWeight.semiBold,
    fontSize: FontSize.md,
    marginBottom: Spacing.xs,
  },
  message: {
    color: Color.grayScale.grayOne,
  },
  unreadMessage: {
    fontWeight: FontWeight.semiBold,
    color: Color.black, 
  },
  meta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: FontSize.sm,
    color: Color.grayScale.grayOne,
    marginBottom: Spacing.xs,
  },
  badge: {
    marginTop: Spacing.xs,
    backgroundColor: Color.alert.error,
    borderRadius: Spacing.base,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.none,
  },
  badgeText: {
    color: Color.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl * 1.5, 
    right: Spacing.xl * 1.5,
    backgroundColor: Color.primary, 
    borderRadius: Spacing['2xl'],
    width: LineHeight['4xl'],
    height: LineHeight['4xl'],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: Color.black, // iOS shadow
    shadowOffset: { width: Spacing.none, height: Spacing.xs },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.xs,
  },
  noMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },  

  formContainer: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 24,
  },
  
  formHeader: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
    marginTop: Spacing.sm,
  }, 
  formContent: {
    flexDirection: 'column',
    gap: Spacing.md,
    marginTop: Spacing['2xl'],
  },
});