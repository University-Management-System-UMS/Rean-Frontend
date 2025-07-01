import { APIPath } from '../api.constant';
import { reanHttpClient } from '@/api/seperate-client';
import { InstituteRequest, InstituteResponse } from '../types/institute';

export class InstituteService {
    static async getInstitutes(queryString: string): Promise<InstituteResponse> {
        const InstituteData: InstituteRequest = {
            queryString: queryString,
        };
        const response = await reanHttpClient.post<InstituteResponse>(APIPath.INSTITUTE, InstituteData);
        return response.data;
    }
}