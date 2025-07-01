/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InstituteRequest {
    queryString: string;
} 

export interface Institute {
    InId?: string;
    insNm?: string;
    insCd?: string;
    insLgo?: string;
}

export interface InstituteResponse {
    output: {
        data: Institute[];
        error: any;
    };
}