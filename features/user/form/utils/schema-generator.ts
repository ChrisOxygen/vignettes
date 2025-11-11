import * as z from "zod";
import { FormType } from "@prisma/client";
import { createFieldValidation, createYesNoValidation } from "./validation";
import { FORM_FIELD_CONFIGS } from "../constants";

/**
 * Generates a form-specific schema from field configurations based on formType
 * @param formType - The type of form to generate schema for
 * @returns Zod schema for the specified form type
 */
export const generateFormSchema = (formType: FormType) => {
  const formConfig = FORM_FIELD_CONFIGS[formType];
  const schemaFields: any = {};

  // Regular fields
  Object.entries(formConfig.fields).forEach(([key, config]) => {
    schemaFields[key] = createFieldValidation(config);
  });

  // Yes/No fields
  Object.entries(formConfig.yesNoFields).forEach(([key, config]) => {
    schemaFields[key] = createYesNoValidation(
      config.conditionalExplanation?.errorMessage ||
        "Please provide explanation"
    );
  });

  // Create base schema
  const baseSchema = z.object(schemaFields);

  // Form-specific conditional validation
  if (formType === FormType.APPLICANT_INFO) {
    // Add conditional validation for dateOfMarriage based on maritalStatus
    return baseSchema.refine(
      (data) => {
        const maritalStatus = data.maritalStatus as string;
        const dateOfMarriage = data.dateOfMarriage as string | undefined;

        // If married or common-law, date of marriage is required
        if (maritalStatus === "Married" || maritalStatus === "Common-law") {
          return dateOfMarriage && dateOfMarriage.trim().length > 0;
        }

        // For other statuses, date of marriage is not required
        return true;
      },
      {
        message:
          "Date of Marriage is required when marital status is Married or Common-law",
        path: ["dateOfMarriage"],
      }
    );
  }

  // Return base schema for other form types
  return baseSchema;
};
