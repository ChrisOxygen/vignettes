"use client";

import React, { useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { Save, Send, Info, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { useFormProvider } from "../../context/FormProviders";
import { FormStatus, FormType } from "@prisma/client";

// Helper to convert FormType enum to readable form name
const getFormDisplayName = (formType: FormType | null): string => {
  if (!formType) return "Form";

  const formNames: Record<FormType, string> = {
    [FormType.APPLICANT_INFO]: "Applicant Info",
    [FormType.EX_SPOUSE_INFO]: "Ex-Spouse Info",
    [FormType.FAMILY_MEMBERS_INFO]: "Family Members",
    [FormType.RELATIVES_ABROAD_INFO]: "Relatives Abroad",
    [FormType.WORK_AND_BUSINESS_INFO]: "Work & Business",
    [FormType.EDUCATION_INFO]: "Education",
    [FormType.VISA_AND_PERMITS_INFO]: "Visa & Permits",
    [FormType.PREVIOUS_TRAVEL_INFO]: "Travel History",
    [FormType.SECURITY_AND_STATUTORY_QUESTIONS]: "Security Questions",
  };

  return formNames[formType] || "Form";
};

export function FormActionButtons() {
  const {
    form,
    formType,
    onSubmit,
    saveDraft,
    isSubmitting,
    isInitializing,
    submissionStatus,
    isFormLocked,
  } = useFormProvider();

  // Track if a toast is currently showing to prevent duplicates
  const toastIdRef = useRef<string | number | null>(null);

  // Get the display name for the current form
  const formDisplayName = getFormDisplayName(formType);

  // Debug: Log form state
  React.useEffect(() => {
    console.log("FormActionButtons - Form State:", {
      formType,
      submissionStatus,
      isFormLocked,
      isInitializing,
    });
  }, [formType, submissionStatus, isFormLocked, isInitializing]);

  const handleSaveToDraft = () => {
    const formData = form.getValues();
    saveDraft(formData);
  };

  const handleSubmitForReview = () => {
    const formData = form.getValues();
    onSubmit(formData);
  };

  const handleLockedFormClick = () => {
    // Only show toast if one isn't already showing
    if (isFormLocked && !toastIdRef.current) {
      toastIdRef.current = toast.warning("Form is locked", {
        description:
          submissionStatus === "APPROVED"
            ? "This form has been approved and cannot be modified."
            : "This form is under review by the admin and cannot be changed.",
        onDismiss: () => {
          toastIdRef.current = null;
        },
        onAutoClose: () => {
          toastIdRef.current = null;
        },
      });
    }
  };

  const getStatusColor = (status: FormStatus) => {
    switch (status) {
      case FormStatus.DRAFT:
        return "text-orange-600";
      case FormStatus.SUBMITTED:
        return "text-blue-600";
      case FormStatus.UNDER_REVIEW:
        return "text-purple-600";
      case FormStatus.CHANGES_REQUESTED:
        return "text-yellow-600";
      case FormStatus.APPROVED:
        return "text-green-600";
      case FormStatus.REJECTED:
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusText = (status: FormStatus) => {
    switch (status) {
      case FormStatus.DRAFT:
        return "Draft";
      case FormStatus.SUBMITTED:
        return "Submitted";
      case FormStatus.UNDER_REVIEW:
        return "Under Review";
      case FormStatus.CHANGES_REQUESTED:
        return "Changes Requested";
      case FormStatus.APPROVED:
        return "Approved";
      case FormStatus.REJECTED:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center gap-4 px-4">
      {isInitializing ? (
        <>
          {/* Skeleton for Status Indicator */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          {/* Skeleton for Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Skeleton className="h-9 w-[160px] rounded-md" />
            <Skeleton className="h-9 w-[160px] rounded-md" />
          </div>
          {/* Skeleton for Mobile Dropdown */}
          <Skeleton className="md:hidden h-9 w-9 rounded-md" />
        </>
      ) : (
        <>
          {/* Form Status Indicator */}
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span
              className={`text-sm font-medium ${getStatusColor(submissionStatus)}`}
            >
              {getStatusText(submissionStatus)}
            </span>
            {isSubmitting && (
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            )}
          </div>

          {/* Desktop View: Show buttons side by side */}
          <div className="hidden md:flex items-center gap-2">
            {/* Save to Draft Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveToDraft}
              disabled={isSubmitting || isFormLocked}
              className="h-9 min-w-[160px] cursor-pointer"
              title={`Save ${formDisplayName} as draft`}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-3 w-3" />
                  Save Draft
                </>
              )}
            </Button>

            {/* Submit for Review Button */}
            <Button
              size="sm"
              onClick={handleSubmitForReview}
              disabled={isSubmitting || isFormLocked}
              className="h-9 min-w-[160px] cursor-pointer"
              title={`Submit ${formDisplayName} for review`}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-3 w-3" />
                  Submit
                </>
              )}
            </Button>
          </div>

          {/* Mobile View: Show dropdown menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={isSubmitting}
                  onClick={(e) => {
                    if (isFormLocked) {
                      e.preventDefault();
                      handleLockedFormClick();
                    }
                  }}
                  className={
                    isFormLocked ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Form actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={handleSaveToDraft}
                  disabled={isSubmitting || isFormLocked}
                >
                  <Save className="mr-2 h-4 w-4" />
                  <span>Save to Draft</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSubmitForReview}
                  disabled={isSubmitting || isFormLocked}
                >
                  <Send className="mr-2 h-4 w-4" />
                  <span>Submit for Review</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
}
