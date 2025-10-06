"use server";

import VerifyEmail from "@/emails/VerifyEmail";
import WelcomeEmail from "@/emails/WelcomeEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(name: string, email: string) {
  try {
    // Parse the request body to get the user's name

    // Validate the required fields
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    // Send the welcome email
    await resend.emails.send({
      from: "rashford@insights4globaltalents.com",
      to: email,
      subject: "Welcome to Insights 4 Global Talents!",
      react: WelcomeEmail({
        name,
        founderName: "Bennet Rashford",
      }),
    });

    return {
      ok: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return {
      ok: false,
      message: "Failed to send welcome email",
    };
  }
}

export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationToken: string
) {
  try {
    // Validate the required fields
    if (!name || !email || !verificationToken) {
      throw new Error("Name, email, and verificationToken are required");
    }

    // Send the welcome email
    const { data, error } = await resend.emails.send({
      from: "verify@insights4globaltalents.com",
      to: email,
      subject: "Email Verification",
      react: VerifyEmail({
        name,
        verificationToken,
      }),
    });

    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }

    return {
      ok: true,
      message: "Email sent successfully",
      data,
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      ok: false,
      message: "Failed to send verification email",
    };
  }
}
