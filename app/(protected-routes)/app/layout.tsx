"use client";

import { useCurrentUser } from "@/features/auth/hooks";
import FullScreenLoader from "@/shared/components/FullScreenLoader";

function AppRoutesLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCurrentUser();
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 rounded-lg">{children}</div>
  );
}

export default AppRoutesLayout;
