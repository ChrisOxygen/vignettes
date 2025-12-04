import { FormType, FormStatus, Prisma } from "@prisma/client";

/**
 * Admin-specific types for form submission management
 */

// Filters for querying form submissions
export interface AdminFormSubmissionFilters {
  userId?: string;
  formType?: FormType;
  status?: FormStatus;
  dateFrom?: Date;
  dateTo?: Date;
}

// Type for form submission with user data
export type FormSubmissionWithUser = Prisma.FormSubmissionGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        email: true;
        firstName: true;
        lastName: true;
        middleName: true;
      };
    };
  };
}>;

// Type for applicant's form submission (without user data)
export type ApplicantFormSubmission = Prisma.FormSubmissionGetPayload<{
  select: {
    id: true;
    formType: true;
    status: true;
    submittedAt: true;
    updatedAt: true;
    createdAt: true;
    formData: true;
    _count: {
      select: {
        comments: true;
      };
    };
  };
}>;

// Type for form submission with comments and user data
export type FormSubmissionWithComments = Prisma.FormSubmissionGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        email: true;
        firstName: true;
        lastName: true;
        middleName: true;
      };
    };
    comments: true;
  };
}>;

// Type for applicant with submission count
export type ApplicantWithSubmissions = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    firstName: true;
    lastName: true;
    middleName: true;
    accountStatus: true;
    createdAt: true;
    _count: {
      select: {
        formSubmissions: true;
      };
    };
  };
}>;

// Hook option types
export interface UseAllApplicantsOptions {
  enabled?: boolean;
}

export interface UseApplicantByIdOptions {
  applicantId: string;
  enabled?: boolean;
}

export interface UseAllFormSubmissionsOptions {
  filters?: AdminFormSubmissionFilters;
  enabled?: boolean;
}

export interface UseApplicantFormSubmissionsOptions {
  userId: string;
  formType?: FormType;
  enabled?: boolean;
}

export interface UseFormSubmissionDetailsOptions {
  submissionId: string;
  enabled?: boolean;
}

export interface UseSubmissionStatisticsOptions {
  enabled?: boolean;
  refetchInterval?: number;
}

export interface UpdateStatusInput {
  submissionId: string;
  status: FormStatus;
}

export interface UseUpdateSubmissionStatusOptions {
  onSuccess?: (data: {
    success: boolean;
    message: string;
    data?: { submissionId: string };
  }) => void;
  onError?: (error: string) => void;
}

// Statistics type
export interface SubmissionStatistics {
  totalSubmissions: number;
  pendingReviews: number;
  approved: number;
  rejected: number;
  changesRequested: number;
  byFormType: Record<FormType, number>;
  byStatus: Record<FormStatus, number>;
}
