import { BaseApiResponse } from "../api-resp-template";

export interface LMSTokenData {
    u: string;
}

export type LMSTokenResponse = BaseApiResponse<LMSTokenData>