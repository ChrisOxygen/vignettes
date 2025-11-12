import crypto from "crypto";

/**
 * Generate an email verification token with a consistent format
 * @returns Object containing the token string and expiration date
 */
export function generateEmailVerificationToken() {
  // Generate UUID and create token suffix
  const uuid = crypto.randomUUID();
  const tokenSuffix = uuid.replace(/-/g, "").substring(0, 18); // 18 chars + 7 char prefix = 25 total
  const token = `evtk_${tokenSuffix}`;

  // Set expiration to 24 hours from now
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  return {
    token,
    expiresAt,
  };
}

/**
 * Generate a password reset token using UUID
 * @returns Object containing the plain UUID token and hashed token for database storage
 */
export function generatePasswordResetToken() {
  // Generate UUID for the reset token
  const uuid = crypto.randomUUID();

  // Hash the token for secure storage in database
  const hashedToken = crypto.createHash("sha256").update(uuid).digest("hex");

  return {
    token: uuid, // Plain token to send in email/URL
    hashedToken, // Hashed token to store in database
  };
}
