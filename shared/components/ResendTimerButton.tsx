"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/shared/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ResendTimerButtonProps {
  onResend: () => void;
  isPending?: boolean;
  disabled?: boolean;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

const STORAGE_KEY = "resend_verification_timer";
const COOLDOWN_MINUTES = 3;
const COOLDOWN_MS = COOLDOWN_MINUTES * 60 * 1000; // 3 minutes in milliseconds

export function ResendTimerButton({
  onResend,
  isPending = false,
  disabled = false,
  className = "",
  size = "lg",
  children,
}: ResendTimerButtonProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isOnCooldown, setIsOnCooldown] = useState(false);

  // Load timer state from localStorage on component mount
  useEffect(() => {
    const savedTimestamp = localStorage.getItem(STORAGE_KEY);
    if (savedTimestamp) {
      const timestamp = parseInt(savedTimestamp, 10);
      const now = Date.now();
      const elapsed = now - timestamp;

      if (elapsed < COOLDOWN_MS) {
        const remaining = COOLDOWN_MS - elapsed;
        setTimeLeft(remaining);
        setIsOnCooldown(true);
      } else {
        // Timer has expired, clean up storage
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!isOnCooldown || timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          setIsOnCooldown(false);
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOnCooldown, timeLeft]);

  // Format time as MM:SS
  const formatTime = useCallback((ms: number): string => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const handleResend = () => {
    if (isOnCooldown || isPending || disabled) return;

    // Save current timestamp to localStorage
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, now.toString());

    // Start cooldown
    setTimeLeft(COOLDOWN_MS);
    setIsOnCooldown(true);

    // Call the resend function
    onResend();
  };

  const isButtonDisabled = disabled || isPending || isOnCooldown;

  return (
    <Button
      onClick={handleResend}
      disabled={isButtonDisabled}
      size={size}
      className={`min-w-[200px] bg-gradient-to-r from-primary via-primary/90 cursor-pointer to-primary/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${className}`}
    >
      {isPending ? (
        <>
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          Sending...
        </>
      ) : isOnCooldown ? (
        <>
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry in {formatTime(timeLeft)}
        </>
      ) : (
        <>
          <RefreshCw className="w-4 h-4 mr-2" />
          {children || "Resend Verification Email"}
        </>
      )}
    </Button>
  );
}
