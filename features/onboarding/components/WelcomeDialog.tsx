"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Progress } from "@/shared/components/ui/progress";
import { CheckCircle, FileText, User, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomeDialog({ open, onOpenChange }: WelcomeDialogProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);

  // Countdown timer effect
  useEffect(() => {
    if (!open) {
      // Reset when dialog closes
      setProgress(100);
      setTimeLeft(60);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          return 0;
        }
        return newTime;
      });

      setProgress((prev) => {
        const newProgress = prev - 100 / 60; // Decrease by 1/60th each second
        return Math.max(0, newProgress);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  // Separate effect to handle dialog closing when time runs out
  useEffect(() => {
    if (open && timeLeft <= 0) {
      onOpenChange(false);
    }
  }, [timeLeft, open, onOpenChange]);

  const handleCreateApplication = () => {
    onOpenChange(false);
    // TODO: Navigate to applications page when route is created
    router.push("/app");
  };

  const handleEditProfile = () => {
    onOpenChange(false);
    router.push("/onboarding");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader className="text-center flex flex-col items-center space-y-4">
          <span className="text-6xl">🎉</span>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Welcome to Vignettes!
          </DialogTitle>
          <DialogDescription className="text-base text-center text-muted-foreground leading-relaxed">
            Congratulations on completing your profile! You're all set to start
            your migration journey. What would you like to do next?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col sm:flex-col gap-4 pt-2">
          <Button
            onClick={handleCreateApplication}
            size="lg"
            className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <FileText className="w-5 h-5 mr-2" />
            Create New Application
          </Button>
          <Button
            onClick={handleEditProfile}
            variant="outline"
            size="lg"
            className="w-full hover:bg-primary/10 hover:border-primary/20 transition-colors duration-200"
          >
            <User className="w-5 h-5 mr-2" />
            Edit Profile
          </Button>

          {/* Countdown Progress Bar */}
          <div className="w-full space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Auto-close in {timeLeft}s</span>
              </div>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
