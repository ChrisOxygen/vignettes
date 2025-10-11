"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useFormState } from "./FormStateContext";
import type {
  FormSelectorsContextValue,
  FormSelectorsProviderProps,
} from "../types";

// Create selectors context
const FormSelectorsContext = createContext<
  FormSelectorsContextValue | undefined
>(undefined);

// Provider component for form selectors
export function FormSelectorsProvider({
  children,
}: FormSelectorsProviderProps) {
  const { state } = useFormState();

  // Memoized selectors to prevent unnecessary re-renders
  const selectors = useMemo(() => {
    const getFieldValue = (fieldName: string) => {
      return state.formData[fieldName];
    };

    const getFieldError = (fieldName: string) => {
      return state.errors[fieldName];
    };

    const isFieldTouched = (fieldName: string) => {
      return state.touched[fieldName] || false;
    };

    const hasUnsavedChanges = () => {
      return state.isDirty;
    };

    return {
      getFieldValue,
      getFieldError,
      isFieldTouched,
      hasUnsavedChanges,
      isFormValid: state.isValid,
      isDirty: state.isDirty,
      isSubmitting: state.isSubmitting,
      formType: state.formType,
    };
  }, [state]);

  return (
    <FormSelectorsContext.Provider value={selectors}>
      {children}
    </FormSelectorsContext.Provider>
  );
}

// Hook to use form selectors context
export function useFormSelectors() {
  const context = useContext(FormSelectorsContext);
  if (context === undefined) {
    throw new Error(
      "useFormSelectors must be used within a FormSelectorsProvider"
    );
  }
  return context;
}
