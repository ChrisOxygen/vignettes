import type { FieldConfig } from "../../types";

export const VISA_PERMIT_FIELD_CONFIGS: Record<string, FieldConfig> = {
  countryAppliedTo: {
    name: "countryAppliedTo",
    label: "Country Applied To",
    description:
      "Enter the country where you applied for visa/permit. Use 'Did not apply' if you have not applied for any visa/permit in the last 10 years. Do not use ALL CAPS",
    type: "text",
    placeholder: "e.g., United Kingdom, United States",
    required: true,
    maxLength: 100,
  },
  applicationDate: {
    name: "applicationDate",
    label: "Application/Approval Date",
    description:
      "Enter the date you submitted the application in YYYY-MM-DD format. Use 'Did not apply' if not applicable",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  visaPermitType: {
    name: "visaPermitType",
    label: "Type of Visa/Permit",
    description:
      "Select or enter the type of visa/permit applied for. Use 'Did not apply' if not applicable",
    type: "select",
    options: [
      "Visitor - Tourism",
      "Visitor - Family Visit",
      "Visitor - Friends Visit",
      "Business - Conference",
      "Business - Tradeshow",
      "Business - Meeting",
      "Study/Student Visa",
      "Work Permit",
      "Residence Permit",
      "Transit Visa",
      "Medical Visa",
      "Dependent Visa",
      "Did not apply",
      "Other",
    ],
    required: true,
  },
  applicationOutcome: {
    name: "applicationOutcome",
    label: "Application Outcome",
    description:
      "Select the outcome of your application. Include all outcomes: Refusal, Rejection, Denial, Ongoing, Approved, etc. Use 'Did not apply' if not applicable",
    type: "select",
    options: [
      "Approved",
      "Granted",
      "Refused",
      "Rejected",
      "Denied",
      "Ongoing/Pending",
      "Withdrawn",
      "Cancelled",
      "Did not apply",
      "Other",
    ],
    required: true,
  },
  outcomeDate: {
    name: "outcomeDate",
    label: "Date of Outcome",
    description:
      "Enter the date you received the outcome in YYYY-MM-DD format. Use 'Pending' if ongoing or 'Did not apply' if not applicable",
    type: "date",
    placeholder: "YYYY-MM-DD or Pending",
    required: true,
  },
  familyMembers: {
    name: "familyMembers",
    label: "Family Members",
    description:
      "List any family members included in this application (names). Use 'None' or 'Not Applicable' if you applied alone or did not apply",
    type: "textarea",
    placeholder: "e.g., Jane Doe (Spouse), John Doe (Child)",
    required: false,
    maxLength: 300,
    rows: 2,
  },
};
