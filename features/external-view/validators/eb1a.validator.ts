import { z } from "zod";
import { BASIC_FIELD_CONFIGS, YES_NO_FIELD_CONFIGS } from "../constants/eb1a";

// Reusable validation patterns
const emailValidation = z
  .string()
  .email("Please enter a valid email address")
  .min(1, "Email is required");

const phoneValidation = z
  .string()
  .min(1, "Phone number is required")
  .regex(
    /^[\d\s\-\+\(\)]+$/,
    "Please enter a valid phone number with digits, spaces, dashes, or parentheses"
  );

const urlValidation = z
  .string()
  .url("Please enter a valid URL starting with http:// or https://")
  .or(z.literal(""))
  .optional();

const textFieldValidation = (config: {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  label: string;
}) => {
  let schema = z.string();

  if (config.required) {
    schema = schema.min(1, `${config.label} is required`);
  }

  if (config.minLength) {
    schema = schema.min(
      config.minLength,
      `${config.label} must be at least ${config.minLength} characters`
    );
  }

  if (config.maxLength) {
    schema = schema.max(
      config.maxLength,
      `${config.label} must not exceed ${config.maxLength} characters`
    );
  }

  return config.required ? schema : schema.or(z.literal("")).optional();
};

// Base schema for basic fields
const basicFieldsSchema = z.object({
  firstName: textFieldValidation({
    required: true,
    minLength: 1,
    maxLength: 50,
    label: "First Name",
  }),
  lastName: textFieldValidation({
    required: true,
    minLength: 1,
    maxLength: 50,
    label: "Last Name",
  }),
  email: emailValidation,
  phone: phoneValidation,
  linkedinProfile: urlValidation,
  immigrationStatus: textFieldValidation({
    required: false,
    maxLength: 500,
    label: "Immigration Status",
  }),
});

// Yes/No fields schema
const yesNoFieldsBaseSchema = z.object({
  ventureFunding: z.enum(["Yes", "No"]).optional(),
  ventureFunding_explanation: z.string().optional(),

  exclusiveAssociations: z.enum(["Yes", "No"]).optional(),
  exclusiveAssociations_explanation: z.string().optional(),

  startupAffiliation: z.enum(["Yes", "No"]).optional(),
  startupAffiliation_explanation: z.string().optional(),

  patents: z.enum(["Yes", "No"]).optional(),
  patents_explanation: z.string().optional(),

  awards: z.enum(["Yes", "No"]).optional(),
  awards_explanation: z.string().optional(),

  judgingExperience: z.enum(["Yes", "No"]).optional(),
  judgingExperience_explanation: z.string().optional(),

  reviewerExperience: z.enum(["Yes", "No"]).optional(),
  reviewerExperience_explanation: z.string().optional(),

  mediaCoverage: z.enum(["Yes", "No"]).optional(),
  mediaCoverage_explanation: z.string().optional(),

  scholarlyArticles: z.enum(["Yes", "No"]).optional(),
  scholarlyArticles_explanation: z.string().optional(),

  criticalEmployment: z.enum(["Yes", "No"]).optional(),
  criticalEmployment_explanation: z.string().optional(),

  highCompensation: z.enum(["Yes", "No"]).optional(),
  highCompensation_explanation: z.string().optional(),

  professionalAchievements: z.enum(["Yes", "No"]).optional(),
  professionalAchievements_explanation: z.string().optional(),
});

// Complete EB-1A schema with conditional validation
export const eb1aQuestionnaireSchema = basicFieldsSchema
  .merge(yesNoFieldsBaseSchema)
  .superRefine((data, ctx) => {
    // Validate conditional explanations for Yes/No fields
    Object.entries(YES_NO_FIELD_CONFIGS).forEach(([fieldName, config]) => {
      const fieldValue = data[fieldName as keyof typeof data];
      const explanationFieldName =
        `${fieldName}_explanation` as keyof typeof data;
      const explanationValue = data[explanationFieldName];

      if (
        config.conditionalExplanation &&
        fieldValue === config.conditionalExplanation.triggerValue
      ) {
        // Check if explanation is provided
        if (!explanationValue || explanationValue.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: config.conditionalExplanation.errorMessage,
            path: [explanationFieldName],
          });
        }

        // Check explanation max length (1000 chars for all fields)
        const MAX_EXPLANATION_LENGTH = 1000;
        if (
          explanationValue &&
          explanationValue.length > MAX_EXPLANATION_LENGTH
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Explanation must not exceed ${MAX_EXPLANATION_LENGTH} characters`,
            path: [explanationFieldName],
          });
        }
      }
    });

    // URL validation for LinkedIn profile
    if (data.linkedinProfile && data.linkedinProfile.trim() !== "") {
      try {
        new URL(data.linkedinProfile);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid URL",
          path: ["linkedinProfile"],
        });
      }
    }
  });

// Type inference
export type EB1AQuestionnaireFormData = z.infer<typeof eb1aQuestionnaireSchema>;

// Default values generator
export const getEB1ADefaultValues = (): Partial<EB1AQuestionnaireFormData> => {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinProfile: "",
    immigrationStatus: "",
    ventureFunding: undefined,
    ventureFunding_explanation: "",
    exclusiveAssociations: undefined,
    exclusiveAssociations_explanation: "",
    startupAffiliation: undefined,
    startupAffiliation_explanation: "",
    patents: undefined,
    patents_explanation: "",
    awards: undefined,
    awards_explanation: "",
    judgingExperience: undefined,
    judgingExperience_explanation: "",
    reviewerExperience: undefined,
    reviewerExperience_explanation: "",
    mediaCoverage: undefined,
    mediaCoverage_explanation: "",
    scholarlyArticles: undefined,
    scholarlyArticles_explanation: "",
    criticalEmployment: undefined,
    criticalEmployment_explanation: "",
    highCompensation: undefined,
    highCompensation_explanation: "",
    professionalAchievements: undefined,
    professionalAchievements_explanation: "",
  };
};

// Validation helper functions
export const validateEB1AField = (
  fieldName: keyof EB1AQuestionnaireFormData,
  value: unknown
) => {
  try {
    const fieldSchema = eb1aQuestionnaireSchema.shape[fieldName];
    if (fieldSchema) {
      fieldSchema.parse(value);
      return { success: true, error: null };
    }
    return { success: false, error: "Field not found" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message };
    }
    return { success: false, error: "Validation failed" };
  }
};

// Check if a field requires conditional explanation
export const requiresExplanation = (
  fieldName: string,
  value: string
): boolean => {
  const config = YES_NO_FIELD_CONFIGS[fieldName];
  return (
    !!config?.conditionalExplanation &&
    value === config.conditionalExplanation.triggerValue
  );
};
