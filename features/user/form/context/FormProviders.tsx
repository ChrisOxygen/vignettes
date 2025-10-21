"use client";

import { FormStatus, FormType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useForm, UseFormReturn, FieldValues } from "react-hook-form";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import { generateFormSchema } from "../utils/schema-generator";
import { generateDefaultValues } from "../utils/default-values";
import { useFormSubmission } from "../hooks/useFormSubmission";
import { useCreateOrUpdateFormSubmission } from "../hooks/useCreateOrUpdateFormSubmission";

// Generate the form schema and infer types
const formSchema = generateFormSchema();
type FormData = z.infer<typeof formSchema>;

// Get valid form types from enum
const VALID_FORM_TYPES = Object.values(FormType);

// Define the form context type
interface FormContextType {
  form: UseFormReturn<FormData>;
  formType: FormType | null;
  isInitializing: boolean;
  isSubmitting: boolean;
  submissionId: string | null;
  submissionStatus: FormStatus;
  isFormLocked: boolean;
  onSubmit: (data: FormData) => void;
  saveDraft: (data: FormData) => void;
  resetForm: () => void;
  initializeForm: () => void;
  isInitialized: boolean;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Define props for the FormProvider
interface FormProviderProps {
  children: ReactNode;
}

// FormProvider component
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const params = useParams<{ formType: string }>();
  const [formType, setFormType] = useState<FormType | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize React Hook Form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: generateDefaultValues(),
  });

  // Query existing form submission (only enabled when formType is set)
  const {
    data: existingSubmission,
    isLoading: isLoadingSubmission,
    error: submissionError,
  } = useFormSubmission({
    formType: formType as FormType,
    enabled: formType !== null,
  });

  // Mutation for creating/updating submissions
  const { mutate: upsertSubmission, isPending: isMutationPending } =
    useCreateOrUpdateFormSubmission({
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Form submitted successfully!", {
            description: response.message,
          });
        } else {
          toast.error("Submission failed", {
            description: response.message,
          });
        }
      },
      onError: (error) => {
        toast.error("Submission failed", {
          description: error,
        });
      },
    });

  // Initialize form - extract formType from params and load existing data
  const initializeForm = useCallback(() => {
    if (params.formType && !isInitialized) {
      // Convert kebab-case to SCREAMING_SNAKE_CASE
      const normalizedFormType = params.formType
        .toUpperCase()
        .replace(/-/g, "_");

      // Type guard to check if formType is valid
      const isValidFormType = (type: string): type is FormType => {
        return VALID_FORM_TYPES.includes(type as FormType);
      };

      if (isValidFormType(normalizedFormType)) {
        setFormType(normalizedFormType);
        setIsInitialized(true);
      } else {
        toast.error("Invalid form type", {
          description: `The form type "${params.formType}" is not valid.`,
        });
      }
    }
  }, [params.formType, isInitialized]);

  // Load existing data when available
  useEffect(() => {
    if (existingSubmission && existingSubmission.formData) {
      // Reset form with existing data
      form.reset(existingSubmission.formData as FormData);
    }
  }, [existingSubmission, form]);

  // Handle form submission
  const onSubmit = (data: FormData) => {
    if (!formType) {
      toast.error("Form not initialized", {
        description: "Please refresh the page and try again.",
      });
      return;
    }

    upsertSubmission({
      formType,
      formData: data,
      isDraft: false,
      submissionId: existingSubmission?.id,
    });
  };

  // Handle saving draft
  const saveDraft = (data: FormData) => {
    if (!formType) {
      toast.error("Form not initialized", {
        description: "Please refresh the page and try again.",
      });
      return;
    }

    upsertSubmission({
      formType,
      formData: data,
      isDraft: true,
      submissionId: existingSubmission?.id,
    });

    toast.success("Draft saved successfully!", {
      description: "Your progress has been saved and you can continue later.",
    });
  };

  // Reset form to default values
  const resetForm = () => {
    form.reset(generateDefaultValues());
    toast.info("Form has been reset", {
      description: "All fields have been cleared to their default values.",
    });
  };

  const isInitializing = isLoadingSubmission;
  const isSubmitting = isMutationPending;
  const submissionId = existingSubmission?.id || null;
  const submissionStatus =
    (existingSubmission?.status as FormStatus) || FormStatus.DRAFT;
  const isFormLocked =
    submissionStatus === FormStatus.UNDER_REVIEW ||
    submissionStatus === FormStatus.APPROVED ||
    submissionStatus === FormStatus.SUBMITTED;

  const value: FormContextType = {
    form,
    formType,
    isInitializing,
    isSubmitting,
    submissionId,
    submissionStatus,
    isFormLocked,
    onSubmit,
    saveDraft,
    resetForm,
    initializeForm,
    isInitialized,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Custom hook to use the form context
export const useFormProvider = (): FormContextType => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error("useFormProvider must be used within a FormProvider");
  }

  return context;
};
