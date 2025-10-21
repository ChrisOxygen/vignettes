"use server";

import { createClient } from "@/utils/supabase/server";
import { PrismaClient, FormType, FormStatus } from "@prisma/client";
import { ApiResponse } from "@/features/shared/types/api";
import { ApiErrorCode } from "@/features/shared/types/error";
import { FORM_CONSTANTS } from "@/shared/constants";

const prisma = new PrismaClient();

// Types for form submission
export interface FormSubmissionData {
  formType: FormType;
  formData: Record<string, any>;
  status: FormStatus;
}

export interface UpsertFormSubmissionInput {
  formType: FormType;
  formData: Record<string, any>;
  isDraft?: boolean;
  submissionId?: string; // Optional - if provided, update existing; if not, create new
}

// Utility function to get authenticated user
async function getAuthenticatedUser() {
  try {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      throw new Error("Authentication required");
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: authData.user.email! },
    });

    if (!user) {
      throw new Error("User not found in database");
    }

    if (user.accountStatus !== "ACTIVE") {
      throw new Error("Account not active");
    }

    return user;
  } catch (error) {
    throw error;
  }
}

// Validation function for form data
function validateFormData(
  formType: FormType,
  formData: Record<string, any>,
  isDraft: boolean = false
) {
  const formConfig = FORM_CONSTANTS[formType] as any;

  if (!formConfig) {
    throw new Error(`Form configuration not found for type: ${formType}`);
  }

  // If form fields are not yet configured, skip validation for now
  if (!formConfig.fields || Object.keys(formConfig.fields).length === 0) {
    console.warn(
      `Form fields not yet configured for ${formType}. Skipping validation.`
    );
    return;
  }

  const errors: string[] = [];
  const fields = formConfig.fields;

  // For full submission, validate all required fields
  if (!isDraft) {
    Object.entries(fields).forEach(([fieldKey, fieldConfig]: [string, any]) => {
      if (fieldConfig.isRequired) {
        const value = formData[fieldKey];

        if (!value || (typeof value === "string" && value.trim() === "")) {
          errors.push(`${fieldConfig.title} is required`);
        }

        // Additional validation based on field type
        if (value && fieldConfig.fieldInputType === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(`${fieldConfig.title} must be a valid email address`);
          }
        }

        if (
          value &&
          fieldConfig.minLength &&
          value.length < fieldConfig.minLength
        ) {
          errors.push(
            `${fieldConfig.title} must be at least ${fieldConfig.minLength} characters`
          );
        }

        if (
          value &&
          fieldConfig.maxLength &&
          value.length > fieldConfig.maxLength
        ) {
          errors.push(
            `${fieldConfig.title} must be no more than ${fieldConfig.maxLength} characters`
          );
        }
      }
    });
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }
}

// Upsert form submission (create or update)
export async function _upsertFormSubmission(
  input: UpsertFormSubmissionInput
): Promise<ApiResponse<{ submissionId: string }>> {
  try {
    console.log("Upsert form submission input:", input);
    const { formType, formData, isDraft = false, submissionId } = input;

    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Validate form data
    validateFormData(formType, formData, isDraft);

    // Determine form status
    const status: FormStatus = isDraft
      ? FormStatus.DRAFT
      : FormStatus.SUBMITTED;

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      let existingSubmission = null;

      // If submissionId is provided, try to find and update existing submission
      if (submissionId) {
        existingSubmission = await tx.formSubmission.findUnique({
          where: { id: submissionId },
        });

        if (!existingSubmission) {
          throw new Error("Form submission not found");
        }

        // Check if user owns this submission
        if (existingSubmission.userId !== user.id) {
          throw new Error(
            "Unauthorized: You can only update your own submissions"
          );
        }

        // Check if submission can be updated
        if (existingSubmission.status === FormStatus.SUBMITTED && !isDraft) {
          throw new Error(
            "Cannot update a submitted form. Create a new submission instead."
          );
        }

        // Update existing submission
        const updatedSubmission = await tx.formSubmission.update({
          where: { id: submissionId },
          data: {
            formData: formData,
            status: status,
            updatedAt: new Date(),
          },
        });

        return updatedSubmission;
      } else {
        // Creating new submission - check if user already has one for this form type
        existingSubmission = await tx.formSubmission.findFirst({
          where: {
            userId: user.id,
            formType: formType,
          },
        });

        if (existingSubmission && !isDraft) {
          throw new Error(
            "A submission already exists for this form type. Please provide submissionId to update."
          );
        }

        // If existing draft and creating new submission, delete the draft
        if (
          existingSubmission &&
          existingSubmission.status === FormStatus.DRAFT &&
          !isDraft
        ) {
          await tx.formSubmission.delete({
            where: { id: existingSubmission.id },
          });
        }

        // Create new form submission
        const newSubmission = await tx.formSubmission.create({
          data: {
            userId: user.id,
            formType: formType,
            status: status,
            formData: formData,
          },
        });

        return newSubmission;
      }
    });

    const isUpdate = !!submissionId;
    return {
      success: true,
      message: isDraft
        ? isUpdate
          ? "Form draft updated successfully"
          : "Form saved as draft successfully"
        : isUpdate
          ? "Form submission updated successfully"
          : "Form submitted successfully",
      data: { submissionId: result.id },
    };
  } catch (error) {
    console.error("Error upserting form submission:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to save form submission",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}

// Get form submissions for the authenticated user
export async function _getUserFormSubmissions(
  formType?: FormType
): Promise<ApiResponse<any[]>> {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Build where clause
    const whereClause: any = {
      userId: user.id,
    };

    if (formType) {
      whereClause.formType = formType;
    }

    // Get form submissions
    const submissions = await prisma.formSubmission.findMany({
      where: whereClause,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        formType: true,
        status: true,
        submittedAt: true,
        updatedAt: true,
        formData: true,
      },
    });

    return {
      success: true,
      message: "Form submissions retrieved successfully",
      data: submissions,
    };
  } catch (error) {
    console.error("Error getting form submissions:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get form submissions",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}

// Get a specific form submission
export async function _getFormSubmission(
  submissionId: string
): Promise<ApiResponse<any>> {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Get form submission
    const submission = await prisma.formSubmission.findUnique({
      where: { id: submissionId },
      include: {
        comments: {
          where: { isResolved: false },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!submission) {
      return {
        success: false,
        message: "Form submission not found",
        error: ApiErrorCode.RESOURCE_NOT_FOUND,
      };
    }

    // Check if user owns this submission
    if (submission.userId !== user.id) {
      return {
        success: false,
        message: "Unauthorized: You can only view your own submissions",
        error: ApiErrorCode.UNAUTHORIZED,
      };
    }

    return {
      success: true,
      message: "Form submission retrieved successfully",
      data: submission,
    };
  } catch (error) {
    console.error("Error getting form submission:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get form submission",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}

// Get current user's form submission for a specific form type
export async function _getCurrentUserFormSubmission(
  formType: FormType
): Promise<ApiResponse<any>> {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Get the most recent form submission for this user and form type
    const submission = await prisma.formSubmission.findFirst({
      where: {
        userId: user.id,
        formType: formType,
      },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        formType: true,
        status: true,
        submittedAt: true,
        updatedAt: true,
        createdAt: true,
        formData: true,
      },
    });

    if (!submission) {
      return {
        success: false,
        message: `No form submission found for form type: ${formType}`,
        error: ApiErrorCode.RESOURCE_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: "Form submission retrieved successfully",
      data: submission,
    };
  } catch (error) {
    console.error("Error getting current user form submission:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get form submission",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}

// Delete a form submission (only drafts can be deleted)
export async function _deleteFormSubmission(
  submissionId: string
): Promise<ApiResponse> {
  try {
    // Get authenticated user
    const user = await getAuthenticatedUser();

    // Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Get existing submission
      const existingSubmission = await tx.formSubmission.findUnique({
        where: { id: submissionId },
      });

      if (!existingSubmission) {
        throw new Error("Form submission not found");
      }

      // Check if user owns this submission
      if (existingSubmission.userId !== user.id) {
        throw new Error(
          "Unauthorized: You can only delete your own submissions"
        );
      }

      // Only allow deletion of drafts
      if (existingSubmission.status !== FormStatus.DRAFT) {
        throw new Error("Only draft submissions can be deleted");
      }

      // Delete form submission
      await tx.formSubmission.delete({
        where: { id: submissionId },
      });
    });

    return {
      success: true,
      message: "Form draft deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting form submission:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete form submission",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}
