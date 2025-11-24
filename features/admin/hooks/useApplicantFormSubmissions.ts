import { useQuery } from "@tanstack/react-query";
import { FormType } from "@prisma/client";
import { _getApplicantFormSubmissions } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import {
  ApplicantFormSubmission,
  UseApplicantFormSubmissionsOptions,
} from "../types";

/**
 * Hook to fetch form submissions for a specific applicant
 * Admin-only - can view any user's submissions
 */
export function useApplicantFormSubmissions({
  userId,
  formType,
  enabled = true,
}: UseApplicantFormSubmissionsOptions) {
  return useQuery({
    queryKey: ["admin", "applicantSubmissions", userId, formType],
    queryFn: async (): Promise<ApplicantFormSubmission[]> => {
      const response: ApiResponse<ApplicantFormSubmission[]> =
        await _getApplicantFormSubmissions(userId, formType);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    },
    enabled: enabled && !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}
