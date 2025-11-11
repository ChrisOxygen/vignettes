import { FormType } from "@prisma/client";
import { FORM_FIELD_CONFIGS } from "../constants";

/**
 * Generates default values for form fields based on formType
 * @param formType - The type of form to generate defaults for
 * @returns Object with default values for the specified form type
 */
export const generateDefaultValues = (formType: FormType) => {
  const formConfig = FORM_FIELD_CONFIGS[formType];
  const defaults: any = {};

  // Regular fields - empty strings
  Object.keys(formConfig.fields).forEach((key) => {
    defaults[key] = "";
  });

  // Yes/No fields - default to "No" with empty explanation
  Object.keys(formConfig.yesNoFields).forEach((key) => {
    defaults[key] = { value: "No" as const, explanation: "" };
  });

  return defaults;
};
