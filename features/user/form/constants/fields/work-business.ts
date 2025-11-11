import type { FieldConfig, RadioFieldConfig } from "../../types";

// Field configuration for each work/business entry
export const WORK_BUSINESS_FIELD_CONFIGS: Record<string, FieldConfig> = {
  fromDate: {
    name: "fromDate",
    label: "From Date",
    description:
      "Enter start date of employment in YYYY-MM-DD format. Use 'Not Applicable' if not applicable",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  toDate: {
    name: "toDate",
    label: "To Date",
    description:
      "Enter end date of employment in YYYY-MM-DD format. Use 'Present' if currently employed or 'Not Applicable' if not applicable",
    type: "date",
    placeholder: "YYYY-MM-DD or Present",
    required: true,
  },
  employerName: {
    name: "employerName",
    label: "Name of Employer / Company",
    description:
      "Enter the name of your employer or company. Use 'Not Applicable' if not applicable. Do not use ALL CAPS",
    type: "text",
    placeholder: "Enter employer/company name",
    required: true,
    maxLength: 150,
  },
  cityCountry: {
    name: "cityCountry",
    label: "City / Country",
    description:
      "Enter the city and country of employment. Use 'Not Applicable' if not applicable",
    type: "text",
    placeholder: "e.g., Lagos, Nigeria",
    required: true,
    maxLength: 100,
  },
  jobTitle: {
    name: "jobTitle",
    label: "Job Title",
    description:
      "Enter your job title or position. Use 'Not Applicable' if not applicable. Do not use ALL CAPS",
    type: "text",
    placeholder: "Enter your job title",
    required: true,
    maxLength: 100,
  },
  employmentType: {
    name: "employmentType",
    label: "Type",
    description:
      "Select your employment type. Use 'Not Applicable' if not applicable",
    type: "select",
    options: [
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Not Applicable",
    ],
    required: true,
  },
  employmentNature: {
    name: "employmentNature",
    label: "Nature",
    description:
      "Select the nature of your employment (e.g., Paid, Pro bono, Volunteer). Use 'Not Applicable' if not applicable",
    type: "select",
    options: [
      "Paid",
      "Pro bono",
      "Volunteer",
      "Self-employed",
      "Not Applicable",
    ],
    required: true,
  },
  monthlyEarnings: {
    name: "monthlyEarnings",
    label: "Monthly Earnings (After Tax)",
    description:
      "Enter how much you earn each month after tax. Use 'Not Applicable' if not applicable",
    type: "text",
    placeholder: "e.g., $5,000 or Not Applicable",
    required: true,
    maxLength: 50,
  },
  jobDescription: {
    name: "jobDescription",
    label: "Describe Your Job",
    description:
      "Provide a brief description of your job duties and responsibilities. Use 'Not Applicable' if not applicable. Do not use ALL CAPS",
    type: "textarea",
    placeholder: "Describe your main responsibilities and duties",
    required: true,
    maxLength: 500,
    rows: 4,
  },
};

export const WORK_BUSINESS_CONTROL: Record<string, RadioFieldConfig> = {
  hasWorkExperience: {
    name: "hasWorkExperience",
    label:
      "Do you have any work or business experience since age 18 or in the past 10 years?",
    description:
      "Answer Yes or No. Include all employment, business, government positions, or indicate if retired, not working, or studying. If Yes, provide details starting with most recent employment. Do not leave gaps in employment history.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide details about your work/business experience",
      errorMessage:
        "Please provide details about your work/business experience",
    },
  },
};
