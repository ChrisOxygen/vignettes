"use server";

import AssessmentSubmissionEmail from "@/emails/AssessmentSubmissionEmail";
import { AssessmentType, AssessmentData } from "@/emails/types/assessmentTypes";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Zod schema for email action validation
const emailActionSchema = z.object({
  assessmentType: z.nativeEnum(AssessmentType),
  formData: z
    .object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Valid email is required"),
    })
    .passthrough(), // Allow additional fields
});

// Helper function to get assessment-specific email
const getAssessmentEmail = (type: AssessmentType): string => {
  switch (type) {
    case AssessmentType.USEB1A:
      return "eb1a@insights4globaltalents.com";
    case AssessmentType.EB2NIW:
      return "eb2-niw@insights4globaltalents.com";
    case AssessmentType.UK_GLOBAL_TALENT:
      return "ukgtv@insights4globaltalents.com";
    default:
      return "tourism@insights4globaltalents.com";
  }
};

// Helper function to get assessment title for subject line
const getAssessmentTitle = (type: AssessmentType): string => {
  switch (type) {
    case AssessmentType.USEB1A:
      return "EB-1A";
    case AssessmentType.EB2NIW:
      return "EB-2 NIW";
    case AssessmentType.UK_GLOBAL_TALENT:
      return "UK Global Talent";
    default:
      return "Assessment";
  }
};

export async function sendAssessmentSubmissionEmail(
  assessmentType: AssessmentType,
  formData: AssessmentData
) {
  try {
    // Validate input data with Zod
    const validatedData = emailActionSchema.parse({
      assessmentType,
      formData,
    });

    // Determine email recipient based on assessment type
    const toEmail = getAssessmentEmail(validatedData.assessmentType);

    const assessmentTitle = getAssessmentTitle(validatedData.assessmentType);
    const applicantName = `${validatedData.formData.firstName} ${validatedData.formData.lastName}`;

    // Send the assessment submission email
    const { data, error } = await resend.emails.send({
      from: "assessmentForms@insights4globaltalents.com",
      to: toEmail,
      subject: `New ${assessmentTitle} Questionnaire Submission from ${applicantName}`,
      react: AssessmentSubmissionEmail({
        assessmentType: validatedData.assessmentType,
        formData: validatedData.formData as AssessmentData,
      }),
    });

    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }

    return {
      ok: true,
      message: "Assessment submission email sent successfully",
      data,
    };
  } catch (error) {
    console.error("Error sending assessment submission email:", error);
    return {
      ok: false,
      message: "Failed to send assessment submission email",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
