import { AuthService } from "@/api/services/auth.service";
import { LoginRequest, LoginResponse } from "@/api/types/auth/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";

interface AuthError {
  code?: string;
  message: string;
  unlockTime?: number;
}

export function useAuth() {

  const handleLoginSuccess = async (response: LoginResponse) => {
    if (response.output.data.code) {
    const errorMessages: Record<string, string> = {
        'INCRT_CRD': 'Incorrect credentials.',
        'ACC_LOCKED': `Account locked. Please try again after ${response.output.data.unLockTime} minutes.`,
        default: 'An error occurred during login'
    };
      throw new Error(errorMessages[response.output.data.code] || errorMessages.default);
    }

    if (response.output.data.logindetails) {
        await AsyncStorage.setItem('loginDetails', JSON.stringify(response.output.data.logindetails));
    }
    return response;
  };

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => AuthService.login(credentials.Email, credentials.pwd),
    onSuccess: handleLoginSuccess
  });

  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: async () => {
        await AsyncStorage.removeItem('loginDetails');
    }
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error as AuthError | null,
    logoutError: logoutMutation.error as Error | null,
    loginDetails: loginMutation.data?.output.data.logindetails,

  };
}