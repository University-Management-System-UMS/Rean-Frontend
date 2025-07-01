/* eslint-disable @typescript-eslint/no-explicit-any */
import { Color } from '@repo/colors';
import { FontSize, FontWeight, Spacing, Text } from '@repo/ums-agent';
import React, { useState, createContext, useContext, ReactNode } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Animated, Image } from 'react-native';

// Define types for our alert buttons and context
type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

type AlertOptions = {
  imageSource?: any; // For Image source (require() or uri)
  imageStyle?: object; // Optional custom styling for the image
};

type AlertContextType = {
  alert: (title: string, message: string, buttons?: AlertButton[], options?: AlertOptions) => void;
};

// Create Context for the Alert
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Define interfaces for better segregation
interface IAlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface IAlertOptions {
  imageSource?: any;
  imageStyle?: object;
}

// Create a separate AlertComponent for better SRP
const AlertComponent: React.FC<{
  visible: boolean;
  title: string;
  message: string;
  buttons: IAlertButton[];
  imageSource?: any;
  imageStyle?: object;
  onClose: () => void;
  fadeAnim: Animated.Value;
}> = ({ visible, title, message, buttons, imageSource, imageStyle, onClose, fadeAnim }) => {
  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <Animated.View style={[
          styles.modalView,
          {
            opacity: fadeAnim,
            transform: [{
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              }),
            }],
          },
        ]}>
          {imageSource && (
            <View style={styles.imageContainer}>
              <Image source={imageSource} style={[styles.image, imageStyle]} resizeMode="contain" />
            </View>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}
          <View style={[
            buttons.length > 2 ? styles.buttonsVertical : styles.buttonsHorizontal,
            buttons.length === 1 && styles.singleButtonContainer
          ]}>
            {buttons.map(({ text, style, onPress }, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  buttons.length === 1 && styles.singleButton,
                  style === 'destructive' && styles.destructiveButton,
                  style === 'cancel' && styles.cancelButton,
                  buttons.length > 2 && styles.fullWidthButton,
                ]}
                onPress={() => {
                  onPress?.();
                  onClose();
                }}
              >
                <Text style={[
                  styles.buttonText,
                  style === 'destructive' && styles.destructiveButtonText,
                  style === 'cancel' && styles.cancelButtonText,
                ]}>
                  {text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Simplified AlertProvider with better SRP
export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [buttons, setButtons] = useState<IAlertButton[]>([]);
  const [imageSource, setImageSource] = useState<any>(null);
  const [imageStyle, setImageStyle] = useState<object>({});
  const fadeAnim = useState(new Animated.Value(0))[0];

  const showAlert = () => {
    setVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideAlert = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const alert = (
    alertTitle: string,
    alertMessage: string,
    alertButtons: IAlertButton[] = [{ text: 'OK' }],
    { imageSource = null, imageStyle = {} }: IAlertOptions = {}
  ) => {
    setTitle(alertTitle);
    setMessage(alertMessage);
    setButtons(alertButtons);
    setImageSource(imageSource);
    setImageStyle(imageStyle);
    showAlert();
  };

  return (
    <AlertContext.Provider value={{ alert }}>
      {children}
      <AlertComponent
        visible={visible}
        title={title}
        message={message}
        buttons={buttons}
        imageSource={imageSource}
        imageStyle={imageStyle}
        onClose={hideAlert}
        fadeAnim={fadeAnim}
      />
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert
export const useCustomAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useCustomAlert must be used within an AlertProvider');
  }
  return context;
};

// Static Alert utility class (similar to Alert.alert)
export class CustomAlert {
  static alert(
    title: string, 
    message: string, 
    buttons?: AlertButton[],
    options?: AlertOptions
  ): void {
    // This will throw an error if used outside of AlertProvider's context
    // which is expected behavior similar to other React Native components
    const { alert } = useCustomAlert();
    alert(title, message, buttons, options);
  }
}

// Styles for the alert
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.overlay80,
  },
  modalView: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: Color.white,
    borderRadius: Spacing.xl,
    padding: Spacing['2xl'],
    alignItems: 'center',
    shadowColor: Color.grayScale.grayTwo,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  image: {
    width: 124,
    height: 124,
    borderRadius: 8,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: FontSize.base,
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
    textAlign: 'center',
  },
  buttonsHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    width: '100%',
  },
  buttonsVertical: {
    flexDirection: 'column',
    width: '100%',
    gap: Spacing.xs
  },
  button: {
    flex: 1,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    borderRadius: 8,
    marginHorizontal: Spacing.xs,
    backgroundColor: Color.primary,
    alignItems: 'center',
  },
  singleButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  singleButton: {
    maxWidth: '80%',
  },
  fullWidthButton: {
    flex: 0, // Reset flex for full width buttons
    width: '100%',
    marginVertical: Spacing.xs,
    marginHorizontal: 0,
  },
  
  destructiveButton: {
    backgroundColor: Color.alert.error,
    color: Color.white,
  },
  cancelButton: {
    backgroundColor: Color.grayScale.grayFour,
    color: Color.grayScale.black,
  },
  buttonText: {
    fontSize: FontSize.base,
    color: Color.white,
    textAlign: 'center',
  },
  destructiveButtonText: {
    color: Color.white,
  },
  cancelButtonText: {
    fontWeight: FontWeight.bold,
    color: Color.grayScale.black,
  },
});