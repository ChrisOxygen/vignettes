"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { ApiResponse } from "@/features/shared/types/api";
import { ZResetPasswordInput } from "../validators/user.validator";

interface UseUpdateUserPasswordOptions {
  onSuccess?: (response: ApiResponse<{ message: string }>) => void;
  onError?: (error: string) => void;
}

// Hook to update user password using Supabase auth
export function useUpdateUserPassword(options?: UseUpdateUserPasswordOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      data: ZResetPasswordInput
    ): Promise<ApiResponse<{ message: string }>> => {
      const supabase = createClient();

      // Update user password using Supabase
      const { data: userData, error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        // Map Supabase errors to our API response format
        let message = "Failed to update password";

        if (error.message.includes("New password should be different")) {
          message = "New password must be different from your current password";
        } else if (error.message.includes("Password should be")) {
          message = "Password does not meet security requirements";
        } else if (error.message.includes("User not found")) {
          message = "User session expired. Please sign in again";
        } else if (error.message.includes("rate limit")) {
          message = "Too many password update attempts. Please try again later";
        }

        throw new Error(message);
      }

      if (!userData.user) {
        throw new Error("Failed to update password");
      }

      // Return success response
      return {
        success: true,
        data: {
          message: "Password updated successfully",
        },
        message: "Your password has been updated successfully",
      };
    },
    onSuccess: (result) => {
      // Invalidate user-related queries since the user data might have changed
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-session"] });

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
