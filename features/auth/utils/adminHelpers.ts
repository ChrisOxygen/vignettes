// Admin code validation function
export const validateAdminCode = async (
  code: string,
  tx: any
): Promise<{ isValid: boolean; invitationId?: string; error?: string }> => {
  try {
    // Find admin invitation with the provided code
    const invitation = await tx.adminInvitation.findUnique({
      where: { code },
    });

    if (!invitation) {
      return { isValid: false, error: "Invalid admin code" };
    }

    return { isValid: true, invitationId: invitation.id };
  } catch (error) {
    console.error("Error validating admin code:", error);
    return { isValid: false, error: "Failed to validate admin code" };
  }
};
