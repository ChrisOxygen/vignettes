"use client";

import { useFormActions } from "../context/FormActionsContext";
import { useFormSelectors } from "../context/FormSelectorsContext";
import { useFormState } from "../context/FormStateContext";

// Combined hook that provides both state and actions (use sparingly to avoid re-renders)
export function useForm() {
  const { state } = useFormState();
  const actions = useFormActions();
  const selectors = useFormSelectors();

  return {
    state,
    ...actions,
    ...selectors,
  };
}
