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
import { EducationEntrySection } from "../EducationEntrySection";
import { useFormProvider } from "../../context/FormProviders";

export const EducationInfoForm: React.FC = () => {
  const { form, isFormLocked, isInitialized, initializeForm, onSubmit } =
    useFormProvider();

  // Initialize form on mount
  React.useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

  // useFieldArray for 4 education levels
  const {
    fields: elementaryPrimary,
    append: appendElementaryPrimary,
    remove: removeElementaryPrimary,
  } = useFieldArray({
    control: form.control,
    name: "elementaryPrimary",
  });

  const {
    fields: secondaryHighSchool,
    append: appendSecondaryHighSchool,
    remove: removeSecondaryHighSchool,
  } = useFieldArray({
    control: form.control,
    name: "secondaryHighSchool",
  });

  const {
    fields: universityCollege,
    append: appendUniversityCollege,
    remove: removeUniversityCollege,
  } = useFieldArray({
    control: form.control,
    name: "universityCollege",
  });

  const {
    fields: tradeSchoolOther,
    append: appendTradeSchoolOther,
    remove: removeTradeSchoolOther,
  } = useFieldArray({
    control: form.control,
    name: "tradeSchoolOther",
  });

  // Watch for section-level N/A checkboxes
  const elementaryPrimaryNA = useWatch({
    control: form.control,
    name: "elementaryPrimaryNA",
  });

  const secondaryHighSchoolNA = useWatch({
    control: form.control,
    name: "secondaryHighSchoolNA",
  });

  const universityCollegeNA = useWatch({
    control: form.control,
    name: "universityCollegeNA",
  });

  const tradeSchoolOtherNA = useWatch({
    control: form.control,
    name: "tradeSchoolOtherNA",
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
        <CardTitle>Education Information Form</CardTitle>
        <CardDescription>
          Provide details about your education history. Include all schools
          attended from elementary through post-secondary education. Check "Not
          Applicable" for any education level you did not attend.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <form
          id="education-info-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Elementary/Primary School Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Elementary/Primary School
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all elementary or primary schools you attended. Check "Not
                Applicable" if you did not attend elementary/primary school.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Elementary/Primary Education
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="elementaryPrimaryNA"
                    checked={elementaryPrimaryNA}
                    onCheckedChange={(checked) => {
                      form.setValue("elementaryPrimaryNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("elementaryPrimaryNA")}
                    className="sr-only"
                  />
                  <Label
                    htmlFor="elementaryPrimaryNA"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Not Applicable
                  </Label>
                </div>
              </div>

              {!elementaryPrimaryNA && (
                <>
                  <div className="space-y-4">
                    {elementaryPrimary.map((field, index) => (
                      <div key={field.id} className="relative">
                        <EducationEntrySection
                          control={form.control}
                          entryId={`elementaryPrimary.${index}`}
                          entryNumber={`Elementary/Primary School #${index + 1}`}
                          isCollapsible={index > 0}
                        />
                        {elementaryPrimary.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeElementaryPrimary(index)}
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
                      appendElementaryPrimary({
                        fromDate: "",
                        toDate: "",
                        schoolName: "",
                        cityTownRegion: "",
                        countryTerritory: "",
                        programFieldOfStudy: "",
                        degreeLevel: "",
                      })
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Elementary/Primary School
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Secondary/High School Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Secondary/High School
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all secondary or high schools you attended. Check "Not
                Applicable" if you did not attend secondary/high school.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Secondary/High School Education
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="secondaryHighSchoolNA"
                    checked={secondaryHighSchoolNA}
                    onCheckedChange={(checked) => {
                      form.setValue(
                        "secondaryHighSchoolNA",
                        checked as boolean
                      );
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("secondaryHighSchoolNA")}
                    className="sr-only"
                  />
                  <Label
                    htmlFor="secondaryHighSchoolNA"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Not Applicable
                  </Label>
                </div>
              </div>

              {!secondaryHighSchoolNA && (
                <>
                  <div className="space-y-4">
                    {secondaryHighSchool.map((field, index) => (
                      <div key={field.id} className="relative">
                        <EducationEntrySection
                          control={form.control}
                          entryId={`secondaryHighSchool.${index}`}
                          entryNumber={`Secondary/High School #${index + 1}`}
                          isCollapsible={index > 0}
                        />
                        {secondaryHighSchool.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeSecondaryHighSchool(index)}
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
                      appendSecondaryHighSchool({
                        fromDate: "",
                        toDate: "",
                        schoolName: "",
                        cityTownRegion: "",
                        countryTerritory: "",
                        programFieldOfStudy: "",
                        degreeLevel: "",
                      })
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Secondary/High School
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* University/College Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                University/College
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all universities or colleges you attended or are currently
                attending. Check "Not Applicable" if you did not attend
                university/college.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  University/College Education
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="universityCollegeNA"
                    checked={universityCollegeNA}
                    onCheckedChange={(checked) => {
                      form.setValue("universityCollegeNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("universityCollegeNA")}
                    className="sr-only"
                  />
                  <Label
                    htmlFor="universityCollegeNA"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Not Applicable
                  </Label>
                </div>
              </div>

              {!universityCollegeNA && (
                <>
                  <div className="space-y-4">
                    {universityCollege.map((field, index) => (
                      <div key={field.id} className="relative">
                        <EducationEntrySection
                          control={form.control}
                          entryId={`universityCollege.${index}`}
                          entryNumber={`University/College #${index + 1}`}
                          isCollapsible={index > 0}
                        />
                        {universityCollege.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeUniversityCollege(index)}
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
                      appendUniversityCollege({
                        fromDate: "",
                        toDate: "",
                        schoolName: "",
                        cityTownRegion: "",
                        countryTerritory: "",
                        programFieldOfStudy: "",
                        degreeLevel: "",
                      })
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another University/College
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Trade School/Other Post-Secondary Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Trade School or Other Post-Secondary Education
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all trade schools, vocational schools, or other
                post-secondary education including apprenticeships. Check "Not
                Applicable" if you did not attend any trade school or other
                post-secondary education.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Trade School/Other Education
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tradeSchoolOtherNA"
                    checked={tradeSchoolOtherNA}
                    onCheckedChange={(checked) => {
                      form.setValue("tradeSchoolOtherNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("tradeSchoolOtherNA")}
                    className="sr-only"
                  />
                  <Label
                    htmlFor="tradeSchoolOtherNA"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Not Applicable
                  </Label>
                </div>
              </div>

              {!tradeSchoolOtherNA && (
                <>
                  <div className="space-y-4">
                    {tradeSchoolOther.map((field, index) => (
                      <div key={field.id} className="relative">
                        <EducationEntrySection
                          control={form.control}
                          entryId={`tradeSchoolOther.${index}`}
                          entryNumber={`Trade School/Other #${index + 1}`}
                          isCollapsible={index > 0}
                        />
                        {tradeSchoolOther.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeTradeSchoolOther(index)}
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
                      appendTradeSchoolOther({
                        fromDate: "",
                        toDate: "",
                        schoolName: "",
                        cityTownRegion: "",
                        countryTerritory: "",
                        programFieldOfStudy: "",
                        degreeLevel: "",
                      })
                    }
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Trade School/Other Institution
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
