export interface Message {
    _id: string;
    chtGpId: string;
    srId: string;
    mCont: string;
    conType: 'text' | 'image' | 'video';
    CrAt: string;
  }