import { useQuery } from "@tanstack/react-query";
import { _getSubmissionStatistics } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";
import { SubmissionStatistics, UseSubmissionStatisticsOptions } from "../types";

/**
 * Hook to fetch submission statistics for admin dashboard
 * Admin-only - provides aggregated statistics across all submissions
 */
export function useSubmissionStatistics({
  enabled = true,
  refetchInterval,
}: UseSubmissionStatisticsOptions = {}) {
  return useQuery({
    queryKey: ["admin", "statistics"],
    queryFn: async (): Promise<SubmissionStatistics> => {
      const response: ApiResponse<SubmissionStatistics> =
        await _getSubmissionStatistics();

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("No statistics data found");
      }

      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval,
  });
}
