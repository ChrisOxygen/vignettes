import { EB1AQuestionnaireFormData } from "@/features/external-view/validators/eb1a.validator";

// Assessment Type Enum
export enum AssessmentType {
  USEB1A = "USEB1A",
  EB2NIW = "EB2NIW",
  UK_GLOBAL_TALENT = "UK_GLOBAL_TALENT",
}

// Reuse Zod-inferred types from validators (single source of truth)
export type UsEb1aData = EB1AQuestionnaireFormData;

// TODO: Add more assessment data types as validators are created
// export type Eb2NiwData = EB2NIWQuestionnaireFormData;
// export type UkGlobalTalentData = UKGlobalTalentQuestionnaireFormData;

// Union type for all assessment data
export type AssessmentData = UsEb1aData; // Add more: | Eb2NiwData | UkGlobalTalentData
