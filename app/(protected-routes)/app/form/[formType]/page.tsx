import React, { useState } from "react";
import {
  ApplicantInfoForm,
  ExSpouseInfoForm,
  FamilyMembersForm,
} from "@/features/user/form/components/forms";
import { FormType } from "@prisma/client";
import { NotFoundTemplate } from "@/shared/components";

// Get valid form types from enum
const VALID_FORM_TYPES = Object.values(FormType);

interface FormPageProps {
  params: Promise<{
    formType: string;
  }>;
}

// Form component mapper
const getFormComponent = (formType: FormType) => {
  switch (formType) {
    case FormType.APPLICANT_INFO:
      return <ApplicantInfoForm />;
    case FormType.EX_SPOUSE_INFO:
      return <ExSpouseInfoForm />;
    case FormType.FAMILY_MEMBERS_INFO:
      return <FamilyMembersForm />;

    default:
      return null;
  }
};

async function FormPage({ params }: FormPageProps) {
  const { formType } = await params;

  // Convert kebab-case to SCREAMING_SNAKE_CASE
  const normalizedFormType = formType.toUpperCase().replace(/-/g, "_");

  // Type guard to check if formType is valid
  const isValidFormType = (type: string): type is FormType => {
    return VALID_FORM_TYPES.includes(type as FormType);
  };

  // If form type is not valid, show custom 404
  if (!isValidFormType(normalizedFormType)) {
    return (
      <NotFoundTemplate
        title="Form Not Found"
        message={`The form "${formType}" could not be found. Please check the URL or select a valid form from the dashboard.`}
        customActions={
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Available forms:</p>
            <div className="text-xs text-muted-foreground/80 space-y-1">
              <div>• Applicant Information</div>
              <div>• Family Members Information</div>
              <div>• Work & Business Information</div>
              <div>• Education Information</div>
            </div>
          </div>
        }
      />
    );
  }

  // Get the appropriate form component
  const FormComponent = getFormComponent(normalizedFormType);

  if (!FormComponent) {
    return (
      <NotFoundTemplate
        title="Form Component Error"
        message="There was an issue loading this form. Please try again or contact support if the problem persists."
      />
    );
  }

  return (
    <div className="relative flex-1 space-y-4 p-4 md:p-8 pt-6">
      {FormComponent}

      {/* Loading Overlay */}
      {/* {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">
              Saving your form...
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default FormPage;
