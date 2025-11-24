import { useQuery } from "@tanstack/react-query";
import { _getFormSubmissionById } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import {
  FormSubmissionWithComments,
  UseFormSubmissionDetailsOptions,
} from "../types";

/**
 * Hook to fetch a specific form submission by ID
 * Admin-only - can view any submission
 */
export function useFormSubmissionDetails({
  submissionId,
  enabled = true,
}: UseFormSubmissionDetailsOptions) {
  return useQuery({
    queryKey: ["admin", "formSubmission", submissionId],
    queryFn: async (): Promise<FormSubmissionWithComments> => {
      const response: ApiResponse<FormSubmissionWithComments> =
        await _getFormSubmissionById(submissionId);

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Form submission not found");
      }

      return response.data;
    },
    enabled: enabled && !!submissionId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}
