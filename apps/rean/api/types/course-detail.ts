//course content detail
export interface contentResponse {
  _id: string;
  cntType: string; //quiz, assignment, graded
  tagname: string; //status (submited, overdue, incomplete )
  title: string; 
  descriptions: string;
  time: string;
}
