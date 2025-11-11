import type { FieldConfig, RadioFieldConfig } from "../../types";

// Field configuration for each relative abroad
export const RELATIVE_ABROAD_FIELD_CONFIGS: Record<string, FieldConfig> = {
  relationship: {
    name: "relationship",
    label: "Relationship",
    description:
      "Enter your relationship to this person. Use 'Not Applicable' if not applicable. Do not use ALL CAPS",
    type: "text",
    placeholder: "e.g., Uncle, Aunt, Cousin, Sibling",
    required: true,
    maxLength: 50,
  },
  lastName: {
    name: "lastName",
    label: "Last Name / Surname",
    description:
      "Enter relative's last name or surname. Use 'Not Applicable' if not applicable. Do not use ALL CAPS",
    type: "text",
    placeholder: "Enter last name",
    required: true,
    maxLength: 100,
  },
  givenNames: {
    name: "givenNames",
    label: "Given Name(s)",
    description:
      "Enter relative's given name(s). Use 'Not Applicable' if not applicable. Do not use ALL CAPS",
    type: "text",
    placeholder: "Enter given name(s)",
    required: true,
    maxLength: 100,
  },
  familyNameAtBirth: {
    name: "familyNameAtBirth",
    label: "Family Name (Surname) at Birth",
    description:
      "Enter relative's surname at birth if different. Use 'Not Applicable' if not applicable",
    type: "text",
    placeholder: "Enter surname at birth",
    required: true,
    maxLength: 100,
  },
  countryOfBirth: {
    name: "countryOfBirth",
    label: "Country of Birth",
    description:
      "Enter relative's country of birth. Use 'Not Applicable' if not applicable",
    type: "text",
    placeholder: "Enter country of birth",
    required: true,
    maxLength: 100,
  },
  immigrationStatusAbroad: {
    name: "immigrationStatusAbroad",
    label: "Immigration Status Abroad",
    description:
      "Enter relative's immigration status in the UK (e.g., Citizen, Permanent Resident, Work Permit). Use 'Not Applicable' if not applicable",
    type: "text",
    placeholder: "e.g., Citizen, Permanent Resident, Student Visa",
    required: true,
    maxLength: 100,
  },
  residenceAddress: {
    name: "residenceAddress",
    label: "Residence Address",
    description:
      "Enter complete UK address (street, city, state/province, country, postal code). Use 'Not Applicable' if not applicable",
    type: "textarea",
    placeholder: "Enter full residence address in the UK",
    required: true,
    maxLength: 500,
    minLength: 10,
    rows: 4,
  },
  occupation: {
    name: "occupation",
    label: "Occupation",
    description:
      "Enter relative's occupation. Use 'Not Applicable' if not applicable",
    type: "text",
    placeholder: "Enter occupation",
    required: true,
    maxLength: 100,
  },
};

export const RELATIVES_ABROAD_CONTROL: Record<string, RadioFieldConfig> = {
  hasRelativesInUK: {
    name: "hasRelativesInUK",
    label: "Do you have any relatives in the UK?",
    description:
      "Answer Yes or No. If Yes, you will be required to provide details about at least one relative.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide details about your relatives in the UK",
      errorMessage: "Please provide details about your relatives in the UK",
    },
  },
};
