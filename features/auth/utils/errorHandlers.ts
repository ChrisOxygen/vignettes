import { ApiResponse } from "@/features/shared/types/api";
import { ApiErrorCode } from "@/features/shared/types/error";

// Error handling function for user creation
export const handleUserCreationError = (error: unknown): ApiResponse => {
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

// Error handling function for admin user creation
export const handleAdminUserCreationError = (error: unknown): ApiResponse => {
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

// Error handling function for email verification token creation
export const handleEmailVerificationTokenError = (
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

// Error handling function for user retrieval
export const handleUserRetrievalError = (error: unknown): ApiResponse<any> => {
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
