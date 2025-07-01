import React, { createContext, useContext, useState } from 'react';

type SelectedAnswers = Record<number, string[]>;

interface QuizContextType {
  quizHistory: SelectedAnswers[];
  addQuizAttempt: (answers: SelectedAnswers) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizHistory, setQuizHistory] = useState<SelectedAnswers[]>([]);

  const addQuizAttempt = (answers: SelectedAnswers) => {
    setQuizHistory(prev => [...prev, answers]);
  };

  return (
    <QuizContext.Provider value={{ quizHistory, addQuizAttempt }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuizContext must be used within a QuizProvider');
  return context;
};
