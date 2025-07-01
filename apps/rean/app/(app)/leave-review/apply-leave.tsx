
import React, { useState } from "react";
import { View, StyleSheet, Dimensions, RefreshControl } from "react-native";
import { ALL_TYPES, pickDocument } from "@/utils/document.util";
import StickyBottomButton from "@/components/sticky-bottom-button";
import FilePicker from "@/components/file/file-picker";
import SelectedFileList from "@/components/file/selected-file-list";
import { Color } from "@repo/colors";
import {
  CheckboxInput,
  CustomTextInput,
  DropDownInput,
  InputContainer,
  MultiSelectDropDown,
  RadioInput,
  Spacing,
} from "@repo/ums-agent";
import { useCustomAlert } from "@/contexts/custom-alert.context";
import { router } from "expo-router";
import { useTranslation } from "@/hooks/useTranslation";
import { ScrollView } from "react-native-gesture-handler";
import DateInput3 from "@/components/calendar/date-input3";
import { useBottomSheet } from "@/contexts/bottom-sheet.context";
import { DateRangePicker } from "@/components/calendar/date-picker";
import BasicHeader from "@/components/app-headers/basic-header";
import { useCreateLeave } from "@/hooks/useCreateLeave";
import { getUserLoginDetails } from "@/utils/storage.util";
import LoadingOverlay from "@/components/loading-indicator/loading-overlay";
import { Student, LoginDetails } from "@/api/types/auth/login";
import { useEnterprises } from '@/hooks/useEnterprises';
import { getDomainOptions } from '@/utils/enterprise.util';
import { ENTERPRISE_DOMAIN_CODES } from '@/constants/enterprise.constant';
import { extractErrorMessage } from "@/utils/error.util";
import { SelectedFile } from "@/components/file/file-item";
import { usePeriod } from "@/hooks/usePeriod";

const { height: screenHeight } = Dimensions.get('window');

export type ActiveInput = "start" | "end" | "partial" | null;

export default function ApplyLeave() {
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [leaveType, setLeaveType] = useState<string>("");
  const [leaveOption, setLeaveOption] = useState<string[]>([]);
  const [sessionOption, setSessionOption] = useState<string>("");
  const [reasonLeave, setReasonLeave] = useState<string>("");
  const [partialDate, setPartialDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [selectPeriod, setSelectPeriod] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { isLoading, createLeaveAsync } = useCreateLeave();
  const { data: enterprises, refetch } = useEnterprises();
  
  const isPeriodWiseSelected = leaveOption.includes('period_wise');
  const { data } = usePeriod(isPeriodWiseSelected);
  
  const { t } = useTranslation();
  const { alert } = useCustomAlert();

  const leaveTypeOptions = getDomainOptions(
    enterprises?.domain,
    ENTERPRISE_DOMAIN_CODES.STUDENT_LEAVE_TYPE
  );

  const leaveOptionList = [
    { label: t('leave.applyLeave.halfDay'), value: "half_day" },
    { label: t('leave.applyLeave.periodWise'), value: "period_wise" },
  ];

  const sessionOptionList = [
    { label: "AM", value: "AM" },
    { label: "PM", value: "PM" },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };
  
  const periodOptionList = data?.map((period) => ({
    label: period.PerNm,
    value: period._id,
  })) || [];

  const validateRequireInput = () => {
    if (!leaveType) return false;

    if (!dateRange.start || !dateRange.end) return false;

    if (leaveOption[0] === "half_day") {
      if (!partialDate || !sessionOption) return false;
      if (partialDate < dateRange.start || partialDate > dateRange.end)
        return false;
    }
    if (leaveOption[0] === "period_wise" && !selectPeriod) return false;
    if (!reasonLeave) return false;

    return true;
  };

  const showSubmitFailed = (messages?: string) => {
    alert(
      t("leave.applyLeave.leaveFailed"),
      messages || t("leave.applyLeave.leaveFailedMessage"),
      [
        {
          text: t("tryAgain"),
          style: "destructive",
        },
      ],
      {
        imageSource: require("@/assets/images/apply-leave/submit-failed.png"),
      }
    );
  };

  const showSubmitted = () => {
    alert(
      t("leave.applyLeave.leaveSubmit"),
      t("leave.applyLeave.leaveSubmitMessage"),
      [
        {
          text: t("ok"),
          onPress: () => router.back(),
        },
      ],
      {
        imageSource: require("@/assets/images/apply-leave/submit.png"),
      }
    );
  };

  // Helper function to get input error messages show on input UI
  const getInputError = (condition: boolean, errorMessage: string) => {
    return hasAttemptedSubmit && condition ? errorMessage : "";
  };

  const getPartialDateError = () => {
    if (!hasAttemptedSubmit) return "";

    if (!partialDate) {
      return t("leave.applyLeave.error.partialDateRequired");
    }

    if (dateRange.start && dateRange.end && partialDate) {
      if (partialDate < dateRange.start || partialDate > dateRange.end) {
        return t("leave.applyLeave.error.partialDateOutOfRange");
      }
    }
    return "";
  };

  const handleDocumentPick = async () => {
    const selectedFiles = await pickDocument(ALL_TYPES);
    if (selectedFiles) {
      const formattedFiles: SelectedFile[] = selectedFiles.map((file) => ({
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/octet-stream",
        size: file.size || 0,
      }));

      const uniqueFiles = formattedFiles.filter(
        (newFile) =>
          !files.some((existingFile) => existingFile.name === newFile.name)
      );

      setFiles((prev) => [...prev, ...uniqueFiles]);
    }
  };

  const handleFileRemoved = (uri: string) => {
    setFiles((prev) => prev.filter((file) => file.uri !== uri));
  };

  // clear some form inputs when leave option changes
  const handleSelectLeaveOption = (value: string[]) => {
    setLeaveOption(value);
    if (value.length === 0) {
      setSelectPeriod([]);
      setSessionOption("");
      setPartialDate(null);
      return;
    } else if (value.length === 1 && value[0] === "period_wise") {
      setSessionOption("");
      setPartialDate(null);
    } else if (value.length === 1 && value[0] === "half_day") {
      setSelectPeriod([]);
    }
  };

  const handleOpenCalendar = (mode: "single" | "range") => {
    showBottomSheet({
      content:
        mode === "range" ? (
          <DateRangePicker
            mode="range"
            statusBarStyle="dark"
            initialRange={dateRange}
            onDateRangeChange={(range) => {setDateRange(range);}}
            onPressBack={hideBottomSheet}
            onHandleSelect={hideBottomSheet}
          />
        ) : (
          <DateRangePicker
            mode="single"
            statusBarStyle="dark"
            initialDate={partialDate}
            onSingleDateChange={(date) => {setPartialDate(date);}}
            onPressBack={hideBottomSheet}
            onHandleSelect={hideBottomSheet}
          />
        ),
      height: screenHeight,
      showHandle: false,
      borderRadius: 0,
      closeOnSwipeDown: false,
    });
  };

  const getActiveStudent = async () => {
    const userDetails = await getUserLoginDetails();
    if (!userDetails?.Student?.length) {
      return null;
    }
    return {
      student: userDetails.Student[0],
      loginDetails: userDetails,
    };
  };

  const createLeavePayload = (data: {
    student: Student;
    loginDetails: LoginDetails;
  }) => ({
    PerTy: "Student",
    PerId: data.student.StuID,
    PerNm: `${data.student.FNa} ${data.student.LNa}`.trim(),
    InId: data.loginDetails.InId,
    loggedInId: data.loginDetails._id,
    HstleReq: true,
    LvTy: leaveType,
    Rson: reasonLeave,
    PtAb: partialDate?.toISOString() as string,
    Sson: sessionOption,
    FrDt: dateRange.start?.toISOString() as string,
    ToDt: dateRange.end?.toISOString() as string,
    periods: selectPeriod,
    GateOutPass: false,
    timezoneOffSet: 420,
  });

  // Handles the leave application submission
  const handleApplyLeave = async () => {

    setHasAttemptedSubmit(true);

    if (!validateRequireInput()) {
      return;
    }

    const activeData = await getActiveStudent();
    if (!activeData) {
      throw new Error("No active student found");
    }

    try {
      const leavePayload =  createLeavePayload(activeData);
      const res = await createLeaveAsync(leavePayload);
      if (res.output.data) showSubmitted();
    } catch (error: unknown) {
      showSubmitFailed(extractErrorMessage(error));
    }
  };

  return (
    <View style={styles.container}>
      <BasicHeader title={t('leaveReviewScreen.leaveReview')}/>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing= {refreshing}
            onRefresh={onRefresh}
          />
        } 
      >
        <View style={styles.inputContainer}>
          <DropDownInput
            label={t("leave.applyLeave.leaveType")}
            options={leaveTypeOptions}
            selectedValue={leaveType}
            placeholder={t("leave.applyLeave.typePlaceholder")}
            onChange={(value) => setLeaveType(value)}
            error={getInputError(
              leaveType === "",
              t("leave.applyLeave.error.leaveTypeRequired")
            )}
            required
          />

          <View style={styles.calendarInputContainer}>
            <DateInput3
              label={t("leave.applyLeave.startDate")}
              initialDate={dateRange.start}
              value={dateRange.start}
              placeholder={t("leave.applyLeave.startDate")}
              error={getInputError(
                !dateRange.start,
                t("leave.applyLeave.error.startDateRequired")
              )}
              onPress={() => handleOpenCalendar("range")}
              required
            />
            <DateInput3
              label={t("leave.applyLeave.endDate")}
              initialDate={dateRange.end}
              value={dateRange.end}
              placeholder={t("leave.applyLeave.endDate")}
              error={getInputError(
                !dateRange.end,
                t("leave.applyLeave.error.endDateRequired")
              )}
              onPress={() => handleOpenCalendar("range")}
              required
            />
          </View>

          <InputContainer
            label={t("leave.applyLeave.leaveOption")}
            containerStyle={styles.leaveOptionInput}
          >
            <CheckboxInput
              multiSelect={false}
              options={leaveOptionList}
              selectedValues={leaveOption}
              onChange={handleSelectLeaveOption}
            />
          </InputContainer>

          {leaveOption[0] === "half_day" && (
            <View style={styles.halfDayContainer}>
              <View style={styles.halfDayItemInput}>
                <DateInput3
                  label={t("leave.applyLeave.partialDate")}
                  initialDate={partialDate}
                  value={partialDate}
                  placeholder={t("leave.applyLeave.selectDate")}
                  error={getPartialDateError()}
                  onPress={() => handleOpenCalendar("single")}
                  required
                />
              </View>
              <InputContainer
                label={t("leave.applyLeave.session")}
                error={getInputError(
                  !sessionOption,
                  t("leave.applyLeave.error.sessionRequired")
                )}
                required
              >
                <RadioInput
                  options={sessionOptionList}
                  selectedValue={sessionOption}
                  onChange={(value) => setSessionOption(value)}
                  gap={Spacing.md}
                />
              </InputContainer>
            </View>
          )}

          {leaveOption[0] === "period_wise" && (

            <MultiSelectDropDown
              options={periodOptionList}
              selectedValues={selectPeriod}
              onChange={(value) => setSelectPeriod(value)}
              placeholder={t("leave.applyLeave.selectPeriod")}  
              label={t("leave.applyLeave.selectPeriod")}
              error={getInputError(
                selectPeriod.length === 0,
                t("leave.applyLeave.error.selectPeriodRequired")
              )}
              required
            />
          )}

          <CustomTextInput
            label={t("leave.applyLeave.leaveReasonLabel")}
            placeholder={t("leave.applyLeave.leaveReasonPlaceholder")}
            textArea
            value={reasonLeave}
            onChangeText={(text) => setReasonLeave(text)}
            required
            error = {getInputError(
              reasonLeave === "",
              t("leave.applyLeave.error.leaveReasonRequired")
            )}
          />

          <FilePicker onPress={handleDocumentPick} />
          <SelectedFileList files={files} onFileRemoved={handleFileRemoved} />
        </View>
      </ScrollView>
      {isLoading ? (
        <LoadingOverlay visible={true} />
      ) : (
        <StickyBottomButton onPress={handleApplyLeave} title={t("continue")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  inputContainer: {
    flexDirection: "column",
    gap: Spacing.md,
    padding: Spacing.md,
    paddingTop: Spacing.xl,
  },
  leaveOptionInput: {
    backgroundColor: Color.white,
    justifyContent: "center",
    alignContent: "center",
  },
  calendarInputContainer: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  halfDayContainer: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  halfDayItemInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
