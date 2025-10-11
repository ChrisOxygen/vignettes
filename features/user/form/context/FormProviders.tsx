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

// Re-export individual providers for flexibility
export { FormStateProvider } from "./FormStateContext";
export { FormActionsProvider } from "./FormActionsContext";
export { FormSelectorsProvider } from "./FormSelectorsContext";

// Re-export hooks
export { useFormState } from "./FormStateContext";
export { useFormActions } from "./FormActionsContext";
export { useFormSelectors } from "./FormSelectorsContext";

// Re-export types
export type {
  FormType,
  FormData,
  FormFieldValue,
  FormFieldErrors,
  FormState,
  FormAction,
} from "../types";
