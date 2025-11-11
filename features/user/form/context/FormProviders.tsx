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
  useMemo,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import { generateFormSchema } from "../utils/schema-generator";
import { generateDefaultValues } from "../utils/default-values";
import { useFormSubmission } from "../hooks/useFormSubmission";
import { useCreateOrUpdateFormSubmission } from "../hooks/useCreateOrUpdateFormSubmission";

// Get valid form types from enum
const VALID_FORM_TYPES = Object.values(FormType);

// Define the form context type
interface FormContextType {
  form: UseFormReturn<any>;
  formType: FormType | null;
  isInitializing: boolean;
  isSubmitting: boolean;
  submissionId: string | null;
  submissionStatus: FormStatus;
  isFormLocked: boolean;
  onSubmit: (data: any) => void;
  saveDraft: (data: any) => void;
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

  // Generate form schema and default values based on formType
  const formSchema = useMemo(() => {
    if (!formType) return z.object({});
    return generateFormSchema(formType);
  }, [formType]);

  const defaultValues = useMemo(() => {
    if (!formType) return {};
    return generateDefaultValues(formType);
  }, [formType]);

  // Initialize React Hook Form with dynamic schema
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
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

  // Watch for URL formType changes and reinitialize
  useEffect(() => {
    if (params.formType) {
      // Convert kebab-case to SCREAMING_SNAKE_CASE
      const normalizedFormType = params.formType
        .toUpperCase()
        .replace(/-/g, "_");

      // Type guard to check if formType is valid
      const isValidFormType = (type: string): type is FormType => {
        return VALID_FORM_TYPES.includes(type as FormType);
      };

      if (isValidFormType(normalizedFormType)) {
        // Only update if formType actually changed
        if (formType !== normalizedFormType) {
          console.log("FormProvider: FormType changed, reinitializing...", {
            from: formType,
            to: normalizedFormType,
          });
          setFormType(normalizedFormType);
          setIsInitialized(true);
        } else if (!isInitialized) {
          // First initialization
          setFormType(normalizedFormType);
          setIsInitialized(true);
        }
      } else {
        toast.error("Invalid form type", {
          description: `The form type "${params.formType}" is not valid.`,
        });
      }
    }
  }, [params.formType]); // Removed isInitialized and formType from deps to allow reinitialization

  // Initialize form - for backward compatibility
  const initializeForm = useCallback(() => {
    // This is now handled by the useEffect above
    // Keeping this function for components that call it explicitly
  }, []);

  // Reset form when formType changes (with new schema and defaults)
  useEffect(() => {
    if (formType && defaultValues) {
      console.log(
        "FormProvider: Resetting form with default values for",
        formType
      );
      form.reset(defaultValues);
    }
  }, [formType, defaultValues, form]);

  // Load existing data when available (this runs after the query fetches data)
  useEffect(() => {
    if (existingSubmission && existingSubmission.formData) {
      console.log(
        "FormProvider: Loading existing submission data for",
        formType,
        {
          submissionId: existingSubmission.id,
          status: existingSubmission.status,
        }
      );
      // Reset form with existing data
      form.reset(existingSubmission.formData);
    } else if (formType && !isLoadingSubmission && !existingSubmission) {
      // No existing submission - ensure form is reset to defaults
      console.log(
        "FormProvider: No existing submission, using defaults for",
        formType
      );
      form.reset(defaultValues);
    }
  }, [existingSubmission, formType, isLoadingSubmission, defaultValues, form]);

  // Handle form submission
  const onSubmit = (data: any) => {
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
  const saveDraft = (data: any) => {
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
    if (!formType) return;
    form.reset(generateDefaultValues(formType));
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

  // Debug: Log form state changes
  useEffect(() => {
    console.log("FormProvider State Update:", {
      formType,
      submissionStatus,
      isFormLocked,
      existingSubmission: existingSubmission
        ? {
            id: existingSubmission.id,
            status: existingSubmission.status,
            formType: existingSubmission.formType,
          }
        : null,
      isLoadingSubmission,
      submissionError: submissionError?.message,
    });
  }, [
    formType,
    submissionStatus,
    isFormLocked,
    existingSubmission,
    isLoadingSubmission,
    submissionError,
  ]);

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
