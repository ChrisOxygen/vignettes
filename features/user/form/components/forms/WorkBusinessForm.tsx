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
import { WorkEntrySection } from "../WorkEntrySection";
import { useFormProvider } from "../../context/FormProviders";

export const WorkBusinessForm: React.FC = () => {
  const { form, isFormLocked, isInitialized, initializeForm, onSubmit } =
    useFormProvider();

  // Initialize form on mount
  React.useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

  // useFieldArray for work history
  const {
    fields: workHistory,
    append: appendWorkEntry,
    remove: removeWorkEntry,
  } = useFieldArray({
    control: form.control,
    name: "workHistory",
  });

  // Watch for section-level N/A checkbox
  const workHistoryNA = useWatch({
    control: form.control,
    name: "workHistoryNA",
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
        <CardTitle>Work & Business Information Form</CardTitle>
        <CardDescription>
          Provide information about your work and business experience since age
          18 or in the past 10 years. Check "Not Applicable" if you have no work
          experience.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <form
          id="work-and-business-info-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Work History Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Work & Business History
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all your work and business experience starting with the
                most recent. Include all employment, business, government
                positions. Do not leave gaps in your employment history. Check
                "Not Applicable" if you have no work experience.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Employment History</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="workHistoryNA"
                    checked={workHistoryNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("workHistoryNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("workHistoryNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="workHistoryNA">Not Applicable</Label>
                </div>
              </div>
              {!workHistoryNA && (
                <>
                  {workHistory.map((field, index) => (
                    <div key={field.id} className="relative">
                      <WorkEntrySection
                        control={form.control}
                        entryId={`workHistory.${index}`}
                        entryNumber={`Employment #${index + 1}`}
                        isCollapsible
                      />
                      {workHistory.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWorkEntry(index)}
                          className="absolute top-4 right-4 z-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                          disabled={isFormLocked}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendWorkEntry({
                        fromDate: "",
                        toDate: "",
                        employerName: "",
                        cityCountry: "",
                        jobTitle: "",
                        employmentType: "",
                        employmentNature: "",
                        monthlyEarnings: "",
                        jobDescription: "",
                      })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Employment Entry
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
