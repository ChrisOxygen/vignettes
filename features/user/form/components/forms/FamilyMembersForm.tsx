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
import { Separator } from "@/shared/components/ui/separator";
import { PlusCircle, Trash2 } from "lucide-react";
import { FamilyMemberSection } from "../FamilyMemberSection";
import { YesNoField } from "../YesNoField";
import { useFormProvider } from "../../context/FormProviders";
import { toast } from "sonner";
import { FormStatus } from "@prisma/client";
import {
  CHILDREN_FLOW_QUESTIONS,
  SIBLINGS_FLOW_QUESTION,
} from "../../constants";

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

  // Dynamic siblings array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "siblings",
  });

  // Watch flow control questions - these return objects with { value, explanation }
  const hasAdditionalBiologicalSons = useWatch({
    control: form.control,
    name: "flow.hasAdditionalBiologicalSons.value",
  });
  const hasAdditionalBiologicalDaughters = useWatch({
    control: form.control,
    name: "flow.hasAdditionalBiologicalDaughters.value",
  });
  const hasAdditionalStepSons = useWatch({
    control: form.control,
    name: "flow.hasAdditionalStepSons.value",
  });
  const hasAdditionalStepDaughters = useWatch({
    control: form.control,
    name: "flow.hasAdditionalStepDaughters.value",
  });
  const hasAdditionalAdoptedSons = useWatch({
    control: form.control,
    name: "flow.hasAdditionalAdoptedSons.value",
  });
  const hasAdditionalAdoptedDaughters = useWatch({
    control: form.control,
    name: "flow.hasAdditionalAdoptedDaughters.value",
  });
  const hasBrothersOrSisters = useWatch({
    control: form.control,
    name: "flow.hasBrothersOrSisters.value",
  });

  const addSibling = () => {
    append({ relationship: "", notApplicable: false });
  };

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
            />
            <FamilyMemberSection
              control={form.control}
              memberId="mother"
              relationship="Mother"
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

            {/* First biological son */}
            <FamilyMemberSection
              control={form.control}
              memberId="son1Biological"
              relationship="Biological Son #1"
              isCollapsible
            />

            {/* Additional biological sons */}
            <YesNoField
              config={CHILDREN_FLOW_QUESTIONS.hasAdditionalBiologicalSons}
              control={form.control}
            />

            {hasAdditionalBiologicalSons === "Yes" && (
              <FamilyMemberSection
                control={form.control}
                memberId="son2Biological"
                relationship="Biological Son #2"
                isCollapsible
              />
            )}

            {/* First biological daughter */}
            <FamilyMemberSection
              control={form.control}
              memberId="daughter1Biological"
              relationship="Biological Daughter #1"
              isCollapsible
            />

            {/* Additional biological daughters */}
            <YesNoField
              config={CHILDREN_FLOW_QUESTIONS.hasAdditionalBiologicalDaughters}
              control={form.control}
            />

            {hasAdditionalBiologicalDaughters === "Yes" && (
              <FamilyMemberSection
                control={form.control}
                memberId="daughter2Biological"
                relationship="Biological Daughter #2"
                isCollapsible
              />
            )}
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

            {/* First step son */}
            <FamilyMemberSection
              control={form.control}
              memberId="stepSon1"
              relationship="Step Son #1"
              isCollapsible
            />

            {/* Additional step sons */}
            <YesNoField
              config={CHILDREN_FLOW_QUESTIONS.hasAdditionalStepSons}
              control={form.control}
            />

            {hasAdditionalStepSons === "Yes" && (
              <FamilyMemberSection
                control={form.control}
                memberId="stepSon2"
                relationship="Step Son #2"
                isCollapsible
              />
            )}

            {/* First step daughter */}
            <FamilyMemberSection
              control={form.control}
              memberId="stepDaughter1"
              relationship="Step Daughter #1"
              isCollapsible
            />

            {/* Additional step daughters */}
            <YesNoField
              config={CHILDREN_FLOW_QUESTIONS.hasAdditionalStepDaughters}
              control={form.control}
            />

            {hasAdditionalStepDaughters === "Yes" && (
              <FamilyMemberSection
                control={form.control}
                memberId="stepDaughter2"
                relationship="Step Daughter #2"
                isCollapsible
              />
            )}
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

            {/* First adopted son */}
            <FamilyMemberSection
              control={form.control}
              memberId="son1Adopted"
              relationship="Adopted Son #1"
              isCollapsible
            />

            {/* Additional adopted sons */}
            <YesNoField
              config={CHILDREN_FLOW_QUESTIONS.hasAdditionalAdoptedSons}
              control={form.control}
            />

            {hasAdditionalAdoptedSons === "Yes" && (
              <FamilyMemberSection
                control={form.control}
                memberId="son2Adopted"
                relationship="Adopted Son #2"
                isCollapsible
              />
            )}

            {/* First adopted daughter */}
            <FamilyMemberSection
              control={form.control}
              memberId="daughter1Adopted"
              relationship="Adopted Daughter #1"
              isCollapsible
            />

            {/* Additional adopted daughters */}
            <YesNoField
              config={CHILDREN_FLOW_QUESTIONS.hasAdditionalAdoptedDaughters}
              control={form.control}
            />

            {hasAdditionalAdoptedDaughters === "Yes" && (
              <FamilyMemberSection
                control={form.control}
                memberId="daughter2Adopted"
                relationship="Adopted Daughter #2"
                isCollapsible
              />
            )}
          </div>

          <Separator />

          {/* Siblings */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Brothers and Sisters
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                List all your brothers and sisters. You can add as many as
                needed.
              </p>
            </div>

            <YesNoField
              config={SIBLINGS_FLOW_QUESTION}
              control={form.control}
            />

            {hasBrothersOrSisters === "Yes" && (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="relative">
                    <FamilyMemberSection
                      control={form.control}
                      memberId={`siblings.${index}`}
                      relationship={`Brother/Sister #${index + 1}`}
                      isCollapsible
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="absolute top-4 right-16 text-destructive hover:text-destructive hover:bg-destructive/10"
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
                  onClick={addSibling}
                  className="w-full"
                  disabled={isFormLocked}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Another Brother/Sister
                </Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
