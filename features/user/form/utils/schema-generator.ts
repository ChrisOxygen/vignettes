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

  if (formType === FormType.FAMILY_MEMBERS_INFO) {
    // Family members have complex nested structure with N/A handling
    // Create schema for a single family member
    const familyMemberSchema = z.object({
      notApplicable: z.boolean().optional(),
      relationship: z.string().optional(),
      lastName: z.string().optional(),
      givenNames: z.string().optional(),
      familyNameAtBirth: z.string().optional(),
      maritalStatus: z.string().optional(),
      dateOfBirth: z.string().optional(),
      townCityOfBirth: z.string().optional(),
      countryOfBirth: z.string().optional(),
      dateOfDeath: z.string().optional(),
      residenceAddress: z.string().optional(),
      occupation: z.string().optional(),
      accompanyToUK: z
        .object({
          value: z.enum(["Yes", "No"]).optional(),
          explanation: z.string().optional(),
        })
        .optional(),
    });

    // Flow questions schema
    const flowSchema = z.object({
      hasAdditionalBiologicalSons: z
        .object({
          value: z.enum(["Yes", "No"]).optional(),
          explanation: z.string().optional(),
        })
        .optional(),
      hasAdditionalBiologicalDaughters: z
        .object({
          value: z.enum(["Yes", "No"]).optional(),
          explanation: z.string().optional(),
        })
        .optional(),
      hasAdditionalStepSons: z
        .object({
          value: z.enum(["Yes", "No"]).optional(),
          explanation: z.string().optional(),
        })
        .optional(),
      hasAdditionalStepDaughters: z
        .object({
          value: z.enum(["Yes", "No"]).optional(),
          explanation: z.string().optional(),
        })
        .optional(),
      hasAdditionalAdoptedSons: z
        .object({
          value: z.enum(["Yes", "No"]).optional(),
          explanation: z.string().optional(),
        })
        .optional(),
      hasAdditionalAdoptedDaughters: z
        .object({
          value: z.enum(["Yes", "No"]).optional(),
          explanation: z.string().optional(),
        })
        .optional(),
      hasBrothersOrSisters: z
        .object({
          value: z.enum(["Yes", "No"]).optional(),
          explanation: z.string().optional(),
        })
        .optional(),
    });

    // Full family members schema
    return z.object({
      // Required family members
      father: familyMemberSchema,
      mother: familyMemberSchema,
      spouse: familyMemberSchema,
      exSpouse: familyMemberSchema,
      // Biological children
      son1Biological: familyMemberSchema,
      son2Biological: familyMemberSchema.optional(),
      daughter1Biological: familyMemberSchema,
      daughter2Biological: familyMemberSchema.optional(),
      // Step children
      stepSon1: familyMemberSchema,
      stepSon2: familyMemberSchema.optional(),
      stepDaughter1: familyMemberSchema,
      stepDaughter2: familyMemberSchema.optional(),
      // Adopted children
      son1Adopted: familyMemberSchema,
      son2Adopted: familyMemberSchema.optional(),
      daughter1Adopted: familyMemberSchema,
      daughter2Adopted: familyMemberSchema.optional(),
      // Siblings - dynamic array
      siblings: z.array(familyMemberSchema).optional(),
      // Flow control questions
      flow: flowSchema,
    });
  }

  // Return base schema for other form types
  return baseSchema;
};
