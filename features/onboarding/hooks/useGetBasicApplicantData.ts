"use client";

import { useQuery } from "@tanstack/react-query";
import { _getBasicApplicantData } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import { ApiErrorCode } from "@/features/shared/types/error";
import type { BasicApplicantData } from "@prisma/client";

// Type for BasicApplicantData with formatted date string (for frontend consumption)
type BasicApplicantDataFormatted = Omit<BasicApplicantData, "dateOfBirth"> & {
  dateOfBirth: string;
};

interface UseGetBasicApplicantDataOptions {
  enabled?: boolean;
  retry?: boolean | number;
}

// Hook to get basic applicant data for current user
export function useGetBasicApplicantData(
  options?: UseGetBasicApplicantDataOptions
) {
  const query = useQuery({
    queryKey: ["basic-applicant-data"],
    queryFn: async (): Promise<BasicApplicantDataFormatted | null> => {
      const result = await _getBasicApplicantData();

      if (result.success && result.data) {
        return result.data;
      }

      // If the error is that data doesn't exist, return null instead of throwing
      if (result.error === ApiErrorCode.RESOURCE_NOT_FOUND) {
        return null;
      }

      // For other errors, throw to trigger error state
      throw new Error(result.message);
    },
    enabled: options?.enabled ?? true,
    retry: options?.retry ?? false, // Don't retry by default for auth-related queries
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error?.message || null,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
    // Computed values for better UX
    hasBasicApplicantData: query.isSuccess && query.data !== null,
    needsOnboarding: query.isSuccess && query.data === null,
  };
}
