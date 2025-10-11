import { FormType } from "@prisma/client";
import { ZodError } from "zod";
import type { FormDataTypes, GetFormDataType } from "../validators";

// Legacy form field value types (kept for backward compatibility)
export type FormFieldValue = string | number | boolean | Date | File | null;

// Schema-first form data types - use Zod-derived types
export type FormData = FormDataTypes[keyof FormDataTypes];

// Helper type to get specific form data type
export type FormDataForType<T extends keyof FormDataTypes> = GetFormDataType<T>;

// Form field error structure - supports both legacy string errors and Zod errors
export interface FormFieldErrors {
  [fieldName: string]: string | undefined;
}

// Enhanced error types that support Zod validation
export type FormValidationError = ZodError | string | null;
export type FormValidationResult = {
  isValid: boolean;
  error?: ZodError;
  data?: FormData;
};

// Form state interface - now schema-aware
export interface FormState<
  T extends keyof FormDataTypes = keyof FormDataTypes,
> {
  formType: T | null;
  formData: FormDataForType<T> | Record<string, any>; // Allow fallback for uninitialized state
  errors: FormFieldErrors;
  validationError?: ZodError; // Store Zod validation errors separately
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  touched: Record<string, boolean>;
}

// Form action types - enhanced with schema-aware types
export type FormAction<T extends keyof FormDataTypes = keyof FormDataTypes> =
  | {
      type: "INITIALIZE_FORM";
      payload: { formType: T; data?: Partial<FormDataForType<T>> };
    }
  | {
      type: "SET_FIELD_VALUE";
      payload: {
        fieldName: string;
        value: any; // Keep flexible for complex field structures
      };
    }
  | {
      type: "SET_FIELD_ERROR";
      payload: { fieldName: string; error: string | undefined };
    }
  | { type: "SET_MULTIPLE_ERRORS"; payload: FormFieldErrors }
  | { type: "SET_VALIDATION_ERROR"; payload: ZodError | null }
  | { type: "CLEAR_ERRORS" }
  | { type: "SET_TOUCHED"; payload: { fieldName: string; touched: boolean } }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "RESET_FORM" }
  | { type: "VALIDATE_FORM" }
  | { type: "LOAD_SAVED_DATA"; payload: Partial<FormDataForType<T>> }
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
  // Save actions
  saveForm: (isDraft: boolean) => void;
  // Save state
  isSaving: boolean;
  isDraftSaving: boolean;
  isSubmittingForm: boolean;
  submissionId?: string;
  documentStatus: "unsaved" | "saved" | "saving";
}

export interface SaveFormResult {
  success: boolean;
  submissionId?: string;
  validationErrors?: Record<string, string[]>;
  status: "draft" | "submitted" | "error";
  message: string;
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

// =============================================================================
// SCHEMA-AWARE UTILITY TYPES
// =============================================================================

// Type-safe form initialization
export type InitializeFormPayload<T extends keyof FormDataTypes> = {
  formType: T;
  data?: Partial<FormDataForType<T>>;
};

// Type-safe field value setter
export type SetFieldValuePayload = {
  fieldName: string;
  value: any; // Keep flexible for various field structures
};

// Enhanced form hook return types
export interface UseFormReturn<T extends keyof FormDataTypes> {
  formType: T | null;
  formData: FormDataForType<T> | Record<string, any>;
  errors: FormFieldErrors;
  validationError?: ZodError;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  touched: Record<string, boolean>;

  // Actions
  setFieldValue: (fieldName: string, value: any) => void;
  setFieldError: (fieldName: string, error: string | undefined) => void;
  validateForm: () => FormValidationResult;
  submitForm: (isDraft?: boolean) => Promise<void>;
  resetForm: () => void;
}
