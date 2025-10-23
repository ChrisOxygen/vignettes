// EB-1A Questionnaire Form Configuration
// Following standardized field configuration pattern

import type { FieldConfig, RadioFieldConfig } from "@/features/user/form/types";

// Section grouping metadata
export const EB1A_SECTIONS = {
  BASIC_INFO: {
    id: "basic-info",
    title: "Basic Information",
    description: "Your contact and professional information",
  },
  PROFESSIONAL_RECOGNITION: {
    id: "professional-recognition",
    title: "Professional Recognition",
    description: "Awards, associations, and judging experience",
  },
  PUBLICATIONS_MEDIA: {
    id: "publications-media",
    title: "Publications & Media",
    description: "Scholarly work, articles, and media coverage",
  },
  BUSINESS_FUNDING: {
    id: "business-funding",
    title: "Business & Funding",
    description: "Employment, compensation, and venture funding",
  },
  INNOVATION: {
    id: "innovation",
    title: "Innovation & Contributions",
    description: "Patents and professional achievements",
  },
};

export const BASIC_FIELD_CONFIGS: Record<string, FieldConfig> = {
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
};

export const YES_NO_FIELD_CONFIGS: Record<string, RadioFieldConfig> = {
  ventureFunding: {
    name: "ventureFunding",
    label: "Have you been responsible for raising venture capital funding?",
    description:
      "Answer Yes or No. If Yes, provide detailed information about your fundraising experience.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe your venture capital fundraising experience, including amounts raised, investors, and timeline",
      errorMessage:
        "Please provide details about your venture capital fundraising experience",
      maxLength: 1000,
    },
  },
  exclusiveAssociations: {
    name: "exclusiveAssociations",
    label: "Are you part of any exclusive professional associations?",
    description:
      "Answer Yes or No. If Yes, describe the organizations and their acceptance criteria.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe the exclusive associations you belong to, their acceptance criteria, and provide links to information about these organizations",
      errorMessage:
        "Please provide details about your exclusive professional associations",
      maxLength: 1000,
    },
  },
  startupAffiliation: {
    name: "startupAffiliation",
    label:
      "Are you or your company affiliated with a recognized startup incubator or accelerator?",
    description:
      "Answer Yes or No. If Yes, provide details about the program and your involvement.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe your affiliation with startup incubators or accelerators, including program names, dates, and your role",
      errorMessage:
        "Please provide details about your startup incubator or accelerator affiliation",
      maxLength: 1000,
    },
  },
  patents: {
    name: "patents",
    label: "Are you a named inventor on any patents in the U.S. or abroad?",
    description:
      "Answer Yes or No. If Yes, provide details about your patents.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "List your patents including patent numbers, titles, countries where filed, and your role as inventor",
      errorMessage: "Please provide details about your patents",
      maxLength: 1000,
    },
  },
  awards: {
    name: "awards",
    label:
      "Have you received any national or international awards that are considered competitive in your field?",
    description:
      "Answer Yes or No. If Yes, describe the awards and their significance.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe the national and international awards you have received, including award names, dates, selection criteria, and their significance in your field",
      errorMessage: "Please provide details about your awards and recognition",
      maxLength: 1000,
    },
  },
  judgingExperience: {
    name: "judgingExperience",
    label:
      "Have you ever served as a judge or external evaluator for any contest or competition?",
    description:
      "Answer Yes or No. If Yes, provide details about your judging experience.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe your experience as a judge or evaluator, including the types of competitions, organizations involved, and dates of service",
      errorMessage:
        "Please provide details about your judging and evaluation experience",
      maxLength: 1000,
    },
  },
  reviewerExperience: {
    name: "reviewerExperience",
    label:
      "Have you served as a reviewer for any professional publications, conference proceedings, or academic work?",
    description:
      "Answer Yes or No. If Yes, provide details about your review work.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe your experience as a reviewer for professional publications, journals, conferences, or academic work, including publication names and review periods",
      errorMessage: "Please provide details about your review experience",
      maxLength: 1000,
    },
  },
  mediaCoverage: {
    name: "mediaCoverage",
    label: "Have you been featured in major online or traditional media?",
    description:
      "Answer Yes or No. If Yes, provide links and details about media coverage.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Provide links and details about materials published about you in major media outlets, including publication names, dates, and article titles",
      errorMessage: "Please provide details about your media coverage",
      maxLength: 1000,
    },
  },
  scholarlyArticles: {
    name: "scholarlyArticles",
    label:
      "Have you authored scholarly articles published in professional journals or major media?",
    description:
      "Answer Yes or No. If Yes, provide examples and publication details.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "List your scholarly articles including publication names, article titles, dates, and your role as author or co-author",
      errorMessage: "Please provide details about your scholarly publications",
      maxLength: 1000,
    },
  },
  criticalEmployment: {
    name: "criticalEmployment",
    label:
      "Have you been employed in a critical or essential capacity at major companies?",
    description:
      "Answer Yes or No. If Yes, provide details about your key roles and achievements.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "List major companies where you held critical roles, including job titles, duties, achievements, what distinguished you from other employees, and evidence to support these claims",
      errorMessage:
        "Please provide details about your critical employment roles",
      maxLength: 1000,
    },
  },
  highCompensation: {
    name: "highCompensation",
    label:
      "Have you received high compensation compared to industry standards?",
    description:
      "Answer Yes or No. If Yes, provide compensation details and industry comparisons.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe your highest compensation (salary, bonus, stock redemption) in recent years, how it compares to industry averages in your country, and provide exact amounts in local currency",
      errorMessage: "Please provide details about your compensation history",
      maxLength: 1000,
    },
  },
  professionalAchievements: {
    name: "professionalAchievements",
    label:
      "Do you have significant professional achievements or contributions to your industry?",
    description:
      "Answer Yes or No. If Yes, describe your main achievements and available evidence.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Describe your main professional achievements, contributions to your industry, and what type of evidence you can provide to support these claims",
      errorMessage:
        "Please provide details about your professional achievements",
      maxLength: 1000,
    },
  },
};

// Field order for rendering (organized by section)
export const EB1A_FIELD_ORDER = {
  [EB1A_SECTIONS.BASIC_INFO.id]: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "linkedinProfile",
    "immigrationStatus",
  ],
  [EB1A_SECTIONS.PROFESSIONAL_RECOGNITION.id]: [
    "awards",
    "exclusiveAssociations",
    "judgingExperience",
  ],
  [EB1A_SECTIONS.PUBLICATIONS_MEDIA.id]: [
    "reviewerExperience",
    "mediaCoverage",
    "scholarlyArticles",
  ],
  [EB1A_SECTIONS.BUSINESS_FUNDING.id]: [
    "ventureFunding",
    "startupAffiliation",
    "criticalEmployment",
    "highCompensation",
  ],
  [EB1A_SECTIONS.INNOVATION.id]: ["patents", "professionalAchievements"],
};

// Helper to get all field configurations
export const getAllEB1AFields = () => ({
  ...BASIC_FIELD_CONFIGS,
  ...YES_NO_FIELD_CONFIGS,
});
