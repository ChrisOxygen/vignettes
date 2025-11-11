import type { FieldConfig, RadioFieldConfig } from "../../types";

export const EX_SPOUSE_INFO_FIELDS: Record<string, FieldConfig> = {
  exSpouseName: {
    name: "exSpouseName",
    label: "Ex-Spouse Name",
    description:
      "Enter your ex-spouse's full name. Write 'Not Applicable' if you have never previously divorced. Do not use ALL CAPS",
    type: "text",
    placeholder: "Enter ex-spouse's full name or 'Not Applicable'",
    required: false,
    maxLength: 100,
  },
  exSpouseDateOfBirth: {
    name: "exSpouseDateOfBirth",
    label: "Ex-Spouse Date of Birth",
    description: "Enter your ex-spouse's date of birth in YYYY-MM-DD format",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: false,
  },
  exMarriageDate: {
    name: "exMarriageDate",
    label: "Ex-Marriage Date",
    description:
      "Enter the date of your previous marriage in YYYY-MM-DD format",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: false,
  },
  exMarriageLocation: {
    name: "exMarriageLocation",
    label: "Ex-Marriage Location (City/Country)",
    description:
      "Enter the city and country where your previous marriage took place",
    type: "text",
    placeholder: "e.g., Lagos, Nigeria",
    required: false,
    maxLength: 100,
  },
  exDivorceDate: {
    name: "exDivorceDate",
    label: "Ex-Divorce Date",
    description: "Enter the date of your divorce in YYYY-MM-DD format",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: false,
  },
  exDivorceLocation: {
    name: "exDivorceLocation",
    label: "Ex-Divorce Location (City/Country)",
    description: "Enter the city and country where your divorce was finalized",
    type: "text",
    placeholder: "e.g., Lagos, Nigeria",
    required: false,
    maxLength: 100,
  },
};

export const EX_SPOUSE_INFO_YES_NO_FIELDS: Record<string, RadioFieldConfig> =
  {};
