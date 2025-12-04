import { useQuery } from "@tanstack/react-query";
import { _getApplicantById } from "../actions/form-submissions.actions";
import { ApiResponse } from "@/features/shared/types/api";
import { ApplicantWithSubmissions, UseApplicantByIdOptions } from "../types";

/**
 * Hook to fetch a single applicant by ID with submission count
 * Admin-only - for viewing applicant details
 */
export function useApplicantById({
  applicantId,
  enabled = true,
}: UseApplicantByIdOptions) {
  return useQuery({
    queryKey: ["admin", "applicant", applicantId],
    queryFn: async (): Promise<ApplicantWithSubmissions> => {
      const response: ApiResponse<ApplicantWithSubmissions> =
        await _getApplicantById(applicantId);

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("No applicant data returned");
      }

      return response.data;
    },
    enabled: enabled && !!applicantId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}
