import { useQuery } from '@tanstack/react-query';
import { LeaveService } from '../api/services/leave.service';
import { useStudentDetails } from './useStudentDetails';
import { LeaveData } from '@/api/types/leave';
import { ApiError } from '@/utils/error-handler.util';

export const useLeaves = (options= {}) => {
  const studentId = useStudentDetails()?.StuID;
  return useQuery<LeaveData[], ApiError>({
    queryKey: ['leaveData', studentId],
    queryFn: () => {
      if (!studentId) {
        throw new Error('Student ID is not available');
      }
      
      return LeaveService.getLeaves(studentId);
    },
    enabled: !!studentId,
    ...options,
  });
};