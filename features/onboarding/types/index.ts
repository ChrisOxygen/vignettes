import { COUNTRIES } from "../constants";

// Derive country code type from COUNTRIES constant
export type CountryCode = (typeof COUNTRIES)[number]["value"];

// Types for the onboarding form data
export interface OnboardingFormData {
  fullLegalName: string;
  dateOfBirth: string;
  phoneNumber: string;
  passportNumber: string;
}

export interface OnboardingState {
  formData: OnboardingFormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: Partial<Record<keyof OnboardingFormData, string>>;
  touchedFields: Partial<Record<keyof OnboardingFormData, boolean>>;
}

// Action types
export type OnboardingAction =
  | { type: "UPDATE_FIELD"; field: keyof OnboardingFormData; value: string }
  | { type: "UPDATE_MULTIPLE_FIELDS"; fields: Partial<OnboardingFormData> }
  | { type: "SET_FIELD_ERROR"; field: keyof OnboardingFormData; error: string }
  | { type: "CLEAR_FIELD_ERROR"; field: keyof OnboardingFormData }
  | { type: "CLEAR_ALL_ERRORS" }
  | { type: "SET_FIELD_TOUCHED"; field: keyof OnboardingFormData }
  | {
      type: "SET_MULTIPLE_FIELDS_TOUCHED";
      fields: (keyof OnboardingFormData)[];
    }
  | { type: "CLEAR_TOUCHED_FIELDS" }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_SUBMITTED"; isSubmitted: boolean }
  | { type: "RESET_FORM" }
  | { type: "RESET_STATE" };

// Context type
export interface OnboardingContextType {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
  // Helper functions
  updateField: (field: keyof OnboardingFormData, value: string) => void;
  updateMultipleFields: (fields: Partial<OnboardingFormData>) => void;
  setFieldError: (field: keyof OnboardingFormData, error: string) => void;
  clearFieldError: (field: keyof OnboardingFormData) => void;
  clearAllErrors: () => void;
  setFieldTouched: (field: keyof OnboardingFormData) => void;
  clearTouchedFields: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitted: (isSubmitted: boolean) => void;
  resetForm: () => void;
  resetState: () => void;
  // Validation functions
  validateFormData: () => {
    success: boolean;
    data: OnboardingFormData | null;
    errors: Record<string, string> | null;
  };
  validateSingleField: (
    field: keyof OnboardingFormData,
    value: string
  ) => {
    success: boolean;
    error: string | null;
  };
  // Storage functions
  saveFormDataToStorage: () => void;
  clearFormDataFromStorage: () => void;
  loadFormDataFromStorage: () => Partial<OnboardingFormData> | null;
  // Touched field computed values
  hasTouchedFields: boolean;
  hasAllRequiredFieldsTouched: boolean;
}

// Provider component props
export interface OnboardingProviderProps {
  children: React.ReactNode;
  initialData?: Partial<OnboardingFormData>;
}
