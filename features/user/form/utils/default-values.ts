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
      // Dynamic arrays for children - start with one empty entry each
      biologicalSons: [
        { ...emptyFamilyMember, relationship: "Biological Son #1" },
      ],
      biologicalDaughters: [
        { ...emptyFamilyMember, relationship: "Biological Daughter #1" },
      ],
      stepSons: [{ ...emptyFamilyMember, relationship: "Step Son #1" }],
      stepDaughters: [
        { ...emptyFamilyMember, relationship: "Step Daughter #1" },
      ],
      adoptedSons: [{ ...emptyFamilyMember, relationship: "Adopted Son #1" }],
      adoptedDaughters: [
        { ...emptyFamilyMember, relationship: "Adopted Daughter #1" },
      ],
      // Siblings - separate arrays for brothers and sisters
      brothers: [{ ...emptyFamilyMember, relationship: "Brother #1" }],
      sisters: [{ ...emptyFamilyMember, relationship: "Sister #1" }],
      // Section-level N/A checkboxes
      biologicalSonsNA: false,
      biologicalDaughtersNA: false,
      stepSonsNA: false,
      stepDaughtersNA: false,
      adoptedSonsNA: false,
      adoptedDaughtersNA: false,
      brothersNA: false,
      sistersNA: false,
    };
  }

  // Handle special case for Relatives Abroad form
  if (formType === FormType.RELATIVES_ABROAD_INFO) {
    // Create default empty relative
    const emptyRelative = {
      relationship: "",
      lastName: "",
      givenNames: "",
      familyNameAtBirth: "",
      countryOfBirth: "",
      immigrationStatusAbroad: "",
      residenceAddress: "",
      occupation: "",
    };

    return {
      // Dynamic array for relatives - starts with 1 empty entry
      relativesInUK: [{ ...emptyRelative }],
      // Section-level N/A checkbox
      relativesInUKNA: false,
    };
  }

  // Handle special case for Work & Business form
  if (formType === FormType.WORK_AND_BUSINESS_INFO) {
    // Create default empty work entry
    const emptyWorkEntry = {
      fromDate: "",
      toDate: "",
      employerName: "",
      cityCountry: "",
      jobTitle: "",
      employmentType: "",
      employmentNature: "",
      monthlyEarnings: "",
      jobDescription: "",
    };

    return {
      // Dynamic array for work entries - starts with 1 empty entry
      workHistory: [{ ...emptyWorkEntry }],
      // Section-level N/A checkbox
      workHistoryNA: false,
    };
  }

  // Handle special case for Education form
  if (formType === FormType.EDUCATION_INFO) {
    // Create default empty education entry
    const emptyEducationEntry = {
      fromDate: "",
      toDate: "",
      schoolName: "",
      cityTownRegion: "",
      countryTerritory: "",
      programFieldOfStudy: "",
      degreeLevel: "",
    };

    return {
      // Dynamic arrays for 4 education levels - each starts with 1 empty entry
      elementaryPrimary: [{ ...emptyEducationEntry }],
      secondaryHighSchool: [{ ...emptyEducationEntry }],
      universityCollege: [{ ...emptyEducationEntry }],
      tradeSchoolOther: [{ ...emptyEducationEntry }],
      // Section-level N/A checkboxes for each education level
      elementaryPrimaryNA: false,
      secondaryHighSchoolNA: false,
      universityCollegeNA: false,
      tradeSchoolOtherNA: false,
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
