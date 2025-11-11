import { FormType } from "@prisma/client";
import { FORM_FIELD_CONFIGS } from "../constants";

/**
 * Generates default values for form fields based on formType
 * @param formType - The type of form to generate defaults for
 * @returns Object with default values for the specified form type
 */
export const generateDefaultValues = (formType: FormType) => {
  const formConfig = FORM_FIELD_CONFIGS[formType];
  const defaults: any = {};

  // Handle special case for Family Members form
  if (formType === FormType.FAMILY_MEMBERS_INFO) {
    // Create default empty family member
    const emptyFamilyMember = {
      notApplicable: false,
      relationship: "",
      lastName: "",
      givenNames: "",
      familyNameAtBirth: "",
      maritalStatus: "",
      dateOfBirth: "",
      townCityOfBirth: "",
      countryOfBirth: "",
      dateOfDeath: "",
      residenceAddress: "",
      occupation: "",
      accompanyToUK: { value: "No" as const, explanation: "" },
    };

    return {
      // Required family members
      father: { ...emptyFamilyMember, relationship: "Father" },
      mother: { ...emptyFamilyMember, relationship: "Mother" },
      spouse: { ...emptyFamilyMember, relationship: "Spouse" },
      exSpouse: { ...emptyFamilyMember, relationship: "Ex-Spouse" },
      // Biological children
      son1Biological: {
        ...emptyFamilyMember,
        relationship: "Biological Son #1",
      },
      son2Biological: {
        ...emptyFamilyMember,
        relationship: "Biological Son #2",
      },
      daughter1Biological: {
        ...emptyFamilyMember,
        relationship: "Biological Daughter #1",
      },
      daughter2Biological: {
        ...emptyFamilyMember,
        relationship: "Biological Daughter #2",
      },
      // Step children
      stepSon1: { ...emptyFamilyMember, relationship: "Step Son #1" },
      stepSon2: { ...emptyFamilyMember, relationship: "Step Son #2" },
      stepDaughter1: {
        ...emptyFamilyMember,
        relationship: "Step Daughter #1",
      },
      stepDaughter2: {
        ...emptyFamilyMember,
        relationship: "Step Daughter #2",
      },
      // Adopted children
      son1Adopted: { ...emptyFamilyMember, relationship: "Adopted Son #1" },
      son2Adopted: { ...emptyFamilyMember, relationship: "Adopted Son #2" },
      daughter1Adopted: {
        ...emptyFamilyMember,
        relationship: "Adopted Daughter #1",
      },
      daughter2Adopted: {
        ...emptyFamilyMember,
        relationship: "Adopted Daughter #2",
      },
      // Siblings - start with empty array
      siblings: [],
      // Flow control questions
      flow: {
        hasAdditionalBiologicalSons: { value: "No" as const, explanation: "" },
        hasAdditionalBiologicalDaughters: {
          value: "No" as const,
          explanation: "",
        },
        hasAdditionalStepSons: { value: "No" as const, explanation: "" },
        hasAdditionalStepDaughters: { value: "No" as const, explanation: "" },
        hasAdditionalAdoptedSons: { value: "No" as const, explanation: "" },
        hasAdditionalAdoptedDaughters: {
          value: "No" as const,
          explanation: "",
        },
        hasBrothersOrSisters: { value: "No" as const, explanation: "" },
      },
    };
  }

  // Regular fields - empty strings
  Object.keys(formConfig.fields).forEach((key) => {
    defaults[key] = "";
  });

  // Yes/No fields - default to "No" with empty explanation
  Object.keys(formConfig.yesNoFields).forEach((key) => {
    defaults[key] = { value: "No" as const, explanation: "" };
  });

  return defaults;
};
