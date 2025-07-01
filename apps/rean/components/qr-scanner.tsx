import { CameraView } from 'expo-camera';
import { StyleSheet, TouchableOpacity, View, Image, ActivityIndicator, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import { useQRScanner } from '@/hooks/useQRScanner';
import RequestPermission from './request-permission';
import { useEffect, useRef } from 'react';
import { Text } from "@repo/ums-agent";

interface QrScannerProps {
  onScan: (data: string) => void;
  onClose?: () => void;
}

export default function QrScanner({ onScan, onClose }: QrScannerProps) {
  const {
    permission,
    requestPermission,
    isTorchOn,
    setIsTorchOn,
    handleBarCodeScanned,
  } = useQRScanner(onScan);

  // Corner zoom animations
  const topLeftZoom = useRef(new Animated.Value(0)).current;
  const topRightZoom = useRef(new Animated.Value(0)).current;
  const bottomLeftZoom = useRef(new Animated.Value(0)).current;
  const bottomRightZoom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createZoomAnimation = (anim: Animated.Value) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    createZoomAnimation(topLeftZoom);
    createZoomAnimation(topRightZoom);
    createZoomAnimation(bottomLeftZoom);
    createZoomAnimation(bottomRightZoom);
  }, [topLeftZoom, topRightZoom, bottomLeftZoom, bottomRightZoom]);

  const getCornerScale = (zoom: Animated.Value) => zoom.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3], // Subtle zoom to 115%
  });

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Color.white} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <RequestPermission
        title="Camera Access Required"
        message="We need camera access to scan QR codes. Please grant permission to continue."
        onRequestPermission={requestPermission}
        buttonTitle="Grant Camera Access"
        image={require('@/assets/images/scan-qr/Attendance.png')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera}
        enableTorch={isTorchOn}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarCodeScanned}
      />
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={28} color="white" />
      </TouchableOpacity>
      
      <View style={styles.overlay}>
        <View style={styles.scanFrame}>
          <Animated.View
            style={[
              styles.corner,
              styles.topLeft,
              { transform: [{ scale: getCornerScale(topLeftZoom) }] },
            ]}
          />
          <Animated.View
            style={[
              styles.corner,
              styles.topRight,
              { transform: [{ scale: getCornerScale(topRightZoom) }] },
            ]}
          />
          <Animated.View
            style={[
              styles.corner,
              styles.bottomLeft,
              { transform: [{ scale: getCornerScale(bottomLeftZoom) }] },
            ]}
          />
          <Animated.View
            style={[
              styles.corner,
              styles.bottomRight,
              { transform: [{ scale: getCornerScale(bottomRightZoom) }] },
            ]}
          />
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.flashButton} 
        onPress={() => setIsTorchOn(prev => !prev)}
      >
        <Ionicons 
          name={isTorchOn ? "flashlight" : "flashlight-outline"} 
          size={24} 
          color="white" 
        />
      </TouchableOpacity>
      
      <View style={styles.infoBox}>
        <Image
          source={require('@/assets/images/scan-qr/Attendance.png')}
          style={styles.infoImage}
        />
        <Text style={styles.infoTitle}>Check attendance</Text>
        <Text style={styles.infoText}>
          Students can quickly scan a QR code using their mobile app to mark their attendance
        </Text>
      </View>
    </View>
  );
}

const cornerRadius = 20;
const cornerBorderWidth = 5;
const cornerSize = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 220,
    height: 220,
    borderColor: 'white',
    backgroundColor: 'transparent',
    position: 'relative',
    bottom: 120,
  },
  corner: {
    position: 'absolute',
    width: cornerSize,
    height: cornerSize,
    borderColor: Color.white,
  },
  topLeft: {
    top: -3,
    left: -3,
    borderTopWidth: cornerBorderWidth,
    borderLeftWidth: cornerBorderWidth,
    borderTopLeftRadius: cornerRadius,
  },
  topRight: {
    top: -3,
    right: -3,
    borderTopWidth: cornerBorderWidth,
    borderRightWidth: cornerBorderWidth,
    borderTopRightRadius: cornerRadius,
  },
  bottomLeft: {
    bottom: -3,
    left: -3,
    borderBottomWidth: cornerBorderWidth,
    borderLeftWidth: cornerBorderWidth,
    borderBottomLeftRadius: cornerRadius,
  },
  bottomRight: {
    bottom: -3,
    right: -3,
    borderBottomWidth: cornerBorderWidth,
    borderRightWidth: cornerBorderWidth,
    borderBottomRightRadius: cornerRadius,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(64, 64, 64, 0.5)',
    borderRadius: 50,
    padding: 5,
  },
  flashButton: {
    position: 'absolute',
    bottom: 300,
    alignSelf: 'center',
    borderRadius: 50,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  infoBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 280,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  infoImage: { 
    width: 124, 
    height: 124, 
    marginBottom: 10 
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});