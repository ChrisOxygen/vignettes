"use client";

import React from "react";
import { useFormProvider } from "../../context/FormProviders";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { YesNoField } from "../YesNoField";
import { STATUTORY_QUESTIONS_CONFIGS } from "../../constants";

export function SecurityStatutoryForm() {
  const { form, isInitialized, initializeForm, onSubmit } = useFormProvider();

  // Initialize form on mount
  React.useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security and Statutory Questions</CardTitle>
        <CardDescription>
          Please answer the following questions truthfully. If you answer
          &apos;Yes&apos; to any question, provide a detailed explanation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="security-and-statutory-questions-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Criminal History Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Criminal History
            </h3>
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.criminalConviction}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.criminalArrestOrCharge}
              control={form.control}
            />
          </div>

          {/* Immigration History Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Immigration History
            </h3>
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.previousApplicationAbroad}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.unauthorizedStayOrWork}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.visaRefusalOrRemoval}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.refugeeProtectionClaim}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.refugeeStatusRefusal}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.permanentResidentStatus}
              control={form.control}
            />
          </div>

          {/* Security and War Crimes Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Security and War Crimes
            </h3>
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.warCrimesOrGenocide}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.armedStruggleOrViolence}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.criminalOrganization}
              control={form.control}
            />
          </div>

          {/* Detention Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Detention</h3>
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.detentionOrIncarceration}
              control={form.control}
            />
          </div>

          {/* Health Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Health</h3>
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.seriousDisease}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.disorderRequiringServices}
              control={form.control}
            />
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.tuberculosisExposure}
              control={form.control}
            />
          </div>

          {/* Military and Political Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Military and Political
            </h3>
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.militaryOrPoliceService}
              control={form.control}
            />
            <YesNoField
              config={
                STATUTORY_QUESTIONS_CONFIGS.politicalOrganizationMembership
              }
              control={form.control}
            />
          </div>

          {/* Witness Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Witness</h3>
            <YesNoField
              config={STATUTORY_QUESTIONS_CONFIGS.witnessToIllTreatment}
              control={form.control}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
