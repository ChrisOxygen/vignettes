"use server";

import { createClient } from "@/utils/supabase/server";
import { FormType, FormStatus, UserRole } from "@prisma/client";
import { ApiResponse } from "@/features/shared/types/api";
import { ApiErrorCode } from "@/features/shared/types/error";
import { prisma } from "@/prisma/prisma";
import {
  AdminFormSubmissionFilters,
  FormSubmissionWithUser,
  ApplicantFormSubmission,
  FormSubmissionWithComments,
  ApplicantWithSubmissions,
} from "@/features/admin/types";

/**
 * Admin-specific server actions for managing form submissions
 * These actions enforce ADMIN role authorization
 */

// Utility function to get authenticated admin user
async function getAuthenticatedAdmin() {
  try {
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      throw new Error("Authentication required");
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: authData.user.email! },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        accountStatus: true,
      },
    });

    if (!user) {
      throw new Error("User not found in database");
    }

    // Enforce admin role
    if (user.role !== UserRole.ADMIN) {
      throw new Error("Unauthorized: Admin access required");
    }

    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Get all form submissions with optional filters
 * Admin can view all submissions across all users
 */
export async function _getAllFormSubmissions(
  filters?: AdminFormSubmissionFilters
): Promise<ApiResponse<FormSubmissionWithUser[]>> {
  try {
    // Verify admin authentication
    await getAuthenticatedAdmin();

    // Build where clause based on filters
    const whereClause: any = {};

    if (filters?.userId) {
      whereClause.userId = filters.userId;
    }

    if (filters?.formType) {
      whereClause.formType = filters.formType;
    }

    if (filters?.status) {
      whereClause.status = filters.status;
    }

    if (filters?.dateFrom || filters?.dateTo) {
      whereClause.createdAt = {};
      if (filters.dateFrom) {
        whereClause.createdAt.gte = filters.dateFrom;
      }
      if (filters.dateTo) {
        whereClause.createdAt.lte = filters.dateTo;
      }
    }

    // Get all form submissions with user data
    const submissions = await prisma.formSubmission.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return {
      success: true,
      message: "Form submissions retrieved successfully",
      data: submissions,
    };
  } catch (error) {
    console.error("Error getting all form submissions:", error);

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

/**
 * Get form submissions for a specific applicant
 * Admin can view all submissions for any user
 */
export async function _getApplicantFormSubmissions(
  userId: string,
  formType?: FormType
): Promise<ApiResponse<ApplicantFormSubmission[]>> {
  try {
    // Verify admin authentication
    await getAuthenticatedAdmin();

    // Build where clause
    const whereClause: any = {
      userId: userId,
    };

    if (formType) {
      whereClause.formType = formType;
    }

    // Get form submissions for the specified user
    const submissions = await prisma.formSubmission.findMany({
      where: whereClause,
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

    return {
      success: true,
      message: "Applicant form submissions retrieved successfully",
      data: submissions,
    };
  } catch (error) {
    console.error("Error getting applicant form submissions:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get applicant form submissions",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}

/**
 * Get a specific form submission by ID
 * Admin can view any submission without ownership check
 */
export async function _getFormSubmissionById(
  submissionId: string
): Promise<ApiResponse<FormSubmissionWithComments>> {
  try {
    // Verify admin authentication
    await getAuthenticatedAdmin();

    // Get form submission with comments and user data
    const submission = await prisma.formSubmission.findUnique({
      where: { id: submissionId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
        comments: {
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

    return {
      success: true,
      message: "Form submission retrieved successfully",
      data: submission,
    };
  } catch (error) {
    console.error("Error getting form submission by ID:", error);

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

/**
 * Update form submission status
 * Admin can change status to UNDER_REVIEW, APPROVED, REJECTED, or CHANGES_REQUESTED
 */
export async function _updateFormSubmissionStatus(
  submissionId: string,
  status: FormStatus
): Promise<ApiResponse<{ submissionId: string }>> {
  try {
    // Verify admin authentication
    const admin = await getAuthenticatedAdmin();

    // Validate status transition
    const validAdminStatuses = [
      FormStatus.UNDER_REVIEW,
      FormStatus.APPROVED,
      FormStatus.REJECTED,
      FormStatus.CHANGES_REQUESTED,
    ] as const;

    if (!validAdminStatuses.includes(status as any)) {
      return {
        success: false,
        message: `Invalid status. Admin can only set status to: ${validAdminStatuses.join(", ")}`,
        error: ApiErrorCode.VALIDATION_ERROR,
      };
    }

    // Check if submission exists
    const existingSubmission = await prisma.formSubmission.findUnique({
      where: { id: submissionId },
    });

    if (!existingSubmission) {
      return {
        success: false,
        message: "Form submission not found",
        error: ApiErrorCode.RESOURCE_NOT_FOUND,
      };
    }

    // Update submission status
    const updatedSubmission = await prisma.formSubmission.update({
      where: { id: submissionId },
      data: {
        status: status,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: `Form submission status updated to ${status}`,
      data: { submissionId: updatedSubmission.id },
    };
  } catch (error) {
    console.error("Error updating form submission status:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update form submission status",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}

/**
 * Get submission statistics
 * Admin dashboard analytics
 */
export async function _getSubmissionStatistics(): Promise<
  ApiResponse<{
    totalSubmissions: number;
    pendingReviews: number;
    approved: number;
    rejected: number;
    changesRequested: number;
    byFormType: Record<FormType, number>;
    byStatus: Record<FormStatus, number>;
  }>
> {
  try {
    // Verify admin authentication
    await getAuthenticatedAdmin();

    // Get total submissions
    const totalSubmissions = await prisma.formSubmission.count();

    // Get counts by status
    const pendingReviews = await prisma.formSubmission.count({
      where: {
        status: {
          in: [FormStatus.SUBMITTED, FormStatus.UNDER_REVIEW],
        },
      },
    });

    const approved = await prisma.formSubmission.count({
      where: { status: FormStatus.APPROVED },
    });

    const rejected = await prisma.formSubmission.count({
      where: { status: FormStatus.REJECTED },
    });

    const changesRequested = await prisma.formSubmission.count({
      where: { status: FormStatus.CHANGES_REQUESTED },
    });

    // Get counts by form type
    const byFormTypeRaw = await prisma.formSubmission.groupBy({
      by: ["formType"],
      _count: true,
    });

    const byFormType = byFormTypeRaw.reduce(
      (acc, item) => {
        acc[item.formType] = item._count;
        return acc;
      },
      {} as Record<FormType, number>
    );

    // Get counts by status
    const byStatusRaw = await prisma.formSubmission.groupBy({
      by: ["status"],
      _count: true,
    });

    const byStatus = byStatusRaw.reduce(
      (acc, item) => {
        acc[item.status] = item._count;
        return acc;
      },
      {} as Record<FormStatus, number>
    );

    return {
      success: true,
      message: "Submission statistics retrieved successfully",
      data: {
        totalSubmissions,
        pendingReviews,
        approved,
        rejected,
        changesRequested,
        byFormType,
        byStatus,
      },
    };
  } catch (error) {
    console.error("Error getting submission statistics:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to get submission statistics",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}

/**
 * Get all users with their submission counts
 * For the applicants page
 */
export async function _getAllApplicantsWithSubmissions(): Promise<
  ApiResponse<ApplicantWithSubmissions[]>
> {
  try {
    // Verify admin authentication
    await getAuthenticatedAdmin();

    // Get all users with USER role and their submission counts
    const applicants = await prisma.user.findMany({
      where: { role: UserRole.USER },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        middleName: true,
        accountStatus: true,
        createdAt: true,
        _count: {
          select: {
            formSubmissions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      message: "Applicants retrieved successfully",
      data: applicants,
    };
  } catch (error) {
    console.error("Error getting applicants:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to get applicants",
      error: ApiErrorCode.INTERNAL_ERROR,
    };
  }
}
