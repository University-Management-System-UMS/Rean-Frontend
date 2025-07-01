/* eslint-disable @typescript-eslint/no-explicit-any */

export interface EnterpriseRequest {
    InId: string;
}

export interface Course {
  _id: string;
  PT: boolean;
  VarncPnt: string;
  int_crt: string;
  sts: string;
  CrAt: string; 
  MoAt: string; 
  enrmgr: string[]; 
  OID: string;
  InId: string;
  PrID: string;
  Name: string;
  CrID: string;
  CrsT: string;
  Desc: string;
  CrBy: string;
  StFl: string;
  capac: number | null;
  PassMrk: number | null;
  MdtnMrk: number | null;
  Varnc: string | null;
  AcdmcDur: number | null;
  AssmntDur: number | null;
  OffDept: string;
  CrsDtls: string;
  mxFlCr: number | null;
  __v: number;
  MaxModSubjs: number | null;
  MdBy: string;
  int_upd: string;
  AprvrFst: string[]; 
  AprvrScnd: string[];
  CrsNm: string;
  InsNm: string;
  PrgNm: string;
}

export interface State {
  text: string;
  StFl: string;
}

export interface CCode {
  code: string;
  text: string;
  StFl: string;
  rqrd?: boolean; 
  uD?: boolean; 
  group?: string;
  label?: string;
  symbl?: string;
  unit?: string;
  subUnit?: string;
  states?: State[];
}

export interface Domain {
  _id: string;
  code: string;
  text: string;
  InId?: string;        
  ccodes: CCode[];
  oldText?: string;     
  e?: string;        
}

export interface Master {
  _id: string;
  StFl: string;
  CrAt: string; 
  MoAt: string; 
  InId: string;
  Ctgry: string;
  __v: number;
}

export interface EnterpriseResponse {
    output: {
      data: {
        courses: Course[];
        domain: Domain[];
        master: Master[];
      };
      errors: any;
    };
  }