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
import { Separator } from "@/shared/components/ui/separator";
import { PlusCircle, Trash2 } from "lucide-react";
import { RelativeAbroadSection } from "../RelativeAbroadSection";
import { useFormProvider } from "../../context/FormProviders";

export const RelativesAbroadForm: React.FC = () => {
  const { form, isFormLocked, isInitialized, initializeForm, onSubmit } =
    useFormProvider();

  // Initialize form on mount
  React.useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

  // useFieldArray for relatives in UK
  const {
    fields: relativesInUK,
    append: appendRelative,
    remove: removeRelative,
  } = useFieldArray({
    control: form.control,
    name: "relativesInUK",
  });

  // Watch for section-level N/A checkbox
  const relativesInUKNA = useWatch({
    control: form.control,
    name: "relativesInUKNA",
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
        <CardTitle>Relatives Abroad Information Form</CardTitle>
        <CardDescription>
          Provide information about relatives living in the UK. Check "Not
          Applicable" if you don&apos;t have any relatives in the UK.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <form
          id="relatives-abroad-info-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Relatives in UK Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Relatives in the UK
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all your relatives currently living in the UK. Check "Not
                Applicable" if you don&apos;t have any.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Relatives in UK</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="relativesInUKNA"
                    checked={relativesInUKNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("relativesInUKNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("relativesInUKNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="relativesInUKNA">Not Applicable</Label>
                </div>
              </div>
              {!relativesInUKNA && (
                <>
                  {relativesInUK.map((field, index) => (
                    <div key={field.id} className="relative">
                      <RelativeAbroadSection
                        control={form.control}
                        memberId={`relativesInUK.${index}`}
                        relationship={`Relative #${index + 1}`}
                        isCollapsible
                      />
                      {relativesInUK.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRelative(index)}
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
                      appendRelative({
                        relationship: "",
                        lastName: "",
                        givenNames: "",
                        familyNameAtBirth: "",
                        countryOfBirth: "",
                        immigrationStatusAbroad: "",
                        residenceAddress: "",
                        occupation: "",
                      })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Relative
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
