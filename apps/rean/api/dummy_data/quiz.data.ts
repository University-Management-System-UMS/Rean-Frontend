import { Questions, QuizData } from "../types/my-learning/quiz";

export const quizDataList: QuizData[] = [
  {
    id: "CNT001",
    tagname: "Incomplete",
    title: "Math Basics Quiz",
    time: "2025-06-05 9:00AM",
    duration: 30, // 30 minutes
    questions: 15,
    description: "This quiz tests core arithmetic skills such as addition, subtraction, multiplication, and division. It also includes basic algebraic expressions and simple word problems.",
    config: {
      allowRetry: true,
      maxRetries: 2,
      isJumble: true,
      showResultsAfterSubmit: false,
      showAnswerImmediately: true,
      showAnswersOnCompletion: true,
      allowJumpToQuestion: true,
      forceSequentialAnswering: false,
    }
  },
  {
    id: "CNT002",
    tagname: "Submitted",
    title: "Science - Chapter 1",
    time: "2025-06-05 10:30AM",
    duration: 25, // 25 minutes
    questions: 10,
    description: "Covers the foundational concepts from Chapter 1, including matter, states of matter, and scientific tools.",
    config: {
      allowRetry: true,
      maxRetries: 2,
      isJumble: false,
      showResultsAfterSubmit: true,
      showAnswerImmediately: false,
      showAnswersOnCompletion: true,
      allowJumpToQuestion: true,
      forceSequentialAnswering: false,
    }
  },
  {
    id: "CNT003",
    tagname: "Overdue",
    title: "History Timeline Test",
    time: "2025-06-04 11:15AM",
    duration: 20, // 20 minutes
    questions: 12,
    description: "A chronological test on key world events, significant historical figures, and ancient civilizations.",
    config: {
      allowRetry: false,
      maxRetries: 2,
      isJumble: false,
      showResultsAfterSubmit: true,
      showAnswerImmediately: false,
      showAnswersOnCompletion: true,
      allowJumpToQuestion: false,
      forceSequentialAnswering: true,
    }
  },
  {
    id: "CNT004",
    tagname: "Incomplete",
    title: "Geography Pop Quiz",
    time: "2025-06-06 12:00PM",
    duration: 15, // 15 minutes
    questions: 8,
    description: "A quick quiz to assess knowledge on world continents, oceans, and prominent landmarks like the Great Wall and Amazon River.",
    config: {
      allowRetry: true,
      maxRetries: 2,
      isJumble: false,
      showResultsAfterSubmit: false,
      showAnswerImmediately: true,
      showAnswersOnCompletion: false,
      allowJumpToQuestion: true,
      forceSequentialAnswering: false,
      questionTimeLimit: 30, // 30 seconds per question
    }
  },
  {
    id: "CNT005",
    tagname: "Submitted",
    title: "Biology - Cell Structure",
    time: "2025-06-07 1:45PM",
    duration: 35, // 35 minutes
    questions: 20,
    description: "This detailed quiz focuses on the components of plant and animal cells, their functions, and how they interact. Includes diagrams and labeling questions.",
    config: {
      allowRetry: true,
      maxRetries: 1,
      isJumble: true,
      showResultsAfterSubmit: true,
      showAnswerImmediately: true,
      showAnswersOnCompletion: true,
      allowJumpToQuestion: true,
      forceSequentialAnswering: false,
    }
  },
];

export const QuizQuestions: Questions[] = [
  {
    id: 1,
    question: "Data is factual information such as measurements or statistics used as a basis for reasoning, discussion, or calculation.",
    type: "radio",
    options: ["True", "False"],
    correctAnswer: "True"
  },
  {
    id: 2,
    question: "Select all examples of data.",
    type: "checkbox",
    options: [
      "Temperature readings",
      "Personal opinions",
      "Population statistics",
      "Guesswork",
    ],
    correctAnswer: "Temperature readings, Population statistics"
  },
  {
    id: 3,
    question: "Which of the following are quantitative data types?",
    type: "checkbox",
    options: [
      "Age in years",
      "Hair color",
      "Number of students",
      "Favorite movie",
    ],
    correctAnswer: "Age in years, Number of students"
  },
  {
    id: 4,
    question: "Data can be used to make predictions.",
    type: "radio",
    options: ["True", "False"],
    correctAnswer: "True"
  },
  {
    id: 5,
    question: "Which of the following are examples of qualitative data?",
    type: "checkbox",
    options: ["Eye color", "Height", "Favorite food", "Weight"],
    correctAnswer: "Height, Weight"
  },
  {
    id: 6,
    question: "Which of the following are examples of quantitative data?",
    type: "checkbox",
    options: ["Eye color", "Height", "Favorite food", "Weight"],
    correctAnswer: "Height, Weight"
  },
  {
    id: 7,
    question: "Which of the following best describes the purpose of collecting data?",
    type: "radio",
    options: [
      "To support decision-making through objective analysis",
      "To create confusion in scientific research",
      "To replace the need for expert knowledge entirely",
      "To avoid the use of technology in modern studies",
    ],
    correctAnswer: ""
  },
  {
    id: 8,
    question: "Which statements correctly explain how data is collected?",
    type: "checkbox",
    options: [
      "Data can be gathered through surveys conducted among a specific group of people",
      "Data is always made up and doesn't need verification",
      "Observations recorded over time can be used as valid data",
      "Guessing is an accepted method for reliable data collection",
    ],
    correctAnswer: "Observations recorded over time can be used as valid data"
  },
  {
    id: 9,
    question: "Which of these are key characteristics of reliable data?",
    type: "checkbox",
    options: [
      "It is collected using a consistent and well-documented method",
      "It comes from a source that is regularly updated and peer-reviewed",
      "It is based entirely on random opinions without evidence",
      "It can be verified or cross-checked by others",
    ],
    correctAnswer: "It comes from a source that is regularly updated and peer-reviewed"
  },
  {
    id: 10,
    question: "Why is it important to distinguish between qualitative and quantitative data?",
    type: "radio",
    options: [
      "Because each type helps answer different types of questions in research",
      "Because qualitative data is always more accurate than quantitative data",
      "Because numbers are always better than descriptions in any study",
      "Because data types should never be mixed under any circumstances",
    ],
    correctAnswer: "Because each type helps answer different types of questions in research"
  },

    {
      id: 11,
      question: "Why is it important to distinguish between true or false?",
      type: "radio",
      options: [
        "lying is bad",
        "better critical thinking",
        "avoid getting scam",
        "yay",
      ],
      correctAnswer: "yay"
    },
];
