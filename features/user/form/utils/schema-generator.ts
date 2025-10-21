import * as z from "zod";
import { createFieldValidation, createYesNoValidation } from "./validation";
import { FIELD_CONFIGS, YES_NO_FIELD_CONFIGS } from "../constants";

/**
 * Generates the complete form schema from field configurations
 */
export const generateFormSchema = () => {
  const schemaFields: any = {};

  // Regular fields
  Object.entries(FIELD_CONFIGS).forEach(([key, config]) => {
    schemaFields[key] = createFieldValidation(config);
  });

  // Yes/No fields
  Object.entries(YES_NO_FIELD_CONFIGS).forEach(([key, config]) => {
    schemaFields[key] = createYesNoValidation(
      config.conditionalExplanation?.errorMessage ||
        "Please provide explanation"
    );
  });

  // Create base schema
  const baseSchema = z.object(schemaFields);

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
};
