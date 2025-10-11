"use client";

import React, { createContext, useContext, useReducer } from "react";
import { formReducer, initialFormState } from "./reducers";
import type { FormStateContextValue, FormStateProviderProps } from "../types";

// Create base state context
const FormStateContext = createContext<FormStateContextValue | undefined>(
  undefined
);

export function FormStateProvider({ children }: FormStateProviderProps) {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <FormStateContext.Provider value={contextValue}>
      {children}
    </FormStateContext.Provider>
  );
}

// Hook to use form state context
export function useFormState() {
  const context = useContext(FormStateContext);
  if (context === undefined) {
    throw new Error("useFormState must be used within a FormStateProvider");
  }
  return context;
}
