import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/api/services/auth.service';

export const useLmsAuth = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      if (!token) {
        throw new Error('LMS token is required');
      }
      return AuthService.postLmsAuth(token);
    },
  });
}; 