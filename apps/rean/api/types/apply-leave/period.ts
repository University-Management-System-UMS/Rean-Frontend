/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PeriodRequest {
  InId: string;
  PrID: string;
  CrID: string;
  DeptID: string;
  SemID: string;
  SecID: string;
  AcYr: string;
  isGetCurrent: string;
  StuID: string;
  isFE: string;
  start: string;
  end: string;
  schdlTyp: string;
  isShowCancelledPeriod: boolean;
  isFromTt: boolean;
  getUniqPrds: boolean;
}

export interface Period {
  _id: string;
  PerNm: string;
}

export interface PeriodData {
  Periods: Period[];
  Holiday: any[];
}

export interface PeriodResponse {
  output: {
    data: PeriodData[];
    errors: any;
  };
}
