export interface QuizConfig {
  allowRetry: boolean;
  maxRetries?: number; // Optional: limit number of retries if allowed
  isJumble: boolean; // Whether to jumble answer options
  showResultsAfterSubmit: boolean; // Whether to show correct answers after submission
  showAnswerImmediately: boolean; // Whether to show correct answer immediately after answering
  showAnswersOnCompletion: boolean; // Whether to show all answers after completing the quiz
  allowJumpToQuestion: boolean; // Whether to allow jumping between questions
  forceSequentialAnswering: boolean; // Whether to force answering questions in sequence
  questionTimeLimit?: number; // Optional: time limit for each question in seconds
}

export interface QuizBase {
  id: string;
  tagname: string; // Incomplete, Submitted, Overdue
  title: string;
}

export interface QuizData extends QuizBase {
  time: string; // e.g., "12:00PM"
  duration: number; // e.g., "30 minutes"
  questions: number;
  description: string;
  config: QuizConfig; // Add the configuration options
}
export interface Questions {
  id: number;
  question: string;
  type: string;
  options: string[];
  correctAnswer: string | string[]; // string[] for multiple correct answers
  duration?: number; // Optional: duration for each question
}