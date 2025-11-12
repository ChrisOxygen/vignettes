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
import { TravelEntrySection } from "../TravelEntrySection";
import { useFormProvider } from "../../context/FormProviders";

export const PreviousTravelForm: React.FC = () => {
  const { form, isFormLocked, isInitialized, initializeForm, onSubmit } =
    useFormProvider();

  // Initialize form on mount
  React.useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

  // useFieldArray for travel history
  const {
    fields: travelHistory,
    append: appendTravelEntry,
    remove: removeTravelEntry,
  } = useFieldArray({
    control: form.control,
    name: "travelHistory",
  });

  // Watch for section-level N/A checkbox
  const travelHistoryNA = useWatch({
    control: form.control,
    name: "travelHistoryNA",
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
        <CardTitle>Previous Travel Information Form</CardTitle>
        <CardDescription>
          Provide details about your travel history outside your country of
          origin or residence in the last 10 years (or since your 18th birthday
          if less than 10 years ago). List all trips including tourism,
          business, training, conferences, etc. Start with the most recent
          travel. Check "Not Applicable" if you have not traveled.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <form
          id="previous-travel-info-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Travel History Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Travel History
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all international travel in the last 10 years (or since age
                18 if less than 10 years). Include all trips regardless of
                purpose or duration. Check "Not Applicable" if you have not
                traveled outside your country of origin or residence during this
                period.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">International Travel</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="travelHistoryNA"
                    checked={travelHistoryNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("travelHistoryNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("travelHistoryNA")}
                    className="sr-only"
                  />
                  <Label
                    htmlFor="travelHistoryNA"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Not Applicable
                  </Label>
                </div>
              </div>

              {!travelHistoryNA && (
                <>
                  <div className="space-y-4">
                    {travelHistory.map((field, index) => (
                      <div key={field.id} className="relative">
                        <TravelEntrySection
                          control={form.control}
                          entryId={`travelHistory.${index}`}
                          entryNumber={`Travel Entry #${index + 1}`}
                          isCollapsible={index > 0}
                        />
                        {travelHistory.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeTravelEntry(index)}
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
                      appendTravelEntry({
                        fromDate: "",
                        toDate: "",
                        lengthOfStay: "",
                        destination: "",
                        purposeOfTravel: "",
                        residentAddress: "",
                        familyMembers: "",
                      })
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Travel Entry
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
