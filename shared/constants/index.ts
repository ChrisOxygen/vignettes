// Import FormType from Prisma-generated client
import { FormType } from "@prisma/client";
// Import form-related types
import type {
  FieldInputType,
  FormField,
  FormConfig,
  CompleteFormConfig,
} from "@/shared/types/form";

export const FORM_CONSTANTS = {
  APPLICANT_INFO: {
    formTitle: "Applicant Personal Details",
    instructions: "Do not use ALL CAPS. Use N/A where field is not applicable.",
    fields: {
      firstName: {
        title: "First Name",
        description: "Enter your first name. Do not use ALL CAPS.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter your first name",
        maxLength: 50,
        minLength: 1,
      },
      middleName: {
        title: "Middle Name",
        description: "Enter your middle name. Use N/A if not applicable.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter your middle name or N/A",
        maxLength: 50,
      },
      lastName: {
        title: "Last Name (Surname)",
        description: "Enter your surname/last name. Do not use ALL CAPS.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter your last name",
        maxLength: 50,
        minLength: 1,
      },
      otherNames: {
        title: "Other Names Used (if any)",
        description:
          "Specify type and name (e.g., Nickname, Former name, Birth name, Name before marriage, Other). Use N/A if not applicable.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "textarea",
        placeholder: "Enter other names or N/A",
        maxLength: 255,
      },
      cellNumber: {
        title: "Cell Number",
        description: "Enter your mobile/cell phone number.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "tel",
        placeholder: "+1234567890",
      },
      phoneNumber: {
        title: "Phone Number",
        description: "Enter your contact phone number.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "tel",
        placeholder: "+1234567890",
      },
      residentialAddress: {
        title: "Residential Address",
        description:
          "Provide complete address including street, city, state/province, country, and postal code.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "textarea",
        placeholder:
          "Enter complete address with street, city, state/province, country, postal code",
        maxLength: 500,
        minLength: 10,
      },
      emailAddress: {
        title: "Email Address",
        description: "Enter a valid email address.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "email",
        placeholder: "example@email.com",
      },
      height: {
        title: "Height",
        description:
          "Enter height either in Centimeters or Feet. Use only one format.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "175 cm or 5'8\"",
      },
      eyeColour: {
        title: "Eye Colour",
        description:
          "Select or enter eye colour (e.g., Black, Blue, Brown, Green, Hazel, Grey, or Other).",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "select",
        options: ["Black", "Blue", "Brown", "Green", "Hazel", "Grey", "Other"],
      },
      hasNationalId: {
        title: "Do you Have a National Identity Document?",
        description:
          "E.g., NIMC card/document. If Yes, additional details will be required.",
        isRequired: true,
        conditionalFields: true,
        explanation: "",
        fieldInputType: "radio",
        options: ["Yes", "No"],
      },
      dateOfBirth: {
        title: "Date of Birth",
        description: "Enter in DD/MM/YYYY format.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "date",
        placeholder: "DD/MM/YYYY",
      },
      cityOfBirth: {
        title: "City of Birth",
        description: "Enter the city where you were born.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter city name",
        maxLength: 100,
        minLength: 1,
      },
      townOfBirth: {
        title: "Town of Birth",
        description: "Enter the town where you were born.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter town name",
        maxLength: 100,
        minLength: 1,
      },
      countryOfBirth: {
        title: "Country of Birth",
        description: "Enter the country where you were born.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter country name",
        maxLength: 100,
        minLength: 1,
      },
      countryOfCitizenship: {
        title: "Country of Citizenship(s)",
        description: "List all countries where you hold citizenship.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "textarea",
        placeholder: "List all countries where you hold citizenship",
        maxLength: 255,
        minLength: 1,
      },
      countryOfResidence: {
        title: "Country of Residence",
        description: "Enter the country where you currently reside.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter current country of residence",
        maxLength: 100,
        minLength: 1,
      },
      previousCountryOfResidence: {
        title: "Previous Country of Residence",
        description:
          "Enter previous country of residence. Use N/A if not applicable.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter previous country or N/A",
        maxLength: 100,
      },
      nativeLanguage: {
        title: "Native Language",
        description: "Enter your native/first language.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "text",
        placeholder: "Enter your native language",
        maxLength: 50,
        minLength: 1,
      },
      maritalStatus: {
        title: "Marital Status",
        description:
          "Select one: Never Married/Single, Married, Annulled Marriage, Divorced, Legally Separated, Widowed.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "select",
        options: [
          "Never Married/Single",
          "Married",
          "Annulled Marriage",
          "Divorced",
          "Legally Separated",
          "Widowed",
        ],
      },
      dateOfMarriage: {
        title: "Date of Marriage",
        description:
          "Enter marriage date in DD/MM/YYYY format. Use N/A if never married.",
        isRequired: true,
        conditionalFields: false,
        explanation: "",
        fieldInputType: "date",
        placeholder: "DD/MM/YYYY or N/A",
      },
      previouslyMarried: {
        title: "Have you been previously married?",
        description:
          "Answer Yes or No. If Yes, additional details will be required.",
        isRequired: true,
        conditionalFields: true,
        explanation: "",
        fieldInputType: "radio",
        options: ["Yes", "No"],
      },
      hasJobInCurrentCountry: {
        title: "Do you have a job in the country where you currently live?",
        description:
          "Answer Yes or No. If Yes, additional employment details will be required.",
        isRequired: true,
        conditionalFields: true,
        explanation: "",
        fieldInputType: "radio",
        options: ["Yes", "No"],
      },
      ownsBusinessInCurrentCountry: {
        title: "Do you own a business in the country where you currently live?",
        description:
          "Answer Yes or No. If Yes, additional business details will be required.",
        isRequired: true,
        conditionalFields: true,
        explanation: "",
        fieldInputType: "radio",
        options: ["Yes", "No"],
      },
      travelledLast10Years: {
        title:
          "Have you travelled to other countries in the previous 10 years?",
        description:
          "Answer Yes or No. If Yes, travel history details will be required.",
        isRequired: true,
        conditionalFields: true,
        explanation: "",
        fieldInputType: "radio",
        options: ["Yes", "No"],
      },
      medicalExamLast6Months: {
        title:
          "Have you had a medical exam performed by a foreign Country's authorized panel physician (doctor) within the last 6 months?",
        description:
          "Answer Yes or No. If Yes, medical exam details will be required.",
        isRequired: true,
        conditionalFields: true,
        explanation: "",
        fieldInputType: "radio",
        options: ["Yes", "No"],
      },
      biometricsLast10Years: {
        title:
          "In the past 10 years, have you given biometrics for an application to enter a foreign Country?",
        description:
          "Answer Yes or No. If Yes, biometrics details will be required.",
        isRequired: true,
        conditionalFields: true,
        explanation: "",
        fieldInputType: "radio",
        options: ["Yes", "No"],
      },
      lawfulPROfAnotherCountry: {
        title: "Are you a lawful PR of another country?",
        description:
          "Answer Yes or No. Permanent Resident status. If Yes, PR details will be required.",
        isRequired: true,
        conditionalFields: true,
        explanation: "",
        fieldInputType: "radio",
        options: ["Yes", "No"],
      },
    },
  },

  EX_SPOUSE_INFO: {
    // TODO: Define ex-spouse information form fields
  },

  FAMILY_MEMBERS_INFO: {
    // TODO: Define family members information form fields
  },

  RELATIVES_ABROAD_INFO: {
    // TODO: Define relatives abroad information form fields
  },

  WORK_AND_BUSINESS_INFO: {
    // TODO: Define work and business information form fields
  },

  EDUCATION_INFO: {
    // TODO: Define education information form fields
  },

  VISA_AND_PERMITS_INFO: {
    // TODO: Define visa and permits information form fields
  },

  PREVIOUS_TRAVEL_INFO: {
    // TODO: Define previous travel information form fields
  },

  SECURITY_AND_STATUTORY_QUESTIONS: {
    // TODO: Define security and statutory questions form fields
  },
};

// Re-export form types for convenience
export type { FieldInputType, FormField, FormConfig, CompleteFormConfig };

// Helper functions for form field management
export const getFieldInputType = (
  formType: FormType,
  fieldName: string
): FieldInputType | undefined => {
  const formConfig = FORM_CONSTANTS[formType] as CompleteFormConfig;
  if (!formConfig || !formConfig.fields) return undefined;
  return formConfig.fields[fieldName]?.fieldInputType;
};

export const getFieldOptions = (
  formType: FormType,
  fieldName: string
): string[] | undefined => {
  const formConfig = FORM_CONSTANTS[formType] as CompleteFormConfig;
  if (!formConfig || !formConfig.fields) return undefined;
  return formConfig.fields[fieldName]?.options;
};

export const isConditionalField = (
  formType: FormType,
  fieldName: string
): boolean => {
  const formConfig = FORM_CONSTANTS[formType] as CompleteFormConfig;
  if (!formConfig || !formConfig.fields) return false;
  return formConfig.fields[fieldName]?.conditionalFields || false;
};

// Input type mappings for HTML form elements
export const INPUT_TYPE_MAPPINGS: Record<FieldInputType, string> = {
  text: "text",
  email: "email",
  tel: "tel",
  number: "number",
  date: "date",
  textarea: "textarea",
  select: "select",
  radio: "radio",
  checkbox: "checkbox",
  file: "file",
  password: "password",
  url: "url",
  search: "search",
};
