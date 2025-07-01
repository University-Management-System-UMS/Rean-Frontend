export interface Attachment {
  AttchName: string;
  AttchID: string;
}

export interface CreateLeaveRequest { //body
  PerTy: string;
  PerId: string;
  PerNm: string;
  InId: string;
  HstleReq: boolean;
  LvTy: string;
  Rson: string;
  PtAb: string;
  Sson: string;
  FrDt: string;
  ToDt: string;
  periods: string[];
  GateOutPass: boolean;
  loggedInId: string;
  timezoneOffSet: number;
}

export interface CreateLeaveResponseData {
  Rson: string;
  _id: string;
  LvTy: string;
  start: string;
  periods: string[];
  end: string;
  Stus: string;
  CancelBool: boolean;
  refId: string;
}

interface errors {
  check: boolean,
  message: string
}

export  interface CreateLeaveResponse {
  output: {
    data: CreateLeaveResponseData;
    errors: errors;
  };
}
