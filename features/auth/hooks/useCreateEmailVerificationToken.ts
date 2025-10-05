"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _createEmailVerificationToken } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";

interface UseCreateEmailVerificationTokenOptions {
  onSuccess?: (response: ApiResponse<string>) => void;
  onError?: (error: string) => void;
}

// Hook to create a new email verification token for a user
export function useCreateEmailVerificationToken(
  options?: UseCreateEmailVerificationTokenOptions
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userEmail: string): Promise<ApiResponse<string>> => {
      const result = await _createEmailVerificationToken(userEmail);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (result) => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({
        queryKey: ["email-verification-tokens"],
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
    data: mutation.data?.data || null, // The token string
    reset: mutation.reset,
  };
}
