"use client";

import { useFormProvider } from "../../context/FormProviders";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { FieldGroup } from "@/shared/components/ui/field";
import { EX_SPOUSE_INFO_FIELDS } from "../../constants";
import { FormField } from "../FormField";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { FormStatus } from "@prisma/client";

// Main component
export function ExSpouseInfoForm() {
  const {
    form,
    onSubmit,
    saveDraft,
    resetForm,
    initializeForm,
    isInitialized,
    isFormLocked,
    submissionStatus,
  } = useFormProvider();

  const hasShownToast = useRef(false);

  // Initialize form on component mount
  useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

  // Show toast when form is locked
  useEffect(() => {
    if (isInitialized && isFormLocked && !hasShownToast.current) {
      hasShownToast.current = true;

      let message = "";
      if (submissionStatus === FormStatus.APPROVED) {
        message = "This form has been approved and cannot be modified.";
      } else if (submissionStatus === FormStatus.UNDER_REVIEW) {
        message = "This form is currently being reviewed by the admin.";
      } else if (submissionStatus === FormStatus.SUBMITTED) {
        message = "This form has been submitted and is awaiting admin review.";
      }

      if (message) {
        toast.info("Form Locked", {
          description: message,
        });
      }
    }
  }, [isInitialized, isFormLocked, submissionStatus]);

  return (
    <Card className="w-full border-0">
      <CardHeader>
        <CardTitle>Ex-Spouse Information Form</CardTitle>
        <CardDescription>
          Please provide information about your previous marriage if applicable.
          If you have never been previously married, you may write "Not
          Applicable" in the relevant fields or leave them blank.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="ex-spouse-info-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-6">
            {/* Ex-Spouse Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                Ex-Spouse Personal Information
              </h3>
              <FormField
                config={EX_SPOUSE_INFO_FIELDS.exSpouseName}
                control={form.control}
              />
              <FormField
                config={EX_SPOUSE_INFO_FIELDS.exSpouseDateOfBirth}
                control={form.control}
              />
            </div>

            {/* Previous Marriage Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                Previous Marriage Details
              </h3>
              <FormField
                config={EX_SPOUSE_INFO_FIELDS.exMarriageDate}
                control={form.control}
              />
              <FormField
                config={EX_SPOUSE_INFO_FIELDS.exMarriageLocation}
                control={form.control}
              />
            </div>

            {/* Divorce Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Divorce Details</h3>
              <FormField
                config={EX_SPOUSE_INFO_FIELDS.exDivorceDate}
                control={form.control}
              />
              <FormField
                config={EX_SPOUSE_INFO_FIELDS.exDivorceLocation}
                control={form.control}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
