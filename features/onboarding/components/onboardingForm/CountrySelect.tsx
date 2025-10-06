"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useOnboarding, CountryCode } from "../../context";

interface CountrySelectProps {
  field: "currentCountryOfResidence" | "nationality";
  placeholder?: string;
  className?: string;
}

export function CountrySelect({
  field,
  placeholder = "Select a country...",
  className = "",
}: CountrySelectProps) {
  const {
    state: { formData },
    updateCountryField,
    countries,
  } = useOnboarding();

  const selectedValue = formData[field];

  return (
    <Select
      value={selectedValue || ""}
      onValueChange={(value: CountryCode) => updateCountryField(field, value)}
    >
      <SelectTrigger
        className={`h-12 text-base w-full border-border/40 bg-background hover:border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 ${className}`}
      >
        <SelectValue placeholder={placeholder} className="text-left w-full" />
      </SelectTrigger>

      <SelectContent className="max-h-[300px] border-border/40 bg-background/95 backdrop-blur-sm shadow-lg">
        {countries.map((country) => (
          <SelectItem
            key={country.value}
            value={country.value}
            className="cursor-pointer hover:bg-muted/50 focus:bg-muted/80 transition-colors duration-150 px-3 py-2"
          >
            <div className="flex items-center gap-2 w-full">
              <span className="font-emoji text-base">{country.flag}</span>
              <span className="flex-1 text-left">{country.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
