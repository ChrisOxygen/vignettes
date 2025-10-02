"use client";

import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { ApiResponse } from "@/features/shared/types/api";
import { ZEmailInput } from "../validators/user.validator";

interface UseResetPasswordOptions {
  onSuccess?: (response: ApiResponse<{ message: string }>) => void;
  onError?: (error: string) => void;
}

// Hook to reset user password using Supabase auth
export function useResetPassword(options?: UseResetPasswordOptions) {
  const mutation = useMutation({
    mutationFn: async (
      data: ZEmailInput
    ): Promise<ApiResponse<{ message: string }>> => {
      const supabase = createClient();

      // Send password reset email using Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password-confirm`,
      });

      if (error) {
        // Map Supabase errors to our API response format
        let message = "Failed to send password reset email";

        if (error.message.includes("rate limit")) {
          message = "Too many password reset attempts. Please try again later";
        } else if (error.message.includes("Invalid email")) {
          message = "Please enter a valid email address";
        } else if (error.message.includes("not found")) {
          message = "No account found with this email address";
        }

        throw new Error(message);
      }

      // Return success response
      return {
        success: true,
        data: {
          message: "Password reset email sent successfully",
        },
        message:
          "If an account with that email exists, we've sent you a reset link",
      };
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
