"use client";

import { useCallback } from "react";
import { useFormActions } from "../context/FormActionsContext";
import { useFormSelectors } from "../context/FormSelectorsContext";
import { FormFieldValue } from "../types";

// Optimized hook for individual form fields
export function useFormField(fieldName: string) {
  const { getFieldValue, getFieldError, isFieldTouched } = useFormSelectors();
  const { setFieldValue, setFieldTouched } = useFormActions();

  const setValue = useCallback(
    (value: FormFieldValue | { value: FormFieldValue; explanation?: string }) =>
      setFieldValue(fieldName, value),
    [setFieldValue, fieldName]
  );

  const setTouched = useCallback(
    (touched: boolean) => setFieldTouched(fieldName, touched),
    [setFieldTouched, fieldName]
  );

  return {
    value: getFieldValue(fieldName),
    error: getFieldError(fieldName),
    touched: isFieldTouched(fieldName),
    setValue,
    setTouched,
  };
}
