import { z } from "zod";
import {
  EB2NIW_BASIC_FIELD_CONFIGS,
  EB2NIW_YES_NO_FIELD_CONFIGS,
} from "../constants/eb2niw";

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
  fieldOfExpertise: textFieldValidation({
    required: true,
    minLength: 1,
    maxLength: 100,
    label: "Field of Expertise",
  }),
  proposedEndeavor: textFieldValidation({
    required: true,
    minLength: 1,
    maxLength: 500,
    label: "Proposed Endeavor",
  }),
});

// Yes/No fields schema
const yesNoFieldsBaseSchema = z.object({
  advancedDegree: z.enum(["Yes", "No"]).optional(),
  advancedDegree_explanation: z.string().optional(),

  exceptionalAbility: z.enum(["Yes", "No"]).optional(),
  exceptionalAbility_explanation: z.string().optional(),

  substantialMerit: z.enum(["Yes", "No"]).optional(),
  substantialMerit_explanation: z.string().optional(),

  wellPositioned: z.enum(["Yes", "No"]).optional(),
  wellPositioned_explanation: z.string().optional(),

  waiveBeneficial: z.enum(["Yes", "No"]).optional(),
  waiveBeneficial_explanation: z.string().optional(),

  publications: z.enum(["Yes", "No"]).optional(),
  publications_explanation: z.string().optional(),

  citations: z.enum(["Yes", "No"]).optional(),
  citations_explanation: z.string().optional(),

  patents: z.enum(["Yes", "No"]).optional(),
  patents_explanation: z.string().optional(),

  awards: z.enum(["Yes", "No"]).optional(),
  awards_explanation: z.string().optional(),

  professionalMemberships: z.enum(["Yes", "No"]).optional(),
  professionalMemberships_explanation: z.string().optional(),

  reviewerExperience: z.enum(["Yes", "No"]).optional(),
  reviewerExperience_explanation: z.string().optional(),

  mediaAttention: z.enum(["Yes", "No"]).optional(),
  mediaAttention_explanation: z.string().optional(),

  collaborations: z.enum(["Yes", "No"]).optional(),
  collaborations_explanation: z.string().optional(),

  fundingGrants: z.enum(["Yes", "No"]).optional(),
  fundingGrants_explanation: z.string().optional(),
});

// Complete EB2NIW schema with conditional validation
export const eb2niwQuestionnaireSchema = basicFieldsSchema
  .merge(yesNoFieldsBaseSchema)
  .superRefine((data, ctx) => {
    // Validate conditional explanations for Yes/No fields
    Object.entries(EB2NIW_YES_NO_FIELD_CONFIGS).forEach(
      ([fieldName, config]) => {
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

          // Check explanation max length
          const maxLength = config.conditionalExplanation.maxLength || 1000;
          if (explanationValue && explanationValue.length > maxLength) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Explanation must not exceed ${maxLength} characters`,
              path: [explanationFieldName],
            });
          }
        }
      }
    );

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
export type EB2NIWQuestionnaireFormData = z.infer<
  typeof eb2niwQuestionnaireSchema
>;

// Default values generator
export const getEB2NIWDefaultValues =
  (): Partial<EB2NIWQuestionnaireFormData> => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedinProfile: "",
      immigrationStatus: "",
      fieldOfExpertise: "",
      proposedEndeavor: "",
      advancedDegree: undefined,
      advancedDegree_explanation: "",
      exceptionalAbility: undefined,
      exceptionalAbility_explanation: "",
      substantialMerit: undefined,
      substantialMerit_explanation: "",
      wellPositioned: undefined,
      wellPositioned_explanation: "",
      waiveBeneficial: undefined,
      waiveBeneficial_explanation: "",
      publications: undefined,
      publications_explanation: "",
      citations: undefined,
      citations_explanation: "",
      patents: undefined,
      patents_explanation: "",
      awards: undefined,
      awards_explanation: "",
      professionalMemberships: undefined,
      professionalMemberships_explanation: "",
      reviewerExperience: undefined,
      reviewerExperience_explanation: "",
      mediaAttention: undefined,
      mediaAttention_explanation: "",
      collaborations: undefined,
      collaborations_explanation: "",
      fundingGrants: undefined,
      fundingGrants_explanation: "",
    };
  };

// Helper to validate individual field
export const validateEB2NIWField = (
  fieldName: string,
  value: any
): { success: boolean; error?: string } => {
  try {
    const fieldSchema = (eb2niwQuestionnaireSchema.shape as any)[fieldName];
    if (fieldSchema) {
      fieldSchema.parse(value);
      return { success: true };
    }
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message };
    }
    return { success: false, error: "Validation failed" };
  }
};

// Helper to check if field requires explanation
export const requiresExplanation = (
  fieldName: string,
  value: string
): boolean => {
  const config = EB2NIW_YES_NO_FIELD_CONFIGS[fieldName];
  if (!config?.conditionalExplanation) return false;
  return value === config.conditionalExplanation.triggerValue;
};
