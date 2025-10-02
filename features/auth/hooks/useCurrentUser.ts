"use client";

import { useQuery } from "@tanstack/react-query";
import { _getCurrentUser } from "../actions";
import { User } from "@prisma/client";

interface UseCurrentUserOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

// Hook to get the current authenticated user
export function useCurrentUser(options?: UseCurrentUserOptions) {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const result = await _getCurrentUser();

      if (!result.success) {
        throw new Error(result.message || "Failed to get current user");
      }

      return result.data as User;
    },
    enabled: options?.enabled !== false,
    refetchOnWindowFocus: options?.refetchOnWindowFocus !== false,
    retry: (failureCount, error) => {
      // Don't retry if user is not authenticated
      if (error.message.includes("Not authenticated")) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error?.message || null,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
    isAuthenticated: query.isSuccess && !!query.data,
  };
}
