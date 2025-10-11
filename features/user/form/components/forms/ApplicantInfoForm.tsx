"use client";

import { useEffect, useState } from "react";
import { useForm, useFormField } from "@/features/user/form/context";
import { FORM_CONSTANTS } from "@/shared/constants";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { AlertCircle, CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import { FormType } from "@prisma/client";

// Custom DatePicker component following onboarding pattern
interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

function DatePicker({
  value,
  onChange,
  onBlur,
  placeholder = "Pick a date",
  className = "",
  error = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selectedDate = value ? new Date(value) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Format as DD/MM/YYYY to match the field requirements
      const formattedDate = format(date, "dd/MM/yyyy");
      onChange(formattedDate);
      setOpen(false);
    } else {
      onChange("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-12 text-base w-full justify-between text-left font-normal border-border/40 bg-background hover:border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200",
            !selectedDate && "text-muted-foreground",
            error && "border-destructive",
            className
          )}
          onBlur={onBlur}
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
          </div>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-border/40 bg-background/95 backdrop-blur-sm shadow-lg overflow-hidden"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={handleDateSelect}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          autoFocus
          className="rounded-md"
          fromYear={1900}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
}

// FormField component for reusable field rendering
interface FormFieldProps {
  fieldKey: string;
  fieldConfig: any;
  showExplanation?: boolean;
  onRadioSelect?: (value: string) => void;
}

function FormField({
  fieldKey,
  fieldConfig,
  showExplanation,
  onRadioSelect,
}: FormFieldProps) {
  const { value, error, touched, setValue, setTouched } =
    useFormField(fieldKey);

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
    setTouched(true);
  };

  const renderFieldInput = () => {
    switch (fieldConfig.fieldInputType) {
      case "text":
      case "email":
      case "tel":
        return (
          <Input
            type={fieldConfig.fieldInputType}
            value={(value as string) || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={fieldConfig.placeholder}
            maxLength={fieldConfig.maxLength}
            className={cn(
              "h-12 text-base border-border/40 bg-background hover:border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200",
              error && touched && "border-destructive"
            )}
          />
        );

      case "textarea":
        return (
          <Textarea
            value={(value as string) || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={fieldConfig.placeholder}
            maxLength={fieldConfig.maxLength}
            rows={4}
            className={cn(
              "text-base border-border/40 bg-background hover:border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 resize-none",
              error && touched && "border-destructive"
            )}
          />
        );

      case "date":
        return (
          <DatePicker
            value={(value as string) || ""}
            onChange={handleInputChange}
            onBlur={() => setTouched(true)}
            placeholder={fieldConfig.placeholder}
            error={!!(error && touched)}
          />
        );

      case "select":
        return (
          <Select
            value={(value as string) || ""}
            onValueChange={handleInputChange}
          >
            <SelectTrigger
              className={cn(
                "h-12 text-base border-border/40 bg-background hover:border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200",
                error && touched && "border-destructive"
              )}
            >
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {fieldConfig.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "radio":
        return (
          <div className="flex gap-4">
            {fieldConfig.options?.map((option: string) => (
              <div key={option} className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant={value === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    handleInputChange(option);
                    onRadioSelect?.(option);
                  }}
                  className={cn(
                    "h-10 px-4 text-base border-border/40 hover:border-border/60 transition-all duration-200",
                    value === option
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {option}
                </Button>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <Input
            type="text"
            value={(value as string) || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={fieldConfig.placeholder}
            className={cn(error && touched && "border-destructive")}
          />
        );
    }
  };

  return (
    <div className="space-y-3 pb-6 border-b-4 border-double border-border/50 last:border-b-0">
      <Label htmlFor={fieldKey} className="text-sm font-medium">
        {fieldConfig.title}
        {fieldConfig.isRequired && (
          <span className="text-destructive ml-1">*</span>
        )}
      </Label>

      <p className="text-sm text-muted-foreground">{fieldConfig.description}</p>

      {renderFieldInput()}

      {error && touched && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Explanation field for conditional fields */}
      {showExplanation && (
        <div className="space-y-2 pt-5">
          <Label className="text-sm font-medium">
            Please explain your answer:
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Textarea
            placeholder="Provide additional details..."
            rows={3}
            className="w-full h-12 text-base border-border/40 bg-background hover:border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
      )}
    </div>
  );
}

export function ApplicantInfoForm() {
  const { initializeForm, state } = useForm();
  const [conditionalStates, setConditionalStates] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    initializeForm(FormType.APPLICANT_INFO);
  }, [initializeForm]);

  const formConfig = FORM_CONSTANTS.APPLICANT_INFO as any;
  const fields = formConfig?.fields || {};

  const handleRadioSelect = (fieldKey: string, value: string) => {
    setConditionalStates((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  console.log("Form State:", state);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="px-0 pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Applicant Personal Details
          </CardTitle>
          <CardDescription>
            Enter your personal information and basic details. Fields marked
            with * are required.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Form Fields */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="px-0 pb-4">
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Complete all required fields below</CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col gap-6 px-0">
          {Object.entries(fields).map(
            ([fieldKey, fieldConfig]: [string, any]) => {
              const showExplanation =
                fieldConfig.conditionalFields &&
                conditionalStates[fieldKey] === "Yes";

              return (
                <FormField
                  key={fieldKey}
                  fieldKey={fieldKey}
                  fieldConfig={fieldConfig}
                  showExplanation={showExplanation}
                  onRadioSelect={(value) => handleRadioSelect(fieldKey, value)}
                />
              );
            }
          )}
        </CardContent>
      </Card>

      {/* Debug info */}
      <Card className="bg-muted/50 border-0 shadow-none">
        <CardContent className="pt-6 px-0">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Form Type: {state.formType}</div>
            <div>Fields: {Object.keys(state.formData).length}</div>
            <div>Dirty: {state.isDirty ? "Yes" : "No"}</div>
            <div>Valid: {state.isValid ? "Yes" : "No"}</div>
            <div>
              Conditional States: {JSON.stringify(conditionalStates, null, 2)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
