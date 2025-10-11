"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { useFormState } from "./FormStateContext";
import { useCreateOrUpdateFormSubmission } from "../hooks";
import { FORM_CONSTANTS } from "@/shared/constants";
import {
  FORM_SCHEMAS,
  validateFormData as zodValidateFormData,
} from "../validators";
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
  const { state, dispatch } = useFormState();

  // Save-related state
  const [submissionId, setSubmissionId] = useState<string | undefined>();
  const [documentStatus, setDocumentStatus] = useState<
    "unsaved" | "saved" | "saving"
  >("unsaved");
  const [currentSaveMode, setCurrentSaveMode] = useState<
    "draft" | "submit" | null
  >(null);

  // Hook for API calls
  const { mutate: upsertSubmission, isPending } =
    useCreateOrUpdateFormSubmission({
      onSuccess: (response) => {
        if (response.success && response.data?.submissionId) {
          setSubmissionId(response.data.submissionId);
          setDocumentStatus("saved");
        } else {
          setDocumentStatus("unsaved");
        }
        setCurrentSaveMode(null);
      },
      onError: () => {
        setDocumentStatus("unsaved");
        setCurrentSaveMode(null);
      },
    });

  // Memoized action creators to prevent re-renders
  const initializeForm = useCallback(
    (formType: FormType, data?: FormData) => {
      dispatch({
        type: "INITIALIZE_FORM",
        payload: {
          formType: formType as keyof typeof FORM_SCHEMAS,
          data: data as any,
        },
      });
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

  // Use the centralized Zod validation function
  const validateFormData = useCallback(
    (formData: FormData, isDraft: boolean = false) => {
      if (!state.formType) {
        throw new Error("Form type not initialized");
      }

      // Use the centralized validation function from validators
      return zodValidateFormData(state.formType, formData, isDraft);
    },
    [state.formType]
  );

  // Save form action
  const saveForm = useCallback(
    (isDraft: boolean): void => {
      if (!state.formType) {
        console.error("Form type not initialized");
        return;
      }

      // Set current save mode and status
      setCurrentSaveMode(isDraft ? "draft" : "submit");
      setDocumentStatus("saving");

      // Validate form data
      const validation = validateFormData(state.formData as any, isDraft);

      if (!validation.success) {
        // Set validation errors in context - convert Zod errors to our format
        const flatErrors: FormFieldErrors = {};
        validation.error.issues.forEach((issue) => {
          const fieldPath = issue.path.join(".");
          flatErrors[fieldPath] = issue.message;
        });
        dispatch({ type: "SET_MULTIPLE_ERRORS", payload: flatErrors });

        setDocumentStatus("unsaved");
        setCurrentSaveMode(null);
        return;
      }

      // Clear any existing errors
      dispatch({ type: "CLEAR_ERRORS" });

      // Call API using mutate - result will be handled by hook callbacks
      // Let Zod handle serialization/deserialization
      upsertSubmission({
        formType: state.formType,
        formData: state.formData,
        isDraft,
        submissionId,
      });
    },
    [
      state.formType,
      state.formData,
      submissionId,
      validateFormData,
      upsertSubmission,
      dispatch,
    ]
  );

  // Computed states based on isPending and currentSaveMode
  const isSaving = isPending;
  const isDraftSaving = isPending && currentSaveMode === "draft";
  const isSubmittingForm = isPending && currentSaveMode === "submit";

  // Memoize context value
  const contextValue = React.useMemo(
    () => ({
      // Core actions
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
      // Save actions and state
      saveForm,
      isSaving,
      isDraftSaving,
      isSubmittingForm,
      submissionId,
      documentStatus,
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
      saveForm,
      isSaving,
      isDraftSaving,
      isSubmittingForm,
      submissionId,
      documentStatus,
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
