import { User, BasicApplicantData } from "@prisma/client";

// User with all possible relations included
export type UserWithRelations = User & {
  basicApplicantData?: BasicApplicantData | null;
  emailVerificationToken?: {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
  } | null;
};

// Specific type for user with basic applicant data included
export type UserWithBasicApplicantData = User & {
  basicApplicantData: BasicApplicantData | null;
};

// Type for user with email verification token included
export type UserWithEmailVerificationToken = User & {
  emailVerificationToken: {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
  } | null;
};

// Type for complete user profile (all relations)
export type CompleteUserProfile = User & {
  basicApplicantData: BasicApplicantData | null;
  emailVerificationToken: {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
  } | null;
};
