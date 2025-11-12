"use server";

import { createClient } from "@/utils/supabase/server";
import { PrismaClient, BasicApplicantData } from "@prisma/client";
import { ApiResponse } from "@/features/shared/types/api";
import { ApiErrorCode } from "@/features/shared/types/error";
import { onboardingFormSchema } from "../validators";
import type { OnboardingFormData } from "../types";
import {
  convertDateStringToDate,
  convertDateToString,
} from "../utils/dateUtils";

// Type for BasicApplicantData with formatted date string (for frontend consumption)
type BasicApplicantDataFormatted = Omit<BasicApplicantData, "dateOfBirth"> & {
  dateOfBirth: string;
};

const prisma = new PrismaClient();

// Create BasicApplicantData and update auth user metadata
export const _createBasicApplicantData = async (
  input: OnboardingFormData
): Promise<ApiResponse> => {
  try {
    // 1. Get current authenticated user from Supabase
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return {
        success: false,
        message: "Not authenticated. Please sign in to continue.",
        error: ApiErrorCode.UNAUTHORIZED,
      };
    }

    // 2. Validate input using existing Zod schema
    const validationResult = onboardingFormSchema.safeParse(input);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return {
        success: false,
        message: firstError.message,
        error: ApiErrorCode.VALIDATION_ERROR,
      };
    }

    const validatedData = validationResult.data;

    // 3. Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Find the user in our database using the auth user's email
      const dbUser = await tx.user.findUnique({
        where: { email: authUser.email! },
        include: { basicApplicantData: true },
      });

      if (!dbUser) {
        throw new Error("User not found in database");
      }

      // Check if user already has BasicApplicantData
      if (dbUser.basicApplicantData) {
        throw new Error("Basic applicant data already exists for this user");
      }

      // Convert date string to Date object for database storage
      const dateOfBirth = convertDateStringToDate(validatedData.dateOfBirth);

      // Create BasicApplicantData
      await tx.basicApplicantData.create({
        data: {
          userId: dbUser.id,
          fullLegalName: validatedData.fullLegalName,
          dateOfBirth,
          phoneNumber: validatedData.phoneNumber,
          passportNumber: validatedData.passportNumber,
        },
      });

      console.log(
        "BasicApplicantData created successfully for user:",
        dbUser.id
      );
    });

    // 4. Update Supabase auth user metadata
    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        hasBasicApplicantData: true,
      },
    });

    if (metadataError) {
      console.error("Failed to update auth user metadata:", metadataError);
      // Note: We don't throw here because the main data creation was successful
      // The metadata update is secondary and can be retried later if needed
    }

    return {
      success: true,
      message:
        "Profile created successfully! You can now explore visa options and begin your application process.",
    };
  } catch (error) {
    console.error("Error creating basic applicant data:", error);

    if (error instanceof Error) {
      // Handle specific known errors
      if (error.message.includes("already exists")) {
        return {
          success: false,
          message:
            "Your profile has already been created. You can update it anytime from your profile settings.",
          error: ApiErrorCode.RESOURCE_ALREADY_EXISTS,
        };
      }

      if (error.message.includes("not found")) {
        return {
          success: false,
          message: "User account not found. Please contact support.",
          error: ApiErrorCode.USER_NOT_FOUND,
        };
      }

      if (error.message.includes("Validation")) {
        return {
          success: false,
          message: "Please check your information and try again.",
          error: ApiErrorCode.VALIDATION_ERROR,
        };
      }
    }

    // Generic error response
    return {
      success: false,
      message:
        "An unexpected error occurred while creating your profile. Please try again.",
      error: ApiErrorCode.DATABASE_QUERY_ERROR,
    };
  }
};

// Get BasicApplicantData for current user
export const _getBasicApplicantData = async (): Promise<
  ApiResponse<BasicApplicantDataFormatted>
> => {
  try {
    // 1. Get current authenticated user from Supabase
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return {
        success: false,
        message: "Not authenticated. Please sign in to continue.",
        error: ApiErrorCode.UNAUTHORIZED,
      };
    }

    // 2. Find user and their basic applicant data
    const dbUser = await prisma.user.findUnique({
      where: { email: authUser.email! },
      include: {
        basicApplicantData: true,
      },
    });

    if (!dbUser) {
      return {
        success: false,
        message: "User not found in database",
        error: ApiErrorCode.USER_NOT_FOUND,
      };
    }

    if (!dbUser.basicApplicantData) {
      return {
        success: false,
        message:
          "Basic applicant data not found. Please complete your profile first.",
        error: ApiErrorCode.RESOURCE_NOT_FOUND,
      };
    }

    // Convert database Date back to DD/MM/YYYY format for frontend
    const formattedData = {
      ...dbUser.basicApplicantData,
      dateOfBirth: convertDateToString(dbUser.basicApplicantData.dateOfBirth),
    };

    return {
      success: true,
      message: "Basic applicant data retrieved successfully",
      data: formattedData,
    };
  } catch (error) {
    console.error("Error retrieving basic applicant data:", error);

    return {
      success: false,
      message: "An error occurred while retrieving your profile data.",
      error: ApiErrorCode.DATABASE_QUERY_ERROR,
    };
  }
};

// Update existing BasicApplicantData
export const _updateBasicApplicantData = async (
  input: OnboardingFormData
): Promise<ApiResponse> => {
  try {
    // 1. Get current authenticated user from Supabase
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return {
        success: false,
        message: "Not authenticated. Please sign in to continue.",
        error: ApiErrorCode.UNAUTHORIZED,
      };
    }

    // 2. Validate input using existing Zod schema
    const validationResult = onboardingFormSchema.safeParse(input);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return {
        success: false,
        message: firstError.message,
        error: ApiErrorCode.VALIDATION_ERROR,
      };
    }

    const validatedData = validationResult.data;

    // 3. Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Find the user in our database using the auth user's email
      const dbUser = await tx.user.findUnique({
        where: { email: authUser.email! },
        include: { basicApplicantData: true },
      });

      if (!dbUser) {
        throw new Error("User not found in database");
      }

      // Check if user has BasicApplicantData to update
      if (!dbUser.basicApplicantData) {
        throw new Error(
          "Basic applicant data not found. Please create your profile first."
        );
      }

      // Convert date string to Date object for database storage
      const dateOfBirth = convertDateStringToDate(validatedData.dateOfBirth);

      // Update BasicApplicantData
      await tx.basicApplicantData.update({
        where: { userId: dbUser.id },
        data: {
          fullLegalName: validatedData.fullLegalName,
          dateOfBirth,
          phoneNumber: validatedData.phoneNumber,
          passportNumber: validatedData.passportNumber,
        },
      });

      console.log(
        "BasicApplicantData updated successfully for user:",
        dbUser.id
      );
    });

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error("Error updating basic applicant data:", error);

    if (error instanceof Error) {
      // Handle specific known errors
      if (error.message.includes("not found")) {
        return {
          success: false,
          message: "Profile not found. Please create your profile first.",
          error: ApiErrorCode.RESOURCE_NOT_FOUND,
        };
      }

      if (error.message.includes("Validation")) {
        return {
          success: false,
          message: "Please check your information and try again.",
          error: ApiErrorCode.VALIDATION_ERROR,
        };
      }
    }

    // Generic error response
    return {
      success: false,
      message:
        "An unexpected error occurred while updating your profile. Please try again.",
      error: ApiErrorCode.DATABASE_QUERY_ERROR,
    };
  }
};
