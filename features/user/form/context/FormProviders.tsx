"use client";

import { ReactNode } from "react";

export function FormProvider({ children }: { children: ReactNode }) {
  return <div className="">{children}</div>;
}

// Note: Individual providers and context hooks are not re-exported
// as they are only used internally within the form system.
// External consumers should use the application-level hooks instead.
