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

interface YesNoFieldProps {
  config: RadioFieldConfig;
  control: any;
}

export const YesNoField: React.FC<YesNoFieldProps> = ({ config, control }) => {
  return (
    <Controller
      name={config.name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{config.label}</FieldLabel>

          <RadioGroup
            value={field.value.value}
            onValueChange={(value) =>
              field.onChange({
                ...field.value,
                value: value as "Yes" | "No",
              })
            }
            className="flex gap-6"
          >
            {config.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option}
                  id={`${config.name}-${option.toLowerCase()}`}
                />
                <Label htmlFor={`${config.name}-${option.toLowerCase()}`}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {config.conditionalExplanation &&
            field.value.value ===
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
                  value={field.value.explanation || ""}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      explanation: e.target.value,
                    })
                  }
                  placeholder={config.conditionalExplanation.placeholder}
                  rows={3}
                  className="min-h-20 resize-none"
                  aria-invalid={
                    fieldState.invalid &&
                    fieldState.error?.message?.includes(
                      config.conditionalExplanation.errorMessage.toLowerCase()
                    )
                  }
                />
              </InputGroup>
            )}

          <FieldDescription>{config.description}</FieldDescription>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
