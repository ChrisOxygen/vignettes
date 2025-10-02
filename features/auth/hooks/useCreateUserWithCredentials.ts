"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ZUserCreationData } from "../validators/user.validator";

import { _createUser } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";

interface UseCreateUserOptions {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
}

// Hook to create a new user with email and password authentication
export function useCreateUser(options?: UseCreateUserOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ZUserCreationData): Promise<ApiResponse> => {
      const result = await _createUser(data);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: (result) => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });

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
