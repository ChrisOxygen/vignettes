import type {
  OnboardingState,
  OnboardingAction,
  OnboardingFormData,
  CountryCode,
} from "../types";

// Initial form data
export const initialFormData: OnboardingFormData = {
  fullLegalName: "",
  currentCountryOfResidence: "" as CountryCode,
  nationality: "" as CountryCode,
  dateOfBirth: "",
  phoneNumber: "",
  passportNumber: "",
};

// Initial state
export const initialState: OnboardingState = {
  formData: initialFormData,
  isSubmitting: false,
  isSubmitted: false,
  errors: {},
  touchedFields: {},
};

// Reducer function
export function onboardingReducer(
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
        // Mark field as touched and clear error when user starts typing
        touchedFields: {
          ...state.touchedFields,
          [action.field]: true,
        },
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

    case "SET_FIELD_TOUCHED":
      return {
        ...state,
        touchedFields: {
          ...state.touchedFields,
          [action.field]: true,
        },
      };

    case "SET_MULTIPLE_FIELDS_TOUCHED":
      return {
        ...state,
        touchedFields: {
          ...state.touchedFields,
          ...action.fields.reduce(
            (acc, field) => ({ ...acc, [field]: true }),
            {}
          ),
        },
      };

    case "CLEAR_TOUCHED_FIELDS":
      return {
        ...state,
        touchedFields: {},
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
        touchedFields: {},
      };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
}
