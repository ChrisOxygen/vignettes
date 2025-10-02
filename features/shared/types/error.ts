// Standardized error codes for consistent error handling across the application
export enum ApiErrorCode {
  // Authentication Errors
  UNAUTHORIZED = "UNAUTHORIZED",
  AUTH_CREATION_FAILED = "AUTH_CREATION_FAILED",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  SESSION_EXPIRED = "SESSION_EXPIRED",
  ACCOUNT_NOT_VERIFIED = "ACCOUNT_NOT_VERIFIED",

  // Authorization Errors
  FORBIDDEN = "FORBIDDEN",
  INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",

  // Validation Errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_DATA = "INVALID_DATA",
  MISSING_FIELDS = "MISSING_FIELDS",
  INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT",
  WEAK_PASSWORD = "WEAK_PASSWORD",

  // Resource Errors
  USER_NOT_FOUND = "USER_NOT_FOUND",
  EMAIL_EXISTS = "EMAIL_EXISTS",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",

  // Database Errors
  DATABASE_CONNECTION_ERROR = "DATABASE_CONNECTION_ERROR",
  DATABASE_QUERY_ERROR = "DATABASE_QUERY_ERROR",
  DATABASE_CONSTRAINT_ERROR = "DATABASE_CONSTRAINT_ERROR",

  // Server Errors
  INTERNAL_ERROR = "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",

  // Rate Limiting
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  // File Upload Errors
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
  UPLOAD_FAILED = "UPLOAD_FAILED",

  // Business Logic Errors
  OPERATION_NOT_ALLOWED = "OPERATION_NOT_ALLOWED",
  CONFLICT = "CONFLICT",
}

// Error message mapping for user-friendly messages
export const ErrorMessages: Record<ApiErrorCode, string> = {
  [ApiErrorCode.UNAUTHORIZED]: "You must be logged in to perform this action",
  [ApiErrorCode.AUTH_CREATION_FAILED]:
    "Failed to create authentication account",
  [ApiErrorCode.INVALID_CREDENTIALS]: "Invalid email or password",
  [ApiErrorCode.SESSION_EXPIRED]:
    "Your session has expired. Please log in again",
  [ApiErrorCode.ACCOUNT_NOT_VERIFIED]: "Please verify your email address",

  [ApiErrorCode.FORBIDDEN]: "You don't have permission to access this resource",
  [ApiErrorCode.INSUFFICIENT_PERMISSIONS]:
    "Insufficient permissions for this action",

  [ApiErrorCode.VALIDATION_ERROR]: "Please check your input and try again",
  [ApiErrorCode.INVALID_DATA]: "Invalid data provided",
  [ApiErrorCode.MISSING_FIELDS]: "Required fields are missing",
  [ApiErrorCode.INVALID_EMAIL_FORMAT]: "Please enter a valid email address",
  [ApiErrorCode.WEAK_PASSWORD]: "Password doesn't meet security requirements",

  [ApiErrorCode.USER_NOT_FOUND]: "User not found",
  [ApiErrorCode.EMAIL_EXISTS]: "An account with this email already exists",
  [ApiErrorCode.RESOURCE_NOT_FOUND]: "The requested resource was not found",
  [ApiErrorCode.RESOURCE_ALREADY_EXISTS]: "This resource already exists",

  [ApiErrorCode.DATABASE_CONNECTION_ERROR]:
    "Database connection failed. Please try again later",
  [ApiErrorCode.DATABASE_QUERY_ERROR]: "Database query failed",
  [ApiErrorCode.DATABASE_CONSTRAINT_ERROR]: "Database constraint violation",

  [ApiErrorCode.INTERNAL_ERROR]:
    "An unexpected error occurred. Please try again",
  [ApiErrorCode.SERVICE_UNAVAILABLE]: "Service is temporarily unavailable",
  [ApiErrorCode.EXTERNAL_SERVICE_ERROR]: "External service error",

  [ApiErrorCode.RATE_LIMIT_EXCEEDED]:
    "Too many requests. Please try again later",

  [ApiErrorCode.FILE_TOO_LARGE]: "File size exceeds the maximum limit",
  [ApiErrorCode.INVALID_FILE_TYPE]: "Invalid file type",
  [ApiErrorCode.UPLOAD_FAILED]: "File upload failed",

  [ApiErrorCode.OPERATION_NOT_ALLOWED]: "This operation is not allowed",
  [ApiErrorCode.CONFLICT]: "Resource conflict detected",
};

// Get user-friendly error message
export const getErrorMessage = (code: ApiErrorCode): string => {
  return ErrorMessages[code] || ErrorMessages[ApiErrorCode.INTERNAL_ERROR];
};
