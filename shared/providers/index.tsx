"use client";

import { ReactNode } from "react";
import TanstackQueryProvider from "./TanstackQueryProvider";
import { AuthProvider } from "./AuthProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanstackQueryProvider>
  );
}

// Re-export for convenience
export { useAuth, useUser, useUserRole } from "./AuthProvider";
