import { useMutation } from "@tanstack/react-query";
import {  LeaveService } from "@/api/services/leave.service";
import {
  CreateLeaveRequest,
  CreateLeaveResponse,
} from "@/api/types/create-leave";
import { useTranslation } from "./useTranslation";
import { extractErrorMessage } from "@/utils/error.util";

export function useCreateLeave() {
  const { t } = useTranslation();

  const { mutate, mutateAsync, isPending, data, error, status } = useMutation<
    CreateLeaveResponse,
    Error,
    CreateLeaveRequest
  >({
    mutationFn: async (body: CreateLeaveRequest) => {
      try {
        const response = await LeaveService.createLeave(body);
        if (!response.output.data && response.output?.errors?.check) {
          throw new Error(response.output.errors.message + ' ' + t(`leave.applyLeave.error.leaveAlreadyApplied`));
        }
        return response;
      } catch (err) {
        throw new Error(extractErrorMessage(err));
      }
    },
  });

  return {
    createLeave: mutate,
    createLeaveAsync: mutateAsync,
    isLoading: isPending,
    data,
    error,
    status,
  };
}

