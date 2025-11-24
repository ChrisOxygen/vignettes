import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _updateFormSubmissionStatus } from "../actions";
import { UpdateStatusInput, UseUpdateSubmissionStatusOptions } from "../types";

/**
 * Hook to update form submission status
 * Admin-only - can change status to UNDER_REVIEW, APPROVED, REJECTED, or CHANGES_REQUESTED
 */
export function useUpdateSubmissionStatus(
  options?: UseUpdateSubmissionStatusOptions
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ submissionId, status }: UpdateStatusInput) => {
      const result = await _updateFormSubmissionStatus(submissionId, status);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (result, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: ["admin", "formSubmissions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "formSubmission", variables.submissionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "statistics"],
      });

      options?.onSuccess?.(result);
    },
    onError: (error: Error) => {
      options?.onError?.(error.message);
    },
  });

  return {
    updateStatus: mutation.mutate,
    updateStatusAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
}
