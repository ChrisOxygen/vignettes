"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _createBasicApplicantData } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import type { OnboardingFormData } from "../types";

interface UseCreateBasicApplicantDataOptions {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
}

// Hook to create basic applicant data and update auth metadata
export function useCreateBasicApplicantData(
  options?: UseCreateBasicApplicantDataOptions
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: OnboardingFormData): Promise<ApiResponse> => {
      return await _createBasicApplicantData(data);
    },
    onSuccess: (result) => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["user-session"] });
      queryClient.invalidateQueries({ queryKey: ["basic-applicant-data"] });

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
