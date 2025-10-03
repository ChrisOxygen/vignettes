"use server";

import { createClient } from "@/utils/supabase/server";
import {
  userCreationSchema,
  type ZUserCreationData,
  adminUserCreationSchema,
  type ZAdminUserCreationData,
} from "../validators/user.validator";
import { ApiResponse } from "@/features/shared/types/api";
import { ApiErrorCode } from "@/features/shared/types/error";
import { PrismaClient, User, UserRole } from "@prisma/client";
import { sendVerificationEmail } from "./email.actions";
import {
  handleUserCreationError,
  handleAdminUserCreationError,
  handleEmailVerificationTokenError,
  handleUserRetrievalError,
} from "../utils/errorHandlers";
import { validateAdminCode } from "../utils/adminHelpers";

const prisma = new PrismaClient();

export const _createUser = async (
  input: ZUserCreationData
): Promise<ApiResponse> => {
  try {
    // Validate input using Zod schema
    const validationResult = userCreationSchema.safeParse(input);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return {
        success: false,
        message: firstError.message,
        error: ApiErrorCode.VALIDATION_ERROR,
      };
    }

    const { email, password, name } = validationResult.data;

    // Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Check if email already exists in database (inside transaction)

      const existingUser = await tx.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("Email already exists");
      }

      console.log("Email is unique, proceeding to create user");

      // Create user in Supabase Auth first
      const supabase = await createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "USER", // Set role in auth metadata
          },
        },
      });

      if (authError) {
        // If Supabase signup fails, throw error to rollback transaction
        throw new Error(`Supabase auth creation failed: ${authError.message}`);
      }

      // Create user in database only after Supabase auth succeeds
      // No password field - Supabase handles all password management
      const newUser = await tx.user.create({
        data: {
          email,
          name,
          accountStatus: "PENDING_VERIFICATION", // New users need to verify email
        },
      });

      // Generate email verification token directly in the same transaction
      const uuid = crypto.randomUUID();
      const tokenSuffix = uuid.replace(/-/g, "").substring(0, 18); // 18 chars + 7 char prefix = 25 total
      const verificationToken = `evtk_${tokenSuffix}`;

      // Set expiration to 24 hours from now
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      // Create email verification token in the same transaction
      await tx.emailVerificationToken.create({
        data: {
          userId: newUser.id,
          token: verificationToken,
          expiresAt,
        },
      });

      // TODO: Send verification email with the token outside the transaction

      await sendVerificationEmail(email, name, verificationToken);
    });

    return {
      success: true,
      message:
        "Account created successfully! Please check your email to verify your account.",
    };
  } catch (error) {
    return handleUserCreationError(error);
  }
};

export const _createEmailVerificationToken = async (
  userId: string
): Promise<ApiResponse<string>> => {
  try {
    // Validate userId
    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
        error: ApiErrorCode.MISSING_FIELDS,
      };
    }

    let token: string;

    // Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Check if user exists
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if user already has a verification token and delete it
      const existingToken = await tx.emailVerificationToken.findUnique({
        where: { userId },
      });

      if (existingToken) {
        await tx.emailVerificationToken.delete({
          where: { userId },
        });
      }

      // Generate new token with prefix and UUID
      const uuid = crypto.randomUUID();
      const tokenSuffix = uuid.replace(/-/g, "").substring(0, 18); // 18 chars + 7 char prefix = 25 total
      token = `e_v_token${tokenSuffix}`;

      // Set expiration to 24 hours from now
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      // Create new verification token
      await tx.emailVerificationToken.create({
        data: {
          userId,
          token,
          expiresAt,
        },
      });
    });

    return {
      success: true,
      message: "Email verification token created successfully",
      data: token!,
    };
  } catch (error) {
    return handleEmailVerificationTokenError(error);
  }
};

// Create admin user with invitation code validation
export const _createAdminUser = async (
  input: ZAdminUserCreationData
): Promise<ApiResponse> => {
  try {
    // Validate input using Zod schema
    const validationResult = adminUserCreationSchema.safeParse(input);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return {
        success: false,
        message: firstError.message,
        error: ApiErrorCode.VALIDATION_ERROR,
      };
    }

    const { email, password, name, adminCode } = validationResult.data;

    // Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // 1. Validate admin code first
      const codeValidation = await validateAdminCode(adminCode, tx);

      if (!codeValidation.isValid) {
        throw new Error(codeValidation.error || "Invalid admin code");
      }

      // 2. Check if email already exists in database
      const existingUser = await tx.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("Email already exists");
      }

      console.log(
        "Email is unique and admin code is valid, proceeding to create admin user"
      );

      // 3. Create user in Supabase Auth first
      const supabase = await createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "ADMIN", // Set role in auth metadata
          },
          emailRedirectTo: `${process.env.SITE_URL}/admin`,
        },
      });

      if (authError) {
        throw new Error(`Supabase auth creation failed: ${authError.message}`);
      }

      // 4. Create user in database with ADMIN role
      const newUser = await tx.user.create({
        data: {
          email,
          name,
          role: "ADMIN", // Assign ADMIN role
        },
      });

      // 5. Delete admin invitation after successful use
      await tx.adminInvitation.delete({
        where: { id: codeValidation.invitationId },
      });
    });

    return {
      success: true,
      message:
        "Admin account created successfully! Please check your email to verify your account.",
    };
  } catch (error) {
    return handleAdminUserCreationError(error);
  }
};

// Get user by ID or email
export const _getUser = async (identifier: {
  id?: string;
  email?: string;
}): Promise<ApiResponse<User>> => {
  try {
    // Validate that at least one identifier is provided
    if (!identifier.id && !identifier.email) {
      return {
        success: false,
        message: "User ID or email is required",
        error: ApiErrorCode.MISSING_FIELDS,
      };
    }

    // Build where clause based on provided identifier
    const whereClause = identifier.id
      ? { id: identifier.id }
      : { email: identifier.email };

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: whereClause,
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        error: ApiErrorCode.USER_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: "User retrieved successfully",
      data: user,
    };
  } catch (error) {
    return handleUserRetrievalError(error);
  }
};

// Get current authenticated user (combines Supabase auth + database data)
export const _getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    // Get current session from Supabase
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return {
        success: false,
        message: "Not authenticated",
        error: ApiErrorCode.UNAUTHORIZED,
      };
    }

    // Get user data from database using email from auth
    return await _getUser({ email: authUser.email });
  } catch (error) {
    return handleUserRetrievalError(error);
  }
};

// Resend email verification token
export const _resendVerificationEmail = async (
  email: string
): Promise<ApiResponse> => {
  try {
    // Validate email
    if (!email) {
      return {
        success: false,
        message: "Email is required",
        error: ApiErrorCode.MISSING_FIELDS,
      };
    }

    // Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Find user by email
      const user = await tx.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if user is already verified
      if (user.accountStatus === "ACTIVE") {
        throw new Error("User already verified");
      }

      // Delete any existing verification token
      const existingToken = await tx.emailVerificationToken.findUnique({
        where: { userId: user.id },
      });

      if (existingToken) {
        await tx.emailVerificationToken.delete({
          where: { userId: user.id },
        });
      }

      // Generate new token with prefix and UUID
      const uuid = crypto.randomUUID();
      const tokenSuffix = uuid.replace(/-/g, "").substring(0, 18); // 18 chars + 7 char prefix = 25 total
      const verificationToken = `evtk_${tokenSuffix}`;

      // Set expiration to 24 hours from now
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      // Create new verification token
      await tx.emailVerificationToken.create({
        data: {
          userId: user.id,
          token: verificationToken,
          expiresAt,
        },
      });

      // Send verification email
      await sendVerificationEmail(
        email,
        user.name || "User",
        verificationToken
      );
    });

    return {
      success: true,
      message: "Verification email sent successfully. Please check your inbox.",
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("User not found")) {
        return {
          success: false,
          message: "No account found with this email address",
          error: ApiErrorCode.USER_NOT_FOUND,
        };
      }

      if (error.message.includes("User already verified")) {
        return {
          success: false,
          message: "Your account is already verified. You can sign in now.",
          error: ApiErrorCode.INVALID_DATA,
        };
      }
    }

    return handleEmailVerificationTokenError(error);
  }
};
