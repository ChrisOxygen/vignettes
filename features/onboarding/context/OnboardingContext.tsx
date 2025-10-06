"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { COUNTRIES } from "../constants";

// Re-export COUNTRIES for convenience
export { COUNTRIES };

// Derive country code type from COUNTRIES constant
export type CountryCode = (typeof COUNTRIES)[number]["value"];

// Helper functions for country code/label conversion
export const getCountryLabel = (code: CountryCode): string => {
  const country = COUNTRIES.find((c) => c.value === code);
  return country?.label || code;
};

export const getCountryFlag = (code: CountryCode): string => {
  const country = COUNTRIES.find((c) => c.value === code);
  return country?.flag || "";
};

export const getCountryData = (code: CountryCode) => {
  const country = COUNTRIES.find((c) => c.value === code);
  return country || null;
};

export const getCountryCode = (label: string): CountryCode | null => {
  const country = COUNTRIES.find((c) => c.label === label);
  return country?.value || null;
};

export const isValidCountryCode = (code: string): code is CountryCode => {
  return COUNTRIES.some((c) => c.value === code);
};

// Types for the onboarding form data
export interface OnboardingFormData {
  fullLegalName: string;
  currentCountryOfResidence: CountryCode;
  nationality: CountryCode;
  dateOfBirth: string;
  phoneNumber: string;
  passportNumber: string;
}

export interface OnboardingState {
  formData: OnboardingFormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: Partial<Record<keyof OnboardingFormData, string>>;
}

// Action types
export type OnboardingAction =
  | { type: "UPDATE_FIELD"; field: keyof OnboardingFormData; value: string }
  | { type: "UPDATE_MULTIPLE_FIELDS"; fields: Partial<OnboardingFormData> }
  | { type: "SET_FIELD_ERROR"; field: keyof OnboardingFormData; error: string }
  | { type: "CLEAR_FIELD_ERROR"; field: keyof OnboardingFormData }
  | { type: "CLEAR_ALL_ERRORS" }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_SUBMITTED"; isSubmitted: boolean }
  | { type: "RESET_FORM" }
  | { type: "RESET_STATE" };

// Initial state
const initialFormData: OnboardingFormData = {
  fullLegalName: "",
  currentCountryOfResidence: "" as CountryCode,
  nationality: "" as CountryCode,
  dateOfBirth: "",
  phoneNumber: "",
  passportNumber: "",
};

const initialState: OnboardingState = {
  formData: initialFormData,
  isSubmitting: false,
  isSubmitted: false,
  errors: {},
};

// Reducer function
function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        // Clear error for this field when user starts typing
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case "UPDATE_MULTIPLE_FIELDS":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.fields,
        },
      };

    case "SET_FIELD_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };

    case "CLEAR_FIELD_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case "CLEAR_ALL_ERRORS":
      return {
        ...state,
        errors: {},
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case "SET_SUBMITTED":
      return {
        ...state,
        isSubmitted: action.isSubmitted,
        isSubmitting: false, // Stop submitting when submitted
      };

    case "RESET_FORM":
      return {
        ...state,
        formData: initialFormData,
        errors: {},
      };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
}

// Context type
interface OnboardingContextType {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
  // Helper functions
  updateField: (field: keyof OnboardingFormData, value: string) => void;
  updateMultipleFields: (fields: Partial<OnboardingFormData>) => void;
  setFieldError: (field: keyof OnboardingFormData, error: string) => void;
  clearFieldError: (field: keyof OnboardingFormData) => void;
  clearAllErrors: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitted: (isSubmitted: boolean) => void;
  resetForm: () => void;
  resetState: () => void;
  // Country-specific helpers
  updateCountryField: (
    field: "currentCountryOfResidence" | "nationality",
    countryCode: CountryCode
  ) => void;
  getCountryLabel: (code: CountryCode) => string;
  getCountryFlag: (code: CountryCode) => string;
  getCountryData: (code: CountryCode) => (typeof COUNTRIES)[number] | null;
  getCountryCode: (label: string) => CountryCode | null;
  isValidCountryCode: (code: string) => code is CountryCode;
  countries: typeof COUNTRIES;
  // Computed values
  isFormValid: boolean;
  hasErrors: boolean;
  completedFields: number;
  completionPercentage: number;
}

// Create context
const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

// Provider component
interface OnboardingProviderProps {
  children: ReactNode;
  initialData?: Partial<OnboardingFormData>;
}

export function OnboardingProvider({
  children,
  initialData,
}: OnboardingProviderProps) {
  const [state, dispatch] = useReducer(onboardingReducer, {
    ...initialState,
    formData: { ...initialFormData, ...initialData },
  });

  // Helper functions
  const updateField = (field: keyof OnboardingFormData, value: string) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const updateMultipleFields = (fields: Partial<OnboardingFormData>) => {
    dispatch({ type: "UPDATE_MULTIPLE_FIELDS", fields });
  };

  const setFieldError = (field: keyof OnboardingFormData, error: string) => {
    dispatch({ type: "SET_FIELD_ERROR", field, error });
  };

  const clearFieldError = (field: keyof OnboardingFormData) => {
    dispatch({ type: "CLEAR_FIELD_ERROR", field });
  };

  const clearAllErrors = () => {
    dispatch({ type: "CLEAR_ALL_ERRORS" });
  };

  const setSubmitting = (isSubmitting: boolean) => {
    dispatch({ type: "SET_SUBMITTING", isSubmitting });
  };

  const setSubmitted = (isSubmitted: boolean) => {
    dispatch({ type: "SET_SUBMITTED", isSubmitted });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const resetState = () => {
    dispatch({ type: "RESET_STATE" });
  };

  // Country-specific helper functions
  const updateCountryField = (
    field: "currentCountryOfResidence" | "nationality",
    countryCode: CountryCode
  ) => {
    dispatch({ type: "UPDATE_FIELD", field, value: countryCode });
  };

  // Computed values
  const isFormValid =
    Object.values(state.formData).every((value) => value.trim() !== "") &&
    Object.keys(state.errors).length === 0;

  const hasErrors = Object.values(state.errors).some(
    (error) => error !== undefined
  );

  const completedFields = Object.values(state.formData).filter(
    (value) => value.trim() !== ""
  ).length;

  const completionPercentage = Math.round(
    (completedFields / Object.keys(state.formData).length) * 100
  );

  const contextValue: OnboardingContextType = {
    state,
    dispatch,
    updateField,
    updateMultipleFields,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    setSubmitting,
    setSubmitted,
    resetForm,
    resetState,
    // Country-specific helpers
    updateCountryField,
    getCountryLabel,
    getCountryFlag,
    getCountryData,
    getCountryCode,
    isValidCountryCode,
    countries: COUNTRIES,
    // Computed values
    isFormValid,
    hasErrors,
    completedFields,
    completionPercentage,
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom hook to use the onboarding context
export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }

  return context;
}

// Export types for external use
export type { OnboardingContextType };
