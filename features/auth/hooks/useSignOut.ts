"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/features/shared/types/api";

interface UseSignOutOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

// Hook to sign out the current user using Supabase auth
export function useSignOut(options?: UseSignOutOptions) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (): Promise<ApiResponse<null>> => {
      const supabase = createClient();

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message || "Failed to sign out");
      }

      return {
        success: true,
        data: null,
        message: "Successfully signed out",
      };
    },
    onSuccess: () => {
      // Clear all cached queries
      queryClient.clear();

      // Call the success callback if provided
      options?.onSuccess?.();

      // Redirect to login page
      router.push("/sign-in");
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
    signOut: mutation.mutate,
    reset: mutation.reset,
  };
}
