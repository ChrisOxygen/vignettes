import { FormType } from "@prisma/client";
import type { FieldConfig, RadioFieldConfig } from "../types";

import {
  APPLICANT_INFO_FIELDS,
  APPLICANT_INFO_YES_NO_FIELDS,
} from "./fields/applicant-info";
import {
  EX_SPOUSE_INFO_FIELDS,
  EX_SPOUSE_INFO_YES_NO_FIELDS,
} from "./fields/ex-spouse-info";
import {
  FAMILY_MEMBERS_FIELDS,
  FAMILY_MEMBERS_YES_NO_FIELDS,
} from "./fields/family-members";
import {
  RELATIVE_ABROAD_FIELD_CONFIGS,
  RELATIVES_ABROAD_CONTROL,
} from "./fields/relatives-abroad";
import {
  WORK_BUSINESS_FIELD_CONFIGS,
  WORK_BUSINESS_CONTROL,
} from "./fields/work-business";
import { EDUCATION_FIELD_CONFIGS } from "./fields/education";

export interface FormFieldConfiguration {
  fields: Record<string, FieldConfig>;
  yesNoFields: Record<string, RadioFieldConfig>;
}

/**
 * Central mapping of FormType enum values to their field configurations
 * Each form type has its own set of regular fields and yes/no fields
 */
export const FORM_FIELD_CONFIGS: Record<FormType, FormFieldConfiguration> = {
  [FormType.APPLICANT_INFO]: {
    fields: APPLICANT_INFO_FIELDS,
    yesNoFields: APPLICANT_INFO_YES_NO_FIELDS,
  },
  [FormType.EX_SPOUSE_INFO]: {
    fields: EX_SPOUSE_INFO_FIELDS,
    yesNoFields: EX_SPOUSE_INFO_YES_NO_FIELDS,
  },
  // Placeholder for future forms - will be implemented as needed
  [FormType.FAMILY_MEMBERS_INFO]: {
    fields: FAMILY_MEMBERS_FIELDS,
    yesNoFields: FAMILY_MEMBERS_YES_NO_FIELDS,
  },
  [FormType.RELATIVES_ABROAD_INFO]: {
    fields: RELATIVE_ABROAD_FIELD_CONFIGS,
    yesNoFields: RELATIVES_ABROAD_CONTROL,
  },
  [FormType.WORK_AND_BUSINESS_INFO]: {
    fields: WORK_BUSINESS_FIELD_CONFIGS,
    yesNoFields: WORK_BUSINESS_CONTROL,
  },
  [FormType.EDUCATION_INFO]: {
    fields: EDUCATION_FIELD_CONFIGS,
    yesNoFields: {},
  },
  [FormType.VISA_AND_PERMITS_INFO]: {
    fields: {},
    yesNoFields: {},
  },
  [FormType.PREVIOUS_TRAVEL_INFO]: {
    fields: {},
    yesNoFields: {},
  },
  [FormType.SECURITY_AND_STATUTORY_QUESTIONS]: {
    fields: {},
    yesNoFields: {},
  },
};
