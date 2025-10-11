"use client";

import { useFormActions } from "../context/FormActionsContext";
import { useFormSelectors } from "../context/FormSelectorsContext";
import { useFormState } from "../context/FormStateContext";

// Hook for form errors management
export function useFormErrors() {
  const { state } = useFormState();
  const { setFieldError, setMultipleErrors, clearErrors } = useFormActions();
  const { getFieldError } = useFormSelectors();

  return {
    errors: state.errors,
    isValid: state.isValid,
    getFieldError,
    setFieldError,
    setMultipleErrors,
    clearErrors,
  };
}
