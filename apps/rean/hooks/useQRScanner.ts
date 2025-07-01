import { useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import type { BarcodeScanningResult } from 'expo-camera';

export function useQRScanner(onScan: (data: string) => void) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isTorchOn, setIsTorchOn] = useState(false);
  const scannedRef = useRef(false);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scannedRef.current || !data) return;
    scannedRef.current = true;
    onScan(data);
  };

  return {
    permission,
    requestPermission,
    isTorchOn,
    setIsTorchOn,
    handleBarCodeScanned,
  };
}