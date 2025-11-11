import type { FieldConfig } from "../../types";

export const TRAVEL_FIELD_CONFIGS: Record<string, FieldConfig> = {
  fromDate: {
    name: "fromDate",
    label: "From Date",
    description:
      "Enter departure date in YYYY-MM-DD format. Use 'Did not travel' if you have not traveled in the last 10 years",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  toDate: {
    name: "toDate",
    label: "To Date",
    description:
      "Enter return date in YYYY-MM-DD format. Use 'Did not travel' if you have not traveled in the last 10 years",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  lengthOfStay: {
    name: "lengthOfStay",
    label: "Length of Stay (Days)",
    description:
      "Enter the total number of days for this trip. Use 'Did not travel' if not applicable",
    type: "text",
    placeholder: "e.g., 7",
    required: true,
  },
  destination: {
    name: "destination",
    label: "Destination (City and Country)",
    description:
      "Enter the city and country visited. Use 'Did not travel' if you have not traveled. Do not use ALL CAPS",
    type: "text",
    placeholder: "e.g., London, United Kingdom",
    required: true,
    maxLength: 150,
  },
  purposeOfTravel: {
    name: "purposeOfTravel",
    label: "Purpose of Travel",
    description:
      "Select the primary purpose of your travel. Use 'Did not travel' if not applicable",
    type: "select",
    options: [
      "Tourism",
      "Family Visit",
      "Business",
      "Training",
      "Conference",
      "Education",
      "Medical",
      "Transit",
      "Did not travel",
      "Other",
    ],
    required: true,
  },
  residentAddress: {
    name: "residentAddress",
    label: "Resident Address (For Journeys More Than 5 Days)",
    description:
      "Enter the address where you stayed during this trip. Required only for trips longer than 5 days. Use 'Not Applicable' for shorter trips or if you did not travel",
    type: "textarea",
    placeholder: "Enter full address where you stayed",
    required: false,
    maxLength: 500,
    rows: 3,
  },
  familyMembers: {
    name: "familyMembers",
    label: "Family Members",
    description:
      "List any family members who traveled with you (names). Use 'None' or 'Not Applicable' if you traveled alone or did not travel",
    type: "textarea",
    placeholder: "e.g., John Doe (Spouse), Jane Doe (Daughter)",
    required: false,
    maxLength: 300,
    rows: 2,
  },
};
