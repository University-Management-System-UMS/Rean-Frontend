import { useQuery } from '@tanstack/react-query';
import { EnterpriseService } from '@/api/services/all-enterprise.service';
import { getUserLoginDetails } from '@/utils/storage.util';

export const useEnterprises = () => {
  return useQuery({
    queryKey: ['enterprises'],
    queryFn: async () => {
      const user = await getUserLoginDetails();
      const InId = user?.InId;

      if (!InId) throw new Error('InId not found in user login data');
      
      return EnterpriseService.getAllEnterprises(InId);
    },
  });
};