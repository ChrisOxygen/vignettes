import { useCallback, useMemo } from "react";
import type { OnboardingFormData, OnboardingAction } from "../types";

interface UseFormActionsProps {
  dispatch: React.Dispatch<OnboardingAction>;
}

export const useFormActions = ({ dispatch }: UseFormActionsProps) => {
  // Field update actions
  const updateField = useCallback(
    (field: keyof OnboardingFormData, value: string) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    [dispatch]
  );

  const updateMultipleFields = useCallback(
    (fields: Partial<OnboardingFormData>) => {
      dispatch({ type: "UPDATE_MULTIPLE_FIELDS", fields });
    },
    [dispatch]
  );

  // Error management actions
  const setFieldError = useCallback(
    (field: keyof OnboardingFormData, error: string) => {
      dispatch({ type: "SET_FIELD_ERROR", field, error });
    },
    [dispatch]
  );

  const clearFieldError = useCallback(
    (field: keyof OnboardingFormData) => {
      dispatch({ type: "CLEAR_FIELD_ERROR", field });
    },
    [dispatch]
  );

  const clearAllErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ALL_ERRORS" });
  }, [dispatch]);

  // Touched field management actions
  const setFieldTouched = useCallback(
    (field: keyof OnboardingFormData) => {
      dispatch({ type: "SET_FIELD_TOUCHED", field });
    },
    [dispatch]
  );

  const clearTouchedFields = useCallback(() => {
    dispatch({ type: "CLEAR_TOUCHED_FIELDS" });
  }, [dispatch]);

  // State management actions
  const setSubmitting = useCallback(
    (isSubmitting: boolean) => {
      dispatch({ type: "SET_SUBMITTING", isSubmitting });
    },
    [dispatch]
  );

  const setSubmitted = useCallback(
    (isSubmitted: boolean) => {
      dispatch({ type: "SET_SUBMITTED", isSubmitted });
    },
    [dispatch]
  );

  // Form reset actions
  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
  }, [dispatch]);

  const resetState = useCallback(() => {
    dispatch({ type: "RESET_STATE" });
  }, [dispatch]);

  // Return memoized actions object
  return useMemo(
    () => ({
      updateField,
      updateMultipleFields,
      setFieldError,
      clearFieldError,
      clearAllErrors,
      setFieldTouched,
      clearTouchedFields,
      setSubmitting,
      setSubmitted,
      resetForm,
      resetState,
    }),
    [
      updateField,
      updateMultipleFields,
      setFieldError,
      clearFieldError,
      clearAllErrors,
      setFieldTouched,
      clearTouchedFields,
      setSubmitting,
      setSubmitted,
      resetForm,
      resetState,
    ]
  );
};
