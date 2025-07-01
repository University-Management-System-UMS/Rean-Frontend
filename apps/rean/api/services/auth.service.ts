import { reanHttpClient, universityHttpClient } from '@/api/seperate-client';
import { LoginRequest, LoginResponse } from '@/api/types/auth/login';
import { APIPath } from '../api.constant';
import { LogoutResponse } from '../types/auth/logout';
import { LMSTokenData, LMSTokenResponse } from '../types/auth/get-lms-token';

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    const loginData: LoginRequest = {
      Email: email,
      pwd: password,
      dtype: 'A',
      isMobile: true,
    };
    
    const response = await reanHttpClient.post<LoginResponse>(APIPath.LOGIN, loginData);
    return response.data;
  }

  static async logout(): Promise<LogoutResponse> {
    const response = await reanHttpClient.post<LogoutResponse>(APIPath.LOGOUT);
    return response.data;
  }

  static async getLmsToken(): Promise<LMSTokenData> {
    const response = await reanHttpClient.get<LMSTokenResponse>(APIPath.LMS_TOKEN);
    return response.data.output.data;
  }

  static async postLmsAuth(token: string): Promise<string> {
    const res = await universityHttpClient.post<string>(
      APIPath.LMS_AUTH,
      { token }
    );
    return res.data;
  }
}