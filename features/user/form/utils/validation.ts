import * as z from "zod";
import type { FieldConfig, RadioFieldConfig } from "../types";

/**
 * Creates validation schema for Yes/No fields with conditional explanation
 */
export const createYesNoValidation = (errorMessage: string) =>
  z
    .object({
      value: z.enum(["Yes", "No"], { message: "Please select an option" }),
      explanation: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.value === "Yes") {
          return data.explanation && data.explanation.trim().length > 0;
        }
        return true;
      },
      {
        message: errorMessage,
        path: ["explanation"],
      }
    );

/**
 * Creates validation schema based on field configuration
 */
export const createFieldValidation = (config: FieldConfig) => {
  // Build validation based on field requirements
  if (!config.required) {
    // Optional field - allow empty string or undefined
    let optionalValidation = z.string().optional().or(z.literal(""));

    // Add format validations only if value is provided
    if (config.type === "date") {
      optionalValidation = z
        .string()
        .refine(
          (val) => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
          "Please enter date in DD/MM/YYYY format"
        )
        .optional()
        .or(z.literal(""));
    }

    if (config.maxLength) {
      optionalValidation = z
        .string()
        .max(
          config.maxLength,
          `${config.label} must be at most ${config.maxLength} characters`
        )
        .optional()
        .or(z.literal(""));
    }

    return optionalValidation;
  }

  // Required field validation
  let validation = z.string().min(1, `${config.label} is required`);

  if (config.minLength) {
    validation = validation.min(
      config.minLength,
      `${config.label} must be at least ${config.minLength} characters`
    );
  }

  if (config.maxLength) {
    validation = validation.max(
      config.maxLength,
      `${config.label} must be at most ${config.maxLength} characters`
    );
  }

  if (config.type === "email") {
    validation = validation.email("Please enter a valid email address");
  }

  if (config.type === "tel") {
    validation = validation.regex(
      /^\+?[\d\s-()]+$/,
      "Please enter a valid phone number"
    );
  }

  if (config.type === "date") {
    validation = validation.regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Please enter date in DD/MM/YYYY format"
    );
  }

  return validation;
};
