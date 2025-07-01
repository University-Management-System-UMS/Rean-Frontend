import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@/api/services/auth.service';

export const useLmsToken = () => {
  return useQuery({
    queryKey: ['lmsToken'],
    queryFn: async () => {
      const data = await AuthService.getLmsToken();
      const url = data.u;
      const token = url.split("auth-token=")[1];
      return token;
    },
  });
}; 