import { LeaveService } from '@/api/services/leave.service';
import { useMutation } from '@tanstack/react-query';

export const useCancelLeave = () => {
  return useMutation({
    mutationFn: ({ leaveID, refID }: { leaveID: string; refID: string }) =>
      LeaveService.cancelLeave(leaveID, refID),
  });
};
