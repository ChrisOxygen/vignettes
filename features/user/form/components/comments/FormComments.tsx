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
  MessageSquare,
  Plus,
  Send,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// Dummy data structure for comments
interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
    role: "user" | "admin" | "reviewer";
  };
  content: string;
  timestamp: Date;
  type: "comment" | "review" | "feedback";
  status?: "pending" | "resolved";
}

// Dummy comments data
const dummyComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "John Doe",
      initials: "JD",
      role: "user",
    },
    content:
      "I need help with the employment history section. Should I include part-time jobs from college?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    type: "comment",
    status: "pending",
  },
  {
    id: "2",
    author: {
      name: "Sarah Wilson",
      initials: "SW",
      role: "reviewer",
    },
    content:
      "Yes, please include all employment history for the past 10 years, including part-time positions. This helps provide a complete picture for the application.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    type: "feedback",
    status: "resolved",
  },
  {
    id: "3",
    author: {
      name: "Admin Support",
      initials: "AS",
      role: "admin",
    },
    content:
      "Please ensure all dates are in DD/MM/YYYY format as specified in the form instructions.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    type: "review",
    status: "pending",
  },
];

export function FormComments() {
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: "Current User",
          initials: "CU",
          role: "user",
        },
        content: newComment.trim(),
        timestamp: new Date(),
        type: "comment",
        status: "pending",
      };

      setComments([comment, ...comments]);
      setNewComment("");
      setIsAddingComment(false);
    }
  };

  const getCommentTypeIcon = (type: Comment["type"]) => {
    switch (type) {
      case "review":
        return <AlertCircle className="h-3 w-3" />;
      case "feedback":
        return <CheckCircle2 className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  const getCommentTypeBadge = (type: Comment["type"]) => {
    const variants = {
      comment: "default",
      review: "destructive",
      feedback: "secondary",
    } as const;

    return (
      <Badge variant={variants[type]} className="text-xs">
        {type}
      </Badge>
    );
  };

  const getRoleColor = (role: Comment["author"]["role"]) => {
    switch (role) {
      case "admin":
        return "text-red-600";
      case "reviewer":
        return "text-blue-600";
      default:
        return "text-muted-foreground";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments & Feedback
          <Badge variant="outline" className="ml-auto">
            {comments.length}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Add Comment Section */}
        <div className="px-4 pb-4">
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
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Comments List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No comments yet</p>
                <p className="text-xs mt-1">
                  Start a conversation about this form
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback className="text-xs">
                        {comment.author.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {comment.author.name}
                        </span>
                        <span
                          className={`text-xs ${getRoleColor(comment.author.role)}`}
                        >
                          {comment.author.role}
                        </span>
                        {getCommentTypeBadge(comment.type)}
                      </div>

                      <p className="text-sm text-foreground leading-relaxed mb-2">
                        {comment.content}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(comment.timestamp)}
                        {comment.status && (
                          <>
                            <span>•</span>
                            <span
                              className={
                                comment.status === "resolved"
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }
                            >
                              {comment.status}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
