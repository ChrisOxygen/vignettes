"use client";

import { useEffect } from "react";
import { useForm } from "@/features/user/form/context";
import { FORM_CONSTANTS } from "@/shared/constants";
import { FormType } from "@prisma/client";

export function FamilyMembersInfoForm() {
  const { initializeForm, state } = useForm();

  useEffect(() => {
    initializeForm(FormType.FAMILY_MEMBERS_INFO);
  }, [initializeForm]);

  const formConfig = FORM_CONSTANTS.FAMILY_MEMBERS_INFO as any;
  const fieldTitles = formConfig?.fields
    ? Object.entries(formConfig.fields).map(([key, field]: [string, any]) => ({
        key,
        title: field.title,
        isRequired: field.isRequired,
        conditionalFields: field.conditionalFields,
      }))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Family Members Information
        </h1>
        <p className="text-muted-foreground">
          Enter details about your family members.
        </p>
      </div>

      {/* Form fields list */}
      <div className="space-y-4">
        {fieldTitles.length > 0 ? (
          <>
            <h2 className="text-lg font-semibold">
              Form Fields ({fieldTitles.length} fields)
            </h2>
            <div className="grid gap-2">
              {fieldTitles.map(
                ({ key, title, isRequired, conditionalFields }) => (
                  <div
                    key={key}
                    className="p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{title}</span>
                      <div className="flex gap-2">
                        {isRequired && (
                          <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
                            Required
                          </span>
                        )}
                        {conditionalFields && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Conditional
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Form fields not yet configured for this form type.</p>
            <p className="text-sm mt-2">
              Add field definitions to FORM_CONSTANTS.FAMILY_MEMBERS_INFO
            </p>
          </div>
        )}
      </div>

      {/* Debug info */}
      <div className="text-xs text-muted-foreground">
        Form Type: {state.formType} | Fields:{" "}
        {Object.keys(state.formData).length} | Dirty:{" "}
        {state.isDirty ? "Yes" : "No"} | Valid: {state.isValid ? "Yes" : "No"}
      </div>
    </div>
  );
}
