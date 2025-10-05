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
import { generateEmailVerificationToken } from "../utils/tokenGenerator";

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

      // Create Supabase auth user first
      const supabase = await createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "USER", // Set role in auth metadata
            email_confirm: false,
            status: "PENDING_VERIFICATION",
          },
        },
      });

      if (authError) {
        // If Supabase signup fails, throw error to rollback transaction
        throw new Error(`Supabase auth creation failed: ${authError.message}`);
      }

      console.log(
        "Supabase auth user created successfully, creating database user"
      );

      // Create user in database only after Supabase auth succeeds
      const newUser = await tx.user.create({
        data: {
          email,
          name,
          accountStatus: "PENDING_VERIFICATION", // New users need to verify email
        },
      });

      // Generate email verification token using utility function

      const { token: verificationToken, expiresAt } =
        generateEmailVerificationToken();

      // Create email verification token in the same transaction
      await tx.emailVerificationToken.create({
        data: {
          userId: newUser.id,
          token: verificationToken,
          expiresAt,
        },
      });

      // Send verification email
      // Note: Supabase will also send its own verification email, but we're using our custom flow
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
  email: string
): Promise<ApiResponse<string>> => {
  try {
    // Validate email
    if (!email) {
      return {
        success: false,
        message: "Email is required",
        error: ApiErrorCode.MISSING_FIELDS,
      };
    }

    let token: string;

    // Use transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Check if user exists
      const user = await tx.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if user already has a verification token and delete it
      const existingToken = await tx.emailVerificationToken.findUnique({
        where: { userId: user.id },
      });

      if (existingToken) {
        await tx.emailVerificationToken.delete({
          where: { userId: user.id },
        });
      }

      // Generate new token using utility function
      const { token: generatedToken, expiresAt } =
        generateEmailVerificationToken();
      token = generatedToken;

      // Create new verification token
      await tx.emailVerificationToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
        },
      });

      // Send verification email within the transaction
      await sendVerificationEmail(user.email, user.name, token);
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
// Note: Since we now create Supabase auth users only after email verification,
// users who lose their verification email will need to register again to provide the password
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

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { emailVerificationToken: true },
    });

    if (!user) {
      return {
        success: false,
        message:
          "No account found with this email address. Please register again.",
        error: ApiErrorCode.USER_NOT_FOUND,
      };
    }

    // Check if user is already verified
    if (user.accountStatus === "ACTIVE") {
      return {
        success: false,
        message: "Your account is already verified. You can sign in now.",
        error: ApiErrorCode.INVALID_DATA,
      };
    }

    // Check if user has an existing verification token
    if (!user.emailVerificationToken) {
      return {
        success: false,
        message: "Your verification token has expired. Please register again.",
        error: ApiErrorCode.INVALID_DATA,
      };
    }

    // Resend the existing verification token
    await sendVerificationEmail(
      email,
      user.name || "User",
      user.emailVerificationToken.token
    );

    return {
      success: true,
      message:
        "Verification email resent successfully. Please check your inbox.",
    };
  } catch (error) {
    return handleEmailVerificationTokenError(error);
  }
};
