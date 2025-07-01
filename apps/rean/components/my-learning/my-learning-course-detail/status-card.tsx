import { Color } from '@repo/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontSize, Spacing, Text } from '@repo/ums-agent';


interface StatusCardProps {
  status?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ status }) => {

    const getStatusText = (status: string) => {
        switch (status) {
          case 'Submitted':
            return 'Submitted';
          case 'Todo':
            return 'Todo';
          case 'Missed':
            return 'Missed';
          case 'Overdue':
            return 'Overdue';
          default:
            return '';
        }
      };
      
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'Submitted':
            return Color.alert.success;
          case 'Todo':
            return Color.alert.info;
          case 'Missed':
            return Color.alert.error;
          case 'Overdue':
            return Color.alert.error;
          default:
            return Color.alert.info;
        }
      };

  return (
      <View style={[styles.tag, {  backgroundColor: getStatusColor(status!) }]}>
        <Text style={styles.tagText}>{getStatusText(status!)}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  //status bar/tag
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 2,
  },
  tagText: {
    fontSize: FontSize.sm,
    color: Color.white,
  },
});

export default StatusCard;

