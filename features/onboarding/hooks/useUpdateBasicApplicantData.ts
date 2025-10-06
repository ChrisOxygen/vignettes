"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _updateBasicApplicantData } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import type { OnboardingFormData } from "../types";

interface UseUpdateBasicApplicantDataOptions {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: string) => void;
}

// Hook to update existing basic applicant data
export function useUpdateBasicApplicantData(
  options?: UseUpdateBasicApplicantDataOptions
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: OnboardingFormData): Promise<ApiResponse> => {
      return await _updateBasicApplicantData(data);
    },
    onSuccess: (result) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ["basic-applicant-data"] });
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
    data: mutation.data || null,
    reset: mutation.reset,
  };
}
