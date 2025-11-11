import type { FieldConfig, RadioFieldConfig } from "../../types";

// Base field configuration for each family member
export const FAMILY_MEMBER_BASE_FIELDS: Record<string, FieldConfig> = {
  relationship: {
    name: "relationship",
    label: "Relationship",
    description: "Relationship to applicant",
    type: "text",
    placeholder: "e.g., Father, Mother, Spouse",
    required: true,
    maxLength: 50,
  },
  lastName: {
    name: "lastName",
    label: "Last Name / Surname",
    description:
      "Enter family member's last name or surname. Do not use ALL CAPS",
    type: "text",
    placeholder: "Enter last name",
    required: true,
    maxLength: 100,
  },
  givenNames: {
    name: "givenNames",
    label: "Given Name(s)",
    description: "Enter family member's given name(s). Do not use ALL CAPS",
    type: "text",
    placeholder: "Enter given name(s)",
    required: true,
    maxLength: 100,
  },
  familyNameAtBirth: {
    name: "familyNameAtBirth",
    label: "Family Name (Surname) at Birth",
    description:
      "Enter family member's surname at birth if different from current",
    type: "text",
    placeholder: "Enter surname at birth",
    required: true,
    maxLength: 100,
  },
  maritalStatus: {
    name: "maritalStatus",
    label: "Marital Status",
    description: "Select family member's marital status",
    type: "select",
    options: [
      "Single",
      "Married",
      "Divorced",
      "Widowed",
      "Separated",
      "Common-law",
    ],
    required: true,
  },
  dateOfBirth: {
    name: "dateOfBirth",
    label: "Date of Birth",
    description: "Enter date of birth in DD/MM/YYYY format",
    type: "date",
    placeholder: "DD/MM/YYYY",
    required: true,
  },
  townCityOfBirth: {
    name: "townCityOfBirth",
    label: "Town/City of Birth",
    description: "Enter town or city of birth",
    type: "text",
    placeholder: "Enter town/city of birth",
    required: true,
    maxLength: 100,
  },
  countryOfBirth: {
    name: "countryOfBirth",
    label: "Country of Birth",
    description: "Enter country of birth",
    type: "text",
    placeholder: "Enter country of birth",
    required: true,
    maxLength: 100,
  },
  dateOfDeath: {
    name: "dateOfDeath",
    label: "Date of Death (if applicable)",
    description:
      "Enter date of death in DD/MM/YYYY format if applicable, otherwise leave blank",
    type: "date",
    placeholder: "DD/MM/YYYY",
    required: false,
  },
  residenceAddress: {
    name: "residenceAddress",
    label: "Residence Address",
    description:
      "Enter complete address (street, city, state/province, country, postal code)",
    type: "textarea",
    placeholder: "Enter full residence address",
    required: true,
    maxLength: 500,
    rows: 4,
  },
  occupation: {
    name: "occupation",
    label: "Occupation",
    description: "Enter family member's occupation",
    type: "text",
    placeholder: "Enter occupation",
    required: true,
    maxLength: 100,
  },
};

// Yes/No field for accompany to UK
export const FAMILY_MEMBER_YES_NO_FIELDS: Record<string, RadioFieldConfig> = {
  accompanyToUK: {
    name: "accompanyToUK",
    label: "Will this family member accompany you to the UK?",
    description: "Select Yes or No",
    type: "radio",
    options: ["Yes", "No"],
  },
};

// Configuration for required family members
export const REQUIRED_FAMILY_MEMBERS = [
  {
    id: "father",
    relationship: "Father",
    note: "Required - Check 'Not Applicable' if not applicable",
  },
  {
    id: "mother",
    relationship: "Mother",
    note: "Required - Check 'Not Applicable' if not applicable",
  },
  {
    id: "spouse",
    relationship: "Spouse",
    note: "Required - Check 'Not Applicable' if not applicable",
  },
  {
    id: "exSpouse",
    relationship: "Ex-Spouse",
    note: "Required - Check 'Not Applicable' if not applicable",
  },
];

// Configuration for compulsory children (first of each type)
export const COMPULSORY_CHILDREN = [
  {
    id: "son1Biological",
    relationship: "Son (Biological)",
    category: "biological",
    gender: "son",
    note: "Required - Check 'Not Applicable' if you don't have a biological son",
  },
  {
    id: "daughter1Biological",
    relationship: "Daughter (Biological)",
    category: "biological",
    gender: "daughter",
    note: "Required - Check 'Not Applicable' if you don't have a biological daughter",
  },
  {
    id: "stepSon1",
    relationship: "Step-Son",
    category: "step",
    gender: "son",
    note: "Required - Check 'Not Applicable' if you don't have a step-son",
  },
  {
    id: "stepDaughter1",
    relationship: "Step-Daughter",
    category: "step",
    gender: "daughter",
    note: "Required - Check 'Not Applicable' if you don't have a step-daughter",
  },
  {
    id: "son1Adopted",
    relationship: "Son (Adopted)",
    category: "adopted",
    gender: "son",
    note: "Required - Check 'Not Applicable' if you don't have an adopted son",
  },
  {
    id: "daughter1Adopted",
    relationship: "Daughter (Adopted)",
    category: "adopted",
    gender: "daughter",
    note: "Required - Check 'Not Applicable' if you don't have an adopted daughter",
  },
];

// Flow control questions for additional children
export const CHILDREN_FLOW_QUESTIONS: Record<string, RadioFieldConfig> = {
  hasAdditionalBiologicalSons: {
    name: "hasAdditionalBiologicalSons",
    label: "Do you have more biological sons?",
    description: "Select Yes to add another biological son",
    type: "radio",
    options: ["Yes", "No"],
  },
  hasAdditionalBiologicalDaughters: {
    name: "hasAdditionalBiologicalDaughters",
    label: "Do you have more biological daughters?",
    description: "Select Yes to add another biological daughter",
    type: "radio",
    options: ["Yes", "No"],
  },
  hasAdditionalStepSons: {
    name: "hasAdditionalStepSons",
    label: "Do you have more step-sons?",
    description: "Select Yes to add another step-son",
    type: "radio",
    options: ["Yes", "No"],
  },
  hasAdditionalStepDaughters: {
    name: "hasAdditionalStepDaughters",
    label: "Do you have more step-daughters?",
    description: "Select Yes to add another step-daughter",
    type: "radio",
    options: ["Yes", "No"],
  },
  hasAdditionalAdoptedSons: {
    name: "hasAdditionalAdoptedSons",
    label: "Do you have more adopted sons?",
    description: "Select Yes to add another adopted son",
    type: "radio",
    options: ["Yes", "No"],
  },
  hasAdditionalAdoptedDaughters: {
    name: "hasAdditionalAdoptedDaughters",
    label: "Do you have more adopted daughters?",
    description: "Select Yes to add another adopted daughter",
    type: "radio",
    options: ["Yes", "No"],
  },
};

// Flow control for siblings
export const SIBLINGS_FLOW_QUESTION: RadioFieldConfig = {
  name: "hasBrothersOrSisters",
  label: "Do you have any brothers or sisters?",
  description:
    "Include half-siblings and step-siblings. Select Yes to add their details",
  type: "radio",
  options: ["Yes", "No"],
};

// Export all fields together for form configuration
export const FAMILY_MEMBERS_FIELDS = {
  ...FAMILY_MEMBER_BASE_FIELDS,
  ...CHILDREN_FLOW_QUESTIONS,
  hasBrothersOrSisters: SIBLINGS_FLOW_QUESTION,
};

export const FAMILY_MEMBERS_YES_NO_FIELDS = {
  ...FAMILY_MEMBER_YES_NO_FIELDS,
  ...CHILDREN_FLOW_QUESTIONS,
  hasBrothersOrSisters: SIBLINGS_FLOW_QUESTION,
};
