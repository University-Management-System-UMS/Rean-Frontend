import React from "react";
import { View, StyleSheet, Modal, Image, StatusBar } from "react-native";
import { CustomButton, Text } from "@repo/ums-agent";
import { Color } from "@repo/colors";

interface QrScanAlertProps {
  type: 'success' | 'failed';
  visible: boolean;
  onRetry?: () => void;
  onDone?: () => void;
}

export default function QrScanAlert({ type, visible, onRetry, onDone }: QrScanAlertProps) {
  const handleAction = () => {
    if (type === 'failed') {
      onRetry?.();
    } else {
      onDone?.();
    }
  };

  const content = {
    success: {
      image: require("@/assets/images/scan-qr/Success-check.png"),
      title: "Scan Successful",
      message: "Your attendance has been recorded successfully.",
      buttonText: "Done"
    },
    failed: {
      image: require("@/assets/images/scan-qr/Failed-check.png"),
      title: "Scan Failed",
      message: "Unable to record attendance. Please try scanning again or contact support.",
      buttonText: "Try Again"
    }
  };

  const currentContent = content[type];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.position}>
            <Image
              source={currentContent.image}
              style={styles.image}
            />
            <Text style={styles.title}>{currentContent.title}</Text>
            <Text style={styles.message}>{currentContent.message}</Text>
          </View>
          <CustomButton
            title={currentContent.buttonText}
            onPress={handleAction}
            containerStyle={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    marginTop: StatusBar.currentHeight || 0,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  position: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: Color.grayScale.grayOne,
  },
  button: {
    backgroundColor: Color.primary,
    width: "100%",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});