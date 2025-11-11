"use client";

import * as React from "react";
import { Control, useWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { FormField } from "./FormField";
import { YesNoField } from "./YesNoField";
import { FAMILY_MEMBER_BASE_FIELDS } from "../constants";
import type { FieldConfig, RadioFieldConfig } from "../types";

interface FamilyMemberSectionProps {
  control: Control<any>;
  memberId: string;
  relationship: string;
  note?: string;
  isCollapsible?: boolean;
  showNotApplicable?: boolean;
}

export const FamilyMemberSection: React.FC<FamilyMemberSectionProps> = ({
  control,
  memberId,
  relationship,
  note,
  isCollapsible = false,
  showNotApplicable = true,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(isCollapsible);

  // Watch the N/A checkbox
  const isNotApplicable = useWatch({
    control,
    name: `${memberId}.notApplicable`,
    defaultValue: false,
  });

  // Get the register function
  const registerProps = control.register(`${memberId}.notApplicable`);

  // Create prefixed field configs for this specific member
  const createMemberField = (baseField: FieldConfig): FieldConfig => ({
    ...baseField,
    name: `${memberId}.${baseField.name}`,
    // Make fields not required if N/A is checked
    required: isNotApplicable ? false : baseField.required,
  });

  const createMemberYesNoField = (
    baseField: RadioFieldConfig
  ): RadioFieldConfig => ({
    ...baseField,
    name: `${memberId}.${baseField.name}`,
  });

  // Pre-fill relationship field
  const relationshipField = createMemberField(
    FAMILY_MEMBER_BASE_FIELDS.relationship
  );

  // Watch member data for collapsed display
  const memberData = useWatch({
    control,
    name: memberId,
  });

  const getDisplayName = () => {
    if (memberData?.lastName && memberData?.givenNames) {
      return `${memberData.givenNames} ${memberData.lastName}`;
    }
    if (memberData?.lastName) {
      return memberData.lastName;
    }
    return "Not filled";
  };

  return (
    <Card className="relative border">
      <CardHeader className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {relationship}
              {isCollapsed && (
                <span className="text-sm font-normal text-muted-foreground">
                  - {getDisplayName()}
                </span>
              )}
            </CardTitle>
            {note && !isCollapsed && (
              <p className="text-sm text-muted-foreground mt-1">{note}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {/* N/A Checkbox - conditionally rendered */}
            {showNotApplicable && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${memberId}-na`}
                  checked={isNotApplicable}
                  onCheckedChange={(checked) => {
                    // Call the onChange from register to update the form
                    if (registerProps.onChange) {
                      registerProps.onChange({
                        target: {
                          name: `${memberId}.notApplicable`,
                          value: checked,
                          checked: checked as boolean,
                        },
                        type: "change",
                      } as any);
                    }
                  }}
                />
                <input type="checkbox" {...registerProps} className="sr-only" />
                <Label
                  htmlFor={`${memberId}-na`}
                  className="text-sm font-medium cursor-pointer"
                >
                  Not Applicable
                </Label>
              </div>
            )}

            {/* Collapse toggle for additional members */}
            {isCollapsible && (
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-sm text-primary hover:underline"
              >
                {isCollapsed ? "Expand" : "Collapse"}
              </button>
            )}
          </div>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="space-y-4 px-4">
          {isNotApplicable ? (
            <div className="p-4 bg-muted rounded-md text-center text-muted-foreground">
              This section is marked as Not Applicable
            </div>
          ) : (
            <>
              {/* Relationship - Pre-filled and readonly */}
              <input
                type="hidden"
                {...control.register(`${memberId}.relationship`)}
                value={relationship}
              />

              {/* Last Name */}
              <FormField
                config={createMemberField(FAMILY_MEMBER_BASE_FIELDS.lastName)}
                control={control}
              />

              {/* Given Names */}
              <FormField
                config={createMemberField(FAMILY_MEMBER_BASE_FIELDS.givenNames)}
                control={control}
              />

              {/* Family Name at Birth */}
              <FormField
                config={createMemberField(
                  FAMILY_MEMBER_BASE_FIELDS.familyNameAtBirth
                )}
                control={control}
              />

              {/* Marital Status */}
              <FormField
                config={createMemberField(
                  FAMILY_MEMBER_BASE_FIELDS.maritalStatus
                )}
                control={control}
              />

              {/* Date of Birth */}
              <FormField
                config={createMemberField(
                  FAMILY_MEMBER_BASE_FIELDS.dateOfBirth
                )}
                control={control}
              />

              {/* Town/City of Birth */}
              <FormField
                config={createMemberField(
                  FAMILY_MEMBER_BASE_FIELDS.townCityOfBirth
                )}
                control={control}
              />

              {/* Country of Birth */}
              <FormField
                config={createMemberField(
                  FAMILY_MEMBER_BASE_FIELDS.countryOfBirth
                )}
                control={control}
              />

              {/* Date of Death (optional) */}
              <FormField
                config={createMemberField(
                  FAMILY_MEMBER_BASE_FIELDS.dateOfDeath
                )}
                control={control}
              />

              {/* Residence Address */}
              <FormField
                config={createMemberField(
                  FAMILY_MEMBER_BASE_FIELDS.residenceAddress
                )}
                control={control}
              />

              {/* Occupation */}
              <FormField
                config={createMemberField(FAMILY_MEMBER_BASE_FIELDS.occupation)}
                control={control}
              />

              {/* Accompany to UK */}
              <YesNoField
                config={createMemberYesNoField({
                  name: "accompanyToUK",
                  label: "Will this family member accompany you to the UK?",
                  description: "Select Yes or No",
                  type: "radio",
                  options: ["Yes", "No"],
                })}
                control={control}
              />
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};
