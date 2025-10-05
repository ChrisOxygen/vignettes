"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { User, FileText, Globe } from "lucide-react";

function OnboardingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Welcome to Your Visa Journey
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's get you set up with the basic information we need to help you
            with your visa application.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="text-center">
            <CardHeader>
              <User className="w-8 h-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Basic personal details and contact information
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileText className="w-8 h-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Passport information and relevant documents
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="w-8 h-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Travel Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Destination and travel preferences
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is where the onboarding form will be implemented. Users will
              provide their basic applicant data here.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                📝 <strong>Coming Soon:</strong> Interactive form to collect:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 ml-4 list-disc">
                <li>Full legal name</li>
                <li>Date of birth</li>
                <li>Nationality</li>
                <li>Current country of residence</li>
                <li>Phone number</li>
                <li>Passport information</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default OnboardingPage;
