import { FIELD_CONFIGS, YES_NO_FIELD_CONFIGS } from "../constants";

/**
 * Generates default values for all form fields
 */
export const generateDefaultValues = () => {
  const defaults: any = {};

  // Regular fields - empty strings
  Object.keys(FIELD_CONFIGS).forEach((key) => {
    defaults[key] = "";
  });

  // Yes/No fields - default to "No" with empty explanation
  Object.keys(YES_NO_FIELD_CONFIGS).forEach((key) => {
    defaults[key] = { value: "No" as const, explanation: "" };
  });

  return defaults;
};
