"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Textarea } from "@/shared/components/ui/textarea";
import { Unlock } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../actions/comments.actions";
import { CommentType, FormType } from "@prisma/client";
import { toast } from "sonner";

interface RequestEditAccessButtonProps {
  submissionId: string;
  formType: FormType;
}

export function RequestEditAccessButton({
  submissionId,
  formType,
}: RequestEditAccessButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (content: string) => {
      return await createComment({
        submissionId,
        content,
        commentType: CommentType.EDIT_REQUEST,
        fieldPath: null, // Form-level
        fieldLabel: null,
      });
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["comments", submissionId] });
        setOpen(false);
        setReason("");
        toast.success("Edit request sent", {
          description:
            "An admin will review your request and respond shortly.",
        });
      } else {
        toast.error("Failed to send request", {
          description: result.message,
        });
      }
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description: error.message,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Unlock className="h-4 w-4 mr-2" />
          Request Edit Access
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Edit Access</DialogTitle>
          <DialogDescription>
            Explain why you need to edit this form. An admin will review your
            request.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Example: I need to update my passport expiry date as it was renewed recently."
          rows={4}
          className="resize-none"
        />

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => mutate(reason)}
            disabled={!reason.trim() || isPending}
          >
            {isPending ? "Sending..." : "Send Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
