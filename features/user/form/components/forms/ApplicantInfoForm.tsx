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
import { FIELD_CONFIGS, YES_NO_FIELD_CONFIGS } from "../../constants";
import { FormField } from "../FormField";
import { YesNoField } from "../YesNoField";
import { useEffect } from "react";

// Main component
export function ApplicantInfoForm() {
  const {
    form,
    onSubmit,
    saveDraft,
    resetForm,
    initializeForm,
    isInitialized,
  } = useFormProvider();

  // Initialize form on component mount
  useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

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
                config={FIELD_CONFIGS.firstName}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.middleName}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.lastName}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.otherNames}
                control={form.control}
              />
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <FormField
                config={FIELD_CONFIGS.cellNumber}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.phoneNumber}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.emailAddress}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.residentialAddress}
                control={form.control}
              />
            </div>

            {/* Physical Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Physical Information</h3>
              <FormField config={FIELD_CONFIGS.height} control={form.control} />
              <FormField
                config={FIELD_CONFIGS.eyeColour}
                control={form.control}
              />
            </div>

            {/* Birth Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Birth Information</h3>
              <FormField
                config={FIELD_CONFIGS.dateOfBirth}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.cityOfBirth}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.townOfBirth}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.countryOfBirth}
                control={form.control}
              />
            </div>

            {/* Citizenship and Residence Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                Citizenship and Residence
              </h3>
              <FormField
                config={FIELD_CONFIGS.countryOfCitizenship}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.countryOfResidence}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.previousCountryOfResidence}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.nativeLanguage}
                control={form.control}
              />
            </div>

            {/* Marital Status Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Marital Status</h3>
              <FormField
                config={FIELD_CONFIGS.maritalStatus}
                control={form.control}
              />
              <FormField
                config={FIELD_CONFIGS.dateOfMarriage}
                control={form.control}
              />
            </div>

            {/* Additional Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <YesNoField
                config={YES_NO_FIELD_CONFIGS.previouslyMarried}
                control={form.control}
              />
              <YesNoField
                config={YES_NO_FIELD_CONFIGS.hasNationalId}
                control={form.control}
              />
              <YesNoField
                config={YES_NO_FIELD_CONFIGS.hasJobInCurrentCountry}
                control={form.control}
              />
              <YesNoField
                config={YES_NO_FIELD_CONFIGS.ownsBusinessInCurrentCountry}
                control={form.control}
              />
              <YesNoField
                config={YES_NO_FIELD_CONFIGS.travelledLast10Years}
                control={form.control}
              />
              <YesNoField
                config={YES_NO_FIELD_CONFIGS.medicalExamLast6Months}
                control={form.control}
              />
              <YesNoField
                config={YES_NO_FIELD_CONFIGS.biometricsLast10Years}
                control={form.control}
              />
              <YesNoField
                config={YES_NO_FIELD_CONFIGS.lawfulPROfAnotherCountry}
                control={form.control}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
