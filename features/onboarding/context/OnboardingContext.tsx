"use client";

import React, { createContext, useContext, useReducer, useMemo } from "react";
import { COUNTRIES } from "../constants";
import {
  onboardingReducer,
  initialState,
  initialFormData,
} from "../reducer/onboardingReducer";
import { loadFromStorage, isBrowserEnvironment } from "../utils/storageUtils";
import {
  getCountryLabelOptimized as getCountryLabel,
  getCountryFlagOptimized as getCountryFlag,
  getCountryDataOptimized as getCountryData,
  getCountryCode,
  isValidCountryCode,
} from "../utils/countryUtils";
import { useStorage, useValidation, useFormActions } from "../hooks";
import type {
  CountryCode,
  OnboardingContextType,
  OnboardingProviderProps,
} from "../types";

// Re-export CONSTANTS and types for convenience
export { COUNTRIES };
export type { CountryCode } from "../types";

// Create context
const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({
  children,
  initialData,
}: OnboardingProviderProps) {
  // Initialize state with data from storage on first load
  const getInitialState = useMemo(() => {
    if (isBrowserEnvironment()) {
      const storedData = loadFromStorage();
      if (storedData) {
        return {
          ...initialState,
          formData: { ...initialFormData, ...storedData, ...initialData },
        };
      }
    }
    return {
      ...initialState,
      formData: { ...initialFormData, ...initialData },
    };
  }, [initialData]);

  const [state, dispatch] = useReducer(onboardingReducer, getInitialState);

  // Custom hooks for different functionalities
  const formActions = useFormActions({ dispatch });
  const { validateFormData, validateSingleField } = useValidation({
    formData: state.formData,
    dispatch,
  });
  const {
    saveFormDataToStorage,
    clearFormDataFromStorage,
    loadFormDataFromStorage,
  } = useStorage({
    formData: state.formData,
    dispatch,
  });

  // Computed values for touched field tracking
  const hasTouchedFields = useMemo(
    () => Object.keys(state.touchedFields).length > 0,
    [state.touchedFields]
  );

  const hasAllRequiredFieldsTouched = useMemo(() => {
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "maritalStatus",
      "nationality",
      "countryOfResidence",
      "phoneNumber",
      "email",
      "passportNumber",
    ];
    return requiredFields.every((field) => field in state.touchedFields);
  }, [state.touchedFields]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo<OnboardingContextType>(
    () => ({
      state,
      dispatch,
      // Form actions (memoized in useFormActions)
      ...formActions,
      // Country-specific helpers (memoized with Map lookup)
      getCountryLabel,
      getCountryFlag,
      getCountryData,
      getCountryCode,
      isValidCountryCode,
      countries: COUNTRIES,
      // Validation functions (memoized in useValidation)
      validateFormData,
      validateSingleField,
      // Storage functions (memoized in useStorage)
      saveFormDataToStorage,
      clearFormDataFromStorage,
      loadFormDataFromStorage,
      // Touched field computed values
      hasTouchedFields,
      hasAllRequiredFieldsTouched,
    }),
    [
      state,
      dispatch,
      formActions,
      validateFormData,
      validateSingleField,
      saveFormDataToStorage,
      clearFormDataFromStorage,
      loadFormDataFromStorage,
      hasTouchedFields,
      hasAllRequiredFieldsTouched,
    ]
  );

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

// Re-export utility functions for convenience
export {
  getCountryLabel,
  getCountryFlag,
  getCountryData,
  getCountryCode,
  isValidCountryCode,
} from "../utils/countryUtils";
