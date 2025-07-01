export interface LeaveRequest {
  StuID: string;
}

export interface LeaveApiResponse {
  output: {
    data: LeaveData[];
  };
}

export interface CancelLeaveResponse {
  output: {
    data: {
      Status: string;
    }
  };
}


export interface LeavePeriodDetail {
  lvTknDt: string;
  lvTknDay: string;
  aPerIds: string[];
  aPeriodDtls: string;
}

export interface LeaveData {
  Rson: string;
  _id: string;
  LvTy: string;
  start: string;
  end: string;
  Stus: string;
  CancelBool: boolean;
  refId: string;
  periods: string[];
  aLvDtls: LeavePeriodDetail[];
}
