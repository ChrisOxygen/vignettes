"use client";

import React from "react";
import { Input } from "@/shared/components/ui/input";
import { useOnboarding } from "../../context";

interface TextInputProps {
  field: "fullLegalName" | "phoneNumber" | "passportNumber";
  placeholder?: string;
  className?: string;
  type?: "text" | "tel";
  transform?: "uppercase" | "lowercase" | "none";
}

export function TextInput({
  field,
  placeholder = "",
  className = "",
  type = "text",
  transform = "none",
}: TextInputProps) {
  const {
    state: { formData },
    updateField,
  } = useOnboarding();

  // Ensure value is always a string (never undefined) for controlled input
  const value = formData[field] || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Apply text transformation
    if (transform === "uppercase") {
      newValue = newValue.toUpperCase();
    } else if (transform === "lowercase") {
      newValue = newValue.toLowerCase();
    }

    updateField(field, newValue);
  };

  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={`h-12 text-base w-full border-border/40 bg-background hover:border-border/60 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all duration-200 shadow-none ${className}`}
    />
  );
}
