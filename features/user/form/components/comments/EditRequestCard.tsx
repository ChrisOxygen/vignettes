"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import {
  CheckCircle2,
  XCircle,
  Clock,
  User as UserIcon,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveEditRequest,
  denyEditRequest,
} from "../../actions/edit-requests.actions";
import { EditRequestStatus } from "@prisma/client";
import { toast } from "sonner";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface EditRequestCardProps {
  request: any; // FieldComment with edit request data
  isAdmin: boolean;
  submissionId: string;
}

export function EditRequestCard({
  request,
  isAdmin,
  submissionId,
}: EditRequestCardProps) {
  const [showDenyDialog, setShowDenyDialog] = useState(false);
  const [denyReason, setDenyReason] = useState("");
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: () => approveEditRequest(request.id),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["comments", submissionId] });
        queryClient.invalidateQueries({ queryKey: ["formSubmission"] });
        toast.success("Edit request approved", {
          description: "The form has been unlocked for editing.",
        });
      } else {
        toast.error("Failed to approve request", {
          description: result.message,
        });
      }
    },
  });

  const denyMutation = useMutation({
    mutationFn: (reason: string) => denyEditRequest(request.id, reason),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["comments", submissionId] });
        setShowDenyDialog(false);
        setDenyReason("");
        toast.success("Edit request denied", {
          description: "The user has been notified.",
        });
      } else {
        toast.error("Failed to deny request", {
          description: result.message,
        });
      }
    },
  });

  const getStatusBadge = () => {
    switch (request.editRequestStatus) {
      case EditRequestStatus.PENDING:
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case EditRequestStatus.APPROVED:
        return (
          <Badge variant="default" className="gap-1 bg-green-600">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case EditRequestStatus.DENIED:
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Denied
          </Badge>
        );
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Card className="border-2 border-orange-200 bg-orange-50/50">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarFallback className="text-xs bg-primary/10">
                {getInitials(request.authorName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-sm font-semibold">
                  {request.authorName}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {request.authorRole}
                </Badge>
                {getStatusBadge()}
                <span className="text-xs text-muted-foreground ml-auto">
                  {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-foreground mb-3 leading-relaxed">
                {request.content}
              </p>

              {/* Admin Actions - Only show if pending and user is admin */}
              {isAdmin && request.editRequestStatus === EditRequestStatus.PENDING && (
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    size="sm"
                    onClick={() => approveMutation.mutate()}
                    disabled={approveMutation.isPending}
                    className="gap-1"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {approveMutation.isPending ? "Approving..." : "Approve"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setShowDenyDialog(true)}
                    disabled={denyMutation.isPending}
                    className="gap-1"
                  >
                    <XCircle className="h-4 w-4" />
                    Deny
                  </Button>
                </div>
              )}

              {/* User View - Show status message */}
              {!isAdmin && request.editRequestStatus === EditRequestStatus.PENDING && (
                <p className="text-xs text-muted-foreground italic pt-2 border-t">
                  Awaiting admin review...
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deny Dialog */}
      <Dialog open={showDenyDialog} onOpenChange={setShowDenyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deny Edit Request</DialogTitle>
            <DialogDescription>
              Provide a reason for denying this request (optional).
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={denyReason}
            onChange={(e) => setDenyReason(e.target.value)}
            placeholder="Example: The form has already been reviewed and approved. Please contact support if you need further assistance."
            rows={4}
            className="resize-none"
          />

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDenyDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => denyMutation.mutate(denyReason)}
              disabled={denyMutation.isPending}
            >
              {denyMutation.isPending ? "Denying..." : "Deny Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
