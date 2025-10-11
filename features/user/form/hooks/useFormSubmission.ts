"use client";

import { useFormActions } from "../context/FormActionsContext";
import { useFormState } from "../context/FormStateContext";

// Hook for form submission operations
export function useFormSubmission() {
  const { state } = useFormState();
  const { setSubmitting } = useFormActions();

  return {
    isSubmitting: state.isSubmitting,
    setSubmitting,
    formData: state.formData,
    formType: state.formType,
  };
}
