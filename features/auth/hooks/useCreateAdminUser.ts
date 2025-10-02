"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ZAdminUserCreationData } from "../validators/user.validator";
import { _createAdminUser } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";

interface UseCreateAdminUserOptions {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
}

// Hook to create admin user with invitation code validation
export function useCreateAdminUser(options?: UseCreateAdminUserOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ZAdminUserCreationData): Promise<ApiResponse> => {
      return await _createAdminUser(data);
    },
    onSuccess: (result) => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
      queryClient.invalidateQueries({ queryKey: ["admin-invitations"] });

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
