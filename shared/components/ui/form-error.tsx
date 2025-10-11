import * as React from "react";
import { ZodError, ZodIssue } from "zod";
import { cn } from "@/shared/lib/utils";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { AlertCircle } from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

interface FormErrorProps {
  error?: ZodError | string | null;
  fieldPath?: string;
  className?: string;
}

interface FieldErrorProps {
  errors?: ZodIssue[];
  className?: string;
}

interface ErrorSummaryProps {
  error: ZodError;
  className?: string;
  onClick?: (fieldPath: string) => void;
}

// =============================================================================
// INDIVIDUAL FIELD ERROR COMPONENT
// =============================================================================

export function FieldError({ errors, className }: FieldErrorProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className={cn("space-y-1", className)}>
      {errors.map((error, index) => (
        <p
          key={index}
          className="text-sm font-medium text-destructive"
          role="alert"
          aria-live="polite"
        >
          {error.message}
        </p>
      ))}
    </div>
  );
}

// =============================================================================
// FORM ERROR COMPONENT (for specific field or general errors)
// =============================================================================

export function FormError({ error, fieldPath, className }: FormErrorProps) {
  if (!error) return null;

  // Handle string errors (legacy support)
  if (typeof error === "string") {
    return (
      <p
        className={cn("text-sm font-medium text-destructive", className)}
        role="alert"
        aria-live="polite"
      >
        {error}
      </p>
    );
  }

  // Handle ZodError
  if (error instanceof ZodError) {
    const relevantErrors = fieldPath
      ? error.issues.filter((issue) => {
          const issuePath = issue.path.join(".");
          return (
            issuePath === fieldPath || issuePath.startsWith(`${fieldPath}.`)
          );
        })
      : error.issues;

    if (relevantErrors.length === 0) return null;

    return <FieldError errors={relevantErrors} className={className} />;
  }

  return null;
}

// =============================================================================
// ERROR SUMMARY COMPONENT (shows all errors at once)
// =============================================================================

export function ErrorSummary({ error, className, onClick }: ErrorSummaryProps) {
  if (!error || error.issues.length === 0) return null;

  // Group errors by field path
  const errorsByField = error.issues.reduce(
    (acc, issue) => {
      const fieldPath = issue.path.join(".");
      if (!acc[fieldPath]) {
        acc[fieldPath] = [];
      }
      acc[fieldPath].push(issue);
      return acc;
    },
    {} as Record<string, ZodIssue[]>
  );

  return (
    <Alert variant="destructive" className={cn("mb-6", className)}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-2">
          <p className="font-medium">Please fix the following errors:</p>
          <ul className="space-y-1 ml-4">
            {Object.entries(errorsByField).map(([fieldPath, fieldErrors]) => (
              <li key={fieldPath} className="list-disc">
                <div className="space-y-1">
                  {fieldPath && (
                    <button
                      type="button"
                      className="text-sm font-medium hover:underline cursor-pointer"
                      onClick={() => onClick?.(fieldPath)}
                    >
                      {formatFieldPath(fieldPath)}:
                    </button>
                  )}
                  <ul className="ml-4 space-y-1">
                    {fieldErrors.map((error, index) => (
                      <li key={index} className="text-sm list-disc">
                        {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Formats a field path for display
 * e.g., "firstName" -> "First Name"
 * e.g., "travelledLast10Years.explanation" -> "Travel History (Explanation)"
 */
function formatFieldPath(fieldPath: string): string {
  const parts = fieldPath.split(".");

  return parts
    .map((part, index) => {
      // Convert camelCase to Title Case
      const formatted = part
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim();

      // Add context for nested fields
      if (index > 0) {
        return `(${formatted})`;
      }

      return formatted;
    })
    .join(" ");
}

// =============================================================================
// HOOK FOR MANAGING FORM ERRORS
// =============================================================================

export function useFormErrors() {
  const [errors, setErrors] = React.useState<ZodError | null>(null);

  const setFormErrors = React.useCallback((error: ZodError | null) => {
    setErrors(error);
  }, []);

  const clearErrors = React.useCallback(() => {
    setErrors(null);
  }, []);

  const getFieldErrors = React.useCallback(
    (fieldPath: string): ZodIssue[] => {
      if (!errors) return [];

      return errors.issues.filter((issue) => {
        const issuePath = issue.path.join(".");
        return issuePath === fieldPath || issuePath.startsWith(`${fieldPath}.`);
      });
    },
    [errors]
  );

  const hasFieldErrors = React.useCallback(
    (fieldPath: string): boolean => {
      return getFieldErrors(fieldPath).length > 0;
    },
    [getFieldErrors]
  );

  return {
    errors,
    setFormErrors,
    clearErrors,
    getFieldErrors,
    hasFieldErrors,
  };
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { FormErrorProps, FieldErrorProps, ErrorSummaryProps };
