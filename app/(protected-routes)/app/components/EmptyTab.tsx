import React from "react";
import { Button } from "@/shared/components/ui/button";
import { IoDocumentTextOutline } from "react-icons/io5";

interface EmptyTabProps {
  formTitle: string;
  formType: string;
  onCreateForm?: () => void;
}

function EmptyTab({ formTitle, formType, onCreateForm }: EmptyTabProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6 p-8">
      <div className="rounded-full bg-gray-100 p-6">
        <IoDocumentTextOutline className="w-16 h-16 text-gray-400" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-foreground">
          No {formTitle} Yet
        </h3>
        <p className="text-muted-foreground text-base max-w-md">
          You haven't created a form for {formTitle.toLowerCase()} yet. Click
          the button below to get started.
        </p>
      </div>

      <Button size="lg" onClick={onCreateForm} className="mt-4">
        Create {formTitle}
      </Button>
    </div>
  );
}

export default EmptyTab;
