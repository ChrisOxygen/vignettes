"use client";

import * as React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { VisaPermitEntrySection } from "../VisaPermitEntrySection";
import { useFormProvider } from "../../context/FormProviders";

export const VisaPermitForm: React.FC = () => {
  const { form, isFormLocked, isInitialized, initializeForm, onSubmit } =
    useFormProvider();

  // Initialize form on mount
  React.useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

  // useFieldArray for visa/permit history
  const {
    fields: visaPermitHistory,
    append: appendVisaPermitEntry,
    remove: removeVisaPermitEntry,
  } = useFieldArray({
    control: form.control,
    name: "visaPermitHistory",
  });

  // Watch for section-level N/A checkbox
  const visaPermitHistoryNA = useWatch({
    control: form.control,
    name: "visaPermitHistoryNA",
  });

  if (!isInitialized) {
    return (
      <Card className="w-full border-0">
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0">
      <CardHeader className="px-0">
        <CardTitle>Visa & Permits Information Form</CardTitle>
        <CardDescription>
          Provide details about all visa and permit applications you have made
          to any country in the last 10 years (or since your 18th birthday if
          less than 10 years ago). Include ALL applications regardless of
          outcome: Approved, Granted, Refused, Rejected, Denied,
          Ongoing/Pending, Withdrawn, or Cancelled. Start with the most recent
          applications. Check "Not Applicable" if you have not applied for any
          visa or permit.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <form
          id="visa-and-permits-info-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Visa/Permit History Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Visa & Permit Application History
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all visa and permit applications in the last 10 years (or
                since age 18 if less than 10 years). <strong>IMPORTANT:</strong>{" "}
                Include all applications regardless of outcome - approved,
                refused, rejected, denied, ongoing, withdrawn, or cancelled.
                Failure to disclose refusals or denials may result in automatic
                rejection. Check "Not Applicable" if you have not applied for
                any visa or permit during this period.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Visa/Permit Applications
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="visaPermitHistoryNA"
                    checked={visaPermitHistoryNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("visaPermitHistoryNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("visaPermitHistoryNA")}
                    className="sr-only"
                  />
                  <Label
                    htmlFor="visaPermitHistoryNA"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Not Applicable
                  </Label>
                </div>
              </div>

              {!visaPermitHistoryNA && (
                <>
                  <div className="space-y-4">
                    {visaPermitHistory.map((field, index) => (
                      <div key={field.id} className="relative">
                        <VisaPermitEntrySection
                          control={form.control}
                          entryId={`visaPermitHistory.${index}`}
                          entryNumber={`Visa/Permit Application #${index + 1}`}
                          isCollapsible={index > 0}
                        />
                        {visaPermitHistory.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeVisaPermitEntry(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      appendVisaPermitEntry({
                        countryAppliedTo: "",
                        applicationDate: "",
                        visaPermitType: "",
                        applicationOutcome: "",
                        outcomeDate: "",
                        familyMembers: "",
                      })
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Visa/Permit Application
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
