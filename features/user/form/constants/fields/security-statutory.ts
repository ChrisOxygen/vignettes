import type { RadioFieldConfig } from "../../types";

export const STATUTORY_QUESTIONS_CONFIGS: Record<string, RadioFieldConfig> = {
  criminalConviction: {
    name: "criminalConviction",
    label:
      "Have you been convicted of a crime or offence in any Country for which a pardon has not been granted under the Criminal Records Act of that Country?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide detailed explanation including country, nature of offence, date, and outcome",
      errorMessage: "Please provide detailed explanation of your criminal conviction",
    },
  },
  criminalArrestOrCharge: {
    name: "criminalArrestOrCharge",
    label:
      "Have you ever committed, been arrested for, been charged with or convicted of any criminal offence in any country?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide detailed explanation including country, nature of offence, date, and outcome",
      errorMessage:
        "Please provide detailed explanation of any criminal arrests, charges or convictions",
    },
  },
  previousApplicationAbroad: {
    name: "previousApplicationAbroad",
    label:
      "Have you previously applied to enter or remain in abroad (study permit, work permit, visit visa, permanent residency, etc.)?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide details of all previous applications including country, type of visa/permit, dates, and outcomes",
      errorMessage: "Please provide details of your previous applications abroad",
    },
  },
  unauthorizedStayOrWork: {
    name: "unauthorizedStayOrWork",
    label:
      "Have you ever remained beyond the validity of your status, attended school without authorization or worked without authorization in abroad or any other Country?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide detailed explanation including country, dates, circumstances, and how the situation was resolved",
      errorMessage:
        "Please provide detailed explanation of unauthorized stay, study or work",
    },
  },
  visaRefusalOrRemoval: {
    name: "visaRefusalOrRemoval",
    label:
      "Have you ever been refused a visa or permit, denied entry or ordered to leave abroad or any country?",
    description:
      "Answer Yes or No. This includes: (i) Refused permission to stay or remain, (ii) Deported, (iii) Removed, (iv) Excluded or banned from entry. If Yes, provide explanation and copy of refusal/decision letter if available.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide detailed explanation including country, date, type of visa/permit, reason for refusal, and attach refusal letter if available",
      errorMessage:
        "Please provide detailed explanation of visa refusal, denial of entry, or removal order",
    },
  },
  refugeeProtectionClaim: {
    name: "refugeeProtectionClaim",
    label:
      "Have you made previous claims for refugee protection in abroad or at any visa office abroad, in any other country or countries, or with the United Nations High Commissioner for Refugees (UNHCR)?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide details including country/office where claim was made, date, and outcome",
      errorMessage: "Please provide details of refugee protection claims",
    },
  },
  refugeeStatusRefusal: {
    name: "refugeeStatusRefusal",
    label:
      "Have you been refused refugee status, or an immigrant or permanent resident visa or visitor or temporary resident visa, to any country?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide detailed explanation including country, type of application, date, and reason for refusal",
      errorMessage: "Please provide details of refugee status or visa refusals",
    },
  },
  permanentResidentStatus: {
    name: "permanentResidentStatus",
    label:
      "Have you ever held or currently hold permanent resident visa for any country?",
    description: "Answer Yes or No. If Yes, provide explanation and attach PR documents.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide country, dates of PR status, and attach PR documents",
      errorMessage:
        "Please provide details of permanent resident status and attach supporting documents",
    },
  },
  warCrimesOrGenocide: {
    name: "warCrimesOrGenocide",
    label:
      "Have you been involved in an act of genocide, a war crime or in the commission of a crime against humanity?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide detailed explanation",
      errorMessage:
        "Please provide detailed explanation of involvement in genocide, war crimes, or crimes against humanity",
    },
  },
  armedStruggleOrViolence: {
    name: "armedStruggleOrViolence",
    label:
      "Have you used, planned or advocated the use of armed struggle or violence to reach political, religious or social objectives?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide detailed explanation",
      errorMessage:
        "Please provide detailed explanation of involvement in armed struggle or violence",
    },
  },
  criminalOrganization: {
    name: "criminalOrganization",
    label:
      "Have you been a member of an organization that is or was engaged in an activity that is part of a pattern of criminal activity?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide detailed explanation including organization name, dates of membership, and nature of activities",
      errorMessage:
        "Please provide detailed explanation of membership in criminal organizations",
    },
  },
  detentionOrIncarceration: {
    name: "detentionOrIncarceration",
    label: "Have you been detained, incarcerated, or put in jail?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide detailed explanation including country, dates, reason for detention/incarceration, and outcome",
      errorMessage: "Please provide detailed explanation of detention or incarceration",
    },
  },
  seriousDisease: {
    name: "seriousDisease",
    label: "Have you had any serious disease or physical or mental disorder?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide details of condition, diagnosis date, treatment, and current status",
      errorMessage: "Please provide details of any serious disease or disorder",
    },
  },
  disorderRequiringServices: {
    name: "disorderRequiringServices",
    label:
      "Do you have any physical or mental disorder that would require social and/or health services, other than medication?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide details of condition and services required",
      errorMessage: "Please provide details of disorder and required services",
    },
  },
  tuberculosisExposure: {
    name: "tuberculosisExposure",
    label:
      "Within the past two years, have you or a family member ever had tuberculosis of the lungs or been in close contact with a person with tuberculosis?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide details including who was affected, dates, treatment received, and current status",
      errorMessage: "Please provide details of tuberculosis exposure or infection",
    },
  },
  militaryOrPoliceService: {
    name: "militaryOrPoliceService",
    label:
      "Did you serve in any military, militia, or civil defense unit or serve in a security organization or police force (including non-obligatory national service, reserve or volunteer units)?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide details including organization name, rank, dates of service, duties, and country",
      errorMessage: "Please provide details of military, police, or security service",
    },
  },
  politicalOrganizationMembership: {
    name: "politicalOrganizationMembership",
    label:
      "Are you, or have you ever been a member or associated with any political party, or other group or organization which uses, has engaged in, advocates or advocated the use of armed struggle or violence as a means to achieving political, religious or social objectives, or which has been associated with criminal activity at any time?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder:
        "Please provide detailed explanation including organization name, dates of membership/association, and nature of activities",
      errorMessage:
        "Please provide detailed explanation of membership or association with political parties or organizations",
    },
  },
  witnessToIllTreatment: {
    name: "witnessToIllTreatment",
    label:
      "Have you ever witnessed or participated in the ill treatment of prisoners or civilians, looting or desecration of religious buildings?",
    description: "Answer Yes or No. If Yes, you must provide a detailed explanation.",
    type: "radio",
    options: ["Yes", "No"],
    conditionalExplanation: {
      triggerValue: "Yes",
      placeholder: "Please provide detailed explanation",
      errorMessage:
        "Please provide detailed explanation of witnessing or participating in ill treatment, looting, or desecration",
    },
  },
};
