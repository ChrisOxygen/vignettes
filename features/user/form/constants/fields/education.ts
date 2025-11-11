import type { FieldConfig } from "../../types";

export const EDUCATION_FIELD_CONFIGS: Record<string, FieldConfig> = {
  fromDate: {
    name: "fromDate",
    label: "From Date",
    description:
      "Enter start date in YYYY-MM-DD format. Use 'Not Applicable' if not applicable",
    type: "date",
    placeholder: "YYYY-MM-DD",
    required: true,
  },
  toDate: {
    name: "toDate",
    label: "To Date",
    description:
      "Enter end date in YYYY-MM-DD format. Use 'Present' if currently studying or 'Not Applicable' if not applicable",
    type: "date",
    placeholder: "YYYY-MM-DD or Present",
    required: true,
  },
  schoolName: {
    name: "schoolName",
    label: "Name of School / Academic Institution",
    description:
      "Enter the full name of the school or academic institution. Use 'Not Applicable' if not applicable. Do not use ALL CAPS",
    type: "text",
    placeholder: "Enter school/institution name",
    required: true,
    maxLength: 200,
  },
  cityTownRegion: {
    name: "cityTownRegion",
    label: "City / Town / Region",
    description:
      "Enter the city, town, or region. Use 'Not Applicable' if not applicable",
    type: "text",
    placeholder: "Enter city/town/region",
    required: true,
    maxLength: 100,
  },
  countryTerritory: {
    name: "countryTerritory",
    label: "Country / Territory",
    description:
      "Enter the country or territory. Use 'Not Applicable' if not applicable",
    type: "text",
    placeholder: "Enter country/territory",
    required: true,
    maxLength: 100,
  },
  programFieldOfStudy: {
    name: "programFieldOfStudy",
    label: "Program / Field of Study (Major)",
    description:
      "Enter your program or field of study/major. Use 'Not Applicable' if not applicable. Do not use ALL CAPS",
    type: "text",
    placeholder: "e.g., Computer Science, Business Administration",
    required: true,
    maxLength: 150,
  },
  degreeLevel: {
    name: "degreeLevel",
    label: "Type of Certificate or Degree Level",
    description:
      "Select the type of certificate or degree level obtained or pursuing",
    type: "select",
    options: [
      "Primary School Certificate",
      "High School Certificate",
      "Diploma",
      "Associate Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD/Doctorate",
      "Professional Certificate",
      "Trade Certificate",
      "Apprenticeship",
      "Not Applicable",
    ],
    required: true,
  },
};
