import {  Spacing } from "@repo/ums-agent";
import React, {  } from "react";
import { View, StyleSheet } from "react-native";
import { useDateInput } from "@/contexts/date-input.context";
import StickyBottomButton from "@/components/sticky-bottom-button";
import DateInput2 from "@/components/calendar/date-input1";

const viewAttendance = () => {
  const { selectedDate, selectedRange } = useDateInput();
  return (
    <View style={styles.container}>
        <DateInput2
            label="Date"
            mode="single"
            value={selectedDate}
            initialDate={selectedDate}
        />
        <View style={styles.rangeInput}>
            <DateInput2
                label="From"
                mode="range"
                value={selectedRange.start}
                initialRange={selectedRange}
            />
            <DateInput2
              label="To"
              mode="range"
              value={selectedRange.end}
              initialRange={selectedRange}
            />
        </View>
        <StickyBottomButton 
          title={"View Date"} 
          onPress={ () => {
            console.log("View Date");
            console.log("selectedDate", selectedDate);
            console.log("selectedRange", selectedRange);
          } }
          />
    </View>
  );
}

export default viewAttendance;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: Spacing.md,
    },
    rangeInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Spacing.md
    }
  });