// Standard API response structure for consistent error handling
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Success response helper
export const createSuccessResponse = <T>(
  message: string,
  data?: T
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});

// Error response helper
export const createErrorResponse = (
  message: string,
  error?: string
): ApiResponse => ({
  success: false,
  message,
  error,
});

// Pagination metadata for list responses
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Paginated response structure
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
