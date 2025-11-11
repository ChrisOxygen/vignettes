"use client";

import * as React from "react";
import { Control } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FormField } from "./FormField";
import { WORK_BUSINESS_FIELD_CONFIGS } from "../constants";
import type { FieldConfig } from "../types";

interface WorkEntrySectionProps {
  control: Control<any>;
  entryId: string;
  entryNumber?: string;
  isCollapsible?: boolean;
}

export const WorkEntrySection: React.FC<WorkEntrySectionProps> = ({
  control,
  entryId,
  entryNumber,
  isCollapsible = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const fields = WORK_BUSINESS_FIELD_CONFIGS;

  // Create prefixed field configs for this specific work entry
  const createEntryField = (baseField: FieldConfig): FieldConfig => ({
    ...baseField,
    name: `${entryId}.${baseField.name}`,
    required: baseField.required,
  });

  return (
    <Card className="px-0">
      <CardHeader className="px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            {entryNumber || "Work Entry"}
          </CardTitle>
          {isCollapsible && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="px-6 space-y-4">
          {/* From Date */}
          <FormField
            control={control}
            config={createEntryField(fields.fromDate)}
          />

          {/* To Date */}
          <FormField
            control={control}
            config={createEntryField(fields.toDate)}
          />

          {/* Employer Name */}
          <FormField
            control={control}
            config={createEntryField(fields.employerName)}
          />

          {/* City/Country */}
          <FormField
            control={control}
            config={createEntryField(fields.cityCountry)}
          />

          {/* Job Title */}
          <FormField
            control={control}
            config={createEntryField(fields.jobTitle)}
          />

          {/* Employment Type */}
          <FormField
            control={control}
            config={createEntryField(fields.employmentType)}
          />

          {/* Employment Nature */}
          <FormField
            control={control}
            config={createEntryField(fields.employmentNature)}
          />

          {/* Monthly Earnings */}
          <FormField
            control={control}
            config={createEntryField(fields.monthlyEarnings)}
          />

          {/* Job Description */}
          <FormField
            control={control}
            config={createEntryField(fields.jobDescription)}
          />
        </CardContent>
      )}
    </Card>
  );
};
