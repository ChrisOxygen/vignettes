"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Save, Send, Info } from "lucide-react";
import { useFormProvider } from "../../context/FormProviders";

export function FormActionButtons() {
  const { form, onSubmit, saveDraft, isLoading, submissionStatus } =
    useFormProvider();

  const handleSaveToDraft = () => {
    const formData = form.getValues();
    saveDraft(formData);
  };

  const handleSubmitForReview = () => {
    const formData = form.getValues();
    onSubmit(formData);
  };

  // Map FormStatus to display status
  const getDisplayStatus = () => {
    if (isLoading) return "saving";
    if (submissionStatus === "SUBMITTED") return "saved";
    if (submissionStatus === "DRAFT") return "saved";
    return "unsaved";
  };

  const displayStatus = getDisplayStatus();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "saved":
        return "text-green-600";
      case "saving":
        return "text-blue-600";
      case "unsaved":
      default:
        return "text-orange-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "saved":
        return "Saved";
      case "saving":
        return "Saving...";
      case "unsaved":
      default:
        return "Unsaved";
    }
  };

  return (
    <div className="flex items-center gap-4 px-4">
      {/* Form Status Indicator */}
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-muted-foreground" />
        <span
          className={`text-sm font-medium ${getStatusColor(displayStatus)}`}
        >
          {getStatusText(displayStatus)}
        </span>
        {displayStatus === "saving" && (
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        )}
      </div>
      {/* Save to Draft Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleSaveToDraft}
        disabled={isLoading}
        className="h-9 min-w-[160px] cursor-pointer"
      >
        {isLoading ? (
          <>
            <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-3 w-3" />
            Save to Draft
          </>
        )}
      </Button>

      {/* Submit for Review Button */}
      <Button
        size="sm"
        onClick={handleSubmitForReview}
        disabled={isLoading}
        className="h-9 min-w-[160px] cursor-pointer"
      >
        {isLoading ? (
          <>
            <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-3 w-3" />
            Submit for Review
          </>
        )}
      </Button>
    </div>
  );
}
