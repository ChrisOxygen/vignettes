import { OnboardingProvider } from "@/features/onboarding/context";
import React from "react";

function OnboardingPageLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}

export default OnboardingPageLayout;
