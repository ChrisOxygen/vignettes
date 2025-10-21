import { useQuery } from "@tanstack/react-query";
import { FormType } from "@prisma/client";
import { _getCurrentUserFormSubmission } from "../actions";
import { ApiResponse } from "@/features/shared/types/api";

interface FormSubmissionData {
  id: string;
  formType: FormType;
  status: string;
  submittedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
  formData: Record<string, any>;
}

interface UseFormSubmissionProps {
  formType: FormType;
  enabled?: boolean;
}

export function useFormSubmission({
  formType,
  enabled = true,
}: UseFormSubmissionProps) {
  return useQuery({
    queryKey: ["formSubmission", formType],
    queryFn: async (): Promise<FormSubmissionData> => {
      const response: ApiResponse<FormSubmissionData> =
        await _getCurrentUserFormSubmission(formType);

      if (!response.success) {
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("No form submission found");
      }

      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's a "not found" error
      if (error.message.includes("No form submission found")) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
}
