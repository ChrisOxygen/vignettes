import * as React from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/shared/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { FieldConfig, SelectFieldConfig } from "../types";
import { useFormProvider } from "../context/FormProviders";

interface FormFieldProps {
  config: FieldConfig;
  control: any;
}

export const FormField: React.FC<FormFieldProps> = ({ config, control }) => {
  const { isFormLocked, submissionStatus } = useFormProvider();

  const handleLockedFieldClick = () => {
    if (isFormLocked) {
      toast.warning("Form is locked", {
        description:
          submissionStatus === "APPROVED"
            ? "This form has been approved and cannot be modified."
            : "This form is under review by the admin and cannot be changed.",
      });
    }
  };

  return (
    <Controller
      name={config.name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel
            htmlFor={config.name}
            className={isFormLocked ? "text-muted-foreground" : ""}
          >
            {config.label}
          </FieldLabel>

          {config.type === "textarea" ? (
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id={config.name}
                placeholder={config.placeholder}
                rows={config.rows || 3}
                className="min-h-20 resize-none"
                aria-invalid={fieldState.invalid}
                disabled={isFormLocked}
                onClick={handleLockedFieldClick}
              />
              {config.maxLength && (
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length}/{config.maxLength} characters
                  </InputGroupText>
                </InputGroupAddon>
              )}
            </InputGroup>
          ) : config.type === "select" ? (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isFormLocked}
            >
              <SelectTrigger onClick={handleLockedFieldClick}>
                <SelectValue
                  placeholder={
                    config.placeholder || `Select ${config.label.toLowerCase()}`
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {(config as SelectFieldConfig).options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              {...field}
              id={config.name}
              type={config.type === "date" ? "text" : config.type}
              placeholder={config.placeholder}
              aria-invalid={fieldState.invalid}
              disabled={isFormLocked}
              onClick={handleLockedFieldClick}
            />
          )}

          <FieldDescription>{config.description}</FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
