"use client";

import { useQuery } from "@tanstack/react-query";
import { _getComments } from "../actions/comments.actions";

interface UseCommentsOptions {
  enabled?: boolean;
}

/**
 * Hook to fetch comments for a specific form submission
 * Automatically refetches when submission ID changes
 */
export function useComments(
  submissionId: string | null | undefined,
  options?: UseCommentsOptions
) {
  return useQuery({
    queryKey: ["comments", submissionId],
    queryFn: async () => {
      if (!submissionId) {
        return { success: true, data: [], message: "No submission ID" };
      }

      const result = await _getComments(submissionId);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result;
    },
    enabled: !!submissionId && (options?.enabled ?? true),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true,
  });
}
