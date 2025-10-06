// Date utility functions for onboarding operations

/**
 * Converts DD/MM/YYYY string format to JavaScript Date object
 * @param dateString - Date string in DD/MM/YYYY format
 * @returns Date object
 */
export const convertDateStringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
};

/**
 * Converts JavaScript Date object to DD/MM/YYYY string format
 * @param date - Date object
 * @returns Date string in DD/MM/YYYY format
 */
export const convertDateToString = (date: Date): string => {
  return date.toLocaleDateString("en-GB"); // DD/MM/YYYY format
};

/**
 * Validates if a date string is in DD/MM/YYYY format
 * @param dateString - Date string to validate
 * @returns Boolean indicating if format is valid
 */
export const isValidDateFormat = (dateString: string): boolean => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  return dateRegex.test(dateString);
};

/**
 * Validates if a date string represents a valid date and meets age requirements
 * @param dateString - Date string in DD/MM/YYYY format
 * @param minAge - Minimum age requirement (default: 16)
 * @returns Boolean indicating if date is valid and meets age requirements
 */
export const isValidDateOfBirth = (
  dateString: string,
  minAge: number = 16
): boolean => {
  if (!isValidDateFormat(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  // Check if date is valid
  if (
    birthDate.getDate() !== day ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== year
  ) {
    return false;
  }

  // Check if date is not in the future
  if (birthDate > today) return false;

  // Check if user meets minimum age requirement
  const minAgeDate = new Date();
  minAgeDate.setFullYear(today.getFullYear() - minAge);

  return birthDate <= minAgeDate;
};
