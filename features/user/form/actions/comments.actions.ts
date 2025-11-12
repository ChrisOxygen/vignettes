"use server";

import { prisma } from "@/prisma/prisma";
import { ApiResponse } from "@/features/shared/types/api";
import { CommentType, EditRequestStatus, FormType } from "@prisma/client";
import { getAuthenticatedUser } from "./index";

// ============================================
// CREATE COMMENT
// ============================================
export async function _createComment(input: {
  submissionId: string;
  content: string;
  fieldPath?: string | null;
  fieldLabel?: string | null;
  commentType?: CommentType;
  parentCommentId?: string | null;
}): Promise<ApiResponse> {
  try {
    // Get authenticated user from database
    const dbUser = await getAuthenticatedUser();

    // Get submission to verify ownership and get formType
    const submission = await prisma.formSubmission.findUnique({
      where: { id: input.submissionId },
      select: { userId: true, formType: true, status: true },
    });

    if (!submission) {
      return { success: false, message: "Form submission not found" };
    }

    // Verify user owns submission OR is admin
    if (submission.userId !== dbUser.id && dbUser.role !== "ADMIN") {
      return {
        success: false,
        message: "Not authorized to comment on this form",
      };
    }

    // Validate commentType based on user role
    const commentType = input.commentType || CommentType.GENERAL;

    if (dbUser.role === "USER") {
      // Users can only create GENERAL or EDIT_REQUEST
      const allowedTypes: CommentType[] = [
        CommentType.GENERAL,
        CommentType.EDIT_REQUEST,
      ];
      if (!allowedTypes.includes(commentType)) {
        return { success: false, message: "Invalid comment type for user" };
      }

      // EDIT_REQUEST must be form-level (no fieldPath)
      if (commentType === CommentType.EDIT_REQUEST && input.fieldPath) {
        return {
          success: false,
          message: "Edit requests must be for the entire form",
        };
      }
    }

    // Create comment
    const comment = await prisma.fieldComment.create({
      data: {
        submissionId: input.submissionId,
        formType: submission.formType,
        fieldPath: input.fieldPath,
        fieldLabel: input.fieldLabel,
        commentType,
        content: input.content,
        parentCommentId: input.parentCommentId,
        authorId: dbUser.id,
        authorName: dbUser.firstName,
        authorRole: dbUser.role,
        editRequestStatus:
          commentType === CommentType.EDIT_REQUEST
            ? EditRequestStatus.PENDING
            : null,
      },
      include: {
        replies: true,
      },
    });

    // TODO: Send notification email based on commentType
    // - EDIT_REQUEST → notify admins
    // - ADMIN_FEEDBACK/CHANGE_REQUEST → notify user
    // TODO: Create in-app notification for relevant users

    return {
      success: true,
      message: "Comment added successfully",
      data: comment,
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, message: "Failed to create comment" };
  }
}

// ============================================
// GET COMMENTS FOR SUBMISSION
// ============================================
export async function _getComments(submissionId: string): Promise<ApiResponse> {
  try {
    // Get authenticated user from database
    const dbUser = await getAuthenticatedUser();

    // Verify access to submission
    const submission = await prisma.formSubmission.findUnique({
      where: { id: submissionId },
      select: { userId: true },
    });

    if (!submission) {
      return { success: false, message: "Form submission not found" };
    }

    if (submission.userId !== dbUser.id && dbUser.role !== "ADMIN") {
      return { success: false, message: "Not authorized" };
    }

    // Get all comments (root level only, with nested replies)
    const comments = await prisma.fieldComment.findMany({
      where: {
        submissionId,
        parentCommentId: null, // Only root comments
      },
      include: {
        replies: {
          include: {
            replies: true, // Support 2-level nesting
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: [
        { isPinned: "desc" }, // Pinned first
        { createdAt: "desc" }, // Newest first
      ],
    });

    return {
      success: true,
      data: comments,
      message: `Found ${comments.length} comments`,
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { success: false, message: "Failed to fetch comments" };
  }
}

// ============================================
// RESOLVE/UNRESOLVE COMMENT
// ============================================
export async function _toggleResolveComment(
  commentId: string
): Promise<ApiResponse> {
  try {
    // Get authenticated user from database
    const dbUser = await getAuthenticatedUser();

    // Only admins can resolve comments
    if (dbUser.role !== "ADMIN") {
      return { success: false, message: "Only admins can resolve comments" };
    }

    const comment = await prisma.fieldComment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return { success: false, message: "Comment not found" };
    }

    const updated = await prisma.fieldComment.update({
      where: { id: commentId },
      data: { isResolved: !comment.isResolved },
    });

    // TODO: Send notification to comment author about resolution status change
    // TODO: Create in-app notification

    return {
      success: true,
      data: updated,
      message: updated.isResolved ? "Comment resolved" : "Comment reopened",
    };
  } catch (error) {
    console.error("Error toggling comment resolution:", error);
    return { success: false, message: "Failed to update comment" };
  }
}

// ============================================
// PIN/UNPIN COMMENT (Admin only)
// ============================================
export async function _togglePinComment(
  commentId: string
): Promise<ApiResponse> {
  try {
    // Get authenticated user from database
    const dbUser = await getAuthenticatedUser();

    if (dbUser.role !== "ADMIN") {
      return { success: false, message: "Only admins can pin comments" };
    }

    const comment = await prisma.fieldComment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return { success: false, message: "Comment not found" };
    }

    const updated = await prisma.fieldComment.update({
      where: { id: commentId },
      data: { isPinned: !comment.isPinned },
    });

    return {
      success: true,
      data: updated,
      message: updated.isPinned ? "Comment pinned" : "Comment unpinned",
    };
  } catch (error) {
    console.error("Error toggling pin:", error);
    return { success: false, message: "Failed to update comment" };
  }
}
