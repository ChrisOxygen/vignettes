"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import {
  Shield,
  CheckCircle,
  User,
  Calendar,
  Phone,
  FileText,
  Globe,
  Lock,
} from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

// Form schema
const onboardingSchema = z.object({
  fullLegalName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Full name can only contain letters, spaces, hyphens, and apostrophes"
    ),
  currentCountryOfResidence: z
    .string()
    .min(2, "Please enter your current country of residence")
    .max(100, "Country name is too long"),
  nationality: z
    .string()
    .min(2, "Please enter your nationality")
    .max(100, "Nationality name is too long"),
  dateOfBirth: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
    .refine((date) => {
      const [day, month, year] = date.split("/").map(Number);
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      const minAge = new Date(
        today.getFullYear() - 100,
        today.getMonth(),
        today.getDate()
      );
      const maxAge = new Date(
        today.getFullYear() - 16,
        today.getMonth(),
        today.getDate()
      );

      return inputDate >= minAge && inputDate <= maxAge;
    }, "You must be between 16 and 100 years old"),
  phoneNumber: z
    .string()
    .regex(
      /^\+\d{1,4}\d{6,14}$/,
      "Phone number must include country code (e.g., +234 for Nigeria) and be valid"
    ),
  passportNumber: z
    .string()
    .min(4, "Passport number must be at least 4 characters")
    .max(20, "Passport number must not exceed 20 characters")
    .regex(
      /^[A-Z0-9]+$/,
      "Passport number can only contain uppercase letters and numbers"
    ),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullLegalName: "",
      currentCountryOfResidence: "",
      nationality: "",
      dateOfBirth: "",
      phoneNumber: "",
      passportNumber: "",
    },
  });

  // Dummy submit function
  const onSubmit = async (data: OnboardingFormData) => {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Simulate redirect after success
    setTimeout(() => {
      console.log("Redirecting to dashboard...");
      // router.push("/app");
    }, 3000);
  };

  // Dummy function to go back to editing
  const handleEditProfile = () => {
    setIsSubmitted(false);
    form.reset();
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-200">
                    ✓ Profile Created Successfully!
                  </h1>
                  <p className="text-green-700 dark:text-green-300 leading-relaxed">
                    You're all set. You can now explore visa options and begin
                    your application process. You can update these details
                    anytime from your profile settings.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button
                    onClick={() => console.log("Navigate to dashboard")}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    onClick={handleEditProfile}
                    variant="outline"
                    size="lg"
                    className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Full Legal Name */}
                  <FormField
                    control={form.control}
                    name="fullLegalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Legal Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Michael Smith"
                            className="h-12 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your name exactly as it appears on your passport
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Current Country of Residence */}
                    <FormField
                      control={form.control}
                      name="currentCountryOfResidence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Current Country of Residence
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="United Kingdom"
                              className="h-12 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The country where you currently live
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Nationality */}
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Nationality
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nigerian"
                              className="h-12 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Your citizenship/country of passport
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Date of Birth */}
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date of Birth
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="25/12/1990"
                              className="h-12 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>DD/MM/YYYY</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Number */}
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+234 801 234 5678"
                              className="h-12 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include country code (e.g., +234 for Nigeria)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Passport Number */}
                  <FormField
                    control={form.control}
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Passport Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A12345678"
                            className="h-12 text-base"
                            {...field}
                            onChange={(e) => {
                              // Convert to uppercase automatically
                              field.onChange(e.target.value.toUpperCase());
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Your current valid passport number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full h-12 text-lg bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        "Complete My Profile"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </main>
  );
}

export default OnboardingPage;
