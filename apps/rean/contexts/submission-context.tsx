import React, { createContext, useContext, useState } from "react";
import { SelectedFile } from "@/components/file/file-item";

export type SubmissionData = {
  htmlContent: string;
  url: string;
  files: SelectedFile[];
};

type SubmissionContextType = {
  submissionData: SubmissionData | null;
  setSubmissionData: (data: SubmissionData | null) => void;
};

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);
  return (
    <SubmissionContext.Provider value={{ submissionData, setSubmissionData }}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmission = () => {
  const ctx = useContext(SubmissionContext);
  if (!ctx) throw new Error("useSubmission must be used within SubmissionProvider");
  return ctx;
};