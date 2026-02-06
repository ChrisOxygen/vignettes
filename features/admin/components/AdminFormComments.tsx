"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  MessageSquare,
  Plus,
  Send,
  Clock,
  Pin,
  AlertCircle,
  CheckCircle2,
  FileEdit,
} from "lucide-react";
import { toast } from "sonner";
import { CommentType } from "@prisma/client";
import type { FieldComment } from "@prisma/client";
import { Skeleton } from "@/shared/components/ui/skeleton";

type CommentFilter = "all" | "unresolved" | "pinned";

interface AdminFormCommentsProps {
  submissionId: string;
  formType: string;
  comments: FieldComment[];
  isLoading?: boolean;
  onAddComment?: (
    content: string,
    fieldPath?: string,
    fieldLabel?: string,
    parentCommentId?: string
  ) => void;
}

export function AdminFormComments({
  submissionId,
  formType,
  comments,
  isLoading = false,
  onAddComment,
}: AdminFormCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [selectedFieldPath, setSelectedFieldPath] = useState<string>();
  const [selectedFieldLabel, setSelectedFieldLabel] = useState<string>();
  const [filter, setFilter] = useState<CommentFilter>("all");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    if (onAddComment) {
      onAddComment(newComment.trim(), selectedFieldPath, selectedFieldLabel);
      setNewComment("");
      setIsAddingComment(false);
      setSelectedFieldPath(undefined);
      setSelectedFieldLabel(undefined);
    }
  };

  const handleReply = (parentCommentId: string) => {
    if (!replyContent.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    if (onAddComment) {
      onAddComment(replyContent.trim(), undefined, undefined, parentCommentId);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  // Filter comments based on selected filter
  const filteredComments = React.useMemo(() => {
    if (!comments) return [];

    let filtered = comments;

    switch (filter) {
      case "unresolved":
        filtered = filtered.filter((c) => !c.isResolved);
        break;
      case "pinned":
        filtered = filtered.filter((c) => c.isPinned);
        break;
      default:
        break;
    }

    return filtered;
  }, [comments, filter]);

  // Extract edit requests
  const editRequests = React.useMemo(() => {
    if (!comments) return [];
    return comments.filter((c) => c.commentType === CommentType.EDIT_REQUEST);
  }, [comments]);

  // Regular comments (excluding edit requests)
  const regularComments = React.useMemo(() => {
    return filteredComments.filter(
      (c) => c.commentType !== CommentType.EDIT_REQUEST
    );
  }, [filteredComments]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const getCommentTypeColor = (type: CommentType) => {
    switch (type) {
      case CommentType.ADMIN_FEEDBACK:
        return "text-blue-600";
      case CommentType.CHANGE_REQUEST:
        return "text-orange-600";
      case CommentType.SYSTEM:
        return "text-gray-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Render comment with replies
  const renderComment = (comment: FieldComment) => {
    const replies =
      comments?.filter((c) => c.parentCommentId === comment.id) || [];

    // Determine background color based on comment type
    const getCommentBgClass = () => {
      if (comment.isPinned)
        return "bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 shadow-sm";

      switch (comment.commentType) {
        case CommentType.ADMIN_FEEDBACK:
          return "bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 shadow-sm";
        case CommentType.CHANGE_REQUEST:
          return "bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 shadow-sm";
        case CommentType.SYSTEM:
          return "bg-gray-50 dark:bg-gray-900/30 border-l-4 border-gray-400 shadow-sm";
        default:
          return "bg-muted/30 hover:bg-muted/50 border-l-4 border-border shadow-sm";
      }
    };

    return (
      <div key={comment.id} className="space-y-3">
        <Card
          className={`overflow-hidden transition-all hover:shadow-md ${getCommentBgClass()}`}
        >
          <div className="flex gap-3 p-4">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="text-xs">
                {getUserInitials(comment.authorName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-medium">
                  {comment.authorName}
                </span>
                <Badge
                  variant={
                    comment.authorRole === "ADMIN" ? "default" : "outline"
                  }
                  className="text-xs"
                >
                  {comment.authorRole}
                </Badge>
                {comment.isPinned && (
                  <Badge variant="destructive" className="text-xs gap-1">
                    <Pin className="h-3 w-3" />
                    Pinned
                  </Badge>
                )}
                {comment.commentType !== CommentType.GENERAL && (
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getCommentTypeColor(comment.commentType)}`}
                  >
                    {comment.commentType.replace(/_/g, " ")}
                  </Badge>
                )}
              </div>

              {comment.fieldLabel && comment.fieldPath && (
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {comment.fieldLabel}
                  </Badge>
                </div>
              )}

              <p className="text-sm text-foreground leading-relaxed mb-2 whitespace-pre-wrap">
                {comment.content}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatTimestamp(comment.createdAt)}
                {comment.isResolved && (
                  <>
                    <span>•</span>
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">Resolved</span>
                  </>
                )}
              </div>

              {/* Reply Button */}
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Reply Input */}
        {replyingTo === comment.id && (
          <Card className="ml-11 p-3">
            <div className="space-y-2">
              <Textarea
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] resize-none text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleReply(comment.id)}
                  disabled={!replyContent.trim()}
                >
                  <Send className="h-3 w-3 mr-1" />
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Render replies */}
        {replies.length > 0 && (
          <div className="ml-11 space-y-3 pl-4 border-l-2 border-muted">
            {replies.map((reply) => renderComment(reply))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments & Feedback
            <Skeleton className="h-5 w-8 ml-auto bg-gray-200" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="px-4 py-4">
            <Skeleton className="h-9 w-full bg-gray-200" />
          </div>
          <Separator />
          <div className="px-4 pt-3">
            <div className="w-full grid grid-cols-3 gap-2">
              <Skeleton className="h-9 bg-gray-200" />
              <Skeleton className="h-9 bg-gray-200" />
              <Skeleton className="h-9 bg-gray-200" />
            </div>
          </div>
          <div className="flex-1 p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-16 w-full bg-gray-200" />
                  <Skeleton className="h-3 w-20 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments & Feedback
          <Badge variant="outline" className="ml-auto">
            {comments?.length || 0}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Edit Requests Section */}
        {editRequests.length > 0 && (
          <>
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <FileEdit className="h-4 w-4 text-orange-600" />
                <h3 className="text-sm font-medium">Pending Edit Requests</h3>
                <Badge variant="destructive" className="ml-auto">
                  {editRequests.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {editRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="p-3 bg-orange-50 border-orange-200"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {request.authorName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {request.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Status: {request.editRequestStatus}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Add Comment Section */}
        <div className="px-4 py-4 space-y-3">
          {!isAddingComment ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start h-9 text-muted-foreground border-dashed"
              onClick={() => setIsAddingComment(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a comment...
            </Button>
          ) : (
            <div className="space-y-3">
              <Textarea
                placeholder="Write your comment or feedback..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsAddingComment(false);
                    setNewComment("");
                    setSelectedFieldPath(undefined);
                    setSelectedFieldLabel(undefined);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Filter Tabs */}
        <div className="px-4 pt-3">
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as CommentFilter)}
          >
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="unresolved" className="text-xs">
                Unresolved
              </TabsTrigger>
              <TabsTrigger value="pinned" className="text-xs">
                <Pin className="h-3 w-3 mr-1" />
                Pinned
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Comments List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {regularComments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">
                  {filter === "all"
                    ? "No comments yet"
                    : filter === "unresolved"
                      ? "No unresolved comments"
                      : "No pinned comments"}
                </p>
                <p className="text-xs mt-1">
                  {filter === "all" && "Start a conversation about this form"}
                </p>
              </div>
            ) : (
              regularComments
                .filter((c) => !c.parentCommentId) // Only root comments
                .map((comment) => renderComment(comment))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
