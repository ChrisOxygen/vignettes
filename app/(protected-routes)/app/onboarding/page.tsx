"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { Label } from "@/shared/components/ui/label";
import {
  CheckCircle,
  User,
  Calendar,
  Phone,
  FileText,
  Globe,
  Lock,
} from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { useOnboarding } from "@/features/onboarding/context";
import {
  CountrySelect,
  DatePicker,
  TextInput,
} from "@/features/onboarding/components";
import { useCreateBasicApplicantData } from "@/features/onboarding/hooks";

import { useRouter } from "next/navigation";

function OnboardingPage() {
  const router = useRouter();
  const {
    state: { formData, errors },
    resetForm,
    validateFormData,
    clearFormDataFromStorage,
    hasTouchedFields,
  } = useOnboarding();

  const { mutate: createProfile, isPending: isCreatingProfile } =
    useCreateBasicApplicantData({
      onSuccess: (data) => {
        console.log("Profile created successfully:", data);
        clearFormDataFromStorage();
        router.push("/app?newUser=true");
      },
      onError: (error) => {
        console.error("Error creating profile:", error);
      },
    });

  // Submit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use Zod validator from context
    const validationResult = validateFormData();
    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.errors);
      return;
    }

    console.log("Form submitted with data:", validationResult.data);
    createProfile(validationResult.data!);
  };

  // Reset form function
  const handleEditProfile = () => {
    resetForm();
  };

  return (
    <main className="h-screen  bg-gradient-to-b from-background to-muted/20">
      <ScrollArea className=" p-6 h-screen shadow-lg">
        <div className="max-w-4xl flex flex-col gap-10 mx-auto">
          {/* Header Section */}
          <div className="text-center mt-10 space-y-4">
            <h1 className="scroll-m-20 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Let's Get Your Profile Started
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We need a few essential details to create your migration profile.
              This information will be used across all your visa applications,
              so you'll only need to enter it once.
            </p>
          </div>

          {/* Security Reassurance Section */}
          <Card className="border-muted-foreground/20 bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 bg-primary/10 text-primary border-primary/20"
                >
                  <Lock className="w-3.5 h-3.5 mr-2" />
                  Your data is secure and confidential
                </Badge>

                <div className="flex items-start justify-center gap-3 max-w-2xl mx-auto">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We use bank-level encryption to protect your personal
                    information. Your details will only be shared with
                    authorized admins reviewing your applications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Form Card */}
          <Card className=" mb-12 border-primary/20">
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl md:text-3xl font-bold flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <User className="w-7 h-7 text-primary" />
                Your Basic Information
              </CardTitle>
              <p className="text-muted-foreground">
                All fields are required. Make sure your details match your
                official documents exactly—especially your passport.
              </p>
              <Separator />
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Legal Name */}
                <div className="space-y-2">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Legal Name
                  </Label>
                  <TextInput
                    field="fullLegalName"
                    placeholder="John Michael Smith"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter your name exactly as it appears on your passport
                  </p>
                  {errors.fullLegalName && (
                    <p className="text-sm text-destructive">
                      {errors.fullLegalName}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Current Country of Residence */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Current Country of Residence
                    </Label>
                    <CountrySelect
                      field="currentCountryOfResidence"
                      placeholder="Select your current country..."
                    />
                    <p className="text-sm text-muted-foreground">
                      The country where you currently live
                    </p>
                    {errors.currentCountryOfResidence && (
                      <p className="text-sm text-destructive">
                        {errors.currentCountryOfResidence}
                      </p>
                    )}
                  </div>

                  {/* Nationality */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Nationality
                    </Label>
                    <CountrySelect
                      field="nationality"
                      placeholder="Select your nationality..."
                    />
                    <p className="text-sm text-muted-foreground">
                      Your citizenship/country of passport
                    </p>
                    {errors.nationality && (
                      <p className="text-sm text-destructive">
                        {errors.nationality}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </Label>
                    <DatePicker
                      field="dateOfBirth"
                      placeholder="Select your date of birth..."
                    />
                    <p className="text-sm text-muted-foreground">
                      Select from calendar
                    </p>
                    {errors.dateOfBirth && (
                      <p className="text-sm text-destructive">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <TextInput
                      field="phoneNumber"
                      placeholder="+234 801 234 5678"
                    />
                    <p className="text-sm text-muted-foreground">
                      Include country code (e.g., +234 for Nigeria)
                    </p>
                    {errors.phoneNumber && (
                      <p className="text-sm text-destructive">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Passport Number */}
                <div className="space-y-2">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Passport Number
                  </Label>
                  <TextInput
                    field="passportNumber"
                    placeholder="A12345678"
                    transform="uppercase"
                  />
                  <p className="text-sm text-muted-foreground">
                    Your current valid passport number
                  </p>
                  {errors.passportNumber && (
                    <p className="text-sm text-destructive">
                      {errors.passportNumber}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isCreatingProfile || !hasTouchedFields}
                    size="lg"
                    className="w-full h-12 text-lg bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreatingProfile ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Creating Profile...
                      </>
                    ) : !hasTouchedFields ? (
                      "Fill in your details to continue"
                    ) : (
                      "Create My Profile"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </main>
  );
}

export default OnboardingPage;
