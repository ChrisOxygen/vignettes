"use client";

import { useFormProvider } from "../../context/FormProviders";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import {
  APPLICANT_INFO_FIELDS,
  APPLICANT_INFO_YES_NO_FIELDS,
} from "../../constants";
import { FormField } from "../FormField";
import { YesNoField } from "../YesNoField";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { FormStatus } from "@prisma/client";

// Main component
export function ApplicantInfoForm() {
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
        <CardTitle>Applicant Information Form</CardTitle>
        <CardDescription>
          Please fill out all required fields with accurate information. Fields
          marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="applicant-info-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <FormField
                config={APPLICANT_INFO_FIELDS.firstName}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.middleName}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.lastName}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.otherNames}
                control={form.control}
              />
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <FormField
                config={APPLICANT_INFO_FIELDS.cellNumber}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.phoneNumber}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.emailAddress}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.residentialAddress}
                control={form.control}
              />
            </div>

            {/* Physical Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Physical Information</h3>
              <FormField
                config={APPLICANT_INFO_FIELDS.height}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.eyeColour}
                control={form.control}
              />
            </div>

            {/* Birth Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Birth Information</h3>
              <FormField
                config={APPLICANT_INFO_FIELDS.dateOfBirth}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.cityOfBirth}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.townOfBirth}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.countryOfBirth}
                control={form.control}
              />
            </div>

            {/* Citizenship and Residence Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                Citizenship and Residence
              </h3>
              <FormField
                config={APPLICANT_INFO_FIELDS.countryOfCitizenship}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.countryOfResidence}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.previousCountryOfResidence}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.nativeLanguage}
                control={form.control}
              />
            </div>

            {/* Marital Status Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Marital Status</h3>
              <FormField
                config={APPLICANT_INFO_FIELDS.maritalStatus}
                control={form.control}
              />
              <FormField
                config={APPLICANT_INFO_FIELDS.dateOfMarriage}
                control={form.control}
              />
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <YesNoField
                config={APPLICANT_INFO_YES_NO_FIELDS.previouslyMarried}
                control={form.control}
              />
              <YesNoField
                config={APPLICANT_INFO_YES_NO_FIELDS.hasNationalId}
                control={form.control}
              />
              <YesNoField
                config={APPLICANT_INFO_YES_NO_FIELDS.hasJobInCurrentCountry}
                control={form.control}
              />
              <YesNoField
                config={
                  APPLICANT_INFO_YES_NO_FIELDS.ownsBusinessInCurrentCountry
                }
                control={form.control}
              />
              <YesNoField
                config={APPLICANT_INFO_YES_NO_FIELDS.travelledLast10Years}
                control={form.control}
              />
              <YesNoField
                config={APPLICANT_INFO_YES_NO_FIELDS.medicalExamLast6Months}
                control={form.control}
              />
              <YesNoField
                config={APPLICANT_INFO_YES_NO_FIELDS.biometricsLast10Years}
                control={form.control}
              />
              <YesNoField
                config={APPLICANT_INFO_YES_NO_FIELDS.lawfulPROfAnotherCountry}
                control={form.control}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
