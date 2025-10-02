"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { ZLoginInput } from "../validators/user.validator";
import { ApiResponse } from "@/features/shared/types/api";

interface UseSignInWithCredentialsOptions {
  onSuccess?: (response: ApiResponse<any>) => void;
  onError?: (error: string) => void;
}

// Hook to sign in user with email and password using Supabase auth
export function useSignInWithCredentials(
  options?: UseSignInWithCredentialsOptions
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ZLoginInput): Promise<ApiResponse<any>> => {
      try {
        console.log("Starting sign-in process...");
        const supabase = createClient();

        // First, sign in with Supabase
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (authError) {
          console.error("Supabase auth error:", authError);
          // Map Supabase errors to our API response format
          let message = "Invalid email or password";

          if (authError.message.includes("Email not confirmed")) {
            message = "Please verify your email address before signing in";
          } else if (authError.message.includes("Invalid login credentials")) {
            message = "Invalid email or password";
          } else if (authError.message.includes("Too many requests")) {
            message = "Too many login attempts. Please try again later";
          }

          throw new Error(message);
        }

        if (!authData.user) {
          console.error("No user data from Supabase");
          throw new Error("Authentication failed");
        }

        console.log("Supabase auth successful!");
        console.log("Sign-in process completed successfully");

        // Return a simple success response - the middleware will handle user session
        return {
          success: true,
          message: "User signed in successfully",
          data: authData.user,
        };
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
    onSuccess: (result) => {
      console.log("Mutation success:", result);
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-session"] });

      // Call the success callback with the API response
      if (result) {
        options?.onSuccess?.(result);
      }
    },
    onError: (error: Error) => {
      console.error("Mutation onError:", error);
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
