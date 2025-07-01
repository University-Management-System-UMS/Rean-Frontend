// apis/leave.service.ts
import { reanHttpClient } from "@/api/seperate-client";
import { CancelLeaveResponse, LeaveApiResponse, LeaveData, LeaveRequest } from "../types/leave";
import { APIPath } from "../api.constant";
import { PeriodRequest, PeriodResponse } from "../types/apply-leave/period";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CreateLeaveRequest, CreateLeaveResponse } from "../types/create-leave";
import { handleApiError } from "@/utils/error-handler.util";


export class LeaveService {
  static async getLeaves(studentID: string): Promise<LeaveData[]> {
    try {
      const leaveBody: LeaveRequest = { StuID: studentID };
      const response = await reanHttpClient.post<LeaveApiResponse>(APIPath.LEAVE, leaveBody);
      const leaveList = response.data.output.data || [];
      return leaveList;
    } catch (err) {
      throw handleApiError(err); // Will be caught in React Query and typed
    }
  }

  static async getPeriods(requestBody: PeriodRequest): Promise<PeriodResponse> {
   
      const loginDetails = await AsyncStorage.getItem('loginDetails');
      if (!loginDetails) {
        throw new Error('No login details found');
      }
      const { InId } = JSON.parse(loginDetails);
      
      const formattedRequest = {
        ...requestBody,
        InId: InId, 
        SecID: requestBody.SecID || "",
      };

      const response = await reanHttpClient.post<PeriodResponse>(APIPath.PERIOD, formattedRequest);
      return response.data;
  }
  
  static async createLeave(body: CreateLeaveRequest): Promise<CreateLeaveResponse> {
    const response = await reanHttpClient.post<CreateLeaveResponse>(
      APIPath.CREATELEAVE,
      body
    );
    return response.data;
  }
  
  static async cancelLeave(leaveID: string, refID: string): Promise<string> {
    const response = await reanHttpClient.get<CancelLeaveResponse>(`${APIPath.CANCEL_LEAVE + leaveID}/${refID}`);
    return response.data.output.data.Status;
  }
}
