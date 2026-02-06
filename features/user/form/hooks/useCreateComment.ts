"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _createComment } from "../actions/comments.actions";
import { ApiResponse } from "@/features/shared/types/api";
import { CommentType } from "@prisma/client";

interface CreateCommentInput {
  submissionId: string;
  content: string;
  fieldPath?: string | null;
  fieldLabel?: string | null;
  commentType?: CommentType;
  parentCommentId?: string | null;
}

interface UseCreateCommentOptions {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to create a new comment on a form submission
 */
export function useCreateComment(options?: UseCreateCommentOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateCommentInput): Promise<ApiResponse> => {
      const result = await _createComment(data);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (result, variables) => {
      // Invalidate comments query for this submission
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.submissionId],
      });

      // Also invalidate admin form submission query if exists
      queryClient.invalidateQueries({
        queryKey: ["admin", "formSubmission", variables.submissionId],
      });

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
    data: mutation.data?.data || null,
  };
}
