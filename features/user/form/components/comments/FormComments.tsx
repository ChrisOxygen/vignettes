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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  MessageSquare,
  Plus,
  Send,
  Clock,
  Pin,
  AlertCircle,
  CheckCircle2,
  Filter,
  FileEdit,
} from "lucide-react";
import { useFormProvider } from "../../context/FormProviders";
import { useComments, useCreateComment } from "../../hooks";
import { useAuth } from "@/shared/providers/AuthProvider";
import { toast } from "sonner";
import { FieldTagSelector } from "./FieldTagSelector";
import { EditRequestCard } from "./EditRequestCard";
import { RequestEditAccessButton } from "./RequestEditAccessButton";
import { CommentType } from "@prisma/client";
import type { FieldComment } from "@prisma/client";
import { Skeleton } from "@/shared/components/ui/skeleton";

type CommentFilter = "all" | "unresolved" | "pinned";

export function FormComments() {
  const { submissionId, formType } = useFormProvider();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [selectedFieldPath, setSelectedFieldPath] = useState<string>();
  const [selectedFieldLabel, setSelectedFieldLabel] = useState<string>();
  const [filter, setFilter] = useState<CommentFilter>("all");

  const isAdmin = user?.user_metadata?.role === "ADMIN";

  const { data: commentsData, isLoading } = useComments(submissionId);
  const { mutate: createComment, isPending: isCreating } = useCreateComment({
    onSuccess: () => {
      toast.success("Comment added successfully");
      setNewComment("");
      setIsAddingComment(false);
      setSelectedFieldPath(undefined);
      setSelectedFieldLabel(undefined);
    },
    onError: (message) => {
      toast.error(message || "Failed to add comment");
    },
  });

  const handleAddComment = () => {
    if (!submissionId) {
      toast.error("No active form submission");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    createComment({
      submissionId,
      content: newComment.trim(),
      fieldPath: selectedFieldPath,
      fieldLabel: selectedFieldLabel,
      commentType: CommentType.GENERAL,
    });
  };

  const handleFieldSelect = (fieldPath: string | null) => {
    setSelectedFieldPath(fieldPath || undefined);
    // Extract label from field path (will be enhanced by FieldTagSelector)
    setSelectedFieldLabel(fieldPath || undefined);
  };

  // Filter comments based on selected filter
  const filteredComments = React.useMemo(() => {
    if (!commentsData?.data) return [];

    let filtered = commentsData.data;

    switch (filter) {
      case "unresolved":
        filtered = filtered.filter((c: FieldComment) => !c.isResolved);
        break;
      case "pinned":
        filtered = filtered.filter((c: FieldComment) => c.isPinned);
        break;
      default:
        break;
    }

    return filtered;
  }, [commentsData?.data, filter]);

  // Extract edit requests
  const editRequests = React.useMemo(() => {
    if (!commentsData?.data) return [];
    return commentsData.data.filter(
      (c: FieldComment) => c.commentType === CommentType.EDIT_REQUEST
    );
  }, [commentsData?.data]);

  // Regular comments (excluding edit requests)
  const regularComments = React.useMemo(() => {
    return filteredComments.filter(
      (c: FieldComment) => c.commentType !== CommentType.EDIT_REQUEST
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
      commentsData?.data?.filter(
        (c: FieldComment) => c.parentCommentId === comment.id
      ) || [];

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
            </div>
          </div>
        </Card>

        {/* Render replies */}
        {replies.length > 0 && (
          <div className="ml-11 space-y-3 pl-4 border-l-2 border-muted">
            {replies.map((reply: FieldComment) => renderComment(reply))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments & Feedback
          {!isLoading && (
            <Badge variant="outline" className="ml-auto">
              {commentsData?.data?.length || 0}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Edit Requests Section */}
        {editRequests.length > 0 && submissionId && (
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
                {editRequests.map((request: any) => (
                  <EditRequestCard
                    key={request.id}
                    request={request}
                    isAdmin={isAdmin}
                    submissionId={submissionId}
                  />
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Add Comment Section */}
        <div className="px-4 py-4 space-y-3">
          {/* Request Edit Access Button - Only for users when form is locked */}
          {!isAdmin && submissionId && formType && (
            <RequestEditAccessButton
              submissionId={submissionId}
              formType={formType}
            />
          )}

          {!isAddingComment ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start h-9 text-muted-foreground border-dashed"
              onClick={() => setIsAddingComment(true)}
              disabled={!submissionId}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a comment...
            </Button>
          ) : (
            <div className="space-y-3">
              <FieldTagSelector
                formType={formType!}
                value={selectedFieldPath ?? null}
                onChange={handleFieldSelect}
              />
              <Textarea
                placeholder="Write your comment or question..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isCreating}
                >
                  <Send className="h-3 w-3 mr-1" />
                  {isCreating ? "Sending..." : "Send"}
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
                  disabled={isCreating}
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
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !submissionId ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No active form</p>
                <p className="text-xs mt-1">
                  Please fill out the form to enable comments
                </p>
              </div>
            ) : regularComments.length === 0 ? (
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
                .filter((c: FieldComment) => !c.parentCommentId) // Only root comments
                .map((comment: FieldComment) => renderComment(comment))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
