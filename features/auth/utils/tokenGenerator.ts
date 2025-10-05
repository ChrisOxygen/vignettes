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
