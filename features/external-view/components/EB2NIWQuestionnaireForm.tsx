"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eb2niwQuestionnaireSchema,
  getEB2NIWDefaultValues,
  type EB2NIWQuestionnaireFormData,
} from "@/features/external-view/validators/eb2niw.validator";
import {
  EB2NIW_BASIC_FIELD_CONFIGS,
  EB2NIW_YES_NO_FIELD_CONFIGS,
  EB2NIW_SECTIONS,
  EB2NIW_FIELD_ORDER,
} from "@/features/external-view/constants/eb2niw";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";

export function EB2NIWQuestionnaireForm() {
  const form = useForm<EB2NIWQuestionnaireFormData>({
    resolver: zodResolver(eb2niwQuestionnaireSchema),
    defaultValues: getEB2NIWDefaultValues(),
    mode: "onBlur",
  });

  const onSubmit = (data: EB2NIWQuestionnaireFormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement server action for form submission
  };

  // Watch yes/no fields to show/hide explanations
  const watchFields = Object.keys(EB2NIW_YES_NO_FIELD_CONFIGS).reduce(
    (acc, fieldName) => {
      acc[fieldName] = form.watch(fieldName as any);
      return acc;
    },
    {} as Record<string, any>
  );

  const renderBasicField = (fieldName: string) => {
    const config = EB2NIW_BASIC_FIELD_CONFIGS[fieldName];
    if (!config) return null;

    const error =
      form.formState.errors[fieldName as keyof typeof form.formState.errors];

    return (
      <div key={fieldName} className="space-y-2">
        <Label htmlFor={fieldName} className={error ? "text-destructive" : ""}>
          {config.label}
        </Label>
        {config.description && (
          <p className="text-sm text-gray-600">{config.description}</p>
        )}
        {config.type === "textarea" ? (
          <Textarea
            id={fieldName}
            placeholder={config.placeholder}
            rows={config.rows || 3}
            {...form.register(fieldName as any)}
            className={
              error
                ? "border-destructive border-2"
                : "border-2 border-gray-300 focus:border-primary"
            }
          />
        ) : (
          <Input
            id={fieldName}
            type={config.type}
            placeholder={config.placeholder}
            {...form.register(fieldName as any)}
            className={
              error
                ? "border-destructive border-2"
                : "border-2 border-gray-300 focus:border-primary"
            }
          />
        )}
        {error && (
          <p className="text-sm text-destructive">{error.message as string}</p>
        )}
      </div>
    );
  };

  const renderYesNoField = (fieldName: string) => {
    const config = EB2NIW_YES_NO_FIELD_CONFIGS[fieldName];
    if (!config) return null;

    const fieldValue = watchFields[fieldName];
    const showExplanation =
      config.conditionalExplanation &&
      fieldValue === config.conditionalExplanation.triggerValue;
    const error =
      form.formState.errors[fieldName as keyof typeof form.formState.errors];
    const explanationError =
      form.formState.errors[
        `${fieldName}_explanation` as keyof typeof form.formState.errors
      ];

    return (
      <div key={fieldName} className="space-y-4">
        <div className="space-y-2">
          <Label className={error ? "text-destructive" : ""}>
            {config.label}
          </Label>
          {config.description && (
            <p className="text-sm text-gray-600">{config.description}</p>
          )}
          <RadioGroup
            onValueChange={(value) =>
              form.setValue(fieldName as any, value as any)
            }
            value={fieldValue}
            className="space-y-3"
          >
            {config.options.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 border-2 border-gray-300 rounded-lg p-3 hover:border-primary transition-colors"
              >
                <RadioGroupItem
                  value={option}
                  id={`${fieldName}-${option}`}
                  className="border-2"
                />
                <Label
                  htmlFor={`${fieldName}-${option}`}
                  className="font-normal cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {error && (
            <p className="text-sm text-destructive">
              {error.message as string}
            </p>
          )}
        </div>

        {showExplanation && config.conditionalExplanation && (
          <div className="space-y-2 pl-4 border-l-2 border-primary">
            <Label
              htmlFor={`${fieldName}_explanation`}
              className={explanationError ? "text-destructive" : ""}
            >
              Please provide details {config.required && "*"}
            </Label>
            <Textarea
              id={`${fieldName}_explanation`}
              placeholder={config.conditionalExplanation.placeholder}
              rows={4}
              maxLength={config.conditionalExplanation.maxLength}
              {...form.register(`${fieldName}_explanation` as any)}
              className={
                explanationError
                  ? "border-destructive border-2"
                  : "border-2 border-gray-300 focus:border-primary"
              }
            />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                {form.watch(`${fieldName}_explanation` as any)?.length || 0} /{" "}
                {config.conditionalExplanation.maxLength} characters
              </span>
              {explanationError && (
                <span className="text-destructive">
                  {explanationError.message as string}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl sm:text-3xl">
          EB-2 NIW Professional Qualification Questionnaire
        </CardTitle>
        <CardDescription className="text-base">
          Should we find your profile viable to represent we will schedule you
          for a complimentary call.
        </CardDescription>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> If you experience issues submitting the form,
            please try clearing your browser's cache and cookies, using a
            different browser or device, and avoiding multiple links in your
            responses as they may trigger spam filters.
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* Basic Information Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB2NIW_SECTIONS.BASIC_INFO.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB2NIW_SECTIONS.BASIC_INFO.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EB2NIW_FIELD_ORDER[EB2NIW_SECTIONS.BASIC_INFO.id].map(
                (fieldName) => renderBasicField(fieldName)
              )}
            </div>
          </section>

          {/* Qualifications Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB2NIW_SECTIONS.QUALIFICATIONS.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB2NIW_SECTIONS.QUALIFICATIONS.description}
              </p>
            </div>
            <div className="space-y-8">
              {EB2NIW_FIELD_ORDER[EB2NIW_SECTIONS.QUALIFICATIONS.id].map(
                (fieldName) => renderYesNoField(fieldName)
              )}
            </div>
          </section>

          {/* Proposed Endeavor Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB2NIW_SECTIONS.ENDEAVOR.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB2NIW_SECTIONS.ENDEAVOR.description}
              </p>
            </div>
            <div className="space-y-8">
              {EB2NIW_FIELD_ORDER[EB2NIW_SECTIONS.ENDEAVOR.id].map(
                (fieldName) => renderYesNoField(fieldName)
              )}
            </div>
          </section>

          {/* National Interest Waiver Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB2NIW_SECTIONS.NATIONAL_INTEREST.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB2NIW_SECTIONS.NATIONAL_INTEREST.description}
              </p>
            </div>
            <div className="space-y-8">
              {EB2NIW_FIELD_ORDER[EB2NIW_SECTIONS.NATIONAL_INTEREST.id].map(
                (fieldName) => renderYesNoField(fieldName)
              )}
            </div>
          </section>

          {/* Supporting Evidence Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB2NIW_SECTIONS.SUPPORTING_EVIDENCE.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB2NIW_SECTIONS.SUPPORTING_EVIDENCE.description}
              </p>
            </div>
            <div className="space-y-8">
              {EB2NIW_FIELD_ORDER[EB2NIW_SECTIONS.SUPPORTING_EVIDENCE.id].map(
                (fieldName) => renderYesNoField(fieldName)
              )}
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t">
            <Button
              type="submit"
              size="lg"
              className="px-8"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
