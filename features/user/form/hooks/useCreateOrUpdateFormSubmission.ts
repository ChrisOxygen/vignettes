"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _upsertFormSubmission } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import type { UpsertFormSubmissionInput } from "../actions";

interface UseCreateOrUpdateFormSubmissionOptions {
  onSuccess?: (response: ApiResponse<{ submissionId: string }>) => void;
  onError?: (error: string) => void;
}

// Hook to create or update form submission
export function useCreateOrUpdateFormSubmission(
  options?: UseCreateOrUpdateFormSubmissionOptions
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: UpsertFormSubmissionInput
    ): Promise<ApiResponse<{ submissionId: string }>> => {
      return await _upsertFormSubmission(data);
    },
    onSuccess: (result) => {
      // Invalidate and refetch form-related queries
      queryClient.invalidateQueries({ queryKey: ["form-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["user-form-submissions"] });

      // If we have a specific submission ID, invalidate that query too
      if (result.data?.submissionId) {
        queryClient.invalidateQueries({
          queryKey: ["form-submission", result.data.submissionId],
        });
      }

      // Call the success callback with the API response
      if (result) {
        options?.onSuccess?.(result);
      }
    },
    onError: (error: Error) => {
      options?.onError?.(error.message);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,

    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message || null,
    isSuccess: mutation.isSuccess,
    data: mutation.data || null,
    reset: mutation.reset,
  };
}
