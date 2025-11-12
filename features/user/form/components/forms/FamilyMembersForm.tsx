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
import { FamilyMemberSection } from "../FamilyMemberSection";
import { useFormProvider } from "../../context/FormProviders";
import { toast } from "sonner";
import { FormStatus } from "@prisma/client";

export const FamilyMembersForm: React.FC = () => {
  const {
    form,
    isFormLocked,
    isInitialized,
    initializeForm,
    onSubmit,
    submissionStatus,
  } = useFormProvider();
  const hasShownToast = React.useRef(false);

  // Initialize form on component mount
  React.useEffect(() => {
    if (!isInitialized) {
      initializeForm();
    }
  }, [isInitialized, initializeForm]);

  // Show toast when form is locked
  React.useEffect(() => {
    if (isInitialized && isFormLocked && !hasShownToast.current) {
      hasShownToast.current = true;

      let message = "";
      if (submissionStatus === FormStatus.APPROVED) {
        message = "This form has been approved and cannot be modified.";
      } else if (submissionStatus === FormStatus.UNDER_REVIEW) {
        message = "This form is currently being reviewed by the admin.";
      } else if (submissionStatus === FormStatus.SUBMITTED) {
        message = "This form has been submitted and is awaiting admin review.";
      }

      if (message) {
        toast.info("Form Locked", {
          description: message,
        });
      }
    }
  }, [isInitialized, isFormLocked, submissionStatus]);

  // Dynamic arrays for all family member types
  const {
    fields: biologicalSons,
    append: appendBiologicalSon,
    remove: removeBiologicalSon,
  } = useFieldArray({
    control: form.control,
    name: "biologicalSons",
  });

  const {
    fields: biologicalDaughters,
    append: appendBiologicalDaughter,
    remove: removeBiologicalDaughter,
  } = useFieldArray({
    control: form.control,
    name: "biologicalDaughters",
  });

  const {
    fields: stepSons,
    append: appendStepSon,
    remove: removeStepSon,
  } = useFieldArray({
    control: form.control,
    name: "stepSons",
  });

  const {
    fields: stepDaughters,
    append: appendStepDaughter,
    remove: removeStepDaughter,
  } = useFieldArray({
    control: form.control,
    name: "stepDaughters",
  });

  const {
    fields: adoptedSons,
    append: appendAdoptedSon,
    remove: removeAdoptedSon,
  } = useFieldArray({
    control: form.control,
    name: "adoptedSons",
  });

  const {
    fields: adoptedDaughters,
    append: appendAdoptedDaughter,
    remove: removeAdoptedDaughter,
  } = useFieldArray({
    control: form.control,
    name: "adoptedDaughters",
  });

  const {
    fields: brothers,
    append: appendBrother,
    remove: removeBrother,
  } = useFieldArray({
    control: form.control,
    name: "brothers",
  });

  const {
    fields: sisters,
    append: appendSister,
    remove: removeSister,
  } = useFieldArray({
    control: form.control,
    name: "sisters",
  });

  // Watch for section-level N/A checkboxes
  const biologicalSonsNA = useWatch({
    control: form.control,
    name: "biologicalSonsNA",
  });
  const biologicalDaughtersNA = useWatch({
    control: form.control,
    name: "biologicalDaughtersNA",
  });
  const stepSonsNA = useWatch({
    control: form.control,
    name: "stepSonsNA",
  });
  const stepDaughtersNA = useWatch({
    control: form.control,
    name: "stepDaughtersNA",
  });
  const adoptedSonsNA = useWatch({
    control: form.control,
    name: "adoptedSonsNA",
  });
  const adoptedDaughtersNA = useWatch({
    control: form.control,
    name: "adoptedDaughtersNA",
  });
  const brothersNA = useWatch({
    control: form.control,
    name: "brothersNA",
  });
  const sistersNA = useWatch({
    control: form.control,
    name: "sistersNA",
  });

  return (
    <Card className="w-full border-0">
      <CardHeader className="px-0">
        <CardTitle>Family Members Information Form</CardTitle>
        <CardDescription>
          Please provide detailed information about your family members. Check
          "Not Applicable" for any section that doesn&apos;t apply to you. All
          required members must be completed or marked as N/A.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form
          id="family-members-info-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Required Family Members */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Required Family Members
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Provide information for your father, mother, spouse, and
                ex-spouse (if applicable). Check "Not Applicable" for any that
                don&apos;t apply.
              </p>
            </div>

            <FamilyMemberSection
              control={form.control}
              memberId="father"
              relationship="Father"
              showNotApplicable={false}
            />
            <FamilyMemberSection
              control={form.control}
              memberId="mother"
              relationship="Mother"
              showNotApplicable={false}
            />
            <FamilyMemberSection
              control={form.control}
              memberId="spouse"
              relationship="Spouse"
            />
            <FamilyMemberSection
              control={form.control}
              memberId="exSpouse"
              relationship="Ex-Spouse"
            />
          </div>

          <Separator />

          {/* Biological Children */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Biological Children
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List your biological sons and daughters. Check "Not Applicable"
                if you don&apos;t have any.
              </p>
            </div>

            {/* Biological Sons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-lg font-medium">Biological Sons</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="biologicalSonsNA"
                    checked={biologicalSonsNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      const registerProps =
                        form.control.register("biologicalSonsNA");
                      if (registerProps.onChange) {
                        registerProps.onChange({
                          target: {
                            name: "biologicalSonsNA",
                            value: checked,
                            checked: checked as boolean,
                          },
                          type: "change",
                        } as any);
                      }
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("biologicalSonsNA")}
                    className="sr-only"
                  />
                  <Label
                    htmlFor="biologicalSonsNA"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Not Applicable
                  </Label>
                </div>
              </div>

              {!biologicalSonsNA && (
                <>
                  {biologicalSons.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FamilyMemberSection
                        control={form.control}
                        memberId={`biologicalSons.${index}`}
                        relationship={`Biological Son #${index + 1}`}
                        isCollapsible
                        showNotApplicable={false}
                      />
                      {biologicalSons.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBiologicalSon(index)}
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
                      appendBiologicalSon({
                        relationship: "",
                        notApplicable: false,
                      })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Son
                  </Button>
                </>
              )}
            </div>

            {/* Biological Daughters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Biological Daughters</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="biologicalDaughtersNA"
                    checked={biologicalDaughtersNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue(
                        "biologicalDaughtersNA",
                        checked as boolean
                      );
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("biologicalDaughtersNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="biologicalDaughtersNA">Not Applicable</Label>
                </div>
              </div>
              {!biologicalDaughtersNA && (
                <>
                  {biologicalDaughters.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FamilyMemberSection
                        control={form.control}
                        memberId={`biologicalDaughters.${index}`}
                        relationship={`Biological Daughter #${index + 1}`}
                        isCollapsible
                        showNotApplicable={false}
                      />
                      {biologicalDaughters.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBiologicalDaughter(index)}
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
                      appendBiologicalDaughter({
                        relationship: "",
                        notApplicable: false,
                      })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Daughter
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Step Children */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Step Children
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List your step sons and step daughters. Check "Not Applicable"
                if you don&apos;t have any.
              </p>
            </div>

            {/* Step Sons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Step Sons</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stepSonsNA"
                    checked={stepSonsNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("stepSonsNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("stepSonsNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="stepSonsNA">Not Applicable</Label>
                </div>
              </div>
              {!stepSonsNA && (
                <>
                  {stepSons.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FamilyMemberSection
                        control={form.control}
                        memberId={`stepSons.${index}`}
                        relationship={`Step Son #${index + 1}`}
                        isCollapsible
                        showNotApplicable={false}
                      />
                      {stepSons.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStepSon(index)}
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
                      appendStepSon({ relationship: "", notApplicable: false })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Step Son
                  </Button>
                </>
              )}
            </div>

            {/* Step Daughters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Step Daughters</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stepDaughtersNA"
                    checked={stepDaughtersNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("stepDaughtersNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("stepDaughtersNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="stepDaughtersNA">Not Applicable</Label>
                </div>
              </div>
              {!stepDaughtersNA && (
                <>
                  {stepDaughters.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FamilyMemberSection
                        control={form.control}
                        memberId={`stepDaughters.${index}`}
                        relationship={`Step Daughter #${index + 1}`}
                        isCollapsible
                        showNotApplicable={false}
                      />
                      {stepDaughters.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStepDaughter(index)}
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
                      appendStepDaughter({
                        relationship: "",
                        notApplicable: false,
                      })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Step Daughter
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Adopted Children */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Adopted Children
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List your adopted sons and daughters. Check "Not Applicable" if
                you don&apos;t have any.
              </p>
            </div>

            {/* Adopted Sons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Adopted Sons</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adoptedSonsNA"
                    checked={adoptedSonsNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("adoptedSonsNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("adoptedSonsNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="adoptedSonsNA">Not Applicable</Label>
                </div>
              </div>
              {!adoptedSonsNA && (
                <>
                  {adoptedSons.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FamilyMemberSection
                        control={form.control}
                        memberId={`adoptedSons.${index}`}
                        relationship={`Adopted Son #${index + 1}`}
                        isCollapsible
                        showNotApplicable={false}
                      />
                      {adoptedSons.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAdoptedSon(index)}
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
                      appendAdoptedSon({
                        relationship: "",
                        notApplicable: false,
                      })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Adopted Son
                  </Button>
                </>
              )}
            </div>

            {/* Adopted Daughters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Adopted Daughters</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adoptedDaughtersNA"
                    checked={adoptedDaughtersNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("adoptedDaughtersNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("adoptedDaughtersNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="adoptedDaughtersNA">Not Applicable</Label>
                </div>
              </div>
              {!adoptedDaughtersNA && (
                <>
                  {adoptedDaughters.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FamilyMemberSection
                        control={form.control}
                        memberId={`adoptedDaughters.${index}`}
                        relationship={`Adopted Daughter #${index + 1}`}
                        isCollapsible
                        showNotApplicable={false}
                      />
                      {adoptedDaughters.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAdoptedDaughter(index)}
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
                      appendAdoptedDaughter({
                        relationship: "",
                        notApplicable: false,
                      })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Adopted Daughter
                  </Button>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Siblings */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Brothers and Sisters
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all your brothers and sisters. Check "Not Applicable" if
                you don&apos;t have any.
              </p>
            </div>

            {/* Brothers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Brothers</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="brothersNA"
                    checked={brothersNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("brothersNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("brothersNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="brothersNA">Not Applicable</Label>
                </div>
              </div>
              {!brothersNA && (
                <>
                  {brothers.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FamilyMemberSection
                        control={form.control}
                        memberId={`brothers.${index}`}
                        relationship={`Brother #${index + 1}`}
                        isCollapsible
                        showNotApplicable={false}
                      />
                      {brothers.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBrother(index)}
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
                      appendBrother({ relationship: "", notApplicable: false })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Brother
                  </Button>
                </>
              )}
            </div>

            {/* Sisters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Sisters</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sistersNA"
                    checked={sistersNA}
                    disabled={isFormLocked}
                    onCheckedChange={(checked) => {
                      form.setValue("sistersNA", checked as boolean);
                    }}
                  />
                  <input
                    type="checkbox"
                    {...form.control.register("sistersNA")}
                    className="sr-only"
                  />
                  <Label htmlFor="sistersNA">Not Applicable</Label>
                </div>
              </div>
              {!sistersNA && (
                <>
                  {sisters.map((field, index) => (
                    <div key={field.id} className="relative">
                      <FamilyMemberSection
                        control={form.control}
                        memberId={`sisters.${index}`}
                        relationship={`Sister #${index + 1}`}
                        isCollapsible
                        showNotApplicable={false}
                      />
                      {sisters.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSister(index)}
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
                      appendSister({ relationship: "", notApplicable: false })
                    }
                    className="w-full"
                    disabled={isFormLocked}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Sister
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
