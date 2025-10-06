import { z } from "zod";
import { COUNTRIES } from "../constants";
import type { CountryCode, OnboardingFormData } from "../types";

// Helper function to check if date string is in DD/MM/YYYY format
const isValidDateFormat = (dateString: string): boolean => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  return dateRegex.test(dateString);
};

// Helper function to validate date is not in the future and user is at least 16 years old
const isValidDateOfBirth = (dateString: string): boolean => {
  if (!isValidDateFormat(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  // Check if date is valid
  if (
    birthDate.getDate() !== day ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    return false;
  }

  // Check if date is not in the future
  if (birthDate > today) return false;

  // Check if user is at least 16 years old
  const sixteenYearsAgo = new Date();
  sixteenYearsAgo.setFullYear(today.getFullYear() - 16);

  return birthDate <= sixteenYearsAgo;
};

// Extract valid country codes from COUNTRIES constant
const validCountryCodes = COUNTRIES.map((country) => country.value) as [
  CountryCode,
  ...CountryCode[],
];

// Zod schema for onboarding form validation
export const onboardingFormSchema = z.object({
  fullLegalName: z
    .string()
    .min(1, "Full legal name is required")
    .min(2, "Full legal name must be at least 2 characters")
    .max(100, "Full legal name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z\s'-\.]+$/,
      "Full legal name can only contain letters, spaces, hyphens, apostrophes, and periods"
    )
    .refine(
      (name) => name.trim().split(/\s+/).length >= 2,
      "Please provide at least your first and last name"
    ),

  currentCountryOfResidence: z.enum(validCountryCodes, {
    message: "Please select a valid country",
  }),

  nationality: z.enum(validCountryCodes, {
    message: "Please select a valid nationality",
  }),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine(isValidDateFormat, "Date must be in DD/MM/YYYY format")
    .refine(
      isValidDateOfBirth,
      "Please enter a valid date of birth. You must be at least 16 years old"
    ),

  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number must not exceed 20 characters")
    .regex(
      /^\+?[1-9]\d{1,3}[\s\-]?\d{3,4}[\s\-]?\d{3,4}[\s\-]?\d{0,4}$/,
      "Please enter a valid phone number with country code (e.g., +234 801 234 5678)"
    ),

  passportNumber: z
    .string()
    .min(1, "Passport number is required")
    .min(6, "Passport number must be at least 6 characters")
    .max(15, "Passport number must not exceed 15 characters")
    .regex(
      /^[A-Z0-9]+$/,
      "Passport number can only contain uppercase letters and numbers"
    )
    .refine(
      (passport) => /[A-Z]/.test(passport) && /\d/.test(passport),
      "Passport number must contain both letters and numbers"
    ),
});

// Type inference from the schema
export type OnboardingFormValidation = z.infer<typeof onboardingFormSchema>;

// Validation function to be used when "Create my profile" is clicked
export const validateOnboardingForm = (formData: OnboardingFormData) => {
  try {
    const validatedData = onboardingFormSchema.parse(formData);
    return {
      success: true as const,
      data: validatedData,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};

      error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });

      return {
        success: false as const,
        data: null,
        errors: fieldErrors,
      };
    }

    return {
      success: false as const,
      data: null,
      errors: { general: "Validation failed. Please check your input." },
    };
  }
};

// Partial validation for individual fields (optional - for real-time validation)
export const validateField = (
  fieldName: keyof OnboardingFormValidation,
  value: unknown
) => {
  try {
    const fieldSchema = onboardingFormSchema.shape[fieldName];
    fieldSchema.parse(value);
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message || "Invalid value",
      };
    }
    return { success: false, error: "Validation failed" };
  }
};
