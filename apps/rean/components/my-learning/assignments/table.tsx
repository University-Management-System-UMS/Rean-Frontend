import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSize, FontWeight, Spacing } from '@repo/ums-agent';
import { Color } from '@repo/colors';
import { CriteriaItem } from '@/api/types/criterial-item';
import { useTranslation } from '@/hooks/useTranslation';

interface TableProps {
  data: CriteriaItem[];
  title?: string;
}

export const PointsTable: React.FC<TableProps> = ({ data, title = 'Point Criteria' }) => {
  const totalPoints = data.reduce((sum, item) => sum + item.pointsValue, 0);

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Table Title */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.nameCell]}>{t("assignment.pointTable.textName")}</Text>
        <Text style={styles.headerCell}>{t("assignment.pointTable.textRate")}</Text>
        <Text style={[styles.headerCell, styles.pointsHeaderCell]}>{t("assignment.pointTable.textPoint")}</Text>
      </View>
      
      {/* Table Rows */}
      {data.map((item, index) => (
        <View 
          key={`${item.name}-${index}`}
          style={[
            styles.dataRow,
            index === data.length - 1 && styles.lastRow,
            index % 2 === 0 ? styles.evenRow : styles.oddRow
          ]}
        >
          <Text style={[styles.cell, styles.nameCell]}>{item.name}</Text>
          <Text style={[styles.cell, styles.ratingCell]}>{item.ratings}</Text>
          <Text style={[styles.cell, styles.pointsCell]}>{item.points}</Text>
        </View>
      ))}
    
      {/* Total Points */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>{t("assignment.pointTable.textTotalPoint")}: {totalPoints}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    overflow: 'hidden',
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: Color.primary,
    paddingLeft: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    borderTopLeftRadius: Spacing.md,
    borderTopRightRadius: Spacing.md,
    backgroundColor: Color.grayScale.grayOne,
    paddingVertical: Spacing.base,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Color.grayScale.grayTwo,
  },
  lastRow: {
    borderBottomWidth: 1,
  },
  evenRow: {
    backgroundColor: Color.white,
  },
  oddRow: {
    backgroundColor: Color.white,
  },
  headerCell: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: Color.white,
  },
  cell: {
    flex: 1,
    paddingHorizontal: Spacing.base,
    fontSize: FontSize.sm,
    color: Color.grayScale.grayOne,
  },
  nameCell: {
    flex: 1,
    paddingTop: Spacing.xs,
  },
  ratingCell: {
    borderLeftWidth: 1,
    borderLeftColor: Color.grayScale.grayTwo,
    paddingTop: Spacing.xs,
  },
  pointsHeaderCell: {
    textAlign: 'center',
    paddingRight: Spacing.md,
  },
  pointsCell: {
    fontWeight: FontWeight.bold,
    color: Color.black,
    textAlign: 'center',
    paddingRight: Spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: Color.grayScale.grayTwo,
    paddingTop: Spacing.xs,
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Color.white,
    alignItems: 'flex-end',
    borderBottomLeftRadius: Spacing.md,
    borderBottomRightRadius: Spacing.md,
  },
  totalText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    color: Color.grayScale.grayOne,
  },
});