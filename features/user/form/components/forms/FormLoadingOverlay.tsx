import { Loader2 } from "lucide-react";

interface FormLoadingOverlayProps {
  isVisible?: boolean;
  message?: string;
}

export function FormLoadingOverlay({
  isVisible = false,
  message = "Please wait...",
}: FormLoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute max-h-[85vh] inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );
}
