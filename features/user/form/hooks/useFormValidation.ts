"use client";

import { useFormActions } from "../context/FormActionsContext";
import { useFormState } from "../context/FormStateContext";

// Hook for form validation operations
export function useFormValidation() {
  const { state } = useFormState();
  const { setFieldError, setMultipleErrors, clearErrors, validateForm } =
    useFormActions();

  return {
    errors: state.errors,
    isValid: state.isValid,
    setFieldError,
    setMultipleErrors,
    clearErrors,
    validateForm,
  };
}
