import React from "react";
import { notFound } from "next/navigation";
import {
  ApplicantInfoForm,
  ExSpouseInfoForm,
  FamilyMembersInfoForm,
  RelativesAbroadInfoForm,
  WorkAndBusinessInfoForm,
  EducationInfoForm,
  VisaAndPermitsInfoForm,
  PreviousTravelInfoForm,
  SecurityAndStatutoryQuestionsForm,
} from "@/features/user/form/components/forms";
import { FormProvider } from "@/features/user/form/context";
import { FormType } from "@prisma/client";

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
      return <FamilyMembersInfoForm />;
    case FormType.RELATIVES_ABROAD_INFO:
      return <RelativesAbroadInfoForm />;
    case FormType.WORK_AND_BUSINESS_INFO:
      return <WorkAndBusinessInfoForm />;
    case FormType.EDUCATION_INFO:
      return <EducationInfoForm />;
    case FormType.VISA_AND_PERMITS_INFO:
      return <VisaAndPermitsInfoForm />;
    case FormType.PREVIOUS_TRAVEL_INFO:
      return <PreviousTravelInfoForm />;
    case FormType.SECURITY_AND_STATUTORY_QUESTIONS:
      return <SecurityAndStatutoryQuestionsForm />;
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

  // If form type is not valid, show 404
  if (!isValidFormType(normalizedFormType)) {
    notFound();
  }

  // Get the appropriate form component
  const FormComponent = getFormComponent(normalizedFormType);

  if (!FormComponent) {
    notFound();
  }

  return (
    <FormProvider>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{FormComponent}</div>
    </FormProvider>
  );
}

export default FormPage;
