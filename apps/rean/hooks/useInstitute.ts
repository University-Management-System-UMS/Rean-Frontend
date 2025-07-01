import { InstituteService } from "@/api/services/institute.service";
import { useMutation } from "@tanstack/react-query";

export function useInstitute() {
    const SearchInstitute = useMutation({
        mutationFn: (queryString: string) => InstituteService.getInstitutes(queryString),
    });
    return {
        searchInstitute: SearchInstitute.mutate,
        isLoading: SearchInstitute.isPending,
        data: SearchInstitute.data?.output.data || [],
    }
}