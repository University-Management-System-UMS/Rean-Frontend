import { useQuery } from '@tanstack/react-query';
import { PeriodRequest } from '@/api/types/apply-leave/period';
import { useEffect, useState } from 'react';
import { getUserLoginDetails } from '@/utils/storage.util';
import { LoginDetails } from '@/api/types/auth/login';
import { LeaveService } from '@/api/services/leave.service';

export const usePeriod = (shouldFetch: boolean = false) => {
  const [requestBody, setRequestBody] = useState<PeriodRequest | undefined>(undefined);

  useEffect(() => {
    const prepareRequestBody = async () => {
      const user: LoginDetails | null = await getUserLoginDetails();
      if (user) {
        const student = user.Student[0];
        const today = new Date();
        const startDate = new Date(today);
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 30);

        const body: PeriodRequest = {
          InId: user.InId,
          PrID: student.CurPrID,
          CrID: student.CurCrID,
          DeptID: "66c1636750c76f61024cd0c4",
          SemID: "66c16c9850c76f61024cd39e",
          SecID: "", 
          AcYr: "674aa30df54355a4b5e94494",
          isGetCurrent: 'Y',
          StuID: student.StuID,
          isFE: 'true',
          start: startDate.toISOString(), 
          end: endDate.toISOString(), 
          schdlTyp: "slctdSchdl", 
          isShowCancelledPeriod: true,
          isFromTt: true,
          getUniqPrds: true,
        };
       
        setRequestBody(body);
      }
    };
    if (shouldFetch) {
      prepareRequestBody();
    }
  }, [shouldFetch]);

  const periodQuery = useQuery({
    queryKey: ['periodData', requestBody],
    queryFn: () => {
      if (!requestBody) throw new Error('Request body is required');
      return LeaveService.getPeriods(requestBody);
    },
    enabled: !!requestBody && shouldFetch,
    select: (data) => {
      return data.output.data[0]?.Periods || [];
    },
  });
  
  return periodQuery;
};
