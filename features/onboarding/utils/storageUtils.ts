import type { OnboardingFormData } from "../types";

// Storage constants
export const STORAGE_KEY = "onboarding_form_data";
export const STORAGE_DEBOUNCE_DELAY = 1000; // 1 second

export const saveToStorage = (data: OnboardingFormData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to save onboarding data to localStorage:", error);
  }
};

export const loadFromStorage = (): Partial<OnboardingFormData> | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate the stored data has the expected structure
      if (typeof parsed === "object" && parsed !== null) {
        return parsed as Partial<OnboardingFormData>;
      }
    }
  } catch (error) {
    console.warn("Failed to load onboarding data from localStorage:", error);
  }
  return null;
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear onboarding data from localStorage:", error);
  }
};

// Utility to check if we're in browser environment
export const isBrowserEnvironment = (): boolean => {
  return typeof window !== "undefined";
};
