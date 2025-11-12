"use server";

import { prisma } from "@/prisma/prisma";
import { ApiResponse } from "@/features/shared/types/api";
import { ApiErrorCode } from "@/features/shared/types/error";
import {
  emailSchema,
  type ZEmailInput,
  resetPasswordWithTokenSchema,
  type ZResetPasswordWithTokenInput,
} from "../validators/user.validator";
import { generatePasswordResetToken } from "../utils/tokenGenerator";
import {
  handlePasswordResetError,
  handlePasswordResetVerificationError,
} from "../utils/errorHandlers";
import { sendPasswordResetEmail } from "./email.actions";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import crypto from "crypto";

/**
 * Create a password reset token for a user
 * Generates a UUID token, hashes it for storage, and prepares reset link
 *
 * @param input - Object containing user email
 * @returns ApiResponse with success status and message
 */
export const _createPasswordResetCode = async (
  input: ZEmailInput
): Promise<ApiResponse> => {
  try {
    // Validate input using Zod schema
    const validationResult = emailSchema.safeParse(input);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return {
        success: false,
        message: firstError.message,
        error: ApiErrorCode.VALIDATION_ERROR,
      };
    }

    const { email } = validationResult.data;

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Check if user exists with this email
      const user = await tx.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          middleName: true,
          accountStatus: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if account is active (you might want to allow reset for PENDING_VERIFICATION too)
      if (
        user.accountStatus !== "ACTIVE" &&
        user.accountStatus !== "PENDING_VERIFICATION"
      ) {
        throw new Error("Account is not active");
      }

      // Delete any existing password reset tokens for this user
      await tx.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      // Generate new password reset token
      const { token, hashedToken } = generatePasswordResetToken();

      // Create new password reset token in database
      await tx.passwordResetToken.create({
        data: {
          userId: user.id,
          token: hashedToken, // Store hashed version
        },
      });

      // Create full name for email
      const fullName = user.middleName
        ? `${user.firstName} ${user.middleName} ${user.lastName}`.trim()
        : `${user.firstName} ${user.lastName}`.trim();

      return {
        userId: user.id,
        userName: fullName,
        userEmail: user.email,
        resetToken: token, // Return plain token for email
      };
    });

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(
      result.userEmail,
      result.userName,
      result.resetToken
    );

    if (!emailResult.ok) {
      console.error(
        "Failed to send password reset email:",
        emailResult.message
      );
      // Note: Token was still created, but email failed to send
      // You might want to handle this differently based on your requirements
    }

    return {
      success: true,
      message: "Password reset instructions have been sent to your email",
      data: {
        email: result.userEmail,
        // Don't send token in response for security
      },
    };
  } catch (error) {
    return handlePasswordResetError(error);
  }
};

/**
 * Reset user password using reset token
 * Verifies the token, then updates the user's password via Supabase Auth
 *
 * @param input - Object containing token, password, and confirmPassword
 * @returns ApiResponse with success status and message
 */
export const _resetUserPassword = async (
  input: ZResetPasswordWithTokenInput
): Promise<ApiResponse> => {
  try {
    // Validate input using Zod schema
    const validationResult = resetPasswordWithTokenSchema.safeParse(input);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return {
        success: false,
        message: firstError.message,
        error: ApiErrorCode.VALIDATION_ERROR,
      };
    }

    const { token, password } = validationResult.data;

    // Hash the provided token to compare with database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Use transaction to verify and delete token
    const result = await prisma.$transaction(async (tx) => {
      // Find the password reset token
      const resetToken = await tx.passwordResetToken.findUnique({
        where: { token: hashedToken },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              middleName: true,
              accountStatus: true,
            },
          },
        },
      });

      if (!resetToken) {
        throw new Error("Invalid reset token");
      }

      // Check if token is expired (15 minutes from creation)
      const tokenAge = Date.now() - resetToken.createdAt.getTime();
      const fifteenMinutesInMs = 15 * 60 * 1000;

      if (tokenAge > fifteenMinutesInMs) {
        // Delete expired token
        await tx.passwordResetToken.delete({
          where: { id: resetToken.id },
        });
        throw new Error("Reset token has expired");
      }

      // Delete the token (one-time use)
      await tx.passwordResetToken.delete({
        where: { id: resetToken.id },
      });

      // Create full name
      const fullName = resetToken.user.middleName
        ? `${resetToken.user.firstName} ${resetToken.user.middleName} ${resetToken.user.lastName}`.trim()
        : `${resetToken.user.firstName} ${resetToken.user.lastName}`.trim();

      return {
        userId: resetToken.user.id,
        userEmail: resetToken.user.email,
        userName: fullName,
      };
    });

    // Prepare Supabase auth operations first (before database changes)
    // Create admin client with service role key for admin operations
    const supabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get the Supabase auth user by email to get their ID
    const { data: authUsers, error: listUsersError } =
      await supabase.auth.admin.listUsers();

    if (listUsersError) {
      throw new Error(
        `Failed to list Supabase users: ${listUsersError.message}`
      );
    }

    const supabaseUser = authUsers.users.find(
      (u) => u.email === result.userEmail
    );

    if (!supabaseUser) {
      throw new Error("Supabase auth update failed: User not found");
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      supabaseUser.id,
      { password }
    );

    if (updateError) {
      throw new Error(`Supabase auth update failed: ${updateError.message}`);
    }

    return {
      success: true,
      message:
        "Your password has been reset successfully. You can now sign in with your new password.",
      data: {
        email: result.userEmail,
      },
    };
  } catch (error) {
    return handlePasswordResetVerificationError(error);
  }
};
