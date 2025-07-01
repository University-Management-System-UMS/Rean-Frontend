/* eslint-disable @typescript-eslint/no-unused-vars */
type Question = {
    Type: string;
    Diffi: number;
    Marks: number;
    Time: number;
    QNo: number;
    Ques: string;
    EquMode: string;
    Ans: unknown[]; // Could be more specific if known
    DescAns: string;
    QuesID: string;
    QFlag: string;
    BlmsId: string;
    LearnDomain: string;
    feCrID: string;
    choiceId: unknown[];
    subChoice: boolean;
    isParent: boolean;
    prntIndx: number;
    QType: string;
    _id: string;
  };
  
  type OAsRes = {
    _id: string;
    ShwAns: string;
    NoAttmpts: string;
    QPTime: number;
    StDate: number;
    EndDt: number;
    QPID: string;
    Jumble: boolean;
    canPtrk: boolean;
    isOnBrd: boolean;
    totMrk: number;
    totQues: number;
    Questions: Question[];
    QPaperNm: string;
    isAsReTk: boolean;
    isQuizCmp: boolean;
    subCnt: number;
  };
  
  const oAsRes: OAsRes = {
    _id: "6822ce21a71918829f0f722f",
    ShwAns: "D",
    NoAttmpts: "S",
    QPTime: 100,
    StDate: 1746982800,
    EndDt: 1751043600,
    QPID: "6822c47f3f698d891445735a",
    Jumble: false,
    canPtrk: false,
    isOnBrd: false,
    totMrk: 5,
    totQues: 5,
    Questions: [
      {
        Type: "MCQ",
        Diffi: 2,
        Marks: 5,
        Time: 2,
        QNo: 1,
        Ques: "1. What is the capital of France?",
        EquMode: "N",
        Ans: ["choice_1"], // Selected answer by user (if any)
        DescAns: "choice_1", // Correct answer choice ID
        QuesID: "mcq_question_id",
        QFlag: "A",
        BlmsId: "blms_id_1",
        LearnDomain: "Knowledge",
        feCrID: "feature_id_1",
        choiceId: [
          { id: "choice_1", text: "Paris" },
          { id: "choice_2", text: "London" },
          { id: "choice_3", text: "Berlin" },
          { id: "choice_4", text: "Madrid" }
        ],
        subChoice: false,
        isParent: false,
        prntIndx: 1,
        QType: "S",
        _id: "internal_id_1"
      },
      {
        Type: "MCMR",
        Diffi: 3,
        Marks: 5,
        Time: 3,
        QNo: 2,
        Ques: "2. Which of the following are programming languages?",
        EquMode: "N",
        Ans: ["choice_a", "choice_c"], // Selected answers
        QuesID: "mcmr_question_id",
        QFlag: "A",
        BlmsId: "blms_id_2",
        LearnDomain: "Comprehension",
        feCrID: "feature_id_2",
        choiceId: [
          { id: "choice_a", text: "JavaScript" },
          { id: "choice_b", text: "HTML" },
          { id: "choice_c", text: "Python" },
          { id: "choice_d", text: "CSS" }
        ],
        subChoice: true,
        isParent: false,
        prntIndx: 2,
        QType: "M",
        _id: "internal_id_2",
        DescAns: ""
      },
      {
        Type: "Fillups",
        Diffi: 1,
        Marks: 1,
        Time: 1,
        QNo: 1,
        Ques: "1. The Declaration of Independence was signed in the year _______.",
        EquMode: "N",
        Ans: [],
        DescAns: "1776",
        QuesID: "6822c47f3f698d8914457350",
        QFlag: "A",
        BlmsId: "67c965b033f659bca635cc39",
        LearnDomain: "Affect",
        feCrID: "66cfe25ba17412780c237616",
        choiceId: [],
        subChoice: false,
        isParent: false,
        prntIndx: 1,
        QType: "M",
        _id: "67c96ec9b5b6641fba27ba5c"
      },
      {
        Type: "Fillups",
        Diffi: 1,
        Marks: 1,
        Time: 1,
        QNo: 2,
        Ques: "2. The process by which plants make their own food using sunlight is called _______.",
        EquMode: "N",
        Ans: [],
        DescAns: "photosynthesis",
        QuesID: "6822c47f3f698d8914457352",
        QFlag: "A",
        BlmsId: "67c965b033f659bca635cc39",
        LearnDomain: "Affect",
        feCrID: "66cfe25ba17412780c237616",
        choiceId: [],
        subChoice: false,
        isParent: false,
        prntIndx: 2,
        QType: "M",
        _id: "67c96ec9b5b6641fba27ba5d"
      },
      {
        Type: "Fillups",
        Diffi: 1,
        Marks: 1,
        Time: 1,
        QNo: 3,
        Ques: "3. The longest river in the world is the _______ River.",
        EquMode: "N",
        Ans: [],
        DescAns: "Nile",
        QuesID: "6822c47f3f698d8914457354",
        QFlag: "A",
        BlmsId: "67c965b033f659bca635cc39",
        LearnDomain: "Affect",
        feCrID: "66cfe25ba17412780c237616",
        choiceId: [],
        subChoice: false,
        isParent: false,
        prntIndx: 3,
        QType: "M",
        _id: "67c96ec9b5b6641fba27ba5e"
      },
      {
        Type: "Fillups",
        Diffi: 1,
        Marks: 1,
        Time: 1,
        QNo: 4,
        Ques: "4. The sum of the angles in a triangle is always _______ degrees.",
        EquMode: "N",
        Ans: [],
        DescAns: "180",
        QuesID: "6822c47f3f698d8914457356",
        QFlag: "A",
        BlmsId: "67c965b033f659bca635cc39",
        LearnDomain: "Affect",
        feCrID: "66cfe25ba17412780c237616",
        choiceId: [],
        subChoice: false,
        isParent: false,
        prntIndx: 4,
        QType: "M",
        _id: "67c96ec9b5b6641fba27ba5f"
      },
      {
        Type: "Fillups",
        Diffi: 1,
        Marks: 1,
        Time: 1,
        QNo: 5,
        Ques: "5. In George Orwell's novel 1984, the totalitarian regime is headed by the figure known as _______.",
        EquMode: "N",
        Ans: [],
        DescAns: "Big Brother",
        QuesID: "6822c47f3f698d8914457358",
        QFlag: "A",
        BlmsId: "67c965b033f659bca635cc39",
        LearnDomain: "Affect",
        feCrID: "66cfe25ba17412780c237616",
        choiceId: [],
        subChoice: false,
        isParent: false,
        prntIndx: 5,
        QType: "M",
        _id: "67c96ec9b5b6641fba27ba60"
      }
    ],
    QPaperNm: "Q1",
    isAsReTk: false,
    isQuizCmp: true,
    subCnt: 0
  };
  