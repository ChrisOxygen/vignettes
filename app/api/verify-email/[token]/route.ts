import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { sendWelcomeEmail } from "@/features/auth/actions/email.actions";
import { email } from "zod";

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
    const result = await prisma.$transaction(
      async (tx) => {
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

        // Prepare Supabase auth operations first (before database changes)
        // Create admin client with service role key for admin operations
        const supabase = createAdminClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Get the Supabase auth user by email to get their ID
        const { data: authUser, error: listUsersError } =
          await supabase.auth.admin.listUsers();

        if (listUsersError) {
          throw new Error(
            `Failed to list Supabase users: ${listUsersError.message}`
          );
        }

        const supabaseUser = authUser.users.find(
          (u) => u.email === verificationToken.user.email
        );

        if (!supabaseUser) {
          throw new Error(
            `Supabase auth user not found for email: ${verificationToken.user.email}`
          );
        }

        // Update Supabase auth user status first
        const { error: updateAuthError } =
          await supabase.auth.admin.updateUserById(supabaseUser.id, {
            email_confirm: true,
            user_metadata: {
              ...supabaseUser.user_metadata,
              status: "ACTIVE",
              hasBasicApplicantData: false,
            },
          });

        if (updateAuthError) {
          throw new Error(
            `Failed to update Supabase auth user: ${updateAuthError.message}`
          );
        }

        // Only update database after Supabase auth update succeeds
        // Update user status to ACTIVE
        await tx.user.update({
          where: { id: verificationToken.userId },
          data: { accountStatus: "ACTIVE" },
        });

        // Delete the verification token after successful verification
        await tx.emailVerificationToken.delete({
          where: { token },
        });

        await sendWelcomeEmail(
          verificationToken.user.name,
          verificationToken.user.email
        );

        return {
          success: true,
          message: "verified",
          supabaseUserId: supabaseUser.id,
        };
      },
      {
        // Transaction options for better error handling
        maxWait: 10000, // 10 seconds
        timeout: 15000, // 15 seconds
      }
    );

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

    // If we have a partial success (Supabase updated but database failed),
    // we should attempt to rollback the Supabase changes
    if (error instanceof Error && error.message.includes("Supabase")) {
      console.error("Supabase auth operation failed:", error.message);

      return NextResponse.redirect(
        new URL(
          "/sign-in?error=auth-sync-error&message=" +
            encodeURIComponent(
              "Authentication service error. Please try again or contact support."
            ),
          request.url
        )
      );
    }

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
