export interface quizConfig{
  showAnswerImmediately: boolean,
  showAnswersOnCompletion: boolean,
  allowJumpToQuestion: boolean,
  forceSequentialAnswering: boolean,
  allowRetry: boolean,
}

//configuration on quiz conditions
 export const quizConfig: quizConfig ={
  showAnswerImmediately: true,
  showAnswersOnCompletion: true,
  allowJumpToQuestion: true,
  forceSequentialAnswering: true,
  allowRetry: false,
};


export const testPresets = {
  allowJumping: {
    showAnswerImmediately: false,
    showAnswersOnCompletion: true,
    allowJumpToQuestion: true,
    forceSequentialAnswering: false,
    allowRetry: true,
  },
  strictSequential: {
    showAnswerImmediately: false,
    showAnswersOnCompletion: true,
    allowJumpToQuestion: false,
    forceSequentialAnswering: true,
    allowRetry: false,
  },
  instantFeedback: {
    showAnswerImmediately: true,
    showAnswersOnCompletion: false,
    allowJumpToQuestion: true,
    forceSequentialAnswering: false,
    allowRetry: true,
  },
};

export interface config {
  isJumpingAllowed: boolean;
  isShowAnswerImmediately: boolean;
  isRetryAllowed: boolean;
}