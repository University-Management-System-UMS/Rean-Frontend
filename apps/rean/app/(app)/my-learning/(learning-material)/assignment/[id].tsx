// File: /my-learning/(learning-material)/assignment/[id].tsx

import React from "react";
import { useLocalSearchParams } from "expo-router";
import TodoAssignmentScreen from "@/components/my-learning/assignments/status-card/todo";
import SubmittedAssignmentScreen from "@/components/my-learning/assignments/status-card/submitted";
import MissedAssignmentScreen from "@/components/my-learning/assignments/status-card/missed";
import OverdueAssignmentScreen from "@/components/my-learning/assignments/status-card/overdue";
import { SubmissionProvider } from "@/contexts/submission-context";

import { assignmentDataList } from "@/api/dummy_data/assignment.data";

const AssignmentScreen = () => {
  const { id } = useLocalSearchParams<{ status: string; id: string }>();

  const assignment = assignmentDataList.find((item) => item._id === id );

  if (!assignment) return null;

  return (
    <SubmissionProvider>
      {(() => {
        switch (assignment.tagname) {
          case "Todo":
            return <TodoAssignmentScreen assignment={assignment} />;
          case "Submitted":
            return <SubmittedAssignmentScreen assignment={assignment} />;
          case "Missed":
            return <MissedAssignmentScreen assignment={assignment} />;
          case "Overdue":
            return <OverdueAssignmentScreen assignment={assignment} />;
          default:
            return null;
        }
      })()}
    </SubmissionProvider>
  );
};

export default AssignmentScreen;
