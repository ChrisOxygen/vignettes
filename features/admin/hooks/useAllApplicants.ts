import { useQuery } from "@tanstack/react-query";
import { _getAllApplicantsWithSubmissions } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import { ApplicantWithSubmissions, UseAllApplicantsOptions } from "../types";

/**
 * Hook to fetch all applicants (users with USER role) and their submission counts
 * Admin-only - for the applicants page
 */
export function useAllApplicants({
  enabled = true,
}: UseAllApplicantsOptions = {}) {
  return useQuery({
    queryKey: ["admin", "applicants"],
    queryFn: async (): Promise<ApplicantWithSubmissions[]> => {
      const response: ApiResponse<ApplicantWithSubmissions[]> =
        await _getAllApplicantsWithSubmissions();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    },
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}
