import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateFormSchema } from "../utils/schema-generator";
import { generateDefaultValues } from "../utils/default-values";
import z from "zod";

export default function useFormDetails() {
  // Placeholder for form details logic
  const formSchema = generateFormSchema();

  // Type inference from schema
  type FormData = z.infer<typeof formSchema>;

  const defaultValues = generateDefaultValues();

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
