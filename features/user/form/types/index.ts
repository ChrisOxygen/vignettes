import { FormType } from "@prisma/client";

// Form field value types
export type FormFieldValue = string | number | boolean | Date | File | null;

// Form data structure - flexible to handle all form types
export interface FormData {
  [fieldName: string]:
    | FormFieldValue
    | { value: FormFieldValue; explanation?: string };
}

// Form field error structure
export interface FormFieldErrors {
  [fieldName: string]: string | undefined;
}

// Form state interface
export interface FormState {
  formType: FormType | null;
  formData: FormData;
  errors: FormFieldErrors;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  touched: Record<string, boolean>;
}

// Form action types
export type FormAction =
  | {
      type: "INITIALIZE_FORM";
      payload: { formType: FormType; data?: FormData };
    }
  | {
      type: "SET_FIELD_VALUE";
      payload: {
        fieldName: string;
        value: FormFieldValue | { value: FormFieldValue; explanation?: string };
      };
    }
  | {
      type: "SET_FIELD_ERROR";
      payload: { fieldName: string; error: string | undefined };
    }
  | { type: "SET_MULTIPLE_ERRORS"; payload: FormFieldErrors }
  | { type: "CLEAR_ERRORS" }
  | { type: "SET_TOUCHED"; payload: { fieldName: string; touched: boolean } }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "RESET_FORM" }
  | { type: "VALIDATE_FORM" }
  | { type: "LOAD_SAVED_DATA"; payload: FormData };

// Context interface types
export interface FormStateContextValue {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}

export interface FormActionsContextValue {
  // Core actions
  initializeForm: (formType: FormType, data?: FormData) => void;
  setFieldValue: (
    fieldName: string,
    value: FormFieldValue | { value: FormFieldValue; explanation?: string }
  ) => void;
  setFieldError: (fieldName: string, error: string | undefined) => void;
  setMultipleErrors: (errors: FormFieldErrors) => void;
  clearErrors: () => void;
  setFieldTouched: (fieldName: string, touched: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  validateForm: () => void;
  resetForm: () => void;
  loadSavedData: (data: FormData) => void;
}

export interface FormSelectorsContextValue {
  // Computed values
  getFieldValue: (
    fieldName: string
  ) =>
    | FormFieldValue
    | { value: FormFieldValue; explanation?: string }
    | undefined;
  getFieldError: (fieldName: string) => string | undefined;
  isFieldTouched: (fieldName: string) => boolean;
  hasUnsavedChanges: () => boolean;
  // Form-level computed values
  isFormValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  formType: string | null;
}

// Provider props types
export interface FormProviderProps {
  children: React.ReactNode;
}

export interface FormStateProviderProps {
  children: React.ReactNode;
}

export interface FormActionsProviderProps {
  children: React.ReactNode;
}

export interface FormSelectorsProviderProps {
  children: React.ReactNode;
}
