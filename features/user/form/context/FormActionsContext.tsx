"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useFormState } from "./FormStateContext";
import type {
  FormData,
  FormFieldValue,
  FormFieldErrors,
  FormActionsContextValue,
  FormActionsProviderProps,
} from "../types";
import { FormType } from "@prisma/client";

// Create actions context
const FormActionsContext = createContext<FormActionsContextValue | undefined>(
  undefined
);

export function FormActionsProvider({ children }: FormActionsProviderProps) {
  const { dispatch } = useFormState();

  // Memoized action creators to prevent re-renders
  const initializeForm = useCallback(
    (formType: FormType, data?: FormData) => {
      dispatch({ type: "INITIALIZE_FORM", payload: { formType, data } });
    },
    [dispatch]
  );

  const setFieldValue = useCallback(
    (
      fieldName: string,
      value: FormFieldValue | { value: FormFieldValue; explanation?: string }
    ) => {
      dispatch({ type: "SET_FIELD_VALUE", payload: { fieldName, value } });
    },
    [dispatch]
  );

  const setFieldError = useCallback(
    (fieldName: string, error: string | undefined) => {
      dispatch({ type: "SET_FIELD_ERROR", payload: { fieldName, error } });
    },
    [dispatch]
  );

  const setMultipleErrors = useCallback(
    (errors: FormFieldErrors) => {
      dispatch({ type: "SET_MULTIPLE_ERRORS", payload: errors });
    },
    [dispatch]
  );

  const clearErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" });
  }, [dispatch]);

  const setFieldTouched = useCallback(
    (fieldName: string, touched: boolean) => {
      dispatch({ type: "SET_TOUCHED", payload: { fieldName, touched } });
    },
    [dispatch]
  );

  const setSubmitting = useCallback(
    (isSubmitting: boolean) => {
      dispatch({ type: "SET_SUBMITTING", payload: isSubmitting });
    },
    [dispatch]
  );

  const validateForm = useCallback(() => {
    dispatch({ type: "VALIDATE_FORM" });
  }, [dispatch]);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
  }, [dispatch]);

  const loadSavedData = useCallback(
    (data: FormData) => {
      dispatch({ type: "LOAD_SAVED_DATA", payload: data });
    },
    [dispatch]
  );

  // Memoize context value
  const contextValue = React.useMemo(
    () => ({
      initializeForm,
      setFieldValue,
      setFieldError,
      setMultipleErrors,
      clearErrors,
      setFieldTouched,
      setSubmitting,
      validateForm,
      resetForm,
      loadSavedData,
    }),
    [
      initializeForm,
      setFieldValue,
      setFieldError,
      setMultipleErrors,
      clearErrors,
      setFieldTouched,
      setSubmitting,
      validateForm,
      resetForm,
      loadSavedData,
    ]
  );

  return (
    <FormActionsContext.Provider value={contextValue}>
      {children}
    </FormActionsContext.Provider>
  );
}

// Hook to use form actions context
export function useFormActions() {
  const context = useContext(FormActionsContext);
  if (context === undefined) {
    throw new Error("useFormActions must be used within a FormActionsProvider");
  }
  return context;
}
