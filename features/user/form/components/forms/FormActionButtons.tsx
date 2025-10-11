"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Save, Send, Info } from "lucide-react";

interface FormActionButtonsProps {
  onSaveToDraft?: () => void;
  onSubmitForReview?: () => void;
  isLoading?: boolean;
  isDraftSaving?: boolean;
  isSubmitting?: boolean;
  documentStatus?: "unsaved" | "saved" | "saving";
}

export function FormActionButtons({
  onSaveToDraft,
  onSubmitForReview,
  isLoading = false,
  isDraftSaving = false,
  isSubmitting = false,
  documentStatus = "unsaved",
}: FormActionButtonsProps) {
  const handleSaveToDraft = () => {
    // Empty function for now - will be implemented later
    console.log("Save to Draft clicked");
    if (onSaveToDraft) {
      onSaveToDraft();
    }
  };

  const handleSubmitForReview = () => {
    // Empty function for now - will be implemented later
    console.log("Submit for Review clicked");
    if (onSubmitForReview) {
      onSubmitForReview();
    }
  };

  const getStatusColor = (status: typeof documentStatus) => {
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

  const getStatusText = (status: typeof documentStatus) => {
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
          className={`text-sm font-medium ${getStatusColor(documentStatus)}`}
        >
          {getStatusText(documentStatus)}
        </span>
        {documentStatus === "saving" && (
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        )}
      </div>
      {/* Save to Draft Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleSaveToDraft}
        disabled={isLoading || isDraftSaving}
        className="h-9 min-w-[160px] cursor-pointer"
      >
        {isDraftSaving ? (
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
        disabled={isLoading || isSubmitting}
        className="h-9 min-w-[160px] cursor-pointer"
      >
        {isSubmitting ? (
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
