"use client";

import { useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/features/shared/types/api";
import { ZResetPasswordWithTokenInput } from "../validators/user.validator";
import { _resetUserPassword } from "../actions/password-reset.actions";

interface UseConfirmPasswordResetOptions {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
}

/**
 * Hook to confirm password reset using token from email
 * This is the second step after user clicks the reset link
 */
export function useConfirmPasswordReset(
  options?: UseConfirmPasswordResetOptions
) {
  const mutation = useMutation({
    mutationFn: async (
      data: ZResetPasswordWithTokenInput
    ): Promise<ApiResponse> => {
      const result = await _resetUserPassword(data);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (result) => {
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
    reset: mutation.reset,
  };
}
