import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, CustomTextInput, FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

interface AnimationConfig {
  slideAnim: Animated.Value;
  fadeAnim: Animated.Value;
  duration: number;
}

const MessageCompose = ({ 
  onClose, 
  onSubmit }: Props) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const isFormValid = subject.trim() !== '' && message.trim() !== '';
  const { t } = useTranslation();

  const [animation] = useState<AnimationConfig>({
    slideAnim: new Animated.Value(400),
    fadeAnim: new Animated.Value(0),
    duration: 400,
  });

  const handleClose = () => {
    setSubject('');
    setMessage('');
    onClose();
  };
  
  return (

    <Animated.View style={[styles.sheetContainer, { transform: [{ translateY: animation.slideAnim }] }]}>
   
      <View style={styles.sheetContainer}>
        <View style={styles.modalHeader}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <Ionicons name="close" size={24} color={Color.grayScale.grayOne} />
          </TouchableWithoutFeedback>
          <Text variant='heading' style={styles.modalTitle}>{ t('messageCompose.newMessage') }</Text>
        </View>

        <ScrollView 
          scrollEnabled={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <CustomTextInput
            label={ t('messageCompose.subject') }
            placeholder={ t('messageCompose.subjectPlaceholder') }
            value={subject}
            onChangeText={setSubject}
            containerStyle={styles.input}
          />
          <CustomTextInput
            label={ t('messageCompose.message') }
            placeholder={ t('messageCompose.messagePlaceholder') }
            value={message}
            onChangeText={setMessage}
            textArea={true}
            multiline={true}
          />
        </ScrollView>

        <CustomButton
          title={ t('messageCompose.submit') }
          onPress={onSubmit}
          textStyle={styles.submitButton}
          disabled={!isFormValid}
        />
        </View>
      
    </Animated.View>

  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    display: 'none',
    position: 'absolute',
    backgroundColor: Color.white,
    width: '100%',
    
  },  
  scrollContent: {
    paddingBottom: Spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Color.grayScale.grayTwo,
  },
  modalTitle: {
    marginLeft: Spacing.base,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  input: {
    marginBottom: Spacing.md,
  },
  submitButton: {
    color: Color.white,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
  },
});

export default MessageCompose;