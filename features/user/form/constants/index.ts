import {
  FileText,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  CreditCard,
  Plane,
  Shield,
} from "lucide-react";

// Form navigation items based on FormType enum
export const FORM_NAV = [
  {
    title: "Applicant Info",
    url: "/app/form/applicant-info",
    icon: FileText,
    description: "Personal details and basic information",
  },
  {
    title: "Ex-Spouse Info",
    url: "/app/form/ex-spouse-info",
    icon: Users,
    description: "Former spouse information if applicable",
  },
  {
    title: "Family Members",
    url: "/app/form/family-members-info",
    icon: Users,
    description: "Information about family members",
  },
  {
    title: "Relatives Abroad",
    url: "/app/form/relatives-abroad-info",
    icon: MapPin,
    description: "Relatives living in other countries",
  },
  {
    title: "Work & Business",
    url: "/app/form/work-and-business-info",
    icon: Briefcase,
    description: "Employment and business information",
  },
  {
    title: "Education",
    url: "/app/form/education-info",
    icon: GraduationCap,
    description: "Educational background and qualifications",
  },
  {
    title: "Visa & Permits",
    url: "/app/form/visa-and-permits-info",
    icon: CreditCard,
    description: "Previous visas and permits history",
  },
  {
    title: "Travel History",
    url: "/app/form/previous-travel-info",
    icon: Plane,
    description: "Previous travel to other countries",
  },
  {
    title: "Security Questions",
    url: "/app/form/security-and-statutory-questions",
    icon: Shield,
    description: "Security and statutory questions",
  },
];

// Field configurations
import type { FieldConfig, RadioFieldConfig } from "../types";

export const FIELD_CONFIGS: Record<string, FieldConfig> = {
  firstName: {
    name: "firstName",
    label: "First Name *",
    description: "Enter your first name as it appears on official documents",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
    maxLength: 50,
    minLength: 1,
  },
  middleName: {
    name: "middleName",
    label: "Middle Name",
    description: "Enter your middle name if applicable",
    type: "text",
    placeholder: "Enter your middle name (optional)",
    maxLength: 50,
  },
  lastName: {
    name: "lastName",
    label: "Last Name *",
    description: "Enter your last name as it appears on official documents",
    type: "text",
    placeholder: "Enter your last name",
    required: true,
    maxLength: 50,
    minLength: 1,
  },
  otherNames: {
    name: "otherNames",
    label: "Other Names",
    description: "List any other names, nicknames, or aliases you have used",
    type: "textarea",
    placeholder: "List any other names, nicknames, or aliases",
    maxLength: 255,
    rows: 3,
  },
  cellNumber: {
    name: "cellNumber",
    label: "Cell Number *",
    description: "Enter your primary mobile phone number",
    type: "tel",
    placeholder: "+1 (555) 123-4567",
    required: true,
  },
  phoneNumber: {
    name: "phoneNumber",
    label: "Phone Number *",
    description: "Enter an alternative phone number",
    type: "tel",
    placeholder: "+1 (555) 987-6543",
    required: true,
  },
  emailAddress: {
    name: "emailAddress",
    label: "Email Address *",
    description: "Enter a valid email address for correspondence",
    type: "email",
    placeholder: "your.email@example.com",
    required: true,
  },
  residentialAddress: {
    name: "residentialAddress",
    label: "Residential Address",
    description:
      "Provide your complete current residential address including street, city, state/province, and postal code",
    type: "textarea",
    placeholder: "Enter your full residential address",
    required: true,
    maxLength: 500,
    minLength: 10,
    rows: 4,
  },
  height: {
    name: "height",
    label: "Height",
    description: "Enter your height in feet/inches or centimeters",
    type: "text",
    placeholder: "e.g., 5'8\" or 173 cm",
    required: true,
  },
  eyeColour: {
    name: "eyeColour",
    label: "Eye Colour",
    description: "Select your natural eye color",
    type: "select",
    options: ["Black", "Brown", "Blue", "Green", "Hazel", "Gray", "Other"],
    required: true,
  },
  dateOfBirth: {
    name: "dateOfBirth",
    label: "Date of Birth",
    description: "Enter your date of birth in DD/MM/YYYY format",
    type: "date",
    placeholder: "DD/MM/YYYY",
    required: true,
  },
  cityOfBirth: {
    name: "cityOfBirth",
    label: "City of Birth",
    description: "Enter the name of the city where you were born",
    type: "text",
    placeholder: "Enter city where you were born",
    required: true,
    maxLength: 100,
    minLength: 1,
  },
  townOfBirth: {
    name: "townOfBirth",
    label: "Town of Birth",
    description:
      "Enter the name of the town where you were born (if applicable)",
    type: "text",
    placeholder: "Enter town where you were born",
    required: true,
    maxLength: 100,
    minLength: 1,
  },
  countryOfBirth: {
    name: "countryOfBirth",
    label: "Country of Birth",
    description: "Enter the country where you were born",
    type: "text",
    placeholder: "Enter country where you were born",
    required: true,
    maxLength: 100,
    minLength: 1,
  },
  countryOfCitizenship: {
    name: "countryOfCitizenship",
    label: "Country of Citizenship",
    description:
      "List all countries where you hold citizenship (if multiple, separate with commas)",
    type: "textarea",
    placeholder: "Enter your country or countries of citizenship",
    required: true,
    maxLength: 255,
    minLength: 1,
    rows: 3,
  },
  countryOfResidence: {
    name: "countryOfResidence",
    label: "Country of Residence",
    description: "Enter the country where you currently reside",
    type: "text",
    placeholder: "Enter your current country of residence",
    required: true,
    maxLength: 100,
    minLength: 1,
  },
  previousCountryOfResidence: {
    name: "previousCountryOfResidence",
    label: "Previous Country of Residence",
    description:
      "Enter your previous country of residence if different from current (leave blank if not applicable)",
    type: "text",
    placeholder: "Enter your previous country of residence (if applicable)",
    maxLength: 100,
  },
  nativeLanguage: {
    name: "nativeLanguage",
    label: "Native Language",
    description: "Enter your first language or mother tongue",
    type: "text",
    placeholder: "Enter your native language",
    required: true,
    maxLength: 50,
    minLength: 1,
  },
  maritalStatus: {
    name: "maritalStatus",
    label: "Marital Status",
    description: "Select your current marital status",
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
  dateOfMarriage: {
    name: "dateOfMarriage",
    label: "Date of Marriage",
    description:
      "Enter your marriage date if you are married (DD/MM/YYYY format)",
    type: "date",
    placeholder: "DD/MM/YYYY (if applicable)",
  },
};

export const YES_NO_FIELD_CONFIGS: Record<string, RadioFieldConfig> = {
  previouslyMarried: {
    name: "previouslyMarried",
    label: "Have you been previously married?",
    description:
      "Answer Yes or No. If Yes, additional details will be required.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide details about your previous marriage",
      errorMessage: "Please provide details about your previous marriage",
    },
  },
  hasNationalId: {
    name: "hasNationalId",
    label: "Do you Have a National Identity Document?",
    description:
      "E.g., NIMC card/document. If Yes, additional details will be required.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide details about your national ID",
      errorMessage: "Please provide details about your national ID",
    },
  },
  hasJobInCurrentCountry: {
    name: "hasJobInCurrentCountry",
    label: "Do you have a job in the country where you currently live?",
    description:
      "Answer Yes or No. If Yes, additional employment details will be required.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide employment details",
      errorMessage: "Please provide details about your employment",
    },
  },
  ownsBusinessInCurrentCountry: {
    name: "ownsBusinessInCurrentCountry",
    label: "Do you own a business in the country where you currently live?",
    description:
      "Answer Yes or No. If Yes, additional business details will be required.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide business details",
      errorMessage: "Please provide details about your business",
    },
  },
  travelledLast10Years: {
    name: "travelledLast10Years",
    label: "Have you travelled to other countries in the previous 10 years?",
    description:
      "Answer Yes or No. If Yes, travel history details will be required.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide travel history details",
      errorMessage: "Please provide details about your travel history",
    },
  },
  medicalExamLast6Months: {
    name: "medicalExamLast6Months",
    label:
      "Have you had a medical exam performed by a foreign Country's authorized panel physician (doctor) within the last 6 months?",
    description:
      "Answer Yes or No. If Yes, medical exam details will be required.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide medical exam details",
      errorMessage: "Please provide details about your medical examination",
    },
  },
  biometricsLast10Years: {
    name: "biometricsLast10Years",
    label:
      "In the past 10 years, have you given biometrics for an application to enter a foreign Country?",
    description:
      "Answer Yes or No. If Yes, biometrics details will be required.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide biometrics details",
      errorMessage: "Please provide details about your biometrics",
    },
  },
  lawfulPROfAnotherCountry: {
    name: "lawfulPROfAnotherCountry",
    label: "Are you a lawful PR of another country?",
    description:
      "Answer Yes or No. Permanent Resident status. If Yes, PR details will be required.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide permanent resident details",
      errorMessage:
        "Please provide details about your permanent resident status",
    },
  },
};
