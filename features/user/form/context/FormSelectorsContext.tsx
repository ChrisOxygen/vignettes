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
      // Safe access to form data with type assertion for flexibility
      return (state.formData as Record<string, any>)[fieldName];
    };

    const getFieldError = (fieldName: string) => {
      // First check for direct error on the field
      if (state.errors[fieldName]) {
        return state.errors[fieldName];
      }

      // For conditional fields, check for nested .value error
      const valueError = state.errors[`${fieldName}.value`];
      if (valueError) {
        return valueError;
      }

      // Also check for explanation errors if needed
      const explanationError = state.errors[`${fieldName}.explanation`];
      if (explanationError) {
        return explanationError;
      }

      return undefined;
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
