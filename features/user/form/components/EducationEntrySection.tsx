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
import { EDUCATION_FIELD_CONFIGS } from "../constants";
import type { FieldConfig } from "../types";

interface EducationEntrySectionProps {
  control: Control<any>;
  entryId: string;
  entryNumber?: string;
  isCollapsible?: boolean;
}

export const EducationEntrySection: React.FC<EducationEntrySectionProps> = ({
  control,
  entryId,
  entryNumber,
  isCollapsible = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const fields = EDUCATION_FIELD_CONFIGS;

  // Create prefixed field configs for this specific education entry
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
            {entryNumber || "Education Entry"}
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

          {/* School Name */}
          <FormField
            control={control}
            config={createEntryField(fields.schoolName)}
          />

          {/* City/Town/Region */}
          <FormField
            control={control}
            config={createEntryField(fields.cityTownRegion)}
          />

          {/* Country/Territory */}
          <FormField
            control={control}
            config={createEntryField(fields.countryTerritory)}
          />

          {/* Program/Field of Study */}
          <FormField
            control={control}
            config={createEntryField(fields.programFieldOfStudy)}
          />

          {/* Degree Level */}
          <FormField
            control={control}
            config={createEntryField(fields.degreeLevel)}
          />
        </CardContent>
      )}
    </Card>
  );
};
