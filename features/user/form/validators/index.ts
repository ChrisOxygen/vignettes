import { z } from "zod";

/**
 * APPLICANT_INFO Form Validation Schema
 *
 * This schema validates form inputs as objects for conditional fields.
 *
 * Example input structure:
 * {
 *   firstName: "John",
 *   lastName: "Doe",
 *   travelledLast10Years: {
 *     value: "Yes",
 *     explanation: "I travelled to Canada in 2023 and UK in 2022 for business purposes."
 *   },
 *   hasJobInCurrentCountry: {
 *     value: "No",
 *     explanation: "" // Optional when value is "No"
 *   }
 * }
 */

// Helper schema for conditional Yes/No fields with explanations
const conditionalYesNoSchema = z
  .object({
    value: z.enum(["Yes", "No"]).refine((val) => val !== undefined, {
      message: "Please select Yes or No",
    }),
    explanation: z.string().optional(),
  })
  .refine(
    (data) => {
      // If value is "Yes", explanation must be provided and non-empty
      if (data.value === "Yes") {
        return data.explanation && data.explanation.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please provide an explanation when answering 'Yes'",
      path: ["explanation"],
    }
  );

// Zod schema for APPLICANT_INFO form validation
export const applicantInfoSchema = z.object({
  // Basic Personal Information
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .refine(
      (val) =>
        val === val.toLowerCase() || val === val.toUpperCase() ? false : true,
      {
        message: "Do not use ALL CAPS",
      }
    ),

  middleName: z
    .string()
    .max(50, "Middle name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]*$/,
      "Middle name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .refine((val) => !val || val.toLowerCase() !== val.toUpperCase(), {
      message: "Do not use ALL CAPS",
    })
    .optional()
    .or(z.literal("N/A")),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .refine(
      (val) =>
        val === val.toLowerCase() || val === val.toUpperCase() ? false : true,
      {
        message: "Do not use ALL CAPS",
      }
    ),

  otherNames: z
    .string()
    .max(255, "Other names must be less than 255 characters")
    .optional()
    .or(z.literal("N/A")),

  // Contact Information
  cellNumber: z
    .string()
    .min(1, "Cell number is required")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid cell number"),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),

  emailAddress: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),

  residentialAddress: z
    .string()
    .min(10, "Please provide a complete address")
    .max(500, "Address must be less than 500 characters"),

  // Physical Characteristics
  height: z
    .string()
    .min(1, "Height is required")
    .regex(
      /^(\d{1,3}(\.\d{1,2})?\s*(cm|CM|centimeters?|Centimeters?)|[4-7]'([0-9]|1[01])"?|\d{1}\.\d{1,2}\s*(ft|FT|feet?|Feet?))$/,
      "Enter height in centimeters (e.g., 175 cm) or feet (e.g., 5'8\" or 5.8 ft)"
    ),

  eyeColour: z
    .enum(["Black", "Blue", "Brown", "Green", "Hazel", "Grey", "Other"])
    .or(z.string().min(1, "Eye colour is required")),

  // Identity Document
  hasNationalId: conditionalYesNoSchema,

  // Birth Information
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Date must be in DD/MM/YYYY format"
    )
    .refine((date) => {
      const [day, month, year] = date.split("/").map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 0 && age <= 120;
    }, "Please enter a valid date of birth"),

  cityOfBirth: z
    .string()
    .min(1, "City of birth is required")
    .max(100, "City name must be less than 100 characters"),

  townOfBirth: z
    .string()
    .min(1, "Town of birth is required")
    .max(100, "Town name must be less than 100 characters"),

  countryOfBirth: z
    .string()
    .min(1, "Country of birth is required")
    .max(100, "Country name must be less than 100 characters"),

  // Citizenship and Residence
  countryOfCitizenship: z
    .string()
    .min(1, "Country of citizenship is required")
    .max(255, "Country of citizenship must be less than 255 characters"),

  countryOfResidence: z
    .string()
    .min(1, "Country of residence is required")
    .max(100, "Country name must be less than 100 characters"),

  previousCountryOfResidence: z
    .string()
    .max(100, "Country name must be less than 100 characters")
    .optional()
    .or(z.literal("N/A")),

  nativeLanguage: z
    .string()
    .min(1, "Native language is required")
    .max(50, "Language name must be less than 50 characters"),

  // Marital Status
  maritalStatus: z
    .enum([
      "Never Married/Single",
      "Married",
      "Annulled Marriage",
      "Divorced",
      "Legally Separated",
      "Widowed",
    ])
    .refine((val) => val !== undefined, {
      message: "Please select your marital status",
    }),

  dateOfMarriage: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Date must be in DD/MM/YYYY format"
    )
    .optional()
    .or(z.literal("N/A")),

  // Conditional Yes/No Questions
  previouslyMarried: conditionalYesNoSchema,

  hasJobInCurrentCountry: conditionalYesNoSchema,

  ownsBusinessInCurrentCountry: conditionalYesNoSchema,

  travelledLast10Years: conditionalYesNoSchema,

  medicalExamLast6Months: conditionalYesNoSchema,

  biometricsLast10Years: conditionalYesNoSchema,

  lawfulPROfAnotherCountry: conditionalYesNoSchema,
});

// =============================================================================
// SCHEMA REGISTRY & TYPE DEFINITIONS
// =============================================================================

// Type inference for all schemas
export type ZApplicantInfoFormData = z.infer<typeof applicantInfoSchema>;

// Schema registry mapping FormType to Zod schemas
export const FORM_SCHEMAS = {
  APPLICANT_INFO: applicantInfoSchema,
  // TODO: Add more schemas as they are created
  // EX_SPOUSE_INFO: exSpouseInfoSchema,
  // FAMILY_MEMBERS_INFO: familyMembersInfoSchema,
  // RELATIVES_ABROAD_INFO: relativesAbroadInfoSchema,
  // WORK_AND_BUSINESS_INFO: workAndBusinessInfoSchema,
  // EDUCATION_INFO: educationInfoSchema,
  // VISA_AND_PERMITS_INFO: visaAndPermitsInfoSchema,
  // PREVIOUS_TRAVEL_INFO: previousTravelInfoSchema,
  // SECURITY_AND_STATUTORY_QUESTIONS: securityAndStatutoryQuestionsSchema,
} as const;

// Union type for all form data types
export type FormDataTypes = {
  APPLICANT_INFO: ZApplicantInfoFormData;
  // TODO: Add more types as schemas are created
  // EX_SPOUSE_INFO: ZExSpouseInfoFormData;
  // FAMILY_MEMBERS_INFO: ZFamilyMembersInfoFormData;
  // RELATIVES_ABROAD_INFO: ZRelativesAbroadInfoFormData;
  // WORK_AND_BUSINESS_INFO: ZWorkAndBusinessInfoFormData;
  // EDUCATION_INFO: ZEducationInfoFormData;
  // VISA_AND_PERMITS_INFO: ZVisaAndPermitsInfoFormData;
  // PREVIOUS_TRAVEL_INFO: ZPreviousTravelInfoFormData;
  // SECURITY_AND_STATUTORY_QUESTIONS: ZSecurityAndStatutoryQuestionsFormData;
};

// Helper type to get form data type by FormType
export type GetFormDataType<T extends keyof FormDataTypes> = FormDataTypes[T];

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

// Generic validation function that works with any form type
export function validateFormData<T extends keyof typeof FORM_SCHEMAS>(
  formType: T,
  data: unknown,
  isDraft: boolean = false
) {
  const schema = FORM_SCHEMAS[formType];
  if (!schema) {
    throw new Error(`No schema found for form type: ${formType}`);
  }

  const validationSchema = isDraft ? schema.partial() : schema;
  return validationSchema.safeParse(data);
}

// Legacy function for backwards compatibility
export const validateApplicantInfo = (data: unknown) => {
  return applicantInfoSchema.safeParse(data);
};

// Custom validation for conditional fields
export const validateConditionalFields = (data: ZApplicantInfoFormData) => {
  const errors: string[] = [];

  // Validate marital status and date of marriage consistency
  if (
    data.maritalStatus !== "Never Married/Single" &&
    (!data.dateOfMarriage || data.dateOfMarriage === "N/A")
  ) {
    errors.push("Date of marriage is required for married status");
  }

  if (
    data.maritalStatus === "Never Married/Single" &&
    data.dateOfMarriage &&
    data.dateOfMarriage !== "N/A"
  ) {
    errors.push("Date of marriage should be N/A for never married status");
  }

  // Validate conditional fields - now these are objects with value and explanation
  const conditionalFields = [
    { field: data.hasNationalId, name: "National ID" },
    { field: data.previouslyMarried, name: "Previously Married" },
    { field: data.hasJobInCurrentCountry, name: "Job in Current Country" },
    {
      field: data.ownsBusinessInCurrentCountry,
      name: "Business in Current Country",
    },
    { field: data.travelledLast10Years, name: "Travel History" },
    { field: data.medicalExamLast6Months, name: "Medical Exam" },
    { field: data.biometricsLast10Years, name: "Biometrics" },
    { field: data.lawfulPROfAnotherCountry, name: "Lawful PR Status" },
  ];

  conditionalFields.forEach(({ field, name }) => {
    if (
      field.value === "Yes" &&
      (!field.explanation || field.explanation.trim().length === 0)
    ) {
      errors.push(
        `${name}: Please provide an explanation when answering 'Yes'`
      );
    }
  });

  return errors;
};

// // Test function to validate form constants compatibility
// export const testFormConstantsCompatibility = () => {
//   const results = {
//     compatible: true,
//     issues: [] as string[],
//     warnings: [] as string[],
//   };

//   // Example data based on form constants structure
//   const testData: Partial<ApplicantInfoFormData> = {
//     // Basic text fields
//     firstName: "John",
//     lastName: "Doe",
//     emailAddress: "john.doe@example.com",

//     // Conditional fields (object structure)
//     travelledLast10Years: {
//       value: "Yes",
//       explanation: "I travelled to Canada (2023) and UK (2022) for business.",
//     },
//     hasJobInCurrentCountry: {
//       value: "No",
//       explanation: "", // Optional when "No"
//     },
//     hasNationalId: {
//       value: "Yes",
//       explanation: "Nigerian National ID card issued in 2020",
//     },
//   };

//   // Test validation
//   const validationResult = validateApplicantInfo(testData);

//   if (!validationResult.success) {
//     results.compatible = false;
//     results.issues.push("Validation failed with errors:");
//     validationResult.error.issues.forEach((err) => {
//       results.issues.push(`- ${err.path.join(".")}: ${err.message}`);
//     });
//   }

//   return results;
// };

// // Example usage function
// export const createExampleFormData = (): Partial<ApplicantInfoFormData> => {
//   return {
//     firstName: "John",
//     lastName: "Doe",
//     emailAddress: "john.doe@example.com",
//     cellNumber: "+2348123456789",
//     residentialAddress: "123 Main Street, Victoria Island, Lagos, Nigeria",
//     dateOfBirth: "15/03/1990",
//     maritalStatus: "Never Married/Single",

//     // Conditional fields as objects
//     travelledLast10Years: {
//       value: "Yes",
//       explanation:
//         "I travelled to Canada in 2023 and UK in 2022 for business purposes.",
//     },
//     hasJobInCurrentCountry: {
//       value: "No",
//       explanation: "", // Optional when value is "No"
//     },
//     medicalExamLast6Months: {
//       value: "Yes",
//       explanation: "Had medical exam at approved clinic in Lagos on 15/08/2024",
//     },
//   };
// };
