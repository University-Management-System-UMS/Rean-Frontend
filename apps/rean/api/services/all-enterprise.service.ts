import { APIPath } from '../api.constant';
import { reanHttpClient } from '@/api/seperate-client';
import { EnterpriseRequest, EnterpriseResponse } from '../types/all-interprise';

export class EnterpriseService {
  static async getAllEnterprises(InId: string): Promise<EnterpriseResponse['output']['data']> {
    const EnterpriseData: EnterpriseRequest = { InId };
    const response = await reanHttpClient.post<EnterpriseResponse>(APIPath.AllInterprise, EnterpriseData);
    return response.data.output.data;
  }
}
