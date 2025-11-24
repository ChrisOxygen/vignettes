import { useQuery } from "@tanstack/react-query";
import { _getAllFormSubmissions } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import {
  AdminFormSubmissionFilters,
  FormSubmissionWithUser,
  UseAllFormSubmissionsOptions,
} from "../types";

/**
 * Hook to fetch all form submissions with optional filters
 * Admin-only - returns submissions from all users
 */
export function useAllFormSubmissions({
  filters,
  enabled = true,
}: UseAllFormSubmissionsOptions = {}) {
  return useQuery({
    queryKey: ["admin", "formSubmissions", filters],
    queryFn: async (): Promise<FormSubmissionWithUser[]> => {
      const response: ApiResponse<FormSubmissionWithUser[]> =
        await _getAllFormSubmissions(filters);

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    },
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}
