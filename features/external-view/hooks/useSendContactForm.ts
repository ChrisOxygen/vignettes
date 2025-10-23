import { useMutation } from "@tanstack/react-query";
import { sendContactFormEmail } from "@/features/external-view/actions/email.actions";
import type { ContactFormData } from "@/features/external-view/validators/contact.validator";

interface UseSendContactFormOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useSendContactForm = (options?: UseSendContactFormOptions) => {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const result = await sendContactFormEmail(formData);

      if (!result.ok) {
        throw new Error(result.message || "Failed to send contact form");
      }

      return result;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};
