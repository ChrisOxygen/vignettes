"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eb1aQuestionnaireSchema,
  getEB1ADefaultValues,
  type EB1AQuestionnaireFormData,
} from "@/features/external-view/validators";
import {
  BASIC_FIELD_CONFIGS,
  YES_NO_FIELD_CONFIGS,
  EB1A_SECTIONS,
  EB1A_FIELD_ORDER,
} from "@/features/external-view/constants/eb1a";
import { useSendAssessmentEmail } from "@/features/external-view/hooks";
import { AssessmentType } from "@/emails/types/assessmentTypes";
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
import { CheckCircle2 } from "lucide-react";

export function EB1AQuestionnaireForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<EB1AQuestionnaireFormData>({
    resolver: zodResolver(eb1aQuestionnaireSchema),
    defaultValues: getEB1ADefaultValues(),
    mode: "onBlur",
  });

  const { mutate: sendAssessmentEmail, isPending } = useSendAssessmentEmail({
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      console.error("Form submission error:", error);
      alert("There was an error submitting your form. Please try again.");
    },
  });

  const onSubmit = (data: EB1AQuestionnaireFormData) => {
    sendAssessmentEmail({
      assessmentType: AssessmentType.USEB1A,
      formData: data,
    });
  };

  // Show success message if form is submitted
  if (isSubmitted) {
    return (
      <Card className="w-full border-0 shadow-none">
        <CardContent className="px-0 py-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-2xl mx-auto">
            <div className="rounded-full bg-green-100 p-6">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Application Submitted Successfully!
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Thank you for submitting your EB-1A qualification assessment.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 w-full">
              <p className="text-sm sm:text-base text-blue-900 leading-relaxed">
                <strong>What happens next?</strong>
                <br />
                Our team will carefully review your application and assess your
                eligibility for the EB-1A visa category. You will receive a
                response from our administrators within{" "}
                <strong>48 hours</strong>.
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                If your profile is viable, we will schedule you for a
                complimentary consultation call to discuss your immigration
                options in detail.
              </p>
              <p className="text-xs text-gray-500">
                Please check your email (including spam folder) for our
                response.
              </p>
            </div>

            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              size="lg"
              className="mt-4"
            >
              Submit Another Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Watch yes/no fields to show/hide explanations
  const watchFields = Object.keys(YES_NO_FIELD_CONFIGS).reduce(
    (acc, fieldName) => {
      acc[fieldName] = form.watch(fieldName as any);
      return acc;
    },
    {} as Record<string, any>
  );

  const renderBasicField = (fieldName: string) => {
    const config = BASIC_FIELD_CONFIGS[fieldName];
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
    const config = YES_NO_FIELD_CONFIGS[fieldName];
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
          EB-1A Professional Qualification Questionnaire
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
                {EB1A_SECTIONS.BASIC_INFO.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB1A_SECTIONS.BASIC_INFO.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EB1A_FIELD_ORDER[EB1A_SECTIONS.BASIC_INFO.id].map((fieldName) =>
                renderBasicField(fieldName)
              )}
            </div>
          </section>

          {/* Professional Recognition Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB1A_SECTIONS.PROFESSIONAL_RECOGNITION.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB1A_SECTIONS.PROFESSIONAL_RECOGNITION.description}
              </p>
            </div>
            <div className="space-y-8">
              {EB1A_FIELD_ORDER[EB1A_SECTIONS.PROFESSIONAL_RECOGNITION.id].map(
                (fieldName) => renderYesNoField(fieldName)
              )}
            </div>
          </section>

          {/* Publications & Media Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB1A_SECTIONS.PUBLICATIONS_MEDIA.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB1A_SECTIONS.PUBLICATIONS_MEDIA.description}
              </p>
            </div>
            <div className="space-y-8">
              {EB1A_FIELD_ORDER[EB1A_SECTIONS.PUBLICATIONS_MEDIA.id].map(
                (fieldName) => renderYesNoField(fieldName)
              )}
            </div>
          </section>

          {/* Business & Funding Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB1A_SECTIONS.BUSINESS_FUNDING.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB1A_SECTIONS.BUSINESS_FUNDING.description}
              </p>
            </div>
            <div className="space-y-8">
              {EB1A_FIELD_ORDER[EB1A_SECTIONS.BUSINESS_FUNDING.id].map(
                (fieldName) => renderYesNoField(fieldName)
              )}
            </div>
          </section>

          {/* Innovation & Contributions Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                {EB1A_SECTIONS.INNOVATION.title}
              </h3>
              <p className="text-sm text-gray-600">
                {EB1A_SECTIONS.INNOVATION.description}
              </p>
            </div>
            <div className="space-y-8">
              {EB1A_FIELD_ORDER[EB1A_SECTIONS.INNOVATION.id].map((fieldName) =>
                renderYesNoField(fieldName)
              )}
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t">
            <Button
              type="submit"
              size="lg"
              className="px-8"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
