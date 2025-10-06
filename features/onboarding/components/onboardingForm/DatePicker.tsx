"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useOnboarding } from "../../context";

interface DatePickerProps {
  field: "dateOfBirth";
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  field = "dateOfBirth",
  placeholder = "Pick a date",
  className = "",
}: DatePickerProps) {
  const {
    state: { formData },
    updateField,
  } = useOnboarding();

  const selectedDate = formData[field] ? new Date(formData[field]) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Format as DD/MM/YYYY to match your existing validation
      const formattedDate = format(date, "dd/MM/yyyy");
      updateField(field, formattedDate);
    } else {
      updateField(field, "");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-12 text-base w-full justify-start text-left font-normal border-border/40 bg-background hover:border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-border/40 bg-background/95 backdrop-blur-sm shadow-lg"
        align="start"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          autoFocus
          className="rounded-md"
        />
      </PopoverContent>
    </Popover>
  );
}
