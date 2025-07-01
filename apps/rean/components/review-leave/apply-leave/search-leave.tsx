import { Ionicons } from '@expo/vector-icons';
import { Color } from '@repo/colors';
import React, { useState } from 'react';
import { Modal, Text, StyleSheet, TouchableOpacity, Pressable, View } from 'react-native';
import { CustomButton, DropDownInput, FontSize, FontWeight, Spacing } from '@repo/ums-agent';
import { useTranslation } from '@/hooks/useTranslation';
import TabNoRenderComponent from '@/components/tabs-no-render';

interface SearchLeaveProps {
  visible: boolean;
  buttonText?: string;
  onClose?: () => void;
  onDonePress?: () => void;
}

const startDateData = [
  { label: "Sick Leave", value: "sick_leave" },
  { label: "Annual Leave", value: "annual_leave" },
  { label: "Unpaid Leave", value: "unpaid_leave" },
  { label: "Maternity Leave", value: "maternity_leave" },
];

const endDateData = [
  { label: "End of This Week", value: "2025-05-25" },
  { label: "End of This Month", value: "2025-05-31" },
  { label: "Two Weeks", value: "2_weeks_from_start" },
  { label: "Custom Date", value: "custom" }
];

const SearchLeaveModal: React.FC<SearchLeaveProps> = ({

  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const tabs = [
    {
      label: t("leaveStatus.tabs.all"),
      value: 'All',
    },
    {
      label: t("leaveStatus.tabs.submitted"),
      value: 'Submitted',
    },    
    {
      label: t("leaveStatus.tabs.pending"),
      value: 'Pending',
    },
    {
      label: t("leaveStatus.tabs.cancelled"),
      value: 'Rejected',
    },
    {
      label: t("leaveStatus.tabs.approved"),
      value: 'Approved'
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  // const currentTab = tabs.find((tab) => tab.label === activeTab);
  return (

    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          {/* close icons with header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Color.grayScale.grayOne} />
            </TouchableOpacity>
            <Text style={styles.title}>{t("leave.search")}</Text>
          </View>

          {/* subheader */}
          <View style={styles.subHeader}>
            <View style={styles.barIcon}>
            </View>
            <Text style={styles.subtitle}>Leave Type</Text>
          </View>
          {/* tab rending */}
          <View style={styles.tabContainer}>
            <TabNoRenderComponent
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(label) => setActiveTab(label)}
            />
          </View>
          {/* subheader */}
          <View style={styles.subHeader}>
            <View style={styles.barIcon}>
            </View>
            <Text style={styles.subtitle}>Date (Optional)</Text>
          </View>
          {/* filter select date */}
          <View style={styles.inputContainer}>
            <DropDownInput
              label={'Start Date'}
              placeholder={'select date'}
              options={startDateData}
              selectedValue={startDate}
              onChange={setStartDate} />

            <DropDownInput
              label={'End Date'}
              placeholder={'select date'}
              options={endDateData}
              selectedValue={endDate}
              onChange={setEndDate} />

          </View>
          <CustomButton
            title={t('leave.confirmButton')} onPress={onClose ?? (() => {})} />
        </View>
      </Pressable>

    </Modal>

  );
};

export default SearchLeaveModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Color.overlay,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Color.white,
    borderRadius: 24,
    padding: Spacing.md,
    width: 350,
    elevation: 5,
    gap: Spacing.sm,
  },

  header: {
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    alignContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: Color.grayScale.grayThree,
    width: '100%'
  },
  subHeader: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    gap: Spacing.sm,
  },
  tabContainer: {
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.base ,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.sm,
  },
  barIcon: {
    width: 4,
    backgroundColor: Color.primary,
    height: 20,
    borderRadius: 4.5,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.md,
  },
});
