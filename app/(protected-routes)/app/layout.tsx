"use client";

import { useCurrentUser } from "@/features/auth/hooks";
import UserOnboardingPage from "@/features/onboarding/components/UserOnboardingPage";
import FullScreenLoader from "@/shared/components/FullScreenLoader";

function AppRoutesLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCurrentUser();
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return <main className="">{children}</main>;
}

export default AppRoutesLayout;
