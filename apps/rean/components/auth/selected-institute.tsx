import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "@repo/ums-agent";
import { Color } from "@repo/colors";

interface SelectedInstituteProps {
  onPress: () => void;
  institute: string | null;
}

export const SelectedInstitute: React.FC<SelectedInstituteProps> = ({ onPress, institute }) => (
  <View style={styles.selectedInstitute}>
    <Text style={styles.selectedInstituteText} onPress={onPress}>
        Not from {institute}?,
        <Text style={styles.changeHere}> change here</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  selectedInstitute: {
    marginTop: 10,
  },
  selectedInstituteText: {
    color: Color.grayScale.grayOne,
    fontStyle: 'italic',
  },
  changeHere: {
    color: Color.primary,
    fontWeight: 'bold',
  }
});