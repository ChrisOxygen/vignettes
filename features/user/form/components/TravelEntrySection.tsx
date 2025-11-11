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
import { TRAVEL_FIELD_CONFIGS } from "../constants";
import type { FieldConfig } from "../types";

interface TravelEntrySectionProps {
  control: Control<any>;
  entryId: string;
  entryNumber?: string;
  isCollapsible?: boolean;
}

export const TravelEntrySection: React.FC<TravelEntrySectionProps> = ({
  control,
  entryId,
  entryNumber,
  isCollapsible = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const fields = TRAVEL_FIELD_CONFIGS;

  // Create prefixed field configs for this specific travel entry
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
            {entryNumber || "Travel Entry"}
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

          {/* Length of Stay */}
          <FormField
            control={control}
            config={createEntryField(fields.lengthOfStay)}
          />

          {/* Destination */}
          <FormField
            control={control}
            config={createEntryField(fields.destination)}
          />

          {/* Purpose of Travel */}
          <FormField
            control={control}
            config={createEntryField(fields.purposeOfTravel)}
          />

          {/* Resident Address */}
          <FormField
            control={control}
            config={createEntryField(fields.residentAddress)}
          />

          {/* Family Members */}
          <FormField
            control={control}
            config={createEntryField(fields.familyMembers)}
          />
        </CardContent>
      )}
    </Card>
  );
};
