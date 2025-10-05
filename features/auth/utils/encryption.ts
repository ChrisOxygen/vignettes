import crypto from "crypto";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "fallback-key-32-chars-long-1234"; // Should be 32 characters
const ALGORITHM = "aes-256-cbc";

// Warn if using fallback key in production
if (!process.env.ENCRYPTION_KEY && process.env.NODE_ENV === "production") {
  console.warn(
    "WARNING: Using fallback encryption key in production. Set ENCRYPTION_KEY environment variable."
  );
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(encryptedText: string): string {
  const textParts = encryptedText.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex");
  const encrypted = textParts.join(":");
  const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
