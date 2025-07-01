export interface LoginRequest {
  Email: string;
  pwd: string;
  dtype: 'A';
  v?: string;
  isMobile: true;
}

export interface Student {
  ProfileId: string;
  _id: string;
  StuID: string;
  FNa: string;
  MNa: string;
  LNa: string;
  ApplnId: string;
  CurCrID: string;
  CurPrID: string;
}

export interface LoginDetails {
  _id: string;
  StFl: string;
  isUpld: boolean;
  Student: Student[];
  Name: string;
  Email: string;
  pwd: string | null;
  Type: string;
  InId: string;
  CrAt: string;
  CrBy: string;
  MdBy: string;
  __v: number;
  lgAtmt: number;
  pendStuds: unknown[];
  CamuPin: string | null;
  instLangs: string[];
  instDefaultLang: string;
  isInIdLangPre: boolean;
}

export interface ProgressionData {
  _id: string;
  StFl: string;
  frmPrg: boolean;
  CrAt: string;
  MoAt: string;
  OID: string;
  InId: string;
  PrID: string;
  CrID: string;
  DeptID: string;
  AcYr: string;
  semRstd: string;
  StuID: string;
  progstdt: string;
  stustatus: string;
  __v: number;
  CmProgID: string;
  InName: string;
  CrName: string;
  CrCode: string;
  DepName: string;
  DeptCode: string;
  AcyrFrDt: string;
  AcyrToDt: string;
  AcYrNm: string;
  SemName: string;
  SemID: string;
  PrName: string;
  isFE: boolean;
  BP: string;
  CurSymb: string;
  lang_code: string;
  ReceiptImgID: string;
  address: {
    AdL1: string;
    AdL2: string;
    AdL3: string;
    CyTn: string;
    Stat: string;
    Cnty: string;
    EmAd: string;
    PhNo: string;
    postcode: string;
  };
  Featrs: unknown[];
  RTL: boolean;
  payGateway: string;
  payGatewayID: string;
  editPay: string;
  payGateways: Array<{
    venMsg: string;
    vendor: string;
    name: string;
  }>;
  feedbackConfig: unknown[];
  coursereg: boolean;
  blVw: {
    ctgry: boolean;
    blItm: boolean;
    rcptByCtgry: boolean;
    gpCtry: boolean;
    rGpCt: boolean;
  };
  newLms: boolean;
  isOfPy: boolean;
  showFaNa: boolean;
  curCode: string;
  tzOfst: number;
  shwMinCrdtAlrtMsg: boolean;
  BatchDetails: string;
  Menus: {
    [key: string]: boolean;
  };
  FNa: string;
  LNa: string;
  Sex: string;
  DOB: string;
  CnEmail: string;
  AplnNum: string;
  AdmNum: string;
  CnAge: number;
  Gen: string;
  YrOfAdm: string;
  IntrwDt: string;
  Intrwdstf: string;
  IdMarks: Array<{
    Name: string;
    _id: string;
  }>;
  EduLoan: boolean;
  Minor: boolean;
  Diffabld: string;
  Qualification: Array<{
    QlfyEx: string;
    Medium: string;
    Inst: string;
    InstAdL1: string;
    InstAdL2: string;
    InstPl: string;
    InstCn: string;
    InstPIN: string;
    CertfctNo: string;
    Marksheet: unknown[];
    _id: string;
  }>;
  FaNtAlv: string;
  MoNtAlv: string;
  Backlog: string;
  CrsPlan: string;
  shwNotifyRecord: string;
  shwNotifyAprvl: string;
  docRecrds: Array<{
    docId: string;
    docTypNm: string;
  }>;
  StuTyp: string;
  grAdhr: string;
  HstleReq: string;
  BoardReq: boolean;
  AdmDt: string;
}

export interface LoginResponse {
  output: {
    data: {
      isForceUpdate?: boolean;
      logindetails?: LoginDetails;
      progressionData?: ProgressionData[];
      code?: string;
      retry?: number;
      unLockTime?: number;
      _id?: string;
    };
  };
}