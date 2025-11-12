"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Tag } from "lucide-react";
import { FormType } from "@prisma/client";
import { getAvailableFieldPaths } from "../../utils/field-paths";

interface FieldTagSelectorProps {
  formType: FormType;
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export function FieldTagSelector({
  formType,
  value,
  onChange,
  disabled,
}: FieldTagSelectorProps) {
  const fields = getAvailableFieldPaths(formType);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Tag className="h-4 w-4" />
        Tag a field (optional)
      </label>
      <Select
        value={value || "__NONE__"}
        onValueChange={(v) => onChange(v === "__NONE__" ? null : v)}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="General comment (no specific field)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__NONE__">
            General comment (no specific field)
          </SelectItem>
          {fields.map((field) => (
            <SelectItem key={field.value} value={field.value}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
