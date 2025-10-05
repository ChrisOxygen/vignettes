import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-current",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        default: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-4",
        "2xl": "h-16 w-16 border-4",
      },
      variant: {
        default: "border-primary border-t-transparent",
        secondary: "border-secondary border-t-transparent",
        muted: "border-muted-foreground border-t-transparent",
        accent: "border-accent border-t-transparent",
        destructive: "border-destructive border-t-transparent",
        white: "border-white border-t-transparent",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const spinnerContainerVariants = cva("flex items-center justify-center", {
  variants: {
    fullScreen: {
      true: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
      false: "",
    },
  },
  defaultVariants: {
    fullScreen: false,
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants>,
    VariantProps<typeof spinnerContainerVariants> {
  label?: string;
  showLabel?: boolean;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      size,
      variant,
      fullScreen,
      label = "Loading...",
      showLabel = false,
      ...props
    },
    ref
  ) => {
    const Container = fullScreen ? "div" : React.Fragment;
    const containerProps = fullScreen
      ? {
          className: cn(spinnerContainerVariants({ fullScreen })),
          role: "status",
          "aria-label": label,
        }
      : {};

    const spinner = (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), className)}
        role={fullScreen ? undefined : "status"}
        aria-label={fullScreen ? undefined : label}
        {...props}
      />
    );

    if (fullScreen) {
      return (
        <Container {...containerProps}>
          <div className="flex flex-col items-center gap-4">
            {spinner}
            {showLabel && (
              <p className="text-sm text-muted-foreground animate-pulse">
                {label}
              </p>
            )}
          </div>
        </Container>
      );
    }

    return showLabel ? (
      <div className="flex items-center gap-2">
        {spinner}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    ) : (
      spinner
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
