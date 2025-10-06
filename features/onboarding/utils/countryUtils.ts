import { COUNTRIES } from "../constants";
import type { CountryCode } from "../types";

// Memoized country utilities to prevent recalculation
export const getCountryLabel = (code: CountryCode): string => {
  const country = COUNTRIES.find((c) => c.value === code);
  return country?.label || code;
};

export const getCountryFlag = (code: CountryCode): string => {
  const country = COUNTRIES.find((c) => c.value === code);
  return country?.flag || "";
};

export const getCountryData = (code: CountryCode) => {
  const country = COUNTRIES.find((c) => c.value === code);
  return country || null;
};

export const getCountryCode = (label: string): CountryCode | null => {
  const country = COUNTRIES.find((c) => c.label === label);
  return country?.value || null;
};

export const isValidCountryCode = (code: string): code is CountryCode => {
  return COUNTRIES.some((c) => c.value === code);
};

// Create a memoized map for faster lookups
const countryMap = new Map(
  COUNTRIES.map((country) => [country.value, country])
);

// Optimized versions using the map
export const getCountryLabelOptimized = (code: CountryCode): string => {
  return countryMap.get(code)?.label || code;
};

export const getCountryFlagOptimized = (code: CountryCode): string => {
  return countryMap.get(code)?.flag || "";
};

export const getCountryDataOptimized = (code: CountryCode) => {
  return countryMap.get(code) || null;
};
