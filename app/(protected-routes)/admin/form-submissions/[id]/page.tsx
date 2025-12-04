"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useFormSubmissionDetails } from "@/features/admin/hooks";
import { FORM_FIELD_CONFIGS } from "@/features/user/form/constants/form-configs";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { MessageSquare } from "lucide-react";
import { FormType } from "@prisma/client";

interface FormattedField {
  question: string;
  answer: string | null;
  isYesNoField?: boolean;
  hasSubExplanation?: boolean;
  explanation?: string;
}

/**
 * Format form data into displayable question-answer pairs
 */
function formatDetails(
  formData: Record<string, any>,
  formType: FormType
): FormattedField[] {
  const config = FORM_FIELD_CONFIGS[formType];
  if (!config) return [];

  const formatted: FormattedField[] = [];

  // Process regular fields
  Object.entries(config.fields).forEach(([fieldName, fieldConfig]) => {
    const value = formData[fieldName];

    formatted.push({
      question: fieldConfig.label,
      answer:
        value !== undefined && value !== null && value !== ""
          ? String(value)
          : null,
      isYesNoField: false,
    });
  });

  // Process yes/no fields with potential explanations
  Object.entries(config.yesNoFields).forEach(([fieldName, fieldConfig]) => {
    const fieldValue = formData[fieldName];

    if (fieldValue && typeof fieldValue === "object") {
      const hasExplanation =
        fieldConfig.conditionalExplanation?.triggerValue === fieldValue.value;

      formatted.push({
        question: fieldConfig.label,
        answer: fieldValue.value || null,
        isYesNoField: true,
        hasSubExplanation: hasExplanation,
        explanation: hasExplanation ? fieldValue.explanation : undefined,
      });
    } else {
      formatted.push({
        question: fieldConfig.label,
        answer: null,
        isYesNoField: true,
      });
    }
  });

  return formatted;
}

function SubmissionDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: submission,
    isPending,
    isError,
    error,
  } = useFormSubmissionDetails({ submissionId: id });

  const formattedFields = submission
    ? formatDetails(
        submission.formData as Record<string, any>,
        submission.formType
      )
    : [];

  if (isPending) {
    return (
      <div className="grid gap-4 p-0 sm:p-4 rounded-lg lg:grid-cols-[1fr_minmax(300px,400px)] grid-cols-1">
        {/* Form Details Skeleton */}
        <div className="rounded-lg h-[85vh] border bg-card p-6 space-y-6">
          <Skeleton className="h-8 w-64 bg-gray-200" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full bg-gray-200" />
            <Skeleton className="h-6 w-5/6 bg-gray-200" />
            <Skeleton className="h-6 w-4/6 bg-gray-200" />
          </div>
          <div className="space-y-3 mt-8">
            <Skeleton className="h-20 w-full bg-gray-200" />
            <Skeleton className="h-20 w-full bg-gray-200" />
            <Skeleton className="h-20 w-full bg-gray-200" />
          </div>
        </div>

        {/* Comments Skeleton - Desktop */}
        <div className="hidden lg:block h-[85vh]">
          <div className="p-6 border rounded-lg h-full space-y-4">
            <Skeleton className="h-8 w-48 bg-gray-200" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-16 w-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !submission) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <div className="text-destructive text-center">
          <p className="text-lg font-semibold">
            {error?.message || "Failed to load submission"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-0 sm:p-4 rounded-lg lg:grid-cols-[1fr_minmax(300px,400px)] grid-cols-1 animate-in fade-in duration-300">
      {/* Form Details Section */}
      <ScrollArea className="rounded-lg h-[85vh] grid relative">
        <div className="min-h-[85vh] grid">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Form Details</h2>

            {/* Display formatted fields */}
            <div className="space-y-4">
              {formattedFields.map((field, index) => (
                <div key={index}>
                  <div className="space-y-2">
                    {/* Question */}
                    <p className="font-bold text-sm text-foreground">
                      {field.question}
                      {field.isYesNoField && (
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          (Yes/No)
                        </span>
                      )}
                    </p>

                    {/* Answer */}
                    <p className="text-sm text-muted-foreground pl-2">
                      {field.answer ? (
                        field.answer
                      ) : (
                        <span className="italic text-muted-foreground/70">
                          Not provided
                        </span>
                      )}
                    </p>

                    {/* Sub-explanation if exists */}
                    {field.hasSubExplanation && field.explanation && (
                      <div className="pl-4 mt-2 border-l-2 border-muted">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">
                          Explanation:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {field.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                  {index < formattedFields.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}

              {formattedFields.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No form data available
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Comments Panel */}
      <>
        {/* Desktop: Sidebar comments panel (>= 1024px) */}
        <div className="hidden lg:block h-[85vh]">
          <div className="p-3 border rounded-lg h-full">
            <h2 className="text-2xl font-semibold mb-4">
              Comments ({submission.comments.length})
            </h2>
            {/* Comments content will go here */}
          </div>
        </div>

        {/* Mobile: Sheet comments (< 1024px) */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="shadow-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Comments ({submission.comments.length})
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Form Comments</SheetTitle>
                <SheetDescription>
                  View and manage comments on this form submission
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 h-[calc(100vh-120px)]">
                {/* Comments content will go here */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </>
    </div>
  );
}

export default SubmissionDetailsPage;
