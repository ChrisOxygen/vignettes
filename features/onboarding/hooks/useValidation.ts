import { useCallback } from "react";
import { validateOnboardingForm, validateField } from "../validators";
import type { OnboardingFormData, OnboardingAction } from "../types";

interface UseValidationProps {
  formData: OnboardingFormData;
  dispatch: React.Dispatch<OnboardingAction>;
}

export const useValidation = ({ formData, dispatch }: UseValidationProps) => {
  // Validate entire form and update errors
  const validateFormData = useCallback(() => {
    const result = validateOnboardingForm(formData);

    if (!result.success && result.errors) {
      // Clear all existing errors first
      dispatch({ type: "CLEAR_ALL_ERRORS" });

      // Set new validation errors
      Object.entries(result.errors).forEach(([field, error]) => {
        if (field !== "general") {
          dispatch({
            type: "SET_FIELD_ERROR",
            field: field as keyof OnboardingFormData,
            error,
          });
        }
      });
    } else {
      // Clear all errors if validation passes
      dispatch({ type: "CLEAR_ALL_ERRORS" });
    }

    return result;
  }, [formData, dispatch]);

  // Validate single field
  const validateSingleField = useCallback(
    (field: keyof OnboardingFormData, value: string) => {
      const result = validateField(field, value);

      if (!result.success && result.error) {
        dispatch({ type: "SET_FIELD_ERROR", field, error: result.error });
      } else {
        dispatch({ type: "CLEAR_FIELD_ERROR", field });
      }

      return result;
    },
    [dispatch]
  );

  return {
    validateFormData,
    validateSingleField,
  };
};
