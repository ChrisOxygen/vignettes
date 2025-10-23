"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAssessmentSubmissionEmail } from "../actions/email.actions";
import { AssessmentType, AssessmentData } from "@/emails/types/assessmentTypes";

interface SendAssessmentEmailParams {
  assessmentType: AssessmentType;
  formData: AssessmentData;
}

interface SendAssessmentEmailResponse {
  ok: boolean;
  message: string;
  data?: any;
  error?: string;
}

interface UseSendAssessmentEmailOptions {
  onSuccess?: (response: SendAssessmentEmailResponse) => void;
  onError?: (error: string) => void;
}

// Hook to send assessment submission email
export function useSendAssessmentEmail(
  options?: UseSendAssessmentEmailOptions
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      assessmentType,
      formData,
    }: SendAssessmentEmailParams): Promise<SendAssessmentEmailResponse> => {
      const result = await sendAssessmentSubmissionEmail(
        assessmentType,
        formData
      );

      // If the server action returns an error, throw it to trigger onError
      if (!result.ok) {
        throw new Error(result.error || result.message);
      }

      return result;
    },
    onSuccess: (result) => {
      // Invalidate assessment-related queries if needed
      queryClient.invalidateQueries({ queryKey: ["assessments"] });

      // Call the success callback with the API response
      if (result) {
        options?.onSuccess?.(result);
      }
    },
    onError: (error: Error) => {
      options?.onError?.(error.message);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message || null,
    isSuccess: mutation.isSuccess,
    data: mutation.data || null,
    reset: mutation.reset,
  };
}
