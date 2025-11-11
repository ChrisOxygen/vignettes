"use client";

import * as React from "react";
import { Controller, Control } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import { Input } from "@/shared/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Field,
  FieldDescription,
  FieldError as FieldErrorComponent,
  FieldLabel,
} from "@/shared/components/ui/field";
import type { BaseFieldConfig } from "@/features/user/form/types";

interface DatePickerFieldProps {
  config: BaseFieldConfig;
  control: Control<any>;
  isFormLocked: boolean;
}

function formatDate(date: Date | undefined): string {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateForStorage(date: Date | undefined): string {
  if (!date) {
    return "";
  }

  // Format as DD/MM/YYYY for validation
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function isValidDate(date: Date | undefined): boolean {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

function parseDate(value: string): Date | undefined {
  if (!value || !value.trim()) return undefined;

  // Try parsing as ISO string first
  let date = new Date(value);
  if (isValidDate(date)) {
    return date;
  }

  // Try parsing common formats: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
  const formats = [
    // DD/MM/YYYY or DD-MM-YYYY
    /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/,
    // YYYY/MM/DD or YYYY-MM-DD
    /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/,
  ];

  for (const format of formats) {
    const match = value.match(format);
    if (match) {
      // Check if it's DD/MM/YYYY or YYYY/MM/DD based on first group
      if (match[1].length === 4) {
        // YYYY-MM-DD format
        date = new Date(
          parseInt(match[1]),
          parseInt(match[2]) - 1,
          parseInt(match[3])
        );
      } else {
        // Assume DD/MM/YYYY format (common in many countries)
        date = new Date(
          parseInt(match[3]),
          parseInt(match[2]) - 1,
          parseInt(match[1])
        );
      }

      if (isValidDate(date)) {
        return date;
      }
    }
  }

  return undefined;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  config,
  control,
  isFormLocked,
}) => {
  return (
    <Controller
      name={config.name}
      control={control}
      render={({ field, fieldState }) => {
        const [open, setOpen] = React.useState(false);
        const [date, setDate] = React.useState<Date | undefined>(() =>
          field.value ? parseDate(field.value) : undefined
        );
        const [month, setMonth] = React.useState<Date | undefined>(date);
        const [value, setValue] = React.useState(date ? formatDate(date) : "");

        // Sync with external field value changes
        React.useEffect(() => {
          const parsedDate = field.value ? parseDate(field.value) : undefined;
          setDate(parsedDate);
          setValue(parsedDate ? formatDate(parsedDate) : "");
          if (parsedDate) {
            setMonth(parsedDate);
          }
        }, [field.value]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value;
          setValue(inputValue);

          const parsedDate = parseDate(inputValue);
          if (isValidDate(parsedDate)) {
            setDate(parsedDate);
            setMonth(parsedDate);
            // Store as DD/MM/YYYY format for validation
            field.onChange(formatDateForStorage(parsedDate));
          } else if (!inputValue.trim()) {
            // Clear the field if empty
            field.onChange("");
          }
        };

        const handleDateSelect = (selectedDate: Date | undefined) => {
          setDate(selectedDate);
          setValue(selectedDate ? formatDate(selectedDate) : "");
          // Store as DD/MM/YYYY format for validation
          field.onChange(
            selectedDate ? formatDateForStorage(selectedDate) : ""
          );
          setOpen(false);
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor={config.name}
              className={isFormLocked ? "text-muted-foreground" : ""}
            >
              {config.label}
            </FieldLabel>

            <div className="relative flex gap-2">
              <Input
                id={config.name}
                value={value}
                placeholder={config.placeholder || "January 01, 2025"}
                className="bg-background pr-10 border-2 border-gray-300 text-foreground"
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
                aria-invalid={fieldState.invalid}
                disabled={isFormLocked}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    disabled={isFormLocked}
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={handleDateSelect}
                    disabled={isFormLocked}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <FieldDescription>{config.description}</FieldDescription>
            {fieldState.invalid && (
              <FieldErrorComponent errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
};
