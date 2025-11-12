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
import { CommentType, FormType } from "@prisma/client";
import { toast } from "sonner";
import { useCreateComment } from "../../hooks";

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

  const { mutate, isPending } = useCreateComment({
    onSuccess: (result) => {
      if (result.success) {
        setOpen(false);
        setReason("");
        toast.success("Edit request sent", {
          description: "An admin will review your request and respond shortly.",
        });
      } else {
        toast.error("Failed to send request", {
          description: result.message,
        });
      }
    },
    onError: (error) => {
      toast.error("Error", {
        description: error,
      });
    },
  });

  const handleSubmit = () => {
    mutate({
      submissionId,
      content: reason,
      commentType: CommentType.EDIT_REQUEST,
      fieldPath: null,
      fieldLabel: null,
    });
  };

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
          <Button onClick={handleSubmit} disabled={!reason.trim() || isPending}>
            {isPending ? "Sending..." : "Send Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
