import React from "react";
import { Spinner } from "./ui/spinner";
import { cn } from "@/shared/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "default" | "lg" | "xl" | "2xl";
  variant?:
    | "default"
    | "secondary"
    | "muted"
    | "accent"
    | "destructive"
    | "white";
  label?: string;
  showLabel?: boolean;
  className?: string;
  centered?: boolean;
}

/**
 * A flexible loading spinner component for inline use
 * Use this for loading states within components, forms, or sections
 * For full-screen loading, use FullScreenLoader instead
 */
export function LoadingSpinner({
  size = "default",
  variant = "default",
  label = "Loading...",
  showLabel = false,
  className,
  centered = false,
}: LoadingSpinnerProps) {
  const Container = centered ? "div" : React.Fragment;
  const containerProps = centered
    ? {
        className: "flex items-center justify-center p-4",
      }
    : {};

  const spinner = (
    <Spinner
      size={size}
      variant={variant}
      label={label}
      showLabel={showLabel}
      className={className}
    />
  );

  return centered ? (
    <Container {...containerProps}>{spinner}</Container>
  ) : (
    spinner
  );
}

// Preset spinner components for common use cases
export const ButtonSpinner = (props: Omit<LoadingSpinnerProps, "size">) => (
  <LoadingSpinner size="sm" {...props} />
);

export const CardSpinner = (props: LoadingSpinnerProps) => (
  <LoadingSpinner centered {...props} />
);

export const PageSpinner = (
  props: Omit<LoadingSpinnerProps, "size" | "centered">
) => <LoadingSpinner size="lg" centered showLabel {...props} />;
