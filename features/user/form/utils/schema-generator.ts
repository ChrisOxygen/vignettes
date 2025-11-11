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

    // Flow questions schema - only siblings question now
    const flowSchema = z.object({
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
      // Dynamic arrays for children
      biologicalSons: z.array(familyMemberSchema).optional(),
      biologicalDaughters: z.array(familyMemberSchema).optional(),
      stepSons: z.array(familyMemberSchema).optional(),
      stepDaughters: z.array(familyMemberSchema).optional(),
      adoptedSons: z.array(familyMemberSchema).optional(),
      adoptedDaughters: z.array(familyMemberSchema).optional(),
      // Siblings - separate arrays for brothers and sisters
      brothers: z.array(familyMemberSchema).optional(),
      sisters: z.array(familyMemberSchema).optional(),
      // Section-level N/A checkboxes
      biologicalSonsNA: z.boolean().optional(),
      biologicalDaughtersNA: z.boolean().optional(),
      stepSonsNA: z.boolean().optional(),
      stepDaughtersNA: z.boolean().optional(),
      adoptedSonsNA: z.boolean().optional(),
      adoptedDaughtersNA: z.boolean().optional(),
      brothersNA: z.boolean().optional(),
      sistersNA: z.boolean().optional(),
    });
  }

  if (formType === FormType.RELATIVES_ABROAD_INFO) {
    // Relatives abroad have simple structure with N/A checkbox
    // Create schema for a single relative
    const relativeAbroadSchema = z.object({
      relationship: z.string().optional(),
      lastName: z.string().optional(),
      givenNames: z.string().optional(),
      familyNameAtBirth: z.string().optional(),
      countryOfBirth: z.string().optional(),
      immigrationStatusAbroad: z.string().optional(),
      residenceAddress: z.string().optional(),
      occupation: z.string().optional(),
    });

    // Full relatives abroad schema
    return z.object({
      relativesInUK: z.array(relativeAbroadSchema).optional(),
      relativesInUKNA: z.boolean().optional(),
    });
  }

  if (formType === FormType.WORK_AND_BUSINESS_INFO) {
    // Work & Business form with array of work entries
    // Create schema for a single work entry
    const workEntrySchema = z.object({
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
      employerName: z.string().optional(),
      cityCountry: z.string().optional(),
      jobTitle: z.string().optional(),
      employmentType: z.string().optional(),
      employmentNature: z.string().optional(),
      monthlyEarnings: z.string().optional(),
      jobDescription: z.string().optional(),
    });

    // Full work & business schema
    return z.object({
      workHistory: z.array(workEntrySchema).optional(),
      workHistoryNA: z.boolean().optional(),
    });
  }

  if (formType === FormType.EDUCATION_INFO) {
    // Education form with 4 arrays for different education levels
    // Create schema for a single education entry
    const educationEntrySchema = z.object({
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
      schoolName: z.string().optional(),
      cityTownRegion: z.string().optional(),
      countryTerritory: z.string().optional(),
      programFieldOfStudy: z.string().optional(),
      degreeLevel: z.string().optional(),
    });

    // Full education schema with 4 arrays and 4 N/A checkboxes
    return z.object({
      elementaryPrimary: z.array(educationEntrySchema).optional(),
      secondaryHighSchool: z.array(educationEntrySchema).optional(),
      universityCollege: z.array(educationEntrySchema).optional(),
      tradeSchoolOther: z.array(educationEntrySchema).optional(),
      elementaryPrimaryNA: z.boolean().optional(),
      secondaryHighSchoolNA: z.boolean().optional(),
      universityCollegeNA: z.boolean().optional(),
      tradeSchoolOtherNA: z.boolean().optional(),
    });
  }

  if (formType === FormType.PREVIOUS_TRAVEL_INFO) {
    // Previous Travel form with array of travel entries
    // Create schema for a single travel entry
    const travelEntrySchema = z.object({
      fromDate: z.string().optional(),
      toDate: z.string().optional(),
      lengthOfStay: z.string().optional(),
      destination: z.string().optional(),
      purposeOfTravel: z.string().optional(),
      residentAddress: z.string().optional(),
      familyMembers: z.string().optional(),
    });

    // Full travel history schema
    return z.object({
      travelHistory: z.array(travelEntrySchema).optional(),
      travelHistoryNA: z.boolean().optional(),
    });
  }

  if (formType === FormType.VISA_AND_PERMITS_INFO) {
    // Visa & Permits form with array of visa/permit entries
    // Create schema for a single visa/permit entry
    const visaPermitEntrySchema = z.object({
      countryAppliedTo: z.string().optional(),
      applicationDate: z.string().optional(),
      visaPermitType: z.string().optional(),
      applicationOutcome: z.string().optional(),
      outcomeDate: z.string().optional(),
      familyMembers: z.string().optional(),
    });

    // Full visa/permit history schema
    return z.object({
      visaPermitHistory: z.array(visaPermitEntrySchema).optional(),
      visaPermitHistoryNA: z.boolean().optional(),
    });
  }

  // Return base schema for other form types
  return baseSchema;
};
