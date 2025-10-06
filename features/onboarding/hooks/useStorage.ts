import { useCallback, useRef, useEffect } from "react";
import {
  saveToStorage,
  loadFromStorage,
  clearStorage,
  STORAGE_DEBOUNCE_DELAY,
  isBrowserEnvironment,
} from "../utils/storageUtils";
import type { OnboardingFormData, OnboardingAction } from "../types";

interface UseStorageProps {
  formData: OnboardingFormData;
  dispatch: React.Dispatch<OnboardingAction>;
}

export const useStorage = ({ formData, dispatch }: UseStorageProps) => {
  const isFirstLoad = useRef(true);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced save function
  const debouncedSave = useCallback((data: OnboardingFormData) => {
    if (!isBrowserEnvironment()) return;

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout
    saveTimeoutRef.current = setTimeout(() => {
      saveToStorage(data);
    }, STORAGE_DEBOUNCE_DELAY);
  }, []);

  // Auto-save form data to storage when it changes (except on first load)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // Only save if form has some data (not empty)
    const hasData = Object.values(formData).some(
      (value) => value.trim() !== ""
    );
    if (hasData) {
      debouncedSave(formData);
    }
  }, [formData, debouncedSave]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Storage management functions
  const saveFormDataToStorage = useCallback(() => {
    if (isBrowserEnvironment()) {
      saveToStorage(formData);
    }
  }, [formData]);

  const clearFormDataFromStorage = useCallback(() => {
    if (isBrowserEnvironment()) {
      clearStorage();
    }
  }, []);

  const loadFormDataFromStorage = useCallback(() => {
    if (!isBrowserEnvironment()) return null;

    const storedData = loadFromStorage();
    if (storedData) {
      dispatch({ type: "UPDATE_MULTIPLE_FIELDS", fields: storedData });
    }
    return storedData;
  }, [dispatch]);

  return {
    saveFormDataToStorage,
    clearFormDataFromStorage,
    loadFormDataFromStorage,
    isFirstLoad,
  };
};
