"use server";

import { prisma } from "@/prisma/prisma";
import { ApiResponse } from "@/features/shared/types/api";
import { EditRequestStatus, FormStatus, CommentType } from "@prisma/client";
import { getAuthenticatedUser } from "./index";

// ============================================
// APPROVE EDIT REQUEST
// ============================================
export async function _approveEditRequest(
  commentId: string
): Promise<ApiResponse> {
  try {
    // Get authenticated user from database
    const dbUser = await getAuthenticatedUser();

    // Only admins can approve edit requests
    if (dbUser.role !== "ADMIN") {
      return {
        success: false,
        message: "Only admins can approve edit requests",
      };
    }

    const comment = await prisma.fieldComment.findUnique({
      where: { id: commentId },
      include: { submission: { select: { userId: true } } },
    });

    if (!comment) {
      return { success: false, message: "Edit request not found" };
    }

    if (comment.commentType !== CommentType.EDIT_REQUEST) {
      return { success: false, message: "This is not an edit request" };
    }

    if (comment.editRequestStatus !== EditRequestStatus.PENDING) {
      return { success: false, message: "Edit request already processed" };
    }

    // Transaction: Update comment + change form status
    await prisma.$transaction([
      // 1. Update edit request status
      prisma.fieldComment.update({
        where: { id: commentId },
        data: {
          editRequestStatus: EditRequestStatus.APPROVED,
          editRequestResolvedAt: new Date(),
          editRequestResolvedBy: dbUser.id,
        },
      }),

      // 2. Change form status to CHANGES_REQUESTED (unlocks form)
      prisma.formSubmission.update({
        where: { id: comment.submissionId },
        data: { status: FormStatus.CHANGES_REQUESTED },
      }),

      // 3. Create system comment for audit trail
      prisma.fieldComment.create({
        data: {
          submissionId: comment.submissionId,
          formType: comment.formType,
          commentType: CommentType.SYSTEM,
          content: `Edit request approved by ${dbUser.firstName}. Form is now unlocked for editing.`,
          authorId: dbUser.id,
          authorName: dbUser.firstName,
          authorRole: "ADMIN",
        },
      }),
    ]);

    // TODO: Send email to user notifying approval
    // TODO: Create in-app notification for user

    return {
      success: true,
      message: "Edit request approved. Form is now unlocked.",
    };
  } catch (error) {
    console.error("Error approving edit request:", error);
    return { success: false, message: "Failed to approve edit request" };
  }
}

// ============================================
// DENY EDIT REQUEST
// ============================================
export async function _denyEditRequest(
  commentId: string,
  reason?: string
): Promise<ApiResponse> {
  try {
    // Get authenticated user from database
    const dbUser = await getAuthenticatedUser();

    if (dbUser.role !== "ADMIN") {
      return {
        success: false,
        message: "Only admins can deny edit requests",
      };
    }

    const comment = await prisma.fieldComment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return { success: false, message: "Edit request not found" };
    }

    if (comment.commentType !== CommentType.EDIT_REQUEST) {
      return { success: false, message: "This is not an edit request" };
    }

    if (comment.editRequestStatus !== EditRequestStatus.PENDING) {
      return { success: false, message: "Edit request already processed" };
    }

    // Transaction: Update request + add denial comment
    const operations: any[] = [
      // 1. Update edit request status
      prisma.fieldComment.update({
        where: { id: commentId },
        data: {
          editRequestStatus: EditRequestStatus.DENIED,
          editRequestResolvedAt: new Date(),
          editRequestResolvedBy: dbUser.id,
        },
      }),
    ];

    // 2. Add admin's denial reason as reply (if provided)
    if (reason) {
      operations.push(
        prisma.fieldComment.create({
          data: {
            submissionId: comment.submissionId,
            formType: comment.formType,
            commentType: CommentType.ADMIN_FEEDBACK,
            content: reason,
            parentCommentId: commentId, // Reply to edit request
            authorId: dbUser.id,
            authorName: dbUser.firstName,
            authorRole: "ADMIN",
          },
        })
      );
    }

    await prisma.$transaction(operations);

    // TODO: Send email to user notifying denial with reason
    // TODO: Create in-app notification for user

    return {
      success: true,
      message: "Edit request denied",
    };
  } catch (error) {
    console.error("Error denying edit request:", error);
    return { success: false, message: "Failed to deny edit request" };
  }
}

// ============================================
// GET PENDING EDIT REQUESTS (Admin Dashboard)
// ============================================
export async function _getPendingEditRequests(): Promise<ApiResponse> {
  try {
    // Get authenticated user from database
    const dbUser = await getAuthenticatedUser();

    if (dbUser.role !== "ADMIN") {
      return { success: false, message: "Admin access required" };
    }

    const requests = await prisma.fieldComment.findMany({
      where: {
        commentType: CommentType.EDIT_REQUEST,
        editRequestStatus: EditRequestStatus.PENDING,
      },
      include: {
        submission: {
          include: {
            user: {
              select: { firstName: true, email: true },
            },
          },
        },
      },
      orderBy: { createdAt: "asc" }, // Oldest first (FIFO)
    });

    return {
      success: true,
      data: requests,
      message: `Found ${requests.length} pending edit requests`,
    };
  } catch (error) {
    console.error("Error fetching edit requests:", error);
    return { success: false, message: "Failed to fetch edit requests" };
  }
}
