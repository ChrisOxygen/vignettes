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

// Define valid form types
const VALID_FORM_TYPES = [
  "APPLICANT_INFO",
  "EX_SPOUSE_INFO",
  "FAMILY_MEMBERS_INFO",
  "RELATIVES_ABROAD_INFO",
  "WORK_AND_BUSINESS_INFO",
  "EDUCATION_INFO",
  "VISA_AND_PERMITS_INFO",
  "PREVIOUS_TRAVEL_INFO",
  "SECURITY_AND_STATUTORY_QUESTIONS",
] as const;

type FormType = (typeof VALID_FORM_TYPES)[number];

interface FormPageProps {
  params: {
    formType: string;
  };
}

// Form component mapper
const getFormComponent = (formType: FormType) => {
  switch (formType) {
    case "APPLICANT_INFO":
      return <ApplicantInfoForm />;
    case "EX_SPOUSE_INFO":
      return <ExSpouseInfoForm />;
    case "FAMILY_MEMBERS_INFO":
      return <FamilyMembersInfoForm />;
    case "RELATIVES_ABROAD_INFO":
      return <RelativesAbroadInfoForm />;
    case "WORK_AND_BUSINESS_INFO":
      return <WorkAndBusinessInfoForm />;
    case "EDUCATION_INFO":
      return <EducationInfoForm />;
    case "VISA_AND_PERMITS_INFO":
      return <VisaAndPermitsInfoForm />;
    case "PREVIOUS_TRAVEL_INFO":
      return <PreviousTravelInfoForm />;
    case "SECURITY_AND_STATUTORY_QUESTIONS":
      return <SecurityAndStatutoryQuestionsForm />;
    default:
      return null;
  }
};

function FormPage({ params }: FormPageProps) {
  const { formType } = params;

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
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{FormComponent}</div>
  );
}

export default FormPage;
