import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    // Validate token parameter
    if (!token) {
      return NextResponse.redirect(
        new URL("/sign-in?error=invalid-token", request.url)
      );
    }

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Find the email verification token
      const verificationToken = await tx.emailVerificationToken.findUnique({
        where: { token },
        include: { user: true },
      });

      // Check if token exists
      if (!verificationToken) {
        return { success: false, error: "invalid-token" };
      }

      // Check if token has expired
      const now = new Date();
      if (verificationToken.expiresAt < now) {
        // Delete expired token
        await tx.emailVerificationToken.delete({
          where: { token },
        });
        return { success: false, error: "expired-token" };
      }

      // Check if user is already verified
      if (verificationToken.user.accountStatus === "ACTIVE") {
        // Delete the token since user is already verified
        await tx.emailVerificationToken.delete({
          where: { token },
        });
        return { success: true, message: "already-verified" };
      }

      // Update user status to ACTIVE
      await tx.user.update({
        where: { id: verificationToken.userId },
        data: { accountStatus: "ACTIVE" },
      });

      // Delete the verification token after successful verification
      await tx.emailVerificationToken.delete({
        where: { token },
      });

      return { success: true, message: "verified" };
    });

    // Handle transaction results and redirect accordingly
    if (!result.success) {
      const errorMessage =
        result.error === "expired-token"
          ? "The verification link has expired. Please request a new one."
          : "Invalid verification link.";

      return NextResponse.redirect(
        new URL(
          `/sign-in?error=${result.error}&message=${encodeURIComponent(errorMessage)}`,
          request.url
        )
      );
    }

    // Success - redirect to sign-in with success message
    const successMessage =
      result.message === "already-verified"
        ? "Your email is already verified. You can now sign in."
        : "Email verified successfully! You can now sign in to your account.";

    return NextResponse.redirect(
      new URL(
        `/sign-in?success=true&message=${encodeURIComponent(successMessage)}`,
        request.url
      )
    );
  } catch (error) {
    console.error("Error verifying email token:", error);

    return NextResponse.redirect(
      new URL(
        "/sign-in?error=server-error&message=" +
          encodeURIComponent(
            "An unexpected error occurred during verification. Please try again."
          ),
        request.url
      )
    );
  }
}
