import { EB1AQuestionnaireFormData } from "@/features/external-view/validators/eb1a.validator";
import { EB2NIWQuestionnaireFormData } from "@/features/external-view/validators/eb2niw.validator";

// Assessment Type Enum
export enum AssessmentType {
  USEB1A = "USEB1A",
  EB2NIW = "EB2NIW",
  UK_GLOBAL_TALENT = "UK_GLOBAL_TALENT",
}

// Reuse Zod-inferred types from validators (single source of truth)
export type UsEb1aData = EB1AQuestionnaireFormData;
export type Eb2NiwData = EB2NIWQuestionnaireFormData;

// TODO: Add more assessment data types as validators are created
// export type UkGlobalTalentData = UKGlobalTalentQuestionnaireFormData;

// Union type for all assessment data
export type AssessmentData = UsEb1aData | Eb2NiwData; // Add more: | UkGlobalTalentData
