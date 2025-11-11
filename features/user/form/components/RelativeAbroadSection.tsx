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
import { RELATIVE_ABROAD_FIELD_CONFIGS } from "../constants";
import type { FieldConfig } from "../types";

interface RelativeAbroadSectionProps {
  control: Control<any>;
  memberId: string;
  relationship?: string;
  isCollapsible?: boolean;
}

export const RelativeAbroadSection: React.FC<RelativeAbroadSectionProps> = ({
  control,
  memberId,
  relationship,
  isCollapsible = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const fields = RELATIVE_ABROAD_FIELD_CONFIGS;

  // Create prefixed field configs for this specific relative
  const createRelativeField = (baseField: FieldConfig): FieldConfig => ({
    ...baseField,
    name: `${memberId}.${baseField.name}`,
    required: baseField.required,
  });

  return (
    <Card className="px-0">
      <CardHeader className="px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            {relationship || "Relative in UK"}
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
          {/* Relationship */}
          <FormField
            control={control}
            config={createRelativeField(fields.relationship)}
          />

          {/* Last Name */}
          <FormField
            control={control}
            config={createRelativeField(fields.lastName)}
          />

          {/* Given Names */}
          <FormField
            control={control}
            config={createRelativeField(fields.givenNames)}
          />

          {/* Family Name at Birth */}
          <FormField
            control={control}
            config={createRelativeField(fields.familyNameAtBirth)}
          />

          {/* Country of Birth */}
          <FormField
            control={control}
            config={createRelativeField(fields.countryOfBirth)}
          />

          {/* Immigration Status Abroad */}
          <FormField
            control={control}
            config={createRelativeField(fields.immigrationStatusAbroad)}
          />

          {/* Residence Address */}
          <FormField
            control={control}
            config={createRelativeField(fields.residenceAddress)}
          />

          {/* Occupation */}
          <FormField
            control={control}
            config={createRelativeField(fields.occupation)}
          />
        </CardContent>
      )}
    </Card>
  );
};
