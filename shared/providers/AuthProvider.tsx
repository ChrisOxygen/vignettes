"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_QUERY_KEY = ["auth", "session"] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const supabase = createClient();

  // Use TanStack Query for initial session fetching
  const {
    data: session,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Failed to get session:", error);
        // Don't throw error, just return null to treat as unauthenticated
        return null;
      }

      return session;
    },
    staleTime: Infinity, // Session data is event-driven, no need to refetch
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1, // Only retry once on failure
  });

  const user = session?.user ?? null;

  // Listen for real-time auth changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(
        "Auth state change:",
        event,
        session?.user?.email || "no user"
      );

      // Update the query cache when auth state changes
      queryClient.setQueryData(AUTH_QUERY_KEY, session);

      // Handle specific auth events
      if (event === "SIGNED_OUT") {
        // Clear all user-related queries when signed out
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey.some(
              (key) =>
                typeof key === "string" &&
                (key.includes("user") ||
                  key.includes("properties") ||
                  key.includes("admin"))
            );
          },
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient, supabase.auth]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // Clear the auth query cache
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      // Optionally invalidate other queries that depend on auth
      queryClient.invalidateQueries({
        predicate: (query) => {
          // Invalidate any queries that might contain user-specific data
          return query.queryKey.some(
            (key) =>
              typeof key === "string" &&
              (key.includes("user") ||
                key.includes("properties") ||
                key.includes("admin"))
          );
        },
      });

      // Immediately redirect to sign-in page
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session: session ?? null,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook for getting just the current user (commonly used)
export function useUser() {
  const { user } = useAuth();
  return user;
}

// Hook for checking if user has specific role
export function useUserRole() {
  const { user } = useAuth();
  return user?.user_metadata?.role as "ADMIN" | "USER" | undefined;
}
