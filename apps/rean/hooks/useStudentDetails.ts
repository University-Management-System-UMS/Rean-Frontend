import { useEffect, useState } from 'react';
import { getUserLoginDetails } from '@/utils/storage.util';
import { LoginDetails, Student } from '@/api/types/auth/login';

export const useStudentDetails = () => {
  const [studentDetails, setStudentDetails] = useState<Student>();

  useEffect(() => {
    const fetchStudent = async () => {
      const userLoginDetails: LoginDetails | null = await getUserLoginDetails();
      if (userLoginDetails?.Student?.[0]?.StuID) {
        setStudentDetails(userLoginDetails.Student[0]);
      }
    };
    fetchStudent();
  }, []);

  return studentDetails;
};
