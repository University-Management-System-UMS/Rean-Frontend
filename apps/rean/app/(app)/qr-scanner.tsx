import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import QrScanner from '@/components/qr-scanner';
import QrScanAlert from '@/components/qr-scan-alert';
import { NavigationUtil } from '@/utils/navigation.util';

export default function QRScannerScreen() {
  const [scanResult, setScanResult] = useState<'success' | 'failed' | null>(null);

  useEffect(() => {
    setScanResult(null);
  }, []);

  const handleClose = () => {
    NavigationUtil.goBack();
  };

  const handleScan = (data: string) => {
    if (data === 'test') {
      setScanResult('failed');
    } else {
      setScanResult('success');
    }
  };

  const handleRetry = () => {
    setScanResult(null);
  };

  return (
    <View style={styles.container}>
      {!scanResult && (
        <QrScanner
          onClose={handleClose}
          onScan={handleScan}
        />
      )}
      <QrScanAlert 
        type={scanResult || 'success'}
        visible={!!scanResult}
        onRetry={handleRetry}
        onDone={handleClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});