"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import { FormType } from "@/shared/constants";

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

// Initial state
const initialState: FormState = {
  formType: null,
  formData: {},
  errors: {},
  isSubmitting: false,
  isDirty: false,
  isValid: false,
  touched: {},
};

// Form reducer function
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "INITIALIZE_FORM":
      return {
        ...initialState,
        formType: action.payload.formType,
        formData: action.payload.data || {},
      };

    case "SET_FIELD_VALUE":
      const newFormData = {
        ...state.formData,
        [action.payload.fieldName]: action.payload.value,
      };

      return {
        ...state,
        formData: newFormData,
        isDirty: true,
        // Clear field error when value changes
        errors: {
          ...state.errors,
          [action.payload.fieldName]: undefined,
        },
      };

    case "SET_FIELD_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.fieldName]: action.payload.error,
        },
        isValid: action.payload.error ? false : state.isValid,
      };

    case "SET_MULTIPLE_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
        isValid: Object.keys(action.payload).length === 0,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
        isValid: true,
      };

    case "SET_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.fieldName]: action.payload.touched,
        },
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case "RESET_FORM":
      return {
        ...initialState,
        formType: state.formType,
      };

    case "VALIDATE_FORM":
      // This will be handled by validation logic
      // For now, just update the isValid flag based on errors
      const hasErrors = Object.values(state.errors).some(
        (error) => error !== undefined
      );
      return {
        ...state,
        isValid: !hasErrors,
      };

    case "LOAD_SAVED_DATA":
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
        isDirty: true,
      };

    default:
      return state;
  }
}

// Context interface
interface FormContextValue {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  // Helper functions
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
}

// Create context
const FormContext = createContext<FormContextValue | undefined>(undefined);

// Provider component
interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Helper functions
  const initializeForm = useCallback((formType: FormType, data?: FormData) => {
    dispatch({ type: "INITIALIZE_FORM", payload: { formType, data } });
  }, []);

  const setFieldValue = useCallback(
    (
      fieldName: string,
      value: FormFieldValue | { value: FormFieldValue; explanation?: string }
    ) => {
      dispatch({ type: "SET_FIELD_VALUE", payload: { fieldName, value } });
    },
    []
  );

  const setFieldError = useCallback(
    (fieldName: string, error: string | undefined) => {
      dispatch({ type: "SET_FIELD_ERROR", payload: { fieldName, error } });
    },
    []
  );

  const setMultipleErrors = useCallback((errors: FormFieldErrors) => {
    dispatch({ type: "SET_MULTIPLE_ERRORS", payload: errors });
  }, []);

  const clearErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" });
  }, []);

  const setFieldTouched = useCallback((fieldName: string, touched: boolean) => {
    dispatch({ type: "SET_TOUCHED", payload: { fieldName, touched } });
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: "SET_SUBMITTING", payload: isSubmitting });
  }, []);

  const validateForm = useCallback(() => {
    dispatch({ type: "VALIDATE_FORM" });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
  }, []);

  const loadSavedData = useCallback((data: FormData) => {
    dispatch({ type: "LOAD_SAVED_DATA", payload: data });
  }, []);

  // Computed values
  const getFieldValue = useCallback(
    (fieldName: string) => {
      return state.formData[fieldName];
    },
    [state.formData]
  );

  const getFieldError = useCallback(
    (fieldName: string) => {
      return state.errors[fieldName];
    },
    [state.errors]
  );

  const isFieldTouched = useCallback(
    (fieldName: string) => {
      return state.touched[fieldName] || false;
    },
    [state.touched]
  );

  const hasUnsavedChanges = useCallback(() => {
    return state.isDirty;
  }, [state.isDirty]);

  const contextValue: FormContextValue = {
    state,
    dispatch,
    initializeForm,
    setFieldValue,
    setFieldError,
    setMultipleErrors,
    clearErrors,
    setFieldTouched,
    setSubmitting,
    validateForm,
    resetForm,
    loadSavedData,
    getFieldValue,
    getFieldError,
    isFieldTouched,
    hasUnsavedChanges,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}

// Custom hook to use form context
export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}

// Additional specialized hooks for common use cases
export function useFormField(fieldName: string) {
  const {
    getFieldValue,
    getFieldError,
    isFieldTouched,
    setFieldValue,
    setFieldTouched,
  } = useForm();

  const setValue = useCallback(
    (value: FormFieldValue | { value: FormFieldValue; explanation?: string }) =>
      setFieldValue(fieldName, value),
    [setFieldValue, fieldName]
  );

  const setTouched = useCallback(
    (touched: boolean) => setFieldTouched(fieldName, touched),
    [setFieldTouched, fieldName]
  );

  return {
    value: getFieldValue(fieldName),
    error: getFieldError(fieldName),
    touched: isFieldTouched(fieldName),
    setValue,
    setTouched,
  };
}

export function useFormValidation() {
  const { state, setFieldError, setMultipleErrors, clearErrors, validateForm } =
    useForm();

  return {
    errors: state.errors,
    isValid: state.isValid,
    setFieldError,
    setMultipleErrors,
    clearErrors,
    validateForm,
  };
}

export function useFormSubmission() {
  const { state, setSubmitting } = useForm();

  return {
    isSubmitting: state.isSubmitting,
    setSubmitting,
    formData: state.formData,
    formType: state.formType,
  };
}
