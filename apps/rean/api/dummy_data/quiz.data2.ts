const quizAssignments = [
{
    _id: "6822c50f1fde39272b71cbce",
    quiz: { qzDuDt: null },
    vSts: "F",
    chapId: "6822c432a71918829f0f6724",
    sChpId: "6822c441a71918829f0f673a",
    title: "Midterm Quiz",
    seqNo: 22,
    asmnId: "6822c50f1fde39272b71cbc6",
    sChpName: "Chapter Introduction"
},
{
    _id: "6822ce21a71918829f0f7237",
    quiz: { qzDuDt: "2025-05-22T17:00:00.000Z" },
    vSts: "F",
    chapId: "6822c432a71918829f0f6724",
    sChpId: "6822c441a71918829f0f673a",
    title: "Core Concepts Quiz",
    seqNo: 23,
    asmnId: "6822ce21a71918829f0f722f",
    sChpName: "Chapter Introduction"
},
{
    _id: "6822ce7da71918829f0f72bf",
    quiz: { qzDuDt: null },
    vSts: "F",
    chapId: "6822c432a71918829f0f6724",
    sChpId: "6822c441a71918829f0f673a",
    title: "Follow-up Quiz",
    seqNo: 24,
    asmnId: "6822ce7da71918829f0f72b7",
    sChpName: "Chapter Introduction"
},
{
    _id: "6822c47f3f698d8914457365",
    quiz: { qzDuDt: null },
    chapId: "6822c40603a9f255211b1e81",
    sChpId: "6822c8321fde39272b71d3ad",
    seqNo: 7,
    title: "Basic Quiz",
    asmnId: "6822c47f3f698d8914457361",
    vSts: "F",
    sChpName: "Pipeline Basics"
},
{
    _id: "683589ff8177ae19da239e5e",
    quiz: { qzDuDt: null },
    vSts: "F",
    chapId: "68355a67810235002d8d870a",
    sChpId: "68355aa0810235002d8d8739",
    title: "Quiz: Enforcement Rules I",
    seqNo: 14,
    asmnId: "683589ff8177ae19da239e56",
    sChpName: "Computer Science Overview"
},
{
    _id: "68358a7efa8457ed49b8a6c3",
    quiz: { qzDuDt: null },
    vSts: "F",
    chapId: "68355a67810235002d8d870a",
    sChpId: "68355aa0810235002d8d8739",
    title: "Quiz: Enforcement Rules II",
    seqNo: 15,
    asmnId: "68358a7efa8457ed49b8a6bb",
    sChpName: "Computer Science Overview"
},
{
    _id: "68358ae3fa8457ed49b8a705",
    quiz: { qzDuDt: null },
    vSts: "F",
    chapId: "68355a67810235002d8d870a",
    sChpId: "68355aa0810235002d8d8739",
    title: "Quiz: Enforcement Rules III",
    seqNo: 16,
    asmnId: "68358ae3fa8457ed49b8a6fd",
    sChpName: "Computer Science Overview"
},
{
    _id: "68358b3dfa8457ed49b8a940",
    quiz: { qzDuDt: null },
    vSts: "F",
    chapId: "68355a67810235002d8d870a",
    sChpId: "68355aa0810235002d8d8739",
    title: "Quiz: Enforcement Rules IV",
    seqNo: 17,
    asmnId: "68358b3dfa8457ed49b8a938",
    sChpName: "Computer Science Overview"
},
{
    _id: "68427c2c2695fb38658a7433",
    quiz: { qzDuDt: null },
    vSts: "F",
    chapId: "68355a67810235002d8d870a",
    sChpId: "68358e23fa8457ed49b8aeb3",
    title: "Final Practice Quiz",
    seqNo: 21,
    asmnId: "68427c2c2695fb38658a742b",
    sChpName: "Assignment Review"
}
];
export default quizAssignments;
export interface QuizAssignment {
  _id: string;
  quiz: {
    qzDuDt: string | null;
};
    vSts: string;
    chapId: string;
    sChpId: string;
    title: string;
    seqNo: number;
    asmnId: string;
    sChpName: string;
}