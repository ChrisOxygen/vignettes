"use client";

import { useFormActions } from "../context/FormActionsContext";
import { useFormSelectors } from "../context/FormSelectorsContext";
import { useFormState } from "../context/FormStateContext";

// Hook for form initialization and data management
export function useFormData() {
  const { state } = useFormState();
  const { initializeForm, loadSavedData, resetForm } = useFormActions();
  const { hasUnsavedChanges, isDirty } = useFormSelectors();

  return {
    formType: state.formType,
    formData: state.formData,
    isDirty,
    hasUnsavedChanges,
    initializeForm,
    loadSavedData,
    resetForm,
  };
}
