import type { FieldConfig, RadioFieldConfig } from "@/features/user/form/types";

// Section grouping metadata for EB2NIW
export const EB2NIW_SECTIONS = {
  BASIC_INFO: {
    id: "eb2niw-basic-info",
    title: "Basic Information",
    description: "Your contact and professional information",
  },
  QUALIFICATIONS: {
    id: "eb2niw-qualifications",
    title: "Advanced Degree & Exceptional Ability",
    description: "Educational background and exceptional ability in your field",
  },
  ENDEAVOR: {
    id: "eb2niw-endeavor",
    title: "Proposed Endeavor",
    description:
      "Description of your proposed work and its national importance",
  },
  NATIONAL_INTEREST: {
    id: "eb2niw-national-interest",
    title: "National Interest Waiver",
    description: "Evidence supporting the national interest waiver request",
  },
  SUPPORTING_EVIDENCE: {
    id: "eb2niw-supporting-evidence",
    title: "Supporting Evidence",
    description: "Additional documentation and evidence",
  },
};

export const EB2NIW_BASIC_FIELD_CONFIGS: Record<string, FieldConfig> = {
  firstName: {
    name: "firstName",
    label: "First Name *",
    description: "Enter your first name as it appears on official documents",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
    maxLength: 50,
    minLength: 1,
  },
  lastName: {
    name: "lastName",
    label: "Last Name *",
    description: "Enter your last name as it appears on official documents",
    type: "text",
    placeholder: "Enter your last name",
    required: true,
    maxLength: 50,
    minLength: 1,
  },
  email: {
    name: "email",
    label: "Email Address *",
    description: "Enter a valid email address for correspondence",
    type: "email",
    placeholder: "your.email@example.com",
    required: true,
  },
  phone: {
    name: "phone",
    label: "Phone Number *",
    description: "Enter your primary phone number",
    type: "tel",
    placeholder: "+1 (555) 123-4567",
    required: true,
  },
  linkedinProfile: {
    name: "linkedinProfile",
    label: "LinkedIn Profile",
    description: "Provide a link to your LinkedIn profile",
    type: "text",
    placeholder: "https://linkedin.com/in/yourprofile",
    required: false,
    maxLength: 255,
  },
  immigrationStatus: {
    name: "immigrationStatus",
    label: "Current Immigration Status",
    description:
      "If you are in the US, describe your current immigration status and expiration date",
    type: "textarea",
    placeholder:
      "Describe your current US immigration status and when it expires (if applicable)",
    required: false,
    maxLength: 500,
    rows: 3,
  },
  fieldOfExpertise: {
    name: "fieldOfExpertise",
    label: "Field of Expertise *",
    description: "Describe your primary field of expertise or specialization",
    type: "text",
    placeholder:
      "e.g., Software Engineering, Biotechnology, Environmental Science",
    required: true,
    maxLength: 100,
  },
  proposedEndeavor: {
    name: "proposedEndeavor",
    label: "Proposed Endeavor *",
    description:
      "Brief description of your proposed work or research in the United States",
    type: "textarea",
    placeholder:
      "Describe what you plan to work on and how it benefits the United States",
    required: true,
    maxLength: 500,
    rows: 4,
  },
};

export const EB2NIW_YES_NO_FIELD_CONFIGS: Record<string, RadioFieldConfig> = {
  advancedDegree: {
    name: "advancedDegree",
    label: "Do you hold an advanced degree (Master's or higher) or equivalent?",
    description:
      "Answer Yes or No. If Yes, provide details about your degree(s) and institutions.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "List your advanced degrees including degree type, major, institution, graduation year, and country. If you have a bachelor's degree plus 5+ years of progressive experience, describe that as well.",
      errorMessage: "Please provide details about your advanced degree(s)",
      maxLength: 1000,
    },
  },
  exceptionalAbility: {
    name: "exceptionalAbility",
    label: "Do you believe you have exceptional ability in your field?",
    description:
      "Answer Yes or No. If Yes, describe evidence of your exceptional ability.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe evidence of exceptional ability such as: official academic records, letters from employers/experts, professional licenses/certifications, high salary/compensation, professional association memberships, or recognition for achievements.",
      errorMessage: "Please provide evidence of your exceptional ability",
      maxLength: 1000,
    },
  },
  substantialMerit: {
    name: "substantialMerit",
    label:
      "Does your proposed endeavor have substantial merit and national importance?",
    description:
      "Answer Yes or No. If Yes, explain how your work has substantial merit and national importance.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Explain how your proposed endeavor has substantial merit and national importance. Describe the potential impact on the economy, environment, health, education, housing, entrepreneurship, or other areas of national interest.",
      errorMessage:
        "Please explain the substantial merit and national importance of your endeavor",
      maxLength: 1500,
    },
  },
  wellPositioned: {
    name: "wellPositioned",
    label: "Are you well positioned to advance your proposed endeavor?",
    description:
      "Answer Yes or No. If Yes, describe your qualifications and positioning.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe your education, skills, knowledge, record of success, and other factors that demonstrate you are well positioned to advance your endeavor. Include specific achievements, experience, and expertise relevant to your proposed work.",
      errorMessage:
        "Please describe how you are well positioned to advance your endeavor",
      maxLength: 1500,
    },
  },
  waiveBeneficial: {
    name: "waiveBeneficial",
    label:
      "Would it be beneficial to the United States to waive the labor certification requirement?",
    description:
      "Answer Yes or No. If Yes, explain why waiving labor certification would benefit the US.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Explain why it would be beneficial to the United States to waive the labor certification requirement. Consider the urgency of your endeavor, the difficulty in quantifying the national interest through standard labor certification, and how your work serves broader national interests beyond the interests of a specific employer.",
      errorMessage:
        "Please explain why waiving labor certification would benefit the United States",
      maxLength: 1500,
    },
  },
  publications: {
    name: "publications",
    label: "Have you authored scholarly publications in your field?",
    description:
      "Answer Yes or No. If Yes, provide details about your publications.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "List your publications including titles, journals/conferences, publication dates, co-authors, and citation counts if available. Include peer-reviewed articles, conference papers, book chapters, etc.",
      errorMessage: "Please provide details about your publications",
      maxLength: 1000,
    },
  },
  citations: {
    name: "citations",
    label: "Have your works been cited by other scholars in your field?",
    description:
      "Answer Yes or No. If Yes, provide citation information and impact metrics.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Provide citation statistics including total citations, h-index, notable papers that cited your work, and any metrics showing the impact of your research (Google Scholar, Web of Science, etc.).",
      errorMessage: "Please provide details about citations of your work",
      maxLength: 1000,
    },
  },
  patents: {
    name: "patents",
    label: "Do you hold any patents in your field?",
    description: "Answer Yes or No. If Yes, provide patent details.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "List your patents including patent numbers, titles, filing dates, countries, co-inventors, and commercial applications or licensing agreements.",
      errorMessage: "Please provide details about your patents",
      maxLength: 1000,
    },
  },
  awards: {
    name: "awards",
    label: "Have you received awards or recognition in your field?",
    description:
      "Answer Yes or No. If Yes, describe the awards and their significance.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe awards, honors, fellowships, or recognition you have received, including the awarding organization, selection criteria, number of recipients, and significance in your field.",
      errorMessage: "Please provide details about your awards and recognition",
      maxLength: 1000,
    },
  },
  professionalMemberships: {
    name: "professionalMemberships",
    label:
      "Are you a member of professional associations that require outstanding achievements?",
    description:
      "Answer Yes or No. If Yes, describe the associations and membership requirements.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "List professional associations you belong to, their membership requirements, the selection process, and how membership is limited to those with outstanding achievements.",
      errorMessage:
        "Please provide details about your professional memberships",
      maxLength: 1000,
    },
  },
  reviewerExperience: {
    name: "reviewerExperience",
    label:
      "Have you served as a reviewer for journals or conferences in your field?",
    description:
      "Answer Yes or No. If Yes, provide details about your review activities.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe your experience reviewing manuscripts for journals, conference proceedings, or grant applications. Include publication names, review periods, and number of papers reviewed.",
      errorMessage: "Please provide details about your reviewer experience",
      maxLength: 1000,
    },
  },
  mediaAttention: {
    name: "mediaAttention",
    label: "Has your work received media attention or coverage?",
    description:
      "Answer Yes or No. If Yes, provide details about media coverage.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe media coverage of your work including publication names, article titles, dates, and links if available. Include newspapers, magazines, online publications, interviews, etc.",
      errorMessage: "Please provide details about media coverage",
      maxLength: 1000,
    },
  },
  collaborations: {
    name: "collaborations",
    label: "Have you collaborated with prominent researchers or institutions?",
    description:
      "Answer Yes or No. If Yes, describe your collaborations and their significance.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe collaborations with well-known researchers, institutions, or organizations. Include names, institutions, nature of collaboration, and outcomes or publications resulting from these collaborations.",
      errorMessage: "Please provide details about your collaborations",
      maxLength: 1000,
    },
  },
  fundingGrants: {
    name: "fundingGrants",
    label: "Have you received research funding or grants?",
    description:
      "Answer Yes or No. If Yes, provide details about funding received.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "List research grants, funding, or scholarships you have received including funding agency/organization, project title, amount, duration, and your role (PI, Co-PI, etc.).",
      errorMessage: "Please provide details about your research funding",
      maxLength: 1000,
    },
  },
};

// Field order for EB2NIW rendering (organized by section)
export const EB2NIW_FIELD_ORDER = {
  [EB2NIW_SECTIONS.BASIC_INFO.id]: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "linkedinProfile",
    "immigrationStatus",
    "fieldOfExpertise",
    "proposedEndeavor",
  ],
  [EB2NIW_SECTIONS.QUALIFICATIONS.id]: ["advancedDegree", "exceptionalAbility"],
  [EB2NIW_SECTIONS.ENDEAVOR.id]: ["substantialMerit", "wellPositioned"],
  [EB2NIW_SECTIONS.NATIONAL_INTEREST.id]: ["waiveBeneficial"],
  [EB2NIW_SECTIONS.SUPPORTING_EVIDENCE.id]: [
    "publications",
    "citations",
    "patents",
    "awards",
    "professionalMemberships",
    "reviewerExperience",
    "mediaAttention",
    "collaborations",
    "fundingGrants",
  ],
};

// Helper to get all EB2NIW field configurations
export const getAllEB2NIWFields = () => ({
  ...EB2NIW_BASIC_FIELD_CONFIGS,
  ...EB2NIW_YES_NO_FIELD_CONFIGS,
});

// Form type identifier
export const EB2NIW_FORM_TYPE = "EB2NIW";
