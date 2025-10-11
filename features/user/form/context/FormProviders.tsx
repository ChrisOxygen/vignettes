"use client";

import React from "react";
import { FormStateProvider } from "./FormStateContext";
import { FormActionsProvider } from "./FormActionsContext";
import { FormSelectorsProvider } from "./FormSelectorsContext";
import type { FormProviderProps } from "../types";

export function FormProvider({ children }: FormProviderProps) {
  return (
    <FormStateProvider>
      <FormActionsProvider>
        <FormSelectorsProvider>{children}</FormSelectorsProvider>
      </FormActionsProvider>
    </FormStateProvider>
  );
}

// Note: Individual providers and context hooks are not re-exported
// as they are only used internally within the form system.
// External consumers should use the application-level hooks instead.
