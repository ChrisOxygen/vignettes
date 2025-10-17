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

  return z.object(schemaFields);
};
