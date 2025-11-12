"use client";

import React from "react";
import { MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface FieldCommentBadgeProps {
  fieldPath: string;
  commentCount: number;
  hasUnresolved: boolean;
  onClick?: () => void; // Scroll to comment in panel
}

export function FieldCommentBadge({
  fieldPath,
  commentCount,
  hasUnresolved,
  onClick,
}: FieldCommentBadgeProps) {
  if (commentCount === 0) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 px-2 gap-1 text-xs hover:bg-primary/10"
      onClick={onClick}
      title={`${commentCount} comment${commentCount > 1 ? "s" : ""}${hasUnresolved ? " (has unresolved)" : ""}`}
    >
      <MessageSquare className="h-3 w-3" />
      <span>{commentCount}</span>
      {hasUnresolved && (
        <AlertCircle className="h-3 w-3 text-orange-500" />
      )}
    </Button>
  );
}
