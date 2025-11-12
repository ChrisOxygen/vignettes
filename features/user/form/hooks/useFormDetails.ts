import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateFormSchema } from "../utils/schema-generator";
import { generateDefaultValues } from "../utils/default-values";
import { FormType } from "@prisma/client";
import z from "zod";

export default function useFormDetails(formType: FormType) {
  // Placeholder for form details logic
  const formSchema = generateFormSchema(formType);

  // Type inference from schema
  type FormData = z.infer<typeof formSchema>;

  const defaultValues = generateDefaultValues(formType);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(data: FormData) {}
  return {
    handleSubmit,
    control,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    reset,
    watch,
    setValue,
    onSubmit,
    FormData,
  };
}
