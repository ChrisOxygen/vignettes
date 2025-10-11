import { FormState, FormAction } from "../../types";

// Initial state
export const initialFormState: FormState = {
  formType: null,
  formData: {},
  errors: {},
  isSubmitting: false,
  isDirty: false,
  isValid: false,
  touched: {},
};

// Form reducer function
export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "INITIALIZE_FORM":
      return {
        ...initialFormState,
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
        ...initialFormState,
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
