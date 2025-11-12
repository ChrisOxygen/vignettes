"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  _approveEditRequest,
  _denyEditRequest,
} from "../actions/edit-requests.actions";
import { ApiResponse } from "@/features/shared/types/api";

interface UseApproveEditRequestOptions {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
  submissionId?: string;
}

interface UseDenyEditRequestOptions {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
  submissionId?: string;
}

/**
 * Hook to approve an edit request
 */
export function useApproveEditRequest(options?: UseApproveEditRequestOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (commentId: string): Promise<ApiResponse> => {
      const result = await _approveEditRequest(commentId);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (result) => {
      // Invalidate comments and form submission queries
      if (options?.submissionId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", options.submissionId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["formSubmission"] });
      queryClient.invalidateQueries({ queryKey: ["form-submissions"] });

      options?.onSuccess?.(result);
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
    data: mutation.data?.data || null,
  };
}

/**
 * Hook to deny an edit request
 */
export function useDenyEditRequest(options?: UseDenyEditRequestOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      commentId,
      reason,
    }: {
      commentId: string;
      reason?: string;
    }): Promise<ApiResponse> => {
      const result = await _denyEditRequest(commentId, reason);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (result) => {
      // Invalidate comments query
      if (options?.submissionId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", options.submissionId],
        });
      }

      options?.onSuccess?.(result);
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
    data: mutation.data?.data || null,
  };
}
