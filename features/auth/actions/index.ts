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

const prisma = new PrismaClient();

// Error handling function for user creation
const handleUserCreationError = (error: unknown): ApiResponse => {
  console.error("Error creating user:", error);

  if (error instanceof Error) {
    // Handle Supabase auth errors
    if (error.message.includes("Supabase auth creation failed")) {
      return {
        success: false,
        message: "Failed to create authentication account. Please try again.",
        error: ApiErrorCode.AUTH_CREATION_FAILED,
      };
    }

    // Handle email already exists error
    if (error.message.includes("Email already exists")) {
      return {
        success: false,
        message: "An account with this email already exists",
        error: ApiErrorCode.EMAIL_EXISTS,
      };
    }

    // Handle Prisma unique constraint errors
    if (error.message.includes("Unique constraint")) {
      return {
        success: false,
        message: "An account with this email already exists",
        error: ApiErrorCode.EMAIL_EXISTS,
      };
    }

    // Handle Prisma connection errors
    if (
      error.message.includes("Connection") ||
      error.message.includes("ECONNREFUSED")
    ) {
      return {
        success: false,
        message: "Database connection failed. Please try again later.",
        error: ApiErrorCode.DATABASE_CONNECTION_ERROR,
      };
    }

    // Handle validation errors from Prisma
    if (error.message.includes("Argument validation failed")) {
      return {
        success: false,
        message: "Invalid data provided. Please check your input.",
        error: ApiErrorCode.INVALID_DATA,
      };
    }
  }

  // Default error response
  return {
    success: false,
    message: "An unexpected error occurred. Please try again.",
    error: ApiErrorCode.INTERNAL_ERROR,
  };
};

// Admin code validation function
const _validateAdminCode = async (
  code: string,
  tx: any
): Promise<{ isValid: boolean; invitationId?: string; error?: string }> => {
  try {
    // Find admin invitation with the provided code
    const invitation = await tx.adminInvitation.findUnique({
      where: { code },
    });

    if (!invitation) {
      return { isValid: false, error: "Invalid admin code" };
    }

    return { isValid: true, invitationId: invitation.id };
  } catch (error) {
    console.error("Error validating admin code:", error);
    return { isValid: false, error: "Failed to validate admin code" };
  }
};

// Error handling function for admin user creation
const handleAdminUserCreationError = (error: unknown): ApiResponse => {
  console.error("Error creating admin user:", error);

  if (error instanceof Error) {
    // Handle admin code specific errors
    if (error.message.includes("Invalid admin code")) {
      return {
        success: false,
        message: "Invalid admin code provided",
        error: ApiErrorCode.INVALID_DATA,
      };
    }

    if (error.message.includes("Admin code has already been used")) {
      return {
        success: false,
        message: "This admin code has already been used",
        error: ApiErrorCode.INVALID_DATA,
      };
    }

    if (error.message.includes("Admin code has expired")) {
      return {
        success: false,
        message: "This admin code has expired",
        error: ApiErrorCode.INVALID_DATA,
      };
    }

    if (error.message.includes("Admin code usage limit exceeded")) {
      return {
        success: false,
        message: "This admin code has reached its usage limit",
        error: ApiErrorCode.INVALID_DATA,
      };
    }

    // Fall back to regular user creation error handling
    return handleUserCreationError(error);
  }

  // Default error response
  return {
    success: false,
    message: "An unexpected error occurred while creating admin account",
    error: ApiErrorCode.INTERNAL_ERROR,
  };
};

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

      // generate email verification token and send verification email here
      await _createEmailVerificationToken(newUser.id);
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

// Error handling function for email verification token creation
const handleEmailVerificationTokenError = (
  error: unknown
): ApiResponse<string> => {
  console.error("Error creating email verification token:", error);

  if (error instanceof Error) {
    // Handle user not found errors
    if (error.message.includes("User not found")) {
      return {
        success: false,
        message: "User not found",
        error: ApiErrorCode.USER_NOT_FOUND,
      };
    }

    // Handle Prisma connection errors
    if (
      error.message.includes("Connection") ||
      error.message.includes("ECONNREFUSED")
    ) {
      return {
        success: false,
        message: "Database connection failed. Please try again later.",
        error: ApiErrorCode.DATABASE_CONNECTION_ERROR,
      };
    }

    // Handle validation errors
    if (error.message.includes("Argument validation failed")) {
      return {
        success: false,
        message: "Invalid data provided. Please check your input.",
        error: ApiErrorCode.INVALID_DATA,
      };
    }
  }

  // Default error response
  return {
    success: false,
    message: "An unexpected error occurred while creating verification token",
    error: ApiErrorCode.INTERNAL_ERROR,
  };
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
      const codeValidation = await _validateAdminCode(adminCode, tx);

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

// Error handling function for user retrieval
const handleUserRetrievalError = (error: unknown): ApiResponse<any> => {
  console.error("Error retrieving user:", error);

  if (error instanceof Error) {
    // Handle Prisma not found errors
    if (
      error.message.includes("not found") ||
      error.message.includes("No user found")
    ) {
      return {
        success: false,
        message: "User not found",
        error: ApiErrorCode.USER_NOT_FOUND,
      };
    }

    // Handle Prisma connection errors
    if (
      error.message.includes("Connection") ||
      error.message.includes("ECONNREFUSED")
    ) {
      return {
        success: false,
        message: "Database connection failed. Please try again later.",
        error: ApiErrorCode.DATABASE_CONNECTION_ERROR,
      };
    }

    // Handle validation errors
    if (
      error.message.includes("Invalid") ||
      error.message.includes("validation")
    ) {
      return {
        success: false,
        message: "Invalid user identifier provided",
        error: ApiErrorCode.INVALID_DATA,
      };
    }
  }

  // Default error response
  return {
    success: false,
    message: "An unexpected error occurred while retrieving user",
    error: ApiErrorCode.INTERNAL_ERROR,
  };
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
