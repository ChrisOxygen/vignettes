import * as React from "react";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupTextarea,
} from "@/shared/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import type { RadioFieldConfig } from "../types";
import { useFormProvider } from "../context/FormProviders";

interface YesNoFieldProps {
  config: RadioFieldConfig;
  control: any;
}

export const YesNoField: React.FC<YesNoFieldProps> = ({ config, control }) => {
  const { isFormLocked } = useFormProvider();

  return (
    <Controller
      name={config.name}
      control={control}
      render={({ field, fieldState }) => {
        // Ensure field.value has the correct structure
        const fieldValue = field.value || { value: "No", explanation: "" };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className={isFormLocked ? "text-muted-foreground" : ""}>
              {config.label}
            </FieldLabel>

            <RadioGroup
              value={fieldValue.value}
              onValueChange={(value) =>
                field.onChange({
                  ...fieldValue,
                  value: value as "Yes" | "No",
                })
              }
              className="flex gap-6"
              disabled={isFormLocked}
            >
              {config.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`${config.name}-${option.toLowerCase()}`}
                    disabled={isFormLocked}
                  />
                  <Label
                    htmlFor={`${config.name}-${option.toLowerCase()}`}
                    className={isFormLocked ? "text-muted-foreground" : ""}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {config.conditionalExplanation &&
              fieldValue.value ===
                config.conditionalExplanation.triggerValue && (
                <InputGroup
                  className={`mt-3 ${fieldState.error && "ring-destructive/20 border-destructive"}`}
                  data-invalid={
                    fieldState.invalid &&
                    fieldState.error?.message?.includes(
                      config.conditionalExplanation.errorMessage.toLowerCase()
                    )
                  }
                >
                  <InputGroupTextarea
                    value={fieldValue.explanation || ""}
                    onChange={(e) =>
                      field.onChange({
                        ...fieldValue,
                        explanation: e.target.value,
                      })
                    }
                    placeholder={config.conditionalExplanation.placeholder}
                    rows={3}
                    className="min-h-20 resize-none text-foreground"
                    aria-invalid={
                      fieldState.invalid &&
                      fieldState.error?.message?.includes(
                        config.conditionalExplanation.errorMessage.toLowerCase()
                      )
                    }
                    disabled={isFormLocked}
                  />
                </InputGroup>
              )}

            <FieldDescription>{config.description}</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
